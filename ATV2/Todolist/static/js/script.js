// ==========================================
// 1. ARRAY DE OBJETOS (O "Banco de Dados" do Front-End)
// ==========================================
let tarefas = [];

// ==========================================
// 2. SELEÇÃO DE ELEMENTOS DO DOM
// ==========================================
const formTarefa = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const mensagemVazia = document.getElementById('mensagem-vazia');

// Contadores
const countPendentes = document.getElementById('count-pendentes');
const countConcluidas = document.getElementById('count-concluidas');

// Filtros
const filtroCategoria = document.getElementById('filtro-categoria');
const ordenarPor = document.getElementById('ordenar-por');

// ==========================================
// 3. EVENTOS (Adicionar, Filtrar, Dark Mode)
// ==========================================

// Evento: Adicionar nova tarefa
formTarefa.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Captura os valores dos inputs
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const prioridade = document.getElementById('prioridade').value;
    const data = document.getElementById('data').value;

    // Cria o Objeto da Tarefa
    const novaTarefa = {
        id: Date.now(), // Gera um ID único baseado na hora
        nome: nome,
        categoria: categoria,
        prioridade: prioridade,
        data: data,
        concluida: false
    };

    // Adiciona ao Array e atualiza a tela
    tarefas.push(novaTarefa);
    formTarefa.reset(); // Limpa o formulário
    renderizarTarefas();
});

// Eventos: Atualizar lista quando mudar os filtros
filtroCategoria.addEventListener('change', renderizarTarefas);
ordenarPor.addEventListener('change', renderizarTarefas);

// ==========================================
// 4. MANIPULAÇÃO DO DOM (Renderizar a Lista)
// ==========================================
function renderizarTarefas() {
    // Limpa a lista atual na tela
    listaTarefas.innerHTML = '';

    // Lógica de Filtragem por Categoria
    let tarefasFiltradas = tarefas.filter(tarefa => {
        const categoriaSelecionada = filtroCategoria.value;
        if (categoriaSelecionada === 'Todas') return true;
        return tarefa.categoria === categoriaSelecionada;
    });

    // Lógica de Ordenação
    const tipoOrdenacao = ordenarPor.value;
    tarefasFiltradas.sort((a, b) => {
        if (tipoOrdenacao === 'data') {
            return new Date(a.data) - new Date(b.data); // Ordena da data mais próxima para a mais distante
        } else if (tipoOrdenacao === 'prioridade') {
            const pesoPrioridade = { 'Alta': 1, 'Média': 2, 'Baixa': 3 };
            return pesoPrioridade[a.prioridade] - pesoPrioridade[b.prioridade];
        }
    });

    // Atualiza Bônus: Mensagem de Lista Vazia
    if (tarefasFiltradas.length === 0) {
        mensagemVazia.style.display = 'block';
        listaTarefas.appendChild(mensagemVazia);
    } else {
        mensagemVazia.style.display = 'none';
    }

    // Gerar os Cards na Tela
    tarefasFiltradas.forEach(tarefa => {
        // Define as classes dinâmicas (Cor da prioridade e se está tachado/concluído)
        let classePrioridade = '';
        if (tarefa.prioridade === 'Alta') classePrioridade = 'prioridade-alta';
        if (tarefa.prioridade === 'Média') classePrioridade = 'prioridade-media';
        if (tarefa.prioridade === 'Baixa') classePrioridade = 'prioridade-baixa';
        
        let classeConcluida = tarefa.concluida ? 'concluida' : '';

        // Formata a data de AAAA-MM-DD para DD/MM/AAAA
        let dataFormatada = tarefa.data.split('-').reverse().join('/');

        // Cria o elemento HTML do Card
        const card = document.createElement('div');
        card.className = `card-tarefa ${classePrioridade} ${classeConcluida}`;
        card.innerHTML = `
            <div class="info-tarefa">
                <h3>${tarefa.nome}</h3>
                <div class="tags">
                    <span class="tag-categoria">📂 ${tarefa.categoria}</span>
                    <span class="tag-data">📅 ${dataFormatada}</span>
                </div>
            </div>
            <div class="acoes-tarefa">
                <button onclick="alternarConclusao(${tarefa.id})" title="Marcar/Desmarcar Concluída">✔️</button>
                <button onclick="excluirTarefa(${tarefa.id})" title="Excluir Tarefa">🗑️</button>
            </div>
        `;
        listaTarefas.appendChild(card);
    });

    atualizarContadores();
}

// ==========================================
// 5. FUNÇÕES DE AÇÃO (Concluir e Excluir)
// ==========================================
function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida; // Inverte o status
        renderizarTarefas();
    }
}

function excluirTarefa(id) {
    // Filtra o array removendo a tarefa com o ID clicado
    tarefas = tarefas.filter(t => t.id !== id);
    renderizarTarefas();
}

// ==========================================
// 6. FUNÇÃO BÔNUS: Contadores
// ==========================================
function atualizarContadores() {
    const qtdConcluidas = tarefas.filter(t => t.concluida).length;
    const qtdPendentes = tarefas.length - qtdConcluidas;

    countConcluidas.textContent = qtdConcluidas;
    countPendentes.textContent = qtdPendentes;
}

// Chama a renderização inicial para exibir a mensagem de lista vazia
renderizarTarefas();