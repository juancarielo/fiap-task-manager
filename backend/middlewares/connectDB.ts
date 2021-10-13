import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";

const connectDB = (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("MongoDB readyState", mongoose.connections[0].readyState);

    if (!mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    const { DB_CONNECTION_STRING } = process.env;

    console.log(DB_CONNECTION_STRING)

    if (!DB_CONNECTION_STRING) {
      return res.status(500).json({ error: "ENV database não informado." });
    }

    await mongoose.connect(DB_CONNECTION_STRING);

    mongoose.connection.on("connected", () => console.log("Conectado na database."));
    mongoose.connection.on("error", (err) => console.log("Erro ao conectadar na database.", err));

    return handler(req, res);
  };

export default connectDB;
