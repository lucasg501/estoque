'use client'
import Link from "next/link";
import { useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function usuariosForm(props) {

    const usuNome = useRef(null);
    const login = useRef(null);
    const senha = useRef(null);

    const [usuario, setUsuario] = useState(props.usuario ? props.usuario : {
        idUsu: 0, login: '', senha: '', nomeUsu: ''
    });

    function cadastrarUsuario() {
        let status = 0;
        httpClient.post('/usuarios/gravar', {
            nomeUsu: usuNome.current.value,
            login: login.current.value,
            senha: senha.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Usuário gravado com sucesso!');
                    window.location.href = '/usuarios';
                } else {
                    alert('Erro ao gravar o usuário!')
                }
            })
    }

    function alterarUsuario() {
        let status = 0;
        httpClient.put('/usuarios/alterar', {
            idUsu: usuario.idUsu,
            login: login.current.value,
            senha: senha.current.value,
            nomeUsu: usuNome.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Usuário alterado com sucesso!');
                    window.location.href = '/usuarios';
                } else {
                    alert('Erro ao alterar o usuário!')
                }
            })
    }

    return (
        <div>
            <h1>Cadastrar novo usuário</h1>

            <div>
                <Link href='/usuarios'>
                    <button className="btn btn-secondary">Voltar</button>
                </Link>
            </div>

            <div>
                <div className="form-group">
                    <label>Nome</label>
                    <input ref={usuNome} defaultValue={usuario.nomeUsu} type="text" className="form-control" placeholder="Digite o nome do usuário" />
                </div>
                <div className="form-group">
                    <label>Login</label>
                    <input ref={login} defaultValue={usuario.login} type="text" className="form-control" placeholder="Digite o login do usuário" />
                </div>
                    <label>Senha</label>
                    <input ref={senha} defaultValue={usuario.senha} type={usuario.idUsu == 0 ? "password" : "text"} className="form-control" placeholder="Digite a senha do usuário"/>
                <div style={{ marginTop: '10px' }} className="form-group">
                    <button onClick={usuario.idUsu == 0 ? cadastrarUsuario : alterarUsuario} className="btn btn-primary">Salvar</button>
                    <Link style={{ marginLeft: '10px' }} href='/usuarios'>
                        <button className="btn btn-danger">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}