import Autoplay from "embla-carousel-autoplay";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFeaturedItem,
  useUpdateFeaturedItem,
} from "../../hooks/feature_hooks";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeaturedItemSchema } from "../../featureSchema";
import { cn } from "@/lib/utils";
import FormFieldError from "@/components/forms/FormFieldError";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel } from "@/components/ui/field";
import { featuredSections } from "@/features/admin/utils/constantValues";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Maps API/input variants to the canonical section slugs used by Select/Zod.
const SECTION_ALIAS_MAP = {
  hero: "hero",
  "best-seller": "best-seller",
  "best seller": "best-seller",
  best_seller: "best-seller",
  bestseller: "best-seller",
  "new-arrival": "new-arrival",
  "new arrival": "new-arrival",
  new_arrival: "new-arrival",
  newarrival: "new-arrival",
  popular: "popular",
};

// Normalizes any incoming section value to a valid slug or empty string.
const normalizeSectionValue = (value) => {
  if (typeof value !== "string") return "";
  const normalizedKey = value.trim().toLowerCase();
  return SECTION_ALIAS_MAP[normalizedKey] || "";
};

const ViewFeaturedItem = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFeaturedItem(id);
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate: updateFeaturedItem, isPending } = useUpdateFeaturedItem();
  // Guards against repeated reset() calls when data object references change.
  const lastInitializedRef = useRef("");

  // Normalize the featured item data for easier rendering
  const featuredItem = normalizeFeaturedItem(data);
  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      itemId: "",
      itemType: "",
      section: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(addFeaturedItemSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
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

  useEffect(() => {
    if (!data?._id) return;

    // Signature of server values used to initialize the form.
    const initKey = [
      data._id,
      typeof data.item === "object" ? data.item?._id : data.item,
      data.itemType,
      data.section,
      data.startDate,
      data.endDate,
    ].join("|");

    if (lastInitializedRef.current === initKey) return;

    const itemId =
      typeof data.item === "object" ? data.item?._id : (data.item ?? "");

    reset({
      itemId,
      itemType: data.itemType ?? "",
      section: normalizeSectionValue(data.section),
      startDate: formatDateForInput(data.startDate),
      endDate: formatDateForInput(data.endDate),
    });

    lastInitializedRef.current = initKey;
  }, [
    data?._id,
    data?.endDate,
    data?.item,
    data?.itemType,
    data?.section,
    data?.startDate,
    reset,
  ]);

  const handleToggleEdit = (event) => {
    if (!isUpdating) {
      event.preventDefault();
      setIsUpdating(true);
    }
  };

  const handleCancelEdit = () => {
    if (!data?._id) return;

    const itemId =
      typeof data.item === "object" ? data.item?._id : (data.item ?? "");

    reset({
      itemId,
      itemType: data.itemType ?? "",
      section: normalizeSectionValue(data.section),
      startDate: formatDateForInput(data.startDate),
      endDate: formatDateForInput(data.endDate),
    });
    setIsUpdating(false);
  };

  const onSubmit = (featured) => {
    featured = { ...featured, id: data?.featuredCode };
    updateFeaturedItem(featured, {
      onSuccess: () => {
        toast.success("Featured item updated successfully");
        setIsUpdating(false);
      },
      onError: () => {
        toast.error("Failed to update featured item");
      },
    });
  };
  // Keeps carousel autoplay plugin instance stable across re-renders.
  const plugin = useRef(Autoplay({ delay: 5000 }));

  return (
    <main className="flex min-h-0 flex-1 overflow-auto px-6 py-16">
      <div className="mx-auto w-full max-w-7xl">
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <Button
                        type="submit"
                        onClick={handleToggleEdit}
                        disabled={isPending}>
                        {isUpdating ? (
                          isPending ? (
                            <>
                              <Spinner />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )
                        ) : (
                          "Edit Featured Details"
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                    <Field className="flex flex-col gap-y-2 gap-x-6 text-sm">
                      <FieldLabel className="font-semibold text-black">
                        Item Type
                      </FieldLabel>
                      <Input
                        {...register("itemType")}
                        readOnly
                        className={cn(
                          errors?.itemType &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      <FormFieldError error={errors?.itemType} />
                      <Controller
                        name="section"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Field>
                              <FieldLabel>Section</FieldLabel>

                              <Select
                                value={
                                  normalizeSectionValue(field.value) ||
                                  normalizeSectionValue(data?.section)
                                }
                                disabled={!isUpdating}
                                onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Section" />
                                </SelectTrigger>

                                <SelectContent>
                                  {featuredSections?.map((feat) => (
                                    <SelectItem key={feat} value={feat}>
                                      <span className="capitalize">{feat}</span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <FormFieldError
                                error={isUpdating ? errors?.section : undefined}
                              />
                            </Field>
                          );
                        }}
                      />
                    </Field>
                    <Field className="flex flex-col gap-y-2 gap-x-6 text-sm">
                      <FieldLabel className="font-semibold text-black">
                        {featuredItem?.featuredMeta?.startDate?.label ||
                          "Start Date"}
                      </FieldLabel>
                      <Input
                        {...register("startDate")}
                        type="date"
                        readOnly={!isUpdating}
                        className={cn(
                          errors?.startDate &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      <FormFieldError
                        error={isUpdating ? errors?.startDate : undefined}
                      />
                      <FieldLabel className="font-semibold text-black">
                        {featuredItem?.featuredMeta?.endDate?.label ||
                          "End Date"}
                      </FieldLabel>
                      <Input
                        {...register("endDate")}
                        type="date"
                        readOnly={!isUpdating}
                        className={cn(
                          errors?.endDate &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      <FormFieldError
                        error={isUpdating ? errors?.endDate : undefined}
                      />
                    </Field>
                  </div>
                </CardContent>
              </Card>
            </form>
          </section>
        </>
      )}
      </div>
    </main>
  );
};

export default ViewFeaturedItem;
