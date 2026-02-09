import * as bannerService from "../../services/content/banner_services.js";

export async function getBanners(req, res) {
  try {
    const banners = await bannerService.getBannersService();
    res.status(200).json(banners);
  } catch (error) {
    console.log("Error GetBanners", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function addBanner(req, res) {
  try {
    const { title, image, startDate, endDate } = req.body;
    const banner = await bannerService.addBannerService({
      title,
      image,
      startDate,
      endDate,
    });
    res.status(200).json(banner);
  } catch (error) {
    console.log("Error addBanners", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateBanner(req, res) {
  try {
    const { title, image, startDate, endDate } = req.body;
    const id = req.params.id
    const banner = await bannerService.updateBannerService({
      id,
      title,
      image,
      startDate,
      endDate,
    });
    res.status(200).json(banner);
  } catch (error) {
    console.log("Error updateBanners", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function deactivateBanner(req, res) {
  try {
    await bannerService.deactivateBannerService(req.params.id);
    res.status(200).json({ message: "Banner Deleted Successfully" });
  } catch (error) {
    console.log("Error deleteBanners", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
