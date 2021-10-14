import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../middlewares/connectDB";
import jwtValidator from "../../middlewares/jwtValidator";
import { UserModel } from "../../models/UserModel";
import { TaskModel } from "../../models/TaskModel";
import { Task } from "../../types/Task";
import { DefaultResponse } from "../../types/DefaultResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
    try {
        if (req.method === "POST") {
            return await saveTask(req, res);
        } else if (req.method === "GET") {
            return;
        } else if (req.method === "PUT") {
            return;
        } else if (req.method === "DELETE") {
            return;
        }

        res.status(400).json({ error: "Método solicitado não existe." });
    } catch (error) {
        console.log("Ocorreu um erro ao gerenciar tarefas.");
        res.status(500).json({
            error: "Ocorreu um erro ao gerenciar tarefas, tente novamente.",
        });
    }
};

const saveTask = async(req:NextApiRequest, res:NextApiResponse<DefaultResponse>) =>{
    if(req.body){
        const userId = req.body.userId;

        console.log(userId)

        if(!userId){
            return res.status(400).json({ error: 'Usuário não informado.'});
        }

        const userFound = await UserModel.findById(userId);
        if(!userFound){
            return res.status(400).json({ error: 'Usuário não encontrado.'});
        }

        const task = req.body as Task;

        if(!task.name || task.name.length < 2){
            return res.status(400).json({ error: 'Nome da tarefa inválida.'});
        }

        if(!task.finishPrevisionDate || new Date(task.finishPrevisionDate).getDate() < new Date().getDate()){
            return res.status(400).json({ error: 'Data de previsãi inválida ou menor que hoje.'});
        }

        const final = {
            ...task,
            userId,
            finishDate : undefined
        } as Task;

        await TaskModel.create(final);

        return res.status(200).json({ msg: 'Tarefa criada com sucesso!'});
    }

    return res.status(400).json({ error: 'Parâmetros de entrada inválidos.'});
}

export default connectDB(jwtValidator(handler));
