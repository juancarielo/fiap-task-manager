import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Login } from "../containers/Login";
import { Home } from "../containers/Home";

const Index: NextPage = () => {
    const [acessToken, setAcessToken] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("acessToken");

            if (token) {
                setAcessToken(token);
            }
        }
    });

    return !acessToken ? <Login setAcessToken={setAcessToken} /> : <Home setAcessToken={setAcessToken} />;
};

export default Index;
