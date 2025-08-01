import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: process.env.NODE_ENV === 'production' ? 5 : 100,
  message: {"error": "Demasiadas peticiones desde esta IP, por favor inténtelo más tarde." },

  keyGenerator: (req, res) => req.ip,

  standardHeaders: true,
  legacyHeaders: false
})
