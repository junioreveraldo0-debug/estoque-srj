import React, { useState } from 'react'

export default function Artigos({db, setDb}){
  const [form, setForm] = useState({nome:'', largura:'', composicao:'', observacoes:''})
  const [editId, setEditId] = useState(null)

  function salvar(e){
    e.preventDefault()
    if(!form.nome) return alert('Nome do artigo é obrigatório.')
    if(editId){
      const artigos = db.artigos.map(a=> a.id===editId ? {...a, ...form} : a)
      setDb({...db, artigos}); setEditId(null); setForm({nome:'', largura:'', composicao:'', observacoes:''}); return;
    }
    const id = 'A-'+Math.random().toString(36).slice(2,8).toUpperCase()
    const novo = { id, ...form }
    setDb({...db, artigos:[...db.artigos, novo]})
    setForm({nome:'', largura:'', composicao:'', observacoes:''})
  }

  function editar(a){ setEditId(a.id); setForm({nome:a.nome, largura:a.largura, composicao:a.composicao, observacoes:a.observacoes}) }
  function excluir(a){ if(!confirm('Excluir artigo?')) return; setDb({...db, artigos: db.artigos.filter(x=>x.id!==a.id)}) }

  return (
    <div className="card">
      <h3>Artigos de Tecido</h3>
      <form onSubmit={salvar}>
        <input placeholder="Nome do artigo (ex: OVERBLACK)" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} />
        <input placeholder="Largura (ex: 1.50m)" value={form.largura} onChange={e=>setForm({...form, largura:e.target.value})} />
        <input placeholder="Composição" value={form.composicao} onChange={e=>setForm({...form, composicao:e.target.value})} />
        <input placeholder="Observações" value={form.observacoes} onChange={e=>setForm({...form, observacoes:e.target.value})} />
        <button type="submit">{editId?'Salvar':'Adicionar Artigo'}</button>
      </form>

      <table className="simple-table" style={{marginTop:10}}>
        <thead><tr><th>Nome</th><th>Largura</th><th>Composição</th><th>Ações</th></tr></thead>
        <tbody>
          {db.artigos.map(a=> (<tr key={a.id}><td>{a.nome}</td><td>{a.largura}</td><td>{a.composicao}</td><td><button onClick={()=>editar(a)}>Editar</button> <button onClick={()=>excluir(a)}>Excluir</button></td></tr>))}
        </tbody>
      </table>
    </div>
  )
}
