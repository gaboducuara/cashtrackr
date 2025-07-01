"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    limit: process.env.NODE_ENV === 'production' ? 5 : 100,
    message: { "error": "Demasiadas peticiones desde esta IP, por favor inténtelo más tarde." },
});
//# sourceMappingURL=limiter.js.map