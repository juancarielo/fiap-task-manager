import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AcessTokenProps } from "../types/AcessTokenProps";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";

const Home: NextPage<AcessTokenProps> = ({ setAcessToken }) => {
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
        </>
    );
};

export { Home };
