const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')

async function qp(sql) {
  const conn = mysql.createConnection(config);

 const queryPromise = new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }) 

  const queryResults = await queryPromise;

  conn.end();
  return queryResults;
}

const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
qp(sqlTable)

const sql = `INSERT INTO people(name) values('Estacio')`
qp(sql)

app.get('/', async(req, res) => {

  const select = `SELECT * FROM people`
  const all = await qp(select)
  const html = `<h1>Full Cycle</h1>\n
<ul>
  ${all.map(n => `<li>${n.name}</li>`).join('')}
</ul>`

  res.send(html)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})