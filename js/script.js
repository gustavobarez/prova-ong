// Aguarda o carregamento completo do DOM para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA PÁGINA DE CADASTRO ---
    const formNecessidade = document.getElementById('form-necessidade');
    if (formNecessidade) {
        const cepInput = document.getElementById('cep');

        // Integração com a API ViaCEP
        cepInput.addEventListener('blur', () => {
            const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('rua').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('estado').value = data.uf;
                        } else {
                            alert('CEP não encontrado.');
                        }
                    })
                    .catch(error => console.error('Erro ao buscar CEP:', error));
            }
        });

        formNecessidade.addEventListener('submit', (event) => {
            event.preventDefault();

            // Validação simples (ex: campos vazios) já é feita com 'required' no HTML.
            // Validações mais complexas (formato de e-mail/telefone) podem ser adicionadas aqui.

            const novaNecessidade = {
                id: Date.now(),
                instituicao: document.getElementById('nomeInstituicao').value,
                tipo: document.getElementById('tipoAjuda').value,
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                cep: document.getElementById('cep').value,
                endereco: `${document.getElementById('rua').value}, ${document.getElementById('bairro').value}, ${document.getElementById('cidade').value} - ${document.getElementById('estado').value}`,
                contato: document.getElementById('contato').value
            };
            
            // Armazenamento dos dados no localStorage
            // O localStorage permite que os dados persistam no navegador do usuário.
            // Nota: Isso é um armazenamento local. Os dados não são compartilhados entre diferentes usuários.
            const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
            necessidades.push(novaNecessidade);
            localStorage.setItem('necessidades', JSON.stringify(necessidades));

            alert('Necessidade cadastrada com sucesso!');
            formNecessidade.reset();
        });
    }

    // --- LÓGICA DA PÁGINA DE VISUALIZAÇÃO ---
    const listaNecessidades = document.getElementById('lista-necessidades');
    if (listaNecessidades) {
        const campoPesquisa = document.getElementById('pesquisa');
        const filtroTipo = document.getElementById('filtro-tipo');

        // Função para carregar e exibir os cards
        const carregarNecessidades = () => {
            const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
            
            // Pega os valores atuais dos filtros
            const termoPesquisa = campoPesquisa.value.toLowerCase();
            const tipoSelecionado = filtroTipo.value;

            // Filtra as necessidades
            const necessidadesFiltradas = necessidades.filter(necessidade => {
                const atendePesquisa = necessidade.titulo.toLowerCase().includes(termoPesquisa) || necessidade.descricao.toLowerCase().includes(termoPesquisa);
                const atendeFiltroTipo = (tipoSelecionado === "" || tipoSelecionado === "Todos" || necessidade.tipo === tipoSelecionado);
                return atendePesquisa && atendeFiltroTipo;
            });

            // Limpa a lista antes de exibir os resultados
            listaNecessidades.innerHTML = ''; 

            if (necessidadesFiltradas.length === 0) {
                listaNecessidades.innerHTML = '<p>Nenhuma necessidade encontrada com os critérios selecionados.</p>';
                return;
            }

            // Cria e insere o HTML para cada card
            necessidadesFiltradas.forEach(necessidade => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${necessidade.titulo}</h3>
                    <span class="card-tipo">${necessidade.tipo}</span>
                    <p><strong>Instituição:</strong> ${necessidade.instituicao}</p>
                    <p>${necessidade.descricao}</p>
                    <p><strong>Local:</strong> ${necessidade.endereco}</p>
                    <p><strong>Contato:</strong> ${necessidade.contato}</p>
                `;
                listaNecessidades.appendChild(card);
            });
        };

        // Adiciona "event listeners" para os filtros para recarregar a lista quando eles mudarem
        campoPesquisa.addEventListener('input', carregarNecessidades);
        filtroTipo.addEventListener('change', carregarNecessidades);

        // Carrega as necessidades ao abrir a página
        carregarNecessidades();
    }
});