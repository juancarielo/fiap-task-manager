import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from 'mongoose';

const connectDB = (handler: NextApiHandler) => {
    async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }
    }

    await mongoose.connect()
}