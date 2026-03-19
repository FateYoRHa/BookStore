import { HomePageSection } from "../../../model/index.js";

export async function addHomePageSectionService(homepage) {
  const { type, title, subtitle, references } = homepage;
  const newHomePageSection = await HomePageSection.create({
    type,
    title,
    subtitle,
    references,
  });
  return newHomePageSection;
}

export async function updateHomePageSectionService(homepage) {
  const { id, type, title, subtitle, references } = homepage;
  const updatedHomePage = await HomePageSection.findByIdAndUpdate(
    id,
    {
      type,
      title,
      subtitle,
      references,
    },
    { new: true },
  );
  return updatedHomePage;
}
export async function deleteHomePageSectionService(id) {
  return await HomePageSection.findByIdAndDelete(id);
}
