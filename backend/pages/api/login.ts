import { NextApiRequest, NextApiResponse } from "next";

// import {Login, DefaultResponseMessage} from '../../types';
// import type {NextApiRequest, NextApiResponse} from 'next';

import { Login } from "../../types/Login";
import { DefaultResponseMessage } from "../../types/DefaultResponseMessage";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponseMessage>
) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ error: "erro metodo nao existe." });
    }

    const body = req.body as Login;

    if(body.login && body.password 
        && body.login === 'admin@admin.com'
        && body.password === 'Admin@123'){
        res.status(200).json({msg : 'Login efetuado com sucesso'});
        return;
    }

    res.status(400).json({ error: "Usuário ou senha inválidos." });
  } catch (error) {
    console.log("Ocorreu um erro ao autenticar o usuário?");
    res.status(500).json({
      error: "Ocorreu um erro ao autenticar o usuário, tente novamente.",
    });
  }
  
}
