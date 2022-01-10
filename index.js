const express = require('express');
const Datastore = require('nedb');
console.log('Iniciando servidor... ',Date.now());
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Prototipos dos objetos

function Cartao(titulo, resumo) {
      this.titulo = titulo;
      this.resumo = resumo;
}

function Nota(titulo, resumo) {
    this.titulo = titulo;
    this.cartoes = [];
    this.resumo = resumo;
    this.insere_cartao = function(cartao) {
        this.cartoes.push(cartao);
    };
}

function Anotacao(titulo, resumo) {
    this.titulo = titulo;
    this.notas = [];
    this.resumo = resumo;
    this.insere_nota = function(nota) {
        this.notas.push(nota);
    };
}

const cartao1   = new Cartao("Linus","Grande sistema operacional");
const cartao2   = new Cartao("Mac OS","Sistema operacional da maçã");
const cartao3   = new Cartao("Windows","Sistema operacional");
const nota1     = new Nota("Linukis", "A primeira pagina armazenada");
const nota2     = new Nota("MacOs", "A segunda pagina");
const nota3     = new Nota("Windows", "A terceira pagina");
const anotacao  = new Anotacao("Estudo dos so's","um estudo abrangendo todos so's");


nota1.insere_cartao(cartao1);

nota2.insere_cartao(cartao2);
nota2.insere_cartao(cartao1);
nota2.insere_cartao(cartao1);

nota3.insere_cartao(cartao3);
nota3.insere_cartao(cartao3);
nota3.insere_cartao(cartao3);
nota3.insere_cartao(cartao3);
nota3.insere_cartao(cartao3);

anotacao.insere_nota(nota1); 
anotacao.insere_nota(nota2); 
anotacao.insere_nota(nota3); 

const myArray = JSON.stringify(anotacao);
console.log(myArray)

console.log(anotacao.titulo);
for ( const obj of anotacao.notas ) {
    console.log(obj.titulo)
}
console.log(anotacao.resumo)

const database = new Datastore('database.db')
database.loadDatabase()
save_data()

function save_data(){ 
    const data = anotacao;
    const timestamp = Date.now();

    data.timestamp = timestamp;
    database.insert(data);
}

app.post('/api', (request, response) => {
    console.log(request.path);
    save_data()
    response.json(data);
});

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

