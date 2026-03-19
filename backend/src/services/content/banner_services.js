import { Banner } from "../../model/index.js";
// TODO catch Validation Errors 
export async function getBannersService() {
  return Banner.find({
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  }).sort({ startDate: -1 });
}
