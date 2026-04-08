import Autoplay from "embla-carousel-autoplay";
import { Fragment, useRef } from "react";
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

const ViewFeaturedItem = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFeaturedItem(id);

  // Normalize the featured item data for easier rendering
  const featuredItem = normalizeFeaturedItem(data);
  // FEATURED DATES
  const startDate = new Date(
    featuredItem?.featuredMeta?.startDate?.value,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endDate = new Date(
    featuredItem?.featuredMeta?.endDate?.value,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
                <h3 className="text-xl font-semibold">Featured Details</h3>

                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  <span className="font-semibold text-black">
                    {featuredItem?.featuredMeta?.startDate?.label ||
                      "Start Date"}
                  </span>
                  <span className="text-muted-foreground">
                    {startDate || "-"}
                  </span>

                  <span className="font-semibold text-black">
                    {featuredItem?.featuredMeta?.endDate?.label || "End Date"}
                  </span>
                  <span className="text-muted-foreground">
                    {endDate || "-"}
                  </span>
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
