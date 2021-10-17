import type { NextPage } from "next";
import { useState } from "react";
import { Task } from "../types/Task";
import { Item } from "./Item";

type ListProps = {
    tasks: Task[];
};

const List: NextPage<ListProps> = ({ tasks }) => {
    return (
        <>
            <div className={"container-listagem" + (tasks && tasks.length === 0 ? " vazia" : "")}>
                {tasks && tasks.length > 0 ? (
                    tasks.map((t) => <Item task={t} key={t._id} />)
                ) : (
                    <>
                        <img src="/empty-list.svg" alt="Nenhuma tarefa encontrada" />
                        <p>Você ainda não possui tarefas cadastradas!</p>
                    </>
                )}
            </div>
        </>
    );
};

export { List };
