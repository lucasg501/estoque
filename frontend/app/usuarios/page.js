'use client'

import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    function listarUsuarios() {
        let status = 0;
        httpClient.get('/usuarios/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => [
                setUsuarios(r),
            ])
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    function excluirUsuario(idUsu) {
        let status = 0;
        httpClient.delete(`/usuarios/excluir/${idUsu}`)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    window.location.reload();
                } else {
                    alert('Erro ao excluir o usuário!')
                }
            })
    }

    return (
        <div>
            <h1>Usuários</h1>
            <div style={{margin: 10}}>
                <Link href="/usuarios/criar"><button className="btn btn-primary">Cadastrar</button></Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Login</th>
                            <th>Senha</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            usuarios.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idUsu}</td>
                                        <td>{value.nomeUsu}</td>
                                        <td>{value.login}</td>
                                        <td>{value.senha}</td>
                                        <td>
                                            <Link href={`/usuarios/alterar/${value.idUsu}`}>
                                                <button className="btn btn-primary">Editar</button>
                                            </Link>
                                        </td>
                                        <td><button onClick={() => excluirUsuario(value.idUsu)} className="btn btn-danger">Excluir</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}