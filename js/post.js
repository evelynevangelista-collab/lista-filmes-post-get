
const form = document.querySelector("#form-filme");

const resposta = document.querySelector("#resposta");


const apiKey = "cv_O1CmR17ZIEME5jV3ExmPlwReVdLbcaYDIZikyezFLeG4xTUeGes2gVpwKLNulpIY";

const apiUrl = "https://api-ds.codeverse.dev.br/api/filmes";

// 3. Capturar o evento de click do form

form.addEventListener("submit", async function (event) {
  //impede o comportamento padrao do forms, recarregar ou navegar para outra pagina automaticamente.
  event.preventDefault();

  //pegar os dados do form.

  const dados =  new FormData(form);

  //organizar esse objeto e  montar

  const filme = {
      title: dados.get("title"),
      genero: dados.get("genero"),
      ano: Number(dados.get("ano")),
      diretor: dados.get("diretor"),
      nota: Number(dados.get("nota")),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando filme para a API....";

// 5 . Enviando a req para a API.

//trycatch é um bloco do js que executa alguma coisa que pode ter erros.
// caso aconteça um erro, (qq tipo) o bloco catch trata esse erro.

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    
    body: JSON.stringify(filme),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = {};
  }

  if(respostaApi.ok){
    resposta.textContent = `${filme.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
  resposta.textContent = "Erro na conexão com a API.";

}
});