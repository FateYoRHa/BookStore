import AnalyticsEvent from "../../model/analytics/AnalyticsEvent.js";

export const trackEventService = async ({
  type,
  book = null,
  customer = null,
  metadata = {},
}) => {
  try {
    await AnalyticsEvent.create({
      type,
      book,
      customer,
      metadata,
    });
  } catch (err) {
    // Never break main flow because of analytics
    console.error("Analytics error:", err.message);
  }
};
