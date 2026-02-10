import * as newsletterService from "../../services/engagement/newsletter_services.js";

export async function createNewsLetter(req, res) {
  try {
    const { email, source } = req.body;
    const newsletter = await newsletterService.createNewsletterService({
      email,
      source,
    });
    res.status(201).json(newsletter);
  } catch (error) {
    console.log("Error Creating Newsletter", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
