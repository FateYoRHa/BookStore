import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //change to username or id "my-limit-key"
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request, please try again later" });
    }

    next();
  } catch (error) {
    console.log("Rate Limit error", error);
    next(error);
  }
};

export default rateLimiter;
