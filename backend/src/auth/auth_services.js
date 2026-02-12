import { User, Customer } from "../model/index.js";
import { createCustomerService } from "../services/core/customer_services.js";
export async function registerService(user) {
  const { email, password } = user;
  const emailUsed = await User.find({ email: email });
  if (emailUsed) {
    const error = new Error("Email is already taken.");
    error.status = 409;
    throw error;
  }
  const registerUser = await User.create({ email, password });
  const id = registerUser._id;
  const name = email.split("@")[0];
  await createCustomerService({ id, name });

  return registerUser;
}
