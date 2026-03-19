import { HomePageSection } from "../../model/index.js";

export async function getHomePageSectionsService() {
  return HomePageSection.find({ status: "active" })
    .sort({ createdAt: 1 })
    .populate("references.refId");
}

export async function getHomePageSectionService(id) {

  return HomePageSection.findById(id, { status: "active" })
    .sort({ createdAt: 1 })
    .populate("references.refId");
}