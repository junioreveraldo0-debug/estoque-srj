const KEY = 'srj_tecidos_db_v6_1';

export function loadDB(){
  const raw = localStorage.getItem(KEY);
  if(!raw){
    const init = {
      usuarios: [{id:'u-admin', username:'admin', senha:'1234', role:'administrador'}],
      artigos: [],
      rolos: [],
      movimentacoes: []
    };
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(raw); } catch(e){
    const init = {
      usuarios: [{id:'u-admin', username:'admin', senha:'1234', role:'administrador'}],
      artigos: [], rolos: [], movimentacoes: []
    };
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
}

export function saveDB(db){ localStorage.setItem(KEY, JSON.stringify(db)); }
export function exportJSON(){ return JSON.stringify(loadDB(), null, 2); }
export function importJSON(str){ try{ const obj=JSON.parse(str); localStorage.setItem(KEY, JSON.stringify(obj)); return true;}catch(e){return false;} }
