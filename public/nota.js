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

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild; 
}

async function getData() {
  
    const response = await fetch('/api');
    const json = await response.json();
    console.log(json); 

    // Busca os campos 
    const titulo = document.getElementById('titulo');
    const resumo = document.getElementById('resumo');
    const corpo = document.getElementById('corpo');

    for ( const nota of json.notas ) {
   
     conteudo = `
         <div class="row">
            <div class="col text-center">
                <a href="/nota.html?nota=${nota.titulo}">${nota.titulo}</a>
            </div>
         </div>
     `
     corpo.appendChild(createElementFromHTML(conteudo));
    }

    titulo.textContent = json.titulo;
    resumo.textContent = json.resumo;
    
}

// busca os dados do banco quando inicia a pagina
getData();

// Fica esperando por um evento de clique no botão para
// fazer a função descrita abaixo
button.addEventListener('click', salvar );

//setInterval(salvar, 600000);
