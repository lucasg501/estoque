'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import { QRCodeCanvas } from "qrcode.react";
import { FaQrcode } from "react-icons/fa";

export default function Produtos() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [produtoQRAtivo, setProdutoQRAtivo] = useState(null);

  useEffect(() => {
    listarProdutos();
    listarCategorias();
  }, []);

  function listarProdutos() {
    httpClient.get('/produtos/listar')
      .then(async r => {
        if (r.status === 200) {
          const data = await r.json();
          setListaProdutos(data);
        }
      });
  }

  function listarCategorias() {
    httpClient.get('/categorias/listar')
      .then(async r => {
        if (r.status === 200) {
          const data = await r.json();
          setListaCategorias(data);
        }
      });
  }

  function excluirProduto(idProduto) {
    if (confirm('Deseja realmente excluir esse produto?')) {
      httpClient.delete(`/produtos/excluir/${idProduto}`)
        .then(async r => {
          if (r.status === 200) {
            window.location.reload();
          }
        });
    } else {
      alert('A exclusão foi cancelada');
    }
  }

  function buscarCategoria(idCategoria) {
    const categoria = listaCategorias.find(cat => cat.idCategoria == idCategoria);
    return categoria ? categoria.nomeCategoria : '';
  }

  // Função para calcular CRC16 CCITT-FALSE (padrão Pix)
  function calcularCRC16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = ((crc << 1) ^ 0x1021);
        } else {
          crc <<= 1;
        }
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  // Gera o payload Pix com CRC correto e formato padrão
  // Chave Pix fictícia: email "teste@pix.com"
  // Nome do recebedor fictício: "Empresa Teste Ltda"
  function gerarPayloadPix(valor, chavePix = "teste@pix.com", nomeRecebedor = "Empresa Teste Ltda") {
    const valorNum = parseFloat(valor).toFixed(2);

    const payloadSemCRC =
      "000201" +
      "26480014BR.GOV.BCB.PIX01" + `${chavePix.length.toString().padStart(2, '0')}${chavePix}` +
      "52040000" + // Código MCC (sem categoria)
      "5303986" + // Moeda (986 = BRL)
      `54${valorNum.length}${valorNum.replace('.', '')}` + // Valor com tamanho variável
      "5802BR" + // País
      `59${nomeRecebedor.length}${nomeRecebedor}` + // Nome recebedor
      "6009SAO PAULO" + // Cidade
      "62070503***" + // Info adicional (pode mudar ou deixar vazio)
      "6304"; // CRC campo para ser calculado depois

    const crc = calcularCRC16(payloadSemCRC);
    return payloadSemCRC + crc;
  }

  return (
    <div>
      <h1>Produtos</h1>

      <div style={{ margin: 10 }}>
        <Link href="/produtos/criar">
          <button className="btn btn-primary">Cadastrar</button>
        </Link>
      </div>

      <div className="form-group">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor de custo</th>
              <th>Valor de venda</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Categoria</th>
              <th>Editar</th>
              <th>Excluir</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {listaProdutos.map((produto, index) => {
              const mostrarQR = produtoQRAtivo === produto.idProduto;
              const payload = gerarPayloadPix(produto.precoVenda);

              return (
                <tr key={index} style={{ position: "relative" }}>
                  <td>{produto.nomeProduto}</td>
                  <td>R${parseFloat(produto.precoCusto).toFixed(2)}</td>
                  <td>R${parseFloat(produto.precoVenda).toFixed(2)}</td>
                  <td>{produto.estoqueAtual}</td>
                  <td>{produto.unidade}</td>
                  <td>{buscarCategoria(produto.idCategoria)}</td>
                  <td>
                    <Link href={`/produtos/alterar/${produto.idProduto}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => excluirProduto(produto.idProduto)}>Excluir</button>
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() =>
                      setProdutoQRAtivo(mostrarQR ? null : produto.idProduto)
                    }>
                      <FaQrcode />
                    </button>
                    {mostrarQR && (
                      <div style={{
                        position: 'absolute',
                        backgroundColor: '#fff',
                        padding: 10,
                        border: '1px solid #ccc',
                        zIndex: 10,
                        top: '100%',
                        left: 0,
                        marginTop: 5
                      }}>
                        <QRCodeCanvas value={payload} size={150} />
                        <div style={{ fontSize: 10, marginTop: 5 }}>
                          R${parseFloat(produto.precoVenda).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
