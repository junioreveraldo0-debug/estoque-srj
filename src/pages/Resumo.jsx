import React, { useState, useMemo } from "react";

export default function Resumo({ db }) {
  const [view, setView] = useState("por-nuance"); // "por-nuance" | "por-artigo"

  // Evita erros se db for nulo
  const rolos = useMemo(() => Array.isArray(db?.rolos) ? db.rolos : [], [db]);

  // Agrupamento por artigo + nuance
  const grupos = useMemo(() => {
    const g = {};
    rolos.forEach(r => {
      const artigo = r?.artigo || "";
      const nuance = r?.nuance || "";
      const key = `${artigo}||${nuance}`;
      if (!g[key]) g[key] = { artigo, nuance, rolos: 0, total: 0, disponivel: 0 };
      g[key].rolos++;
      g[key].total += Number(r?.metragem_total || 0);
      g[key].disponivel += Number(r?.metragem_disponivel || 0);
    });
    return Object.values(g).sort((a, b) => a.artigo.localeCompare(b.artigo));
  }, [rolos]);

  // Agrupamento por artigo (Resumo Detalhado)
  const artigos = useMemo(() => {
    const a = {};
    rolos.forEach(r => {
      const artigo = r?.artigo || "";
      if (!a[artigo]) a[artigo] = { artigo, rolos: 0, total: 0, disponivel: 0 };
      a[artigo].rolos++;
      a[artigo].total += Number(r?.metragem_total || 0);
      a[artigo].disponivel += Number(r?.metragem_disponivel || 0);
    });
    return Object.values(a).sort((a, b) => a.artigo.localeCompare(b.artigo));
  }, [rolos]);

  return (
    <div className="card">
      <h3>Resumo de Estoque</h3>

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setView("por-nuance")}
          className={view === "por-nuance" ? "btn btn-primary" : "btn"}
          style={{ marginRight: 8 }}
        >
          Resumo por Artigo / Nuance
        </button>
        <button
          onClick={() => setView("por-artigo")}
          className={view === "por-artigo" ? "btn btn-primary" : "btn"}
        >
          Resumo Detalhado de Artigo
        </button>
      </div>

      {view === "por-nuance" ? (
        <>
          <h4>Resumo por Artigo / Nuance</h4>
          {grupos.length === 0 ? (
            <p>Nenhum dado disponível.</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Artigo</th>
                  <th>Nuance</th>
                  <th>Qtde Rolos</th>
                  <th>Metragem Total</th>
                  <th>Disponível</th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((g, i) => (
                  <tr key={i}>
                    <td>{g.artigo}</td>
                    <td>{g.nuance}</td>
                    <td style={{ textAlign: "right" }}>{g.rolos}</td>
                    <td style={{ textAlign: "right" }}>{g.total.toFixed(2)}</td>
                    <td style={{ textAlign: "right" }}>{g.disponivel.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <h4>Resumo Detalhado de Artigo</h4>
          {artigos.length === 0 ? (
            <p>Nenhum dado disponível.</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Artigo</th>
                  <th>Qtde Rolos</th>
                  <th>Metragem Total</th>
                  <th>Metade Total</th>
                  <th>Disponível</th>
                </tr>
              </thead>
              <tbody>
                {artigos.map((a, i) => (
                  <tr key={i}>
                    <td>{a.artigo}</td>
                    <td style={{ textAlign: "right" }}>{a.rolos}</td>
                    <td style={{ textAlign: "right" }}>{a.total.toFixed(2)}</td>
                    <td style={{ textAlign: "right" }}>{(a.total / 2).toFixed(2)}</td>
                    <td style={{ textAlign: "right" }}>{a.disponivel.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
