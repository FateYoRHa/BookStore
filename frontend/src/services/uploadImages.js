import api from "./axios";
export const uploadImages = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.patch("/admin/upload/images", formData);

  return res.data;
};
