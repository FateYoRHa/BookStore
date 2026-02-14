export function extractAccessToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("No Authorization header or invalid format.");
    error.status = 401;
    throw error;
  }
  const accessToken = authHeader.split(" ")[ 1 ];
  if (!accessToken) throw error;
  return accessToken;
}
