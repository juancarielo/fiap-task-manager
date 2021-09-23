import { NextApiRequest, NextApiResponse } from "next";
import { DefaultResponseMessage } from "../../types/DefaultResponseMessage";
import { User } from "../../types/User";



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponseMessage>
) {
  try {
    if (req.method !== "POST") {
      res.status(400).json({ error: "Método solicitado não existe." });
      return;
    }

    if(req.body){
        const user = req.body as User;

        if(req.body){
            const user = req.body as User;
            if(user.name && user.name.length > 2
                && user.email && user.email.includes('@') && user.email.includes('.') 
                && user.email.length > 5
                && user.password && user.password.length > 3){
                res.status(200).json({msg: 'Usuario criado'});
            }
        }        
    }
    
    res.status(400).json({error: 'Parametros de entrada invalidos'});

  } catch (error) {
    console.log("Ocorreu um erro ao criar o usuário?");
    res.status(500).json({
      error: "Ocorreu um erro ao criar o usuário, tente novamente.",
    });
  }
  
}
