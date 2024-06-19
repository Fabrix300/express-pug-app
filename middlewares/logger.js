import "express";

export function logger(req, res, next) {
  console.log("General logger", req.originalUrl);
  next();
}
