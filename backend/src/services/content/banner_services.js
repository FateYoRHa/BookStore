import { Banner } from "../../model/index.js";
// TODO catch Validation Errors 
export async function getBannersService() {
  return Banner.find({
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  }).sort({ startDate: -1 });
}
export async function addBannerService(banner) {
  const { title, image, startDate, endDate } = banner;
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    throw new Error("startDate cannot be after endDate");
  }
  const newBanner = await Banner.create({
    title,
    image,
    startDate,
    endDate,
  });
  return newBanner;
}
export async function updateBannerService(banner) {
  const { id, title, image, startDate, endDate } = banner;
  const updateBanner = await Banner.findByIdAndUpdate(
    id,
    {
      title,
      image,
      startDate,
      endDate,
    },
    { new: true },
  );
  return updateBanner;
}
export async function deactivateBannerService(id) {
  return await Banner.findByIdAndDelete(id);
}
