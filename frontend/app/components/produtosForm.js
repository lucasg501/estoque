'use client'

import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ProdutosForm(props) {

    const [listaCategorias, setListaCategorias] = useState([]);

    const [produto, setProduto] = useState(props.produto ? props.produto : { idProduto: 0, nomeProduto: '', descricao: '', precoCusto: '', precoVenda: '', estoqueAtual: '', unidade: '', idCategoria: '' });

    const nomeProduto = useRef(null);
    const descricao = useRef(null);
    const precoCusto = useRef(null);
    const precoVenda = useRef(null);
    const estoqueAtual = useRef(null);
    const unidade = useRef(null);
    const idCategoria = useRef(null);

    function listarCategorias() {
        let status = 0;
        httpClient.get('/categorias/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaCategorias(r);
                }
            })
    }

    function cadastrarProduto() {
        let status = 0;
        httpClient.post('/produtos/gravar', {
            nomeProduto: nomeProduto.current.value,
            descricao: descricao.current.value,
            precoCusto: precoCusto.current.value,
            precoVenda: precoVenda.current.value,
            estoqueAtual: estoqueAtual.current.value,
            unidade: unidade.current.value,
            idCategoria: idCategoria.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Produto gravado com sucesso!');
                    window.location.href = '/produtos';
                }
            })
    }

    function alterarProduto() {
        let status = 0;
        httpClient.put('/produtos/alterar', {
            idProduto: produto.idProduto,
            nomeProduto: nomeProduto.current.value,
            descricao: descricao.current.value,
            precoCusto: precoCusto.current.value,
            precoVenda: precoVenda.current.value,
            estoqueAtual: estoqueAtual.current.value,
            unidade: unidade.current.value,
            idCategoria: idCategoria.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Produto alterado com sucesso!');
                    window.location.href = '/produtos';
                }
            })
    }

    useEffect(() => {
        listarCategorias();
    }, []);

    return (
        <div>
            <h1>{props.produto ? 'Alterar Produto' : 'Cadastrar Produto'}</h1>

            <div>
                <Link href="/produtos">
                    <button className="btn btn-secondary">Voltar</button>
                </Link>
            </div>

            <div>
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" className="form-control" ref={nomeProduto} defaultValue={produto.nomeProduto}></input>
                </div>

                <div className="form-group">
                    <label>Descrição do produto</label>
                    <input type="text" className="form-control" ref={descricao} defaultValue={produto.descricao}></input>
                </div>

                <div className="form-group">
                    <label>Preço de Custo</label>
                    <input type="number" className="form-control" ref={precoCusto} defaultValue={produto.precoCusto}></input>
                </div>

                <div className="form-group">
                    <label>Preço de Venda</label>
                    <input type="number" className="form-control" ref={precoVenda} defaultValue={produto.precoVenda}></input>
                </div>

                <div className="form-group">
                    <label>Estoque Atual</label>
                    <input type="number" className="form-control" ref={estoqueAtual} defaultValue={produto.estoqueAtual}></input>
                </div>

                <div className="form-group">
                    <label>Unidade</label>
                    <input type="text" className="form-control" ref={unidade} defaultValue={produto.unidade}></input>
                </div>

                <div className="form-group">
                    <select className="form-control" ref={idCategoria}>
                        <option value={0}>Selecione uma categoria</option>
                        {
                            listaCategorias.map(function (value, index) {
                                if (value.idCategoria == produto.idCategoria) {
                                    return <option key={index} value={value.idCategoria} selected>{value.nomeCategoria}</option>
                                } else {
                                    return <option key={index} value={value.idCategoria}>{value.nomeCategoria}</option>
                                }
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" onClick={props.produto ? alterarProduto : cadastrarProduto}>{props.produto ? 'Alterar' : 'Cadastrar'}</button>
                    <Link href="/produtos">
                        <button style={{ marginLeft: '10px' }} className="btn btn-danger">Cancelar</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}