'use client'
import httpClient from "../utils/httpClient";
import Link from "next/link";
import { useRef, useState } from "react"

export default function categoriasForm(props){

    const nomeCategoria = useRef(null);

    const [categoria, setCategoria] = useState(props.categoria ? props.categoria : {idCategoria: 0, nomeCategoria: ''});

    function cadastrarCategoria() {
        let status = 0;
        httpClient.post('/categorias/gravar', {
            nomeCategoria: nomeCategoria.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Categoria gravada com sucesso!');
                    window.location.href = '/categorias';
                } else {
                    alert('Erro ao gravar a categoria!')
                }
            })
    }

    function alterarCategoria() {
        let status = 0;
        httpClient.put('/categorias/alterar', {
            idCategoria: categoria.idCategoria,
            nomeCategoria: nomeCategoria.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Categoria alterada com sucesso!');
                    window.location.href = '/categorias';
                } else {
                    alert('Erro ao alterar a categoria!')
                }
            })
    }

    return(
        <div>
            <h1>{props.categoria ? 'Alterando Categoria' : 'Cadastrar Categoria'}</h1>

            <div>
                <Link href='/categorias'>
                    <button type="button" className="btn btn-secondary">Voltar</button>
                </Link>            
            </div>

            <div>
                <label className="form-label">Nome da Categoria:</label>
                <input type="text" className="form-control" ref={nomeCategoria} defaultValue={categoria.nomeCategoria}></input>
            </div>

            <div style={{ marginTop: '10px' }}>
                <Link href='/categorias'>
                    <button type="button" className="btn btn-danger">Cancelar</button>
                </Link>
                <button style={{ marginLeft: '10px' }} type="button" className="btn btn-primary" onClick={props.categoria ? alterarCategoria : cadastrarCategoria}>{props.categoria ? 'Alterar' : 'Cadastrar'}</button>
            </div>
        </div>
    )
}