const db = require("../Database/index");
const Jwt = require("jsonwebtoken");
const authConfig = require("../Auth/config.json");

function generateToken(params = {}) {
  return Jwt.sign(params, authConfig.secret, {
    expiresIn: 18000,
  });
}
module.exports = {
  //=================================CADASTRAR UM  USUARIO===================================================
  async cadastrarUsuario(req, res) {
    await db
      .insert(req.body)
      .into("usuario")
      .then(() =>
        res.status(201).send({
          status: "Cadastrado com sucesso",
        })
      )
      .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
  },
  //====================================DELETAR UM USUARIO=====================================================
  async deletar(req, res) {
    await db("usuario")
      .where({ idusuario: req.params.id })
      .del()
      .then(() => res.status(200).send({ Status: "OK" }))
      .catch(() => res.status(400).send({ status: "ERRO" }));
  },

  // ================= API PARA EDITAR OS DADOS DO USUÁRIO =================
  async Editar(req, res) {
    await db("usuario")
      .where({ idusuario: req.params.idusuario })
      .update(req.body)
      .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
      .catch(() => res.status(400).send({ status: "ERRO" }));
  },

  // ================= API PARA FAZER O LOGIN DO USUÁRIO NO APP =================
  async LogarUsuario(req, res) {
    console.log(req.body);
    const { email, senha } = req.body;
    if (email == null || senha == null)
      res
        .status(400)
        .send({ validou: "Erro, o campo email ou senha estão nulo" });
    else {
      const result = await db.select().table("usuario").where({
        email: email,
        senha: senha,
      });

      if (result.length == 0) res.status(400).send({ validou: false });
      else
        res.status(200).send({
          validou: "Usuario Logado com sucesso",
          token: generateToken({ idusuario: result.idusuario }),
          result,
        });
    }
  },
};
