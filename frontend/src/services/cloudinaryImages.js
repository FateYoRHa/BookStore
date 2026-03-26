import api from "./axios";
export const uploadImages = async (files, type = "general") => {
  if (!files) throw new Error("No files provided");

  const fileArray = Array.isArray(files) ? files : [files];

  const formData = new FormData();
  fileArray.forEach((file) => {
    if (file) formData.append("images", file);
  });

  // Optional: add type/folder info
  formData.append("type", type);

  const res = await api.patch("/admin/upload/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
export const deleteImages = async (removedImages) => {
  if (!removedImages) throw new Error("No public ID provided");

  return await api.delete("/admin/delete/images", {
    data: { removedImages },
  });
};
