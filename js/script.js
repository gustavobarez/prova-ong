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
            
            const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
            necessidades.push(novaNecessidade);
            localStorage.setItem('necessidades', JSON.stringify(necessidades));

            alert('Necessidade cadastrada com sucesso!');
            formNecessidade.reset();
        });
    }

    const listaNecessidades = document.getElementById('lista-necessidades');
    if (listaNecessidades) {
        const campoPesquisa = document.getElementById('pesquisa');
        const filtroTipo = document.getElementById('filtro-tipo');

        const carregarNecessidades = () => {
            const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
            
            const termoPesquisa = campoPesquisa.value.toLowerCase();
            const tipoSelecionado = filtroTipo.value;

            const necessidadesFiltradas = necessidades.filter(necessidade => {
                const atendePesquisa = necessidade.titulo.toLowerCase().includes(termoPesquisa) || necessidade.descricao.toLowerCase().includes(termoPesquisa);
                const atendeFiltroTipo = (tipoSelecionado === "" || tipoSelecionado === "Todos" || necessidade.tipo === tipoSelecionado);
                return atendePesquisa && atendeFiltroTipo;
            });

            listaNecessidades.innerHTML = ''; 

            if (necessidadesFiltradas.length === 0) {
                listaNecessidades.innerHTML = '<p>Nenhuma necessidade encontrada com os critérios selecionados.</p>';
                return;
            }

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

        campoPesquisa.addEventListener('input', carregarNecessidades);
        filtroTipo.addEventListener('change', carregarNecessidades);

        carregarNecessidades();
    }
});