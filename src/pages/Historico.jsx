import React from 'react'

export default function Historico({db}){
  return (
    <div className="card">
      <h3>Histórico de Movimentações</h3>
      <table className="simple-table">
        <thead><tr><th>Data</th><th>Tipo</th><th>Artigo</th><th>Nuance</th><th>ID Rolo</th><th>Qtd</th><th>Usuário</th><th>Obs</th></tr></thead>
        <tbody>
          {db.movimentacoes.map(m=> (
            <tr key={m.id}>
              <td>{new Date(m.data).toLocaleString()}</td>
              <td>{m.tipo}</td>
              <td>{m.artigo||''}</td>
              <td>{m.nuance||''}</td>
              <td>{m.id_rolo}</td>
              <td>{m.quantidade}</td>
              <td>{m.usuario||''}</td>
              <td>{m.observacao||m.motivo||''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
