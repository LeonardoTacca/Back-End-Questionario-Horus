const db = require("../Database/index");

module.exports = {
  //==================API PARA CADASTRAR AS RESPOSTAS DOS ALUNOS=====================
  async cadastrar(req, res) {
    await db
      .insert(req.body)
      .into("resposta")
      .then(() =>
        res.status(201).send({
          status: "Cadastrado com sucesso",
        })
      )
      .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
  },
  //==================== API PARA DELETAR AS RESPOSTAS DO ALUNO========================
  async deletar(req, res) {
    await db("resposta")
      .where({ idresposta: req.params.idresposta })
      .del()
      .then(() => res.status(200).send({ Status: "OK" }))
      .catch(() => res.status(400).send({ status: "ERRO" }));
  },

  // ================= API PARA EDITAR OS DADOS DA RESPOSTA =================
  async editar(req, res) {
    await db("resposta")
      .where({ idresposta: req.params.idresposta })
      .update(req.body)
      .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
      .catch(() => res.status(400).send({ status: "ERRO" }));
  },
  async ListarTudoRespostas(req, res) {
    await db
      .select()
      .table("resposta")
      .orderBy("idresposta", "desc")
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((erro) => res.status(400).send({ Status: "Erro" }));
  },
};
