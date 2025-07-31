const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltRounds = 10;


dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
}
);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});



app.get('/motoristas', async (req, res) => {
  try {
    db.query('SELECT * FROM motoristas', (err, results) => {
      if (err) {
        console.error('Erro ao buscar motoristas:', err);
        res.status(500).json({ error: 'Erro ao buscar motoristas' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    res.status(500).json({ error: 'Erro ao buscar motoristas' });
  }
});

app.get('/escolas', async (req, res) => {
  try {
    db.query('SELECT * FROM escolas', (err, results) => {
      if (err) {
        console.error('Erro ao buscar escolas:', err);
        res.status(500).json({ error: 'Erro ao buscar escolas' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Erro ao buscar escolas:', error);
    res.status(500).json({ error: 'Erro ao buscar escolas' });
  }
});

app.get('/turnos', async (req, res) => {
  try {
    db.query('SELECT * FROM turnos', (err, results) => {
      if (err) {
        console.error('Erro ao buscar turnos:', err);
        res.status(500).json({ error: 'Erro ao buscar turnos' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Erro ao buscar turnos:', error);
    res.status(500).json({ error: 'Erro ao buscar turnos' });
  }
})

app.get('/linhas', async (req, res) => {
  try {
    const { escola, turno } = req.query;
    console.log('Escola:', escola, 'Turno:', turno);
    db.query(`SELECT me.motorista_id, m.nome FROM motorista_escola as me 
      JOIN motoristas as m ON me.motorista_id = m.id  
      WHERE  escola_id = ? AND turno = ?;`, 
      [ escola, turno], (err, results) => {
      console.log('Resultados:', results);
      if (err) {
        console.error('Erro ao buscar linhas:', err);
        res.status(500).json({ error: 'Erro ao buscar linhas' });
        return;
      }
      res.json(results);
    });
  }catch (error) {
    console.error('Erro ao buscar linhas:', error);
    res.status(500).json({ error: 'Erro ao buscar linhas' });
  }
});

app.post('/cadastrar-motorista', async(req, res) => {
  const { nome, username, password, escolaManha, escolaMeiodia, escolaTarde, escolas } = req.body;
  try {
    bcrypt.genSalt( saltRounds ,  function ( err ,  salt )  { 
      bcrypt.hash(password,  salt ,  function ( err ,  hash )  { 
          db.query('INSERT INTO ') 
      }); 
    });
    db.query('INSERT INTO motoristas (nome) VALUES (?)', [nome], (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar motorista:", err);
        res.status(500).json({ error: 'Erro ao cadastrar motorista' });
        return;
      }

      
      escolas.forEach((escola) => {
        db.query('INSERT INTO motorista_escola (motorista_id, escola_id, turno) VALUES (?,?,?)', [results.insertId, escola.id, escola.turno], (err, results) => {
          if (err) {
            console.error(`Erro ao cadastrar motorista na escola ${escola.nome} no turno ${escola.turno}:`, err);
            res.status(500).json({ error: `Erro ao cadastrar motorista na escola ${escola.nome} no turno ${escola.turno}` });
            return;
          }
        });
      })
    })
  }
  catch (error) {
    console.error('Erro ao cadastrar motorista:', error);
    res.status(500).json({ error: 'Erro ao cadastrar motorista' });
  }
})

app.get('/buscar-linha', async (req, res) => {
  db.query('SELECt * FROM motorista_escola', (err, results) => {
    if (err) {
      console.error('Erro ao buscar linhas:', err);
      res.status(500).json({ error: 'Erro ao buscar linhas' });
      return;
    }
    res.json(results);
  })
})

app.post('/filter-name-school', async (req, res) => {
  const {linhaManha, linhaMeiodia, linhaTarde} = req.body;

  const schoolsIds = [
    ...linhaManha.map(item => { return item.escola_id, item.turno, console.log(item.escola_id, item.turno)}),
    ...linhaMeiodia.map(item => { return item.escola_id}),
    ...linhaTarde.map(item => { return item.escola_id})
  ]
  const placeholders = schoolsIds.map(() => '?').join(',');

  db.query(`SELECT escolas.nome, motorista_escola.turno FROM escolas JOIN motorista_escola ON escola_id = escolas.id WHERE escola_id IN (${placeholders})`, schoolsIds, (err, results) => {
    if (err) {
      console.error('Erro ao filtrar nome da escola:', err);
      res.status(500).json({ error: 'Erro ao filtrar nome da escola' });
      return;
    }
    res.json(results);
  })
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

