'use client'

import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);

    function listarCategorias() {
        let status = 0;
        httpClient.get('/categorias/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setCategorias(r);
                } else {
                    alert('Erro ao carregar as categorias!');
                }
            });
    }

    function excluirCategoria(idCategoria) {
        const confirmar = confirm("Deseja realmente excluir essa categoria?");
        if (confirmar) {
            let status = 0;
            httpClient.delete(`/categorias/excluir/${idCategoria}`)
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        window.location.reload();
                    } else {
                        alert('Erro ao excluir a categoria!');
                    }
                });
        } else {
            console.log("Exclusão cancelada pelo usuário.");
        }
    }


    useEffect(() => {
        listarCategorias();
    }, []);

    return (
        <div style={{ width: '100vw', padding: '20px' }}>
            <h1>Categorias</h1>

            <div>
                <Link href='/categorias/criar'>
                    <button style={{ margin: '10px' }} className="btn btn-primary">Cadastrar</button>
                </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="table table-striped" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.idCategoria}</td>
                                    <td>{value.nomeCategoria}</td>
                                    <td>
                                        <Link href={`/categorias/alterar/${value.idCategoria}`}>
                                            <button className="btn btn-primary">Editar</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => excluirCategoria(value.idCategoria)}>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
