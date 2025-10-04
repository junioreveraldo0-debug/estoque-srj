
SRJ Confecções - Protótipo v6.1

Correção da etiqueta para 100mm x 80mm (paisagem) e ajustes finais.

Como rodar:
1. Instale Node.js (LTS).
2. Extraia a pasta srj-tecidos-prototipo-v6.1.
3. No terminal dentro da pasta rode:
   npm install
   npm run dev
4. Abra http://localhost:5173
Login padrão: admin / 1234

Para testar a etiqueta:
- Cadastre um artigo (Artigos).
- Na Entrada, cadastre um rolo com nuance e metragem.
- Ao confirmar, abrirá a etiqueta em nova janela com tamanho 100mm x 80mm (paisagem) contendo o código Code128.
- Se quiser substituir o logo, troque public/srj-logo.png pelo seu arquivo (mesmo nome).
