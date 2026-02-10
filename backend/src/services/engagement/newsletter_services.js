import { Newsletter } from "../../model/index.js";

export async function createNewsletterService(newsletter) {
  const { email, source } = newsletter;
  const createNewsletter = await Newsletter.create({
    email,
    source,
  });
  return createNewsletter;
}
