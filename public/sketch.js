// Busca o botão
const button = document.getElementById('submit');


const salvar = async () => {
    console.log("Registros salvos com sucesso!")

    // Busca os dados
    const titulo = document.getElementById('titulo');
    const resumo = document.getElementById('resumo');
    const migration = document.getElementById('migration');
    const ldn = document.getElementById('ldn');
    const views = document.getElementById('views');
    const outros = document.getElementById('outros');

    const data = { "titulo":titulo.value, "resumo":resumo.value, "migration":migration.value, "ldn":ldn.value, "views":views.value, "outros":outros.value };

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

}

async function getData() {
  
    const response = await fetch('/api');
    const json = await response.json();
    console.log(json); 

    // Busca os campos 
    const titulo = document.getElementById('titulo');
    const resumo = document.getElementById('resumo');
    const migration = document.getElementById('migration');
    const ldn = document.getElementById('ldn');
    const views = document.getElementById('views');
    const outros = document.getElementById('outros');
    
    titulo.setAttribute('style', 'white-space: pre;');
    resumo.setAttribute('style', 'white-space: pre;');
    migration.setAttribute('style', 'white-space: pre;');
    ldn.setAttribute('style', 'white-space: pre;');
    views.setAttribute('style', 'white-space: pre;');
    outros.setAttribute('style', 'white-space: pre;');

    titulo.value = json.titulo;
    resumo.value = json.resumo;
    migration.textContent = json.migration;
    ldn.textContent = json.ldn;
    views.textContent = json.views;
    outros.textContent  = json.outros;
    
}

// busca os dados do banco quando inicia a pagina
getData();

// Fica esperando por um evento de clique no botão para
// fazer a função descrita abaixo
button.addEventListener('click', salvar );

setInterval(salvar, 600000);
