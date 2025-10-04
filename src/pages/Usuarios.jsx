import React, { useState } from 'react'

export default function Usuarios({db, setDb}){
  const [form, setForm] = useState({username:'', senha:'', role:'operador'})
  const [editId, setEditId] = useState(null)

  function adicionar(e){
    e.preventDefault()
    if(!form.username||!form.senha){ alert('Preencha usuário e senha'); return; }
    if(editId){
      const usuarios = db.usuarios.map(u=> u.id===editId ? {...u, username: form.username, senha: form.senha, role: form.role} : u)
      setDb({...db, usuarios}); setEditId(null); setForm({username:'', senha:'', role:'operador'}); return;
    }
    const id = 'u-' + Math.random().toString(36).slice(2,9).toUpperCase()
    const novo = { id, username: form.username, senha: form.senha, role: form.role }
    setDb({...db, usuarios:[...db.usuarios, novo]})
    setForm({username:'', senha:'', role:'operador'})
  }

  function editar(u){
    setEditId(u.id); setForm({username:u.username, senha:u.senha, role:u.role})
  }
  function excluir(u){
    if(!confirm('Excluir usuário?')) return;
    const usuarios = db.usuarios.filter(x=>x.id!==u.id); setDb({...db, usuarios})
  }

  return (
    <div className="card">
      <h3>Gerenciar Usuários</h3>
      <form onSubmit={adicionar}>
        <input placeholder="Usuário" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input placeholder="Senha" value={form.senha} onChange={e=>setForm({...form, senha:e.target.value})} />
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="administrador">Administrador</option>
          <option value="operador">Operador</option>
        </select>
        <button type="submit">{editId?'Salvar':'Adicionar Usuário'}</button>
      </form>
      <div style={{marginTop:10}}>
        <table className="simple-table"><thead><tr><th>Usuário</th><th>Função</th><th>Ações</th></tr></thead><tbody>
          {db.usuarios.map(u=> (<tr key={u.id}><td>{u.username}</td><td>{u.role}</td><td><button onClick={()=>editar(u)}>Editar</button> <button onClick={()=>excluir(u)}>Excluir</button></td></tr>))}
        </tbody></table>
      </div>
    </div>
  )
}
