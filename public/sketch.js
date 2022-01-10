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
    const corpo_index = document.getElementById('corpo-index');
    const container_notas = document.getElementById('container-notas');

    let i=0

    for ( const nota of json.notas ) {

        conteudo_notas = `
            <div class="row">
                <div class="col">

                    <div id="corpo-nota" class="card">
                        <div id="titulo-nota" class="card-header">
                            ${nota.titulo}
                        </div>

                        <div id="corpo-nota-${i}" class="card-body">
                        </div> 

                        <div class="card-footer">
                            <b>Resumo:</b>
                            <p id="resumo-nota">
                                ${nota.resumo}
                            </p>
                        </div>
                </div>
            </div>
            <br>
            <br>
        `
        container_notas.appendChild(createElementFromHTML(conteudo_notas));


        for ( const cartao of nota.cartoes ) {
            console.log(cartao)

            const corpo_nota_atual = document.getElementById(`corpo-nota-${i}`);

            conteudo_corpo_atual = `
                <div class="row">
                
                    <div class="col-sm-2 text-center">
                        <b>${cartao.titulo}</b>
                    </div>

                    <div class="col-sm-10" style="padding-bottom:10px;">
                        <p>${cartao.resumo}</p>
                    </div>

                </div>
            `
            corpo_nota_atual.appendChild(createElementFromHTML(conteudo_corpo_atual));
        }

        i = i + 1

        conteudo_index = `
            <div class="row">
                <div class="col text-center">
                    <a href="/nota.html?nota=${nota.titulo}">${nota.titulo}</a>
                </div>
            </div>
        `
        corpo_index.appendChild(createElementFromHTML(conteudo_index));
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
