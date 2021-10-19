import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { executeRequest } from '../services/api'
import { AccessTokenProps } from '../types/AccessTokenProps'

const Login: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [msgErro, setMsgErro] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('')

    const [isLoading, setLoading] = useState(false)

    const [isRegister, setRegister] = useState(false)

    const doLogin = async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault()

            if (!login || !password) {
                setMsgErro('Parâmetros de entrada inválidos')
                setLoading(false)
                return
            }

            const body = {
                login,
                password,
            }

            const result = await executeRequest('login', 'POST', body)

            setMsgErro('')

            if (result && result.data) {
                console.log(result)

                localStorage.setItem('accessToken', result.data.token)
                localStorage.setItem('userName', result.data.name)
                localStorage.setItem('userEmail', result.data.email)

                setAccessToken(result.data.token)
            } else {
                setMsgErro('Não foi possível realizar o login, tente novamente!')
            }
        } catch (e: any) {
            // console.log(e);
            setMsgErro('Ocorreu um erro ao processar o login, tente novamente!')
        }

        setLoading(false)
    }

    const doRegister = async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault()

            if (!login || !password) {
                setMsgErro('Parâmetros de entrada inválidos')
                setLoading(false)
                return
            }

            if (password !== passwordConfirm) {
                setMsgErro('As senhas não conferem, por favor tente novamente')
                setLoading(false)
                return
            }

            const body = {
                name,
                email: login,
                password,
            }

            const result = await executeRequest('user', 'POST', body)

            setMsgErro('')

            if (result && result.data) {
                console.log(result)

                setMsgSuccess('Registro efetuado com sucesso, agora faça login.')
                setRegister(false)

                setName('')
                setLogin('')
                setPassword('')
                setPasswordConfirm('')
            } else {
                setMsgErro('Não foi possível realizar o register, tente novamente!')
            }
        } catch (e: any) {
            // console.log(e);
            setMsgErro('Ocorreu um erro ao processar o register, tente novamente!')
        }

        setLoading(false)
    }

    const handleRegister = (isRegister: boolean) => {
        if (isRegister) {
            setRegister(false)
        } else {
            setRegister(true)
        }

        setMsgSuccess('')
        setMsgErro('')
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container-login">
                <img src="/logo.svg" alt="Logo Fiap" className="logo" />

                <form>
                    {msgErro && <p>{msgErro}</p>}

                    {msgSuccess && <p className="success">{msgSuccess}</p>}

                    {isRegister && (
                        <div className="input">
                            <img src="/mail.svg" alt="Fiap" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                    )}

                    <div className="input">
                        <img src="/mail.svg" alt="Fiap" />
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Login"
                        />
                    </div>

                    <div className="input">
                        <img src="/lock.svg" alt="Fiap" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                    </div>

                    {!isRegister ? (
                        <>
                            <button
                                className={isLoading ? 'disabled' : ''}
                                type="button"
                                onClick={doLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Carregando...' : 'Login'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="input">
                                <img src="/lock.svg" alt="Fiap" />
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="Confirme sua senha"
                                />
                            </div>

                            <button
                                className={isLoading ? 'disabled' : ''}
                                type="button"
                                onClick={doRegister}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registrando...' : 'Register'}
                            </button>
                        </>
                    )}

                    <p className="pt-2">or</p>

                    <p>
                        <a href="#" onClick={() => handleRegister(isRegister)}>
                            {isRegister ? 'Login' : 'Register'}
                        </a>
                    </p>
                </form>
            </div>
        </>
    )
}

export { Login }
