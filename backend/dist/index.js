"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors")); // Ensure this is imported
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configure CORS to allow requests from any origin or specific origins
app.use((0, cors_1.default)({
    origin: '*', // Allows all origins. Replace '*' with specific origin if needed, e.g., 'http://localhost:5173'
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
const client = new client_1.PrismaClient();
// POST route to upsert data
app.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cropName, location, soilType } = req.body;
    try {
        const respond = yield client.data.upsert({
            where: {
                id: 1
            },
            update: {
                cropName: cropName,
                location: location,
                soilType: soilType
            },
            create: {
                cropName: cropName,
                location: location,
                soilType: soilType
            }
        });
        return res.json({
            msg: "updated values"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
// GET route to fetch data by id
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.data.findUnique({
            where: { id: 1 }
        });
        if (!response) {
            return res.status(404).json({ error: "Data not found" });
        }
        return res.json({
            location: response.location,
            soilType: response.soilType,
            cropName: response.cropName
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
