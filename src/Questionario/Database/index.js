const conexaodb = require("./knexfile.js");
const knex = require("knex")(conexaodb.development);
module.exports = knex;
