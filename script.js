const button = document.querySelector('.submit');
const divResultado = document.querySelector('.resultado');
const bairro = document.querySelector('.bairro');
const rua = document.querySelector('.rua');
const cidade = document.querySelector('.cidade');
const estado = document.querySelector('.estado');

function handleClick(event) {
  event.preventDefault();

  //Aqui eu poderia ter usado métodos de string para
  //limpar traços, espaços ou pontos digitados pelo usuário
  //e deixar o catch somente por conta de erros da API

  const cep = document.querySelector('#cep').value;
  if (cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          'Algo de errado aconteceu, verifique o CEP e tente novamente',
        );
      })
      .then((cepObj) => {
        divResultado.style.display = 'block';
        bairro.innerText = 'Bairro: ' + cepObj.bairro;
        rua.innerText = 'Rua: ' + cepObj.logradouro;
        cidade.innerText = 'Cidade: ' + cepObj.localidade;
        estado.innerText = 'Estado: ' + cepObj.uf;
      })
      .catch(() => {
        divResultado.style.display = 'block';
        bairro.innerText =
          'Algo de errado aconteceu, verifique o CEP e tente novamente';
        rua.innerText = '';
        cidade.innerText = '';
        estado.innerText = '';
      });
  }
}
button.addEventListener('click', handleClick);
