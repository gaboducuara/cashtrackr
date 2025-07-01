"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const budgetRouter_1 = __importDefault(require("./routes/budgetRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
async function connectDB() {
    try {
        await db_1.db.authenticate();
        db_1.db.sync();
    }
    catch (error) {
        process.exit(1);
    }
}
connectDB();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/budget', budgetRouter_1.default);
app.use('/api/auth', authRouter_1.default);
app.use('/', (req, res) => {
    res.send('cashtrackr');
});
exports.default = app;
//# sourceMappingURL=server.js.map