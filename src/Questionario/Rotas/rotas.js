const express = require("express");
const rotas = express.Router();
const usuario = require("../Controllers/ControllerUsuario");
const respostas = require("../Controllers/ControllerRespostas");
const authMiddleware = require("../Auth/auth");

//========================================ROTAS PARA USUARIO ================================================
rotas.post("/Usuario/LogarUsuario", usuario.LogarUsuario);
rotas.post("/Usuario/Cadastrar/", usuario.cadastrarUsuario);
rotas.delete("/Usuario/ExcluirUsuario/:id", authMiddleware, usuario.deletar);
rotas.put("/Usuario/EditarUsuario/:id", authMiddleware, usuario.Editar);

//========================================ROTAS PARA RESPOSTA QUESTIONARIO ===================================

rotas.post("/Resposta/CadastrarResposta", respostas.cadastrar);
rotas.delete(
  "/Resposta/ExcluirResposta/:idResposta",
  authMiddleware,
  respostas.deletar
);
rotas.put(
  "/Resposta/EditarResposta/:idResposta",
  authMiddleware,
  respostas.editar
);
rotas.get(
  "/Resposta/ListarRespostas",
  authMiddleware,
  respostas.ListarTudoRespostas
);

module.exports = rotas;
