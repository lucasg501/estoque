'use client'
import { use, useEffect, useState } from "react"
import UsuarioForm from "@/app/components/usuariosForm"
import httpClient from "@/app/utils/httpClient";

export default function alterarUsuario({params}){

    const {idUsu} = use(params);

    const [usuario, setUsuario] = useState(null);

    function carregarUsuario(){
        let status = 0;
        httpClient.get(`/usuarios/obter/${idUsu}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setUsuario(r);
            }else{
                alert('Erro ao carregar o usuário!')
            }
        })
    }

    useEffect(()=>{
        carregarUsuario();
    },[])

    return(
        <div>
            {usuario != null ? <UsuarioForm usuario={usuario}></UsuarioForm> : <div>Carregando...</div>}
        </div>
    )
}