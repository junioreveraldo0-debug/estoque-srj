import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Entrada from './pages/Entrada'
import Saida from './pages/Saida'
import Historico from './pages/Historico'
import Resumo from './pages/Resumo'
import Artigos from './pages/Artigos'
import Usuarios from './pages/Usuarios'
import { loadDB, saveDB } from './utils/db'

export default function App(){
  const [user, setUser] = useState(null)
  const [db, setDb] = useState(loadDB())
  const [tab, setTab] = useState('entrada')

  useEffect(()=>{ saveDB(db); }, [db])

  function handleLogin(u, remember){ setUser(u); if(remember) localStorage.setItem('srj_remember', u.username) }
  useEffect(()=>{ const rem = localStorage.getItem('srj_remember'); if(rem && !user){ const d = loadDB(); const u = d.usuarios.find(x=>x.username===rem); if(u) setUser(u) } },[])
  function logout(){ setUser(null); localStorage.removeItem('srj_remember') }

  if(!user) return <Login onLogin={handleLogin} />

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <img src="/srj-logo.png" alt="SRJ" className="logo" />
          <h1>SRJ Confecções - Controle de Estoque</h1>
        </div>
        <div className="user-area">
          <span>{user.username} ({user.role})</span>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      <Navbar tab={tab} setTab={setTab} role={user.role} />

      <main className="main">
        {tab==='entrada' && <Entrada db={db} setDb={setDb} user={user} />}
        {tab==='saida' && <Saida db={db} setDb={setDb} user={user} />}
        {tab==='historico' && <Historico db={db} setDb={setDb} />}
        {tab==='resumo' && <Resumo db={db} setDb={setDb} />}
        {tab==='artigos' && <Artigos db={db} setDb={setDb} />}
        {tab==='usuarios' && user.role==='administrador' && <Usuarios db={db} setDb={setDb} />}
      </main>

      <footer className="footer">SRJ Confecções • Protótipo v6.1</footer>
    </div>
  )
}
