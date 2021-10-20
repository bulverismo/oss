const express = require('express');
const Datastore = require('nedb');
console.log('Iniciando servidor... ',Date.now());
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    // com esta query busca todos, organiza com mais recente primeiro e limita um resultado
  database.find({}).sort({timestamp: -1}).limit(1).exec((err, data) => {
      console.log(data);
    if (err) {
      response.end();
      return;
    }
    response.json(data[0])
  })
})
app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data); 
  response.json(data);
});
