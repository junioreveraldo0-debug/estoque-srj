import React, { useState } from 'react'
import { loadDB } from '../utils/db'

export default function Login({onLogin}){
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')
  const [remember, setRemember] = useState(false)

  function tryLogin(e){
    e.preventDefault()
    const db = loadDB()
    const user = db.usuarios.find(u=>u.username===username && u.senha===senha)
    if(user){ onLogin(user, remember) } else { setMsg('Usuário ou senha incorretos.') }
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <img src="/srj-logo.png" alt="SRJ" className="logo-large" />
        <h2>SRJ Confecções - Controle de Estoque de Tecidos</h2>
        <form onSubmit={tryLogin}>
          <label>Usuário</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
          <label>Senha</label>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
          <div style={{textAlign:'left'}}><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Lembrar usuário</div>
          <button type="submit">Entrar</button>
        </form>
        <div className="msg">{msg}</div>
        <div className="help">Conta padrão: admin / 1234</div>
      </div>
    </div>
  )
}
