import Autoplay from "embla-carousel-autoplay";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFeaturedItem } from "../../hooks/feature_hooks";
import { normalizeFeaturedItem } from "../../utils/normalizeFeaturedItem";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/rating";
import ViewFeaturedItemSkeleton from "./ViewFeaturedItemSkeleton";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeaturedItemSchema } from "../../featureSchema";
import { cn } from "@/lib/utils";
import FormFieldError from "@/components/forms/FormFieldError";
import { Button } from "@/components/ui/button";

const ViewFeaturedItem = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFeaturedItem(id);
  const [isUpdating, setIsUpdating] = useState(false);

  // Normalize the featured item data for easier rendering
  const featuredItem = normalizeFeaturedItem(data);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      itemId: "",
      itemType: "",
      section: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(addFeaturedItemSchema),
    mode: "onChange",
  });
  const formatDateForInput = (rawDate) => {
    if (!rawDate) return "";

    const parsedDate = rawDate instanceof Date ? rawDate : new Date(rawDate);
    if (Number.isNaN(parsedDate.getTime())) return "";

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formValues = useMemo(() => {
    const itemId =
      typeof data?.item === "object" ? data.item?._id : (data?.item ?? "");

    return {
      itemId,
      itemType: data?.itemType ?? "",
      section: data?.section ?? "",
      startDate: formatDateForInput(data?.startDate),
      endDate: formatDateForInput(data?.endDate),
    };
  }, [
    data?.item,
    data?.itemType,
    data?.section,
    data?.startDate,
    data?.endDate,
  ]);

  useEffect(() => {
    if (!data?._id) return;

    reset(formValues);
  }, [data?._id, formValues, reset]);

  const handleToggleEdit = () => {
    setIsUpdating((prev) => !prev);
  };

  const handleCancelEdit = () => {
    reset(formValues);
    setIsUpdating(false);
  };

  // Carousel stuff
  const plugin = useRef(Autoplay({ delay: 5000 }));

  return (
    <main className="container max-w-7xl mx-auto px-6 py-16 overflow-auto">
      {isLoading || !featuredItem ? (
        <ViewFeaturedItemSkeleton />
      ) : (
        <>
          <Card className="grid md:grid-cols-[400px_1fr] gap-10">
            {/* IMAGE CAROUSEL */}
            <CardContent>
              <Carousel plugins={[plugin.current]}>
                <CarouselContent>
                  {featuredItem?.images?.map((img, i) => (
                    <CarouselItem key={i}>
                      <AspectRatio ratio={3 / 4}>
                        <img
                          src={img?.url || img?.image?.url}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardContent>

            {/* DETAILS */}
            <CardContent className="space-y-6">
              {/* TITLE */}
              <h2 className="text-3xl font-serif font-semibold">
                {featuredItem?.title}
              </h2>

              {/* SUBTITLE / AUTHOR / TYPE */}
              <section className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={featuredItem?.avatar} />
                </Avatar>
                <span className="font-semibold">{featuredItem?.subtitle}</span>
              </section>

              {/* DESCRIPTION */}
              <p className="text-muted-foreground">
                {featuredItem?.description}
              </p>

              {/* META (ONLY IF EXISTS) */}
              {featuredItem?.meta?.length > 0 && (
                <section className="grid grid-cols-2 gap-2 text-sm">
                  {featuredItem.meta.map((m, i) => (
                    <Fragment key={i}>
                      <span className="font-semibold">{m.label}</span>
                      <span className="text-muted-foreground">{m.value}</span>
                    </Fragment>
                  ))}
                </section>
              )}

              {/* CONDITIONAL BOOK FEATURES */}
              {featuredItem?.type === "Book" && (
                <>
                  {/* Rating */}
                  <Rating
                    rate={
                      featuredItem.extra.rating?.reduce(
                        (a, b) => a + b.rating,
                        0,
                      ) / featuredItem.extra.rating?.length
                    }
                  />

                  {/* Price */}
                  <div className="text-2xl font-bold text-teal-800">
                    ${featuredItem.extra.price}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <section className="mt-5">
            <Card>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">Featured Details</h3>
                  <div className="flex items-center gap-2">
                    {isUpdating && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                    <Button type="button" onClick={handleToggleEdit}>
                      {isUpdating ? "Done" : "Edit Featured Details"}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  <div className="flex flex-col gap-y-2 gap-x-6 text-sm">
                    <span className="font-semibold text-black">
                      {featuredItem?.featuredMeta?.startDate?.label ||
                        "Start Date"}
                    </span>
                    <Input
                      {...register("startDate")}
                      type="date"
                      readOnly={!isUpdating}
                      className={cn(
                        errors?.startDate &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    />
                    <FormFieldError error={errors?.startDate} />
                    <span className="font-semibold text-black">
                      {featuredItem?.featuredMeta?.endDate?.label || "End Date"}
                    </span>
                    <Input
                      {...register("endDate")}
                      type="date"
                      readOnly={!isUpdating}
                      className={cn(
                        errors?.endDate &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    />
                    <FormFieldError error={errors?.endDate} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </main>
  );
};

export default ViewFeaturedItem;
