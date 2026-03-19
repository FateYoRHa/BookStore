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
