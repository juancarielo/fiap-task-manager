import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Task } from "../types/Task";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { List } from "../components/List";
import { Footer } from "../components/Footer";
import { executeRequest } from "../services/api";

const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [periodoDe, setPeriodoDe] = useState("");
    const [periodoAte, setPeriodoAte] = useState("");
    const [status, setStatus] = useState(0);

    const sair = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        setAccessToken("");
    };

    const getFilteredList = async () => {
        try {
            let filtros = "?status=" + status;

            if (periodoDe) {
                filtros += "&finishPrevisionStart=" + periodoDe;
            }

            if (periodoAte) {
                filtros += "&finishPrevisionEnd=" + periodoAte;
            }

            console.log(filtros)
            const result = await executeRequest("task" + filtros, "GET");
            if (result && result.data) {
                setTasks(result.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFilteredList();
    }, [periodoDe, periodoAte, status]);

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

            {/* <Footer /> */}
        </>
    );
};

export { Home };
