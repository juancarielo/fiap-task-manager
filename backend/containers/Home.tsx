import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AcessTokenProps } from "../types/AcessTokenProps";
import { Task } from "../types/Task";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { List } from "../components/List";
import { Footer } from "../components/Footer";

const Home: NextPage<AcessTokenProps> = ({ setAcessToken }) => {
    const [tasks, setTasks] = useState<Task[]>([
        { _id: "1", userId: "ss", name: "teste", finishPrevisionDate: new Date(), finishDate: new Date() },
        {
            _id: "1",
            userId: "ss",
            name: "teste",
            finishPrevisionDate: new Date(),
            // finishDate: new Date(),
        },
    ]);

    const [periodoDe, setPeriodoDe] = useState("");
    const [periodoAte, setPeriodoAte] = useState("");
    const [status, setStatus] = useState(0);

    const sair = () => {
        localStorage.removeItem("acessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        setAcessToken("");
    };

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Header sair={sair} />

            <Filter
                periodoDe={periodoDe}
                periodoAte={periodoAte}
                status={status}
                setPeriodoDe={setPeriodoDe}
                setPeriodoAte={setPeriodoAte}
                setStatus={setStatus}
            />

            <List tasks={tasks} />

            <Footer />
        </>
    );
};

export { Home };
