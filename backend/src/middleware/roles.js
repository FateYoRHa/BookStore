import { authenticate } from "./authenticate.js";
import { authorize } from "./authorize.js";
export const adminOnly = [authenticate, authorize("admin")];
export const customerOnly = [authenticate, authorize("customer")];
