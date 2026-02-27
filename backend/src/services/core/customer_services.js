import { Customer, Order } from "../../model/index.js";
import * as orderService from "../../services/commerce/order_services.js";
import { uploadToCloudinary } from "../content/media_services.js";
import cloudinary from "../../config/cloudinary.js";
import { uploadPresets } from "../../utis/uploadPresets.js";

export async function getCustomersService() {
  return await Customer.find().sort({ createdAt: "asc" });
}
export async function getCustomerService(id) {
  try {
    const customer = await Customer.findOne({ user: id }).populate(
      "user",
      "email role",
    );
    const orders = await orderService.getOrderService(customer.id);
    if (!customer) {
      const error = new Error("Customer not found.");
      error.status = 404;
      throw error;
    }
    return { customer, orders };
  } catch (error) {
    throw error;
  }
}

export async function updateCustomerProfileService(customer) {
  const { id, name, phone, address, image } = customer;
  const updateCustomer = await Customer.findOneAndUpdate(
    { user: id },
    { name, phone, address, image },
    { new: true },
  );
  return updateCustomer;
}

export async function createCustomerService(customer) {
  const { id, name } = customer;
  const newCustomer = new Customer({ user: id, name });

  return await newCustomer.save();
}
export async function updateCustomerImageService(params) {
  const { userId, file } = params;
  if (!file) {
    throw new Error("No file provided.");
  }

  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw new Error("Customer not found.");
  }
  // Delete old image if exists
  if (customer.image?.public_id) {
    await cloudinary.uploader.destroy(customer.image.public_id);
  }
  const result = await uploadToCloudinary(
    file.buffer,
    "profiles",
    `customer_${customer.customerCode}`,
    uploadPresets.profile,
  );
  customer.image = {
    url: result.secure_url,
    public_id: result.public_id,
  };
  await customer.save();

  return customer.image;
}
