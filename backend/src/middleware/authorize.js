export function authorize(...roles) {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }

      if (!roles || !roles.includes(user.role)) {
        const error = new Error("Unauthorized");
        error.status = 403;
        throw error;
      }
      next();
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
}
