import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    // Use the built-in Web Crypto API to generate deviceId
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}
