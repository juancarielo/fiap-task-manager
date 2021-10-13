import type { NextApiRequest, NextApiResponse } from "next";
import md5 from 'md5';
import jwt from 'jsonwebtoken';

import connectDB from "../../middlewares/connectDB";
import { UserModel } from "../../models/UserModel";
import { Login } from "../../types/Login";
import { LoginResponse } from "../../types/LoginResponse";
import { DefaultResponse } from "../../types/DefaultResponse";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse | LoginResponse>
) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ error: "Método solicitado nao existe." });
    }

    const { MY_SECRET_KEY } = process.env;

    if (!MY_SECRET_KEY) {
      return res.status(400).json({ error: "ENV MY_SECRET_KEY não encontrada." });
    }

    if (req.body) {
      const auth = req.body as Login;
      if (auth.login && auth.password) {
        const usersFound = await UserModel.find({email: auth.login, password: md5(auth.password)});

        if (usersFound && usersFound.length > 0) {
          const user = usersFound[0];
          const token = jwt.sign({__id: user.id}, MY_SECRET_KEY)

          res.status(200).json({ token, name: user.name, email: user.email})
        }

        res.status(200).json({ msg: "Login efetuado com sucesso" });
        return;
      }
    }

    res.status(400).json({ error: "Usuário ou senha inválidos." });
  } catch (error) {
    console.log("Ocorreu um erro ao autenticar o usuário?");
    res.status(500).json({
      error: "Ocorreu um erro ao autenticar o usuário, tente novamente.",
    });
  }
};

export default connectDB(handler);
