import React, { useState } from 'react'
import { gerarSequencial, nowISO } from '../utils/helpers'

export default function Entrada({db, setDb, user}){
  const [form, setForm] = useState({artigo:'', cor:'', nuance:'', metragem:''})

  function cadastrar(e){
    e.preventDefault()
    if(!form.artigo) return alert('Selecione um artigo.')
    const seq = gerarSequencial(db, form.artigo, form.nuance||'')
    const codigo = `SRJ-${form.artigo.replace(/\s+/g,'').toUpperCase()}-${(form.nuance||'00')}-${seq}`
    const novo = {
      id: codigo,
      artigo: form.artigo,
      cor: form.cor,
      nuance: form.nuance || '',
      metragem_total: parseFloat(form.metragem||0),
      metragem_disponivel: parseFloat(form.metragem||0),
      data_entrada: nowISO(),
      usuario: user.username
    }
    const mov = { id:'MOV-'+Math.random().toString(36).slice(2,9).toUpperCase(), id_rolo:codigo, tipo:'entrada', quantidade:novo.metragem_total, usuario:user.username, artigo:form.artigo, nuance:form.nuance||'', data: nowISO(), observacao:'' }
    const ndb = {...db, rolos: [novo, ...db.rolos], movimentacoes: [mov, ...db.movimentacoes]}
    setDb(ndb)
    const w = window.open('','_blank','width=900,height=700')
    const html = `<html><head><title>Etiqueta ${codigo}</title><style>@media print{@page{size:100mm 80mm; margin:0}}body{font-family:Arial;margin:0;padding:6px;color:#000}.etq{width:100mm;height:80mm;box-sizing:border-box;padding:8px}.brand{display:flex;align-items:center;gap:10px}.brand img{max-height:38px}.barcode{margin-top:8px;text-align:center}.codetext{font-weight:700;margin-top:6px}</style></head><body><div class="etq"><div style="text-align:center"><div class="brand"><img src="/srj-logo.png" alt="SRJ" /><div style="font-size:16px;font-weight:700">SRJ Confecções</div></div></div><div style="margin-top:8px;font-size:14px"><div>ARTIGO: ${novo.artigo}</div><div>COR: ${novo.cor}</div><div>NUANCE: ${novo.nuance}</div><div>METRAGEM: ${novo.metragem_total} m</div><div class="codetext">CÓDIGO: ${codigo}</div></div><div class="barcode"><img src="https://barcode.tec-it.com/barcode.ashx?data=${codigo}&code=Code128&translate-esc=true&dpi=300" style="width:80mm;height:35mm" alt="barcode" /></div></div><script>setTimeout(()=>{window.print();},600)</script></body></html>`
    w.document.write(html); w.document.close()
    setForm({artigo:'', cor:'', nuance:'', metragem:''})
    alert('Entrada registrada e etiqueta enviada para impressão.')
  }

  return (
    <div className="card">
      <h3>Entrada de Tecido</h3>
      <form onSubmit={cadastrar}>
        <label>Artigo</label>
        <select value={form.artigo} onChange={e=>setForm({...form, artigo:e.target.value})}>
          <option value="">-- selecione --</option>
          {db.artigos.map(a=>(<option key={a.id} value={a.nome}>{a.nome}</option>))}
        </select>
        <button type="button" onClick={()=>{ const nome=prompt('Nome do novo artigo:'); if(nome){ const id='A-'+Math.random().toString(36).slice(2,8).toUpperCase(); setDb({...db, artigos:[...db.artigos,{id,nome,largura:'',composicao:'',observacoes:''}]}); alert('Artigo criado. Selecione-o na lista.')}}}>+ Novo Artigo</button>
        <input placeholder="Cor" value={form.cor} onChange={e=>setForm({...form, cor:e.target.value})} />
        <input placeholder="Nuance (ex: 01)" value={form.nuance} onChange={e=>setForm({...form, nuance:e.target.value})} />
        <input placeholder="Metragem (m)" value={form.metragem} onChange={e=>setForm({...form, metragem:e.target.value})} />
        <button type="submit">Confirmar Entrada (gera e imprime etiqueta)</button>
      </form>
      <div style={{marginTop:10, fontSize:12, color:'#666'}}>Após a entrada, a etiqueta abrirá em nova janela pronta para impressão.</div>
    </div>
  )
}
