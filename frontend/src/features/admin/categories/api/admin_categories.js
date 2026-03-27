import api from "@/services/axios";

export const addCategoryRequest = async (category) => {
  const res = await api.post("/admin/categories", category);
  return res.data;
};

export const updateCategoryRequest = async (category) => {
  const res = await api.put(`/admin/categories/${category.catCode}`, category);
  return res.data;
};

export const removeCategoryRequest = async (category) => {
  const res = await api.delete(
    `/admin/categories/${category.catCode}`,
    category,
  );
  return res.data;
};

export const getCategoriesRequest = async () => {
  const res = await api.get("/admin/categories");
  return res.data;
};
