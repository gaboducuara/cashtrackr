import { rateLimit } from 'express-rate-limit'

/*Limite en las peticiones post*/
export const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes cuantos requests
  limit: 5, // Limit each IP to 100 requests per windowMs
  message: {"error": "Demasiadas peticiones desde esta IP, por favor inténtelo más tarde." },
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // skipFailedRequests: true, // Skip failed requests to avoid counting them against the limit
})
