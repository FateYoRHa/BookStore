export const normalizeFeaturedItem = (data) => {
  const type = data?.itemType;
  const item = data?.item;

  switch (type) {
    case "Book":
      return {
        type,
        title: item?.title,
        images: item?.images,
        subtitle: item?.author?.penName,
        avatar: item?.author?.image?.url,
        description: item?.description,
        meta: [
          {
            label: "Categories",
            value: item?.categories?.map((c) => c.name).join(", "),
          },
          { label: "Publisher", value: item?.publisher },
          { label: "ISBN", value: item?.bookCode },
          { label: "Language", value: item?.language },
          { label: "Pages", value: item?.pages },
        ],
        extra: {
          rating: item?.reviews,
          price: item?.price,
        },
        featuredMeta: {
          startDate: { label: "Start Date", value: data?.startDate },
          endDate: { label: "End Date", value: data?.endDate },
        },
      };

    case "Author":
      return {
        type,
        title: item?.penName,
        images: [item?.image],
        subtitle: "Author",
        avatar: item?.image?.url,
        description: item?.bio,
        meta: [],
        extra: {},
        featuredMeta: {
          startDate: { label: "Start Date", value: data?.startDate },
          endDate: { label: "End Date", value: data?.endDate },
        },
      };

    case "Category":
      return {
        type,
        title: item?.name,
        images: [item?.image],
        subtitle: "Category",
        avatar: item?.image?.url,
        description: item?.description,
        meta: [],
        extra: {},
        featuredMeta: {
          startDate: { label: "Start Date", value: data?.startDate },
          endDate: { label: "End Date", value: data?.endDate },
        },
      };

    default:
      return {};
  }
};
