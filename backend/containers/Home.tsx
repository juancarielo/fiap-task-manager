import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { AcessTokenProps } from '../types/AcessTokenProps';

const Home: NextPage<AcessTokenProps> = ({ setAcessToken }) => {
    const sair = () => {
        localStorage.removeItem('acessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');

        setAcessToken('');
    };

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Header sair={sair} />
        </>
    );
};

export { Home };
