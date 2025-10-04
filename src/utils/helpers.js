export function gerarSequencial(db, artigo, nuance){ const list = db.rolos.filter(r=>r.artigo===artigo && (r.nuance||'')===nuance); const next = list.length + 1; return String(next).padStart(4,'0'); }
export function nowISO(){ return new Date().toISOString(); }
