require("dotenv").config();
const express = require("express");
const compression = require("compression");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get("/finalizar-compra", (req, res) => {
    return app.render(req, res, "/checkout");
  });

  server.get("/carrinho", (req, res) => {
    return app.render(req, res, "/cart");
  });

  server.get("/lista-de-presentes/:id", (req, res) => {
    return app.render(req, res, "/products", { id: req.params.id });
  });

  server.get("/lista-de-presentes", (req, res) => {
    return app.render(req, res, "/products");
  });

  server.get("/confirmacao", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/madrinhas-e-padrinhos", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/nossa-galeria", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/nossa-historia", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
