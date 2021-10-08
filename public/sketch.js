// Busca o botão
const button = document.getElementById('submit');

getData();
// Fica esperando por um evento de clique no botão para
// fazer a função descrita abaixo
button.addEventListener('click', async event => {

    // Busca os dados
    const resumo = document.getElementById('resumo');
    const migration = document.getElementById('migration');
    const ldn = document.getElementById('ldn');
    const views = document.getElementById('views');
    const outros = document.getElementById('outros');

    console.log(resumo.value);

    const data = { "resumo":resumo.value, "migration":migration.value, "ldn":ldn.value, "views":views.value, "outros":outros.value };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    const response = await fetch('/api', options)
    const dataReturned = await response.json()              

    console.log(dataReturned);

});

async function getData() {
  
    const response = await fetch('/api');
    const json = await response.json();
    console.log(json); 

    // Busca os campos 
    const resumo = document.getElementById('resumo');
    const migration = document.getElementById('migration');
    const ldn = document.getElementById('ldn');
    const views = document.getElementById('views');
    const outros = document.getElementById('outros');
    
    resumo.setAttribute('style', 'white-space: pre;');
    migration.setAttribute('style', 'white-space: pre;');
    ldn.setAttribute('style', 'white-space: pre;');
    views.setAttribute('style', 'white-space: pre;');
    outros.setAttribute('style', 'white-space: pre;');

    resumo.textContent = json.resumo;
    migration.textContent = json.migration;
    ldn.textContent = json.ldn;
    views.textContent = json.views;
    outros.textContent  = json.outros;
    

   /*
  const lista = document.getElementById('lista');

  const response = await fetch('/api');
  const json = await response.json();

  for ( item of json ) {

    const elemento = document.createElement('div');
    const texto = document.createElement('p');
    const dateString = new Date(item.timestamp).toLocaleString();
    const image = document.createElement('img');
    
    texto.textContent = `Nome:${item.nome} | ${item.lat}º, ${item.lon} | ${dateString}`;
    image.src = item.image64;
    image.alt = item.nome;

   
    elemento.append(texto, image); 
    elemento.classList.add('list-group-item');
    lista.append(elemento);
  }
  console.log(json);
  */

}
