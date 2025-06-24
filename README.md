# Plataforma de Conexão Voluntária Local

## 📖 Descrição
Este projeto é uma plataforma web front-end desenvolvida para conectar ONGs e instituições sociais a voluntários dispostos a ajudar. A aplicação nasceu da necessidade de modernizar e centralizar a captação de ajuda, que antes era feita de forma manual e descentralizada.

O objetivo é oferecer uma ferramenta simples, intuitiva e acessível onde instituições possam cadastrar suas demandas (seja por voluntários ou doações) e potenciais voluntários possam visualizar, pesquisar e filtrar as oportunidades disponíveis na comunidade.

## 🚀 Demonstração
Você pode visualizar o projeto em funcionamento no link abaixo:

[Acesse a demonstração](gustavobarez.github.io/prova-ong/)

## ✨ Funcionalidades
Página Inicial (Home): Apresentação clara e objetiva do propósito da plataforma.
Cadastro de Necessidades: Formulário para ONGs cadastrarem suas demandas, com validação de campos e preenchimento automático de endereço via API ViaCEP.
Visualização Dinâmica: As necessidades cadastradas são exibidas em formato de "cards" para fácil visualização.
Pesquisa e Filtro: Permite que voluntários pesquisem por palavras-chave ou filtrem as oportunidades por tipo de ajuda (Educação, Saúde, etc.).
Design Responsivo: A interface se adapta a diferentes tamanhos de tela (desktops, tablets e smartphones).
Persistência de Dados: As informações cadastradas são salvas no navegador do usuário utilizando localStorage, simulando uma base de dados no lado do cliente.

## 🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias:

HTML5: Para a estruturação semântica das páginas.
CSS3: Para a estilização, layout (Flexbox e Grid) e responsividade.
JavaScript: Para toda a interatividade, manipulação do DOM, validações, e consumo de API.
API ViaCEP: Para a consulta e preenchimento automático de endereços a partir do CEP.