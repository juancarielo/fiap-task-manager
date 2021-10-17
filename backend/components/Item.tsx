import type { NextPage } from "next";
import moment from "moment";
import { Task } from "../types/Task";

type ItemProps = {
    task: Task;
};

const Item: NextPage<ItemProps> = ({ task }) => {
    const getDateText = (finishedDate: Date | undefined, finishedPrevisionDate: Date) => {
        if (finishedDate) {
            return `Concluído em: ${moment(finishedDate).format("DD/MM/yyy")}`;
        }

        return `Previsão de conclusão em: ${moment(finishedPrevisionDate).format("DD/MM/yyy")}`;
    };

    return (
        <div className={"container-item" + (task.finishDate ? "" : " ativo")}>
            <img
                src={task.finishDate ? "/finished.svg" : "/not-finished.svg"}
                alt={task.finishDate ? "Tarefa concluída" : "Tarefa não concluída"}
            />

            <div>
                <p className={task.finishDate ? "concluido" : ""}>{task.name}</p>
                <span>{getDateText(task.finishDate, task.finishPrevisionDate)}</span>
            </div>
        </div>
    );
};

export { Item };
