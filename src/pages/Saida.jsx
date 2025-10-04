import React, { useState, useEffect, useRef } from 'react'
import { nowISO } from '../utils/helpers'

export default function Saida({db, setDb, user}){
  const [code, setCode] = useState('')
  const [rol, setRol] = useState(null)
  const [qty, setQty] = useState('')
  const [refCorte, setRefCorte] = useState('')
  const [obs, setObs] = useState('')
  const inputRef = useRef(null)

  useEffect(()=>{ if(inputRef.current) inputRef.current.focus(); },[])

  function localizar(){ const r = db.rolos.find(x=>x.id===code); if(r) setRol(r); else alert('Rolo não encontrado') }

  function registrar(e){
    e.preventDefault()
    if(!rol) return alert('Localize o rolo pelo código.')
    const q = parseFloat(qty); if(isNaN(q)||q<=0) return alert('Quantidade inválida')
    if(q>rol.metragem_disponivel) return alert('Quantidade maior que disponível')
    const rolos = db.rolos.map(r=> r.id===rol.id ? {...r, metragem_disponivel: r.metragem_disponivel - q} : r)
    const mov = { id:'MOV-'+Math.random().toString(36).slice(2,9).toUpperCase(), id_rolo:rol.id, tipo:'saida', quantidade:q, usuario:user.username, motivo:obs, referencia_saida:refCorte, artigo:rol.artigo, nuance:rol.nuance, data: nowISO() }
    const ndb = {...db, rolos, movimentacoes:[mov, ...db.movimentacoes]}
    setDb(ndb); alert('Saída registrada.'); setRol(null); setCode(''); setQty(''); setObs(''); setRefCorte(''); if(inputRef.current) inputRef.current.focus();
  }

  return (
    <div className="card">
      <h3>Saída de Tecido</h3>
      <div>
        <input ref={inputRef} placeholder="Leia ou cole o código de barras do rolo" value={code} onChange={e=>setCode(e.target.value)} />
        <button onClick={localizar}>Localizar</button>
      </div>
      {rol && (
        <div style={{marginTop:10,padding:8,border:'1px solid #eee'}}>
          <div><strong>{rol.artigo}</strong> - Nuance: {rol.nuance} - Disponível: {rol.metragem_disponivel} m</div>
          <form onSubmit={registrar}>
            <input placeholder="Quantidade (m)" value={qty} onChange={e=>setQty(e.target.value)} />
            <input placeholder="Referência do corte / pedido" value={refCorte} onChange={e=>setRefCorte(e.target.value)} />
            <textarea placeholder="Observação / Motivo da saída" value={obs} onChange={e=>setObs(e.target.value)} />
            <button type="submit">Registrar Saída</button>
          </form>
        </div>
      )}
    </div>
  )
}
