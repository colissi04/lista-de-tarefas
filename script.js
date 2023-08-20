const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const btnAddTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() { //essa função é responsável por criar a lista
    const li = document.createElement('li');
    return li;
}

function limpaInput() { //função para limpar o input depois de criado a tarefa
    inputNovaTarefa.value = ''; //limpa o input
    inputNovaTarefa.focus(); //deixa o input em modo foco para poder digitar novamente
}

function criaBotaoApagar(li) {
    li.innerText += '  '; //da um espaço entre o texto e o botao
    const botaoApagar = document.createElement('button'); //cria o botão
    botaoApagar.innerText = 'apagar'; //colocar o texto 'apagar' no botão
    botaoApagar.setAttribute('class', 'apagar'); //coloca a class 'apagar' no botão
    botaoApagar.setAttribute('title', 'apagar esta tarefa'); //colocar title no botão
    li.appendChild(botaoApagar); //cria uma li filha para a UL
}

inputNovaTarefa.addEventListener('keypress', function (e) { //caputra o evento de tecla pressionada
    if (e.key === "Enter") { //quando a tecla for Enter então executa os códigos
        if (!inputNovaTarefa.value) return; //se o valor for vazio então return;
        criaTarefa(inputNovaTarefa.value); //insere o value na função cria tarefa
    };
})

function criaTarefa(textoInput) { //essa função cria a tarefa
    const li = criaLi(); //aqui armazenamos o return da função assima na const "li"
    li.innerText = textoInput; //insere o valor no html
    tarefas.appendChild(li); //cria o filho LI para a UL
    limpaInput(); //utiliza a função de limpar o input
    criaBotaoApagar(li); //utiliza a função de criar o botão
    salvarTarefas();
}

btnAddTarefa.addEventListener('click', function () { //captura o evento de click no botão
    if (!inputNovaTarefa.value) return; //se o valor for vazio então return;
    criaTarefa(inputNovaTarefa.value); //criando uma funçao passando o parametro do valor que inputnovatarefa receber;
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li'); //seleciona todas as li
    const listaDeTarefas = []; //array vazia para salvar as li

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '').trim();
        listaDeTarefas.push(tarefaTexto); //adiciona tarefatexto na array
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //transforma em strings e salva na variavel
    localStorage.setItem('tarefas', tarefasJSON); //salva no local storage do navegador
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas'); //pega as tarefas com o nome tarefas do local storage e armazena nessa variável
    const listaDeTarefas = JSON.parse(tarefas); //volta o formato do json

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas(); //executa a function
