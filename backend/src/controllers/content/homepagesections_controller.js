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

export async function addHomePageSection(req, res) {
  try {
    const { type, title, subtitle, references } = req.body;

    const homepage = await homePageService.addHomePageSectionService({
      type,
      title,
      subtitle,
      references,
    });

    res.status(200).json({
      data: homepage,
      message: "Home Page Section Updated Successfully.",
    });
  } catch (error) {
    console.log("Error adding Home Page Section", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateHomePageSection(req, res) {
  try {
    const { type, title, subtitle, references } = req.body;
    const id = req.params.id;
    const homepage = await homePageService.updateHomePageSectionService({
      id,
      type,
      title,
      subtitle,
      references,
    });

    res.status(200).json({
      data: homepage,
      message: "Home Page Section Updated Successfully.",
    });
  } catch (error) {
    console.log("Error updating Home Page Section", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteHomePageSection(req, res) {
  try {
    await homePageService.deleteHomePageSectionService(req.params.id);
    res
      .status(200)
      .json({ message: "Home Page Section Deleted Successfully." });
  } catch (error) {
    console.log("Error deleting Home Page Section", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
