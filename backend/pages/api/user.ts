import type { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";

import connectDB from "../../middlewares/connectDB";
import { UserModel } from "../../models/UserModel";
import { User } from "../../types/User";
import { DefaultResponse } from "../../types/DefaultResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
    try {
        if (req.method !== "POST") {
            res.status(400).json({ error: "Método solicitado não existe." });
            return;
        }

        if (req.body) {
            const user = req.body as User;

            if (!user.name || user.name.length < 3) {
                res.status(400).json({ error: "Nome do usuário inválido" });
                return;
            }

            if (!user.email || !user.email.includes("@") || !user.email.includes(".")) {
                res.status(400).json({ error: "E-mail do usuário inválido" });
                return;
            }

            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

            if (!strongRegex.test(user.password)) {
                res.status(400).json({ error: "Senha do usuário inválida" });
                return;
            }

            const userExist = await UserModel.find({ email: user.email });

            if (userExist && userExist.length > 0) {
                res.status(400).json({ error: "Já existe um usuário com o e-mail informado" });
                return;
            }

            const final = {
                ...user,
                password: md5(user.password),
            };

            await UserModel.create(final);
            res.status(200).json({ error: "Usuário criado com sucesso!" });
            return;
        }

        res.status(400).json({ error: "Parâmetros de entrada inválidos" });
    } catch (error) {
        console.log("Ocorreu um erro ao criar o usuário?");
        res.status(500).json({
            error: "Ocorreu um erro ao criar o usuário, tente novamente.",
        });
    }
};

export default connectDB(handler);
