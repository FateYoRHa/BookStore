// utils/globalFilter.ts
export const globalSearchFilter = (row, columnId, filterValue) => {
  const search = String(filterValue).toLowerCase();

  return Object.values(row.original).some((value) => {
    if (value == null) return false;

    // primitive
    if (typeof value === "string" || typeof value === "number") {
      return value.toString().toLowerCase().includes(search);
    }

    // array (e.g. categories)
    if (Array.isArray(value)) {
      return value.some((item) =>
        Object.values(item ?? {})
          .join(" ")
          .toLowerCase()
          .includes(search),
      );
    }

    // object (nested)
    if (typeof value === "object") {
      return Object.values(value).join(" ").toLowerCase().includes(search);
    }

    return false;
  });
};
