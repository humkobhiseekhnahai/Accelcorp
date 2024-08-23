import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";  // Ensure this is imported

const app = express();
app.use(express.json());

// Configure CORS to allow requests from any origin or specific origins
app.use(cors({
    origin: '*', // Allows all origins. Replace '*' with specific origin if needed, e.g., 'http://localhost:5173'
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const client = new PrismaClient();

// POST route to upsert data
app.post("/send", async (req: Request, res: Response) => {
    const { cropName, location, soilType } = req.body;

    try {
        const respond = await client.data.upsert({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to fetch data by id
app.get("/get", async (req: Request, res: Response) => {
    try {
        const response = await client.data.findUnique({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
