import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  //  Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      error: "You can't access this resource, please authenticate",
    });
  }

  //  Extract token
  const token = authHeader.split(" ")[1];

  try {
    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({
      error: "Your token is invalid or has expired",
    });
  }
}
