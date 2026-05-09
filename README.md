# Priscilla Miranda | Fonoaudiologia Materno-Infantil

Uma landing page moderna, responsiva e otimizada para Priscilla Miranda, fonoaudióloga especialista no cuidado materno-infantil. O site foi projetado para apresentar seus serviços, gerar autoridade e facilitar o contato direto para agendamentos via WhatsApp e Assistente Virtual (IA).

## 🚀 Funcionalidades

- **Design Responsivo e Moderno:** Interface elegante, focada na experiência do usuário e adaptável para dispositivos móveis (smartphones, tablets) e desktops.
- **Integração com WhatsApp:** Botões estratégicos e flutuantes para facilitar o agendamento de consultas diretamente pelo WhatsApp.
- **Assistente Virtual (Chat IA):** Chatbot integrado na interface para responder perguntas frequentes e triar atendimentos de forma automatizada.
- **Seções Otimizadas:** Início, Sobre, Serviços, Metodologia de Atendimento, Áreas de Atuação, Benefícios, Depoimentos e FAQ.
- **Micro-interações e Animações:** Efeitos suaves de transição (fade-in) e hover que tornam a navegação mais dinâmica.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web padrão, focando em performance e acessibilidade:

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3:** Estilização, layout (Flexbox/Grid), variáveis de cor, animações e responsividade.
- **JavaScript Vanilla:** Lógica para interatividade (menu mobile, animações on-scroll, abertura/fechamento do chat IA e expansão do FAQ).

## 📂 Estrutura de Arquivos

- `index.html`: Arquivo principal contendo a estrutura da página.
- `style.css`: Folha de estilos com todo o design, variáveis, tipografia e media queries.
- `script.js`: Scripts para o funcionamento do menu de navegação, chat, FAQ e animações.
- `assets/`: Diretório destinado a imagens locais (como a foto de perfil da profissional).

## ⚙️ Como Executar o Projeto

Como o projeto utiliza apenas HTML, CSS e JavaScript estáticos, não é necessária nenhuma configuração complexa ou servidor de desenvolvimento:

1. Clone este repositório ou faça o download dos arquivos.
2. Navegue até a pasta do projeto.
3. Abra o arquivo `index.html` em qualquer navegador web atual (Google Chrome, Mozilla Firefox, Safari, Edge, etc.).

*(Opcional)* Para visualizar modificações em tempo real durante o desenvolvimento, você pode utilizar extensões como o **Live Server** no VS Code.

## 🤖 Configuração do Chatbot (Webhook)

O botão de IA na landing page está preparado para ser integrado a um serviço de automação (como n8n, Make, Typebot, etc.). Para configurar:
1. Abra o arquivo `index.html`.
2. Localize o botão do chat IA (`#openAiAutomation`).
3. Altere o atributo `data-webhook-url="https://SEU-WEBHOOK-N8N-AQUI"` para o link da sua automação ou remova caso utilize a interface de chat simulada no próprio HTML.

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) (consulte o arquivo LICENSE para obter detalhes).
