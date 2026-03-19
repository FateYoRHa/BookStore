import * as homePageService from "../../services/content/homepagesection_services.js";

export async function getHomePageSections(req, res) {
  try {
    const homepage = await homePageService.getHomePageSectionsService();
    res
      .status(200)
      .json({ data: homepage, message: "Homepage Section Retrieved" });
  } catch (error) {
    console.log("Error Retreiving Home Page Section", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getHomePageSection(req, res) {
  try {
    const homepage = await homePageService.getHomePageSectionService(req.params.id);
    res
      .status(200)
      .json({ data: homepage, message: "Homepage Section Retrieved" });
  } catch (error) {
    console.log("Error Retreiving Home Page Section", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}