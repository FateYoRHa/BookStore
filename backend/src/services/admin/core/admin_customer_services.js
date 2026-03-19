import { Customer } from "../../../model/index.js";

export async function getCustomersService() {
  return await Customer.find().sort({ createdAt: "asc" });
}