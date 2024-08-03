# 📝 Gerenciador de Tarefas 📋

Bem-vindo ao **Gerenciador de Tarefas**! Este é um projeto de gerenciamento de tarefas que permite aos usuários organizar suas atividades de forma eficiente e colaborativa. Abaixo, você encontrará uma visão geral do que o projeto faz e quais tecnologias estão sendo utilizadas.

## 🚀 Funcionalidades

- **Autenticação com Google e GitHub**: Faça login de forma fácil e rápida utilizando o [NextAuth.js](https://next-auth.js.org/).
- **Criação de Tarefas**: Adicione tarefas com detalhes e defina se elas serão públicas ou privadas.
- **Compartilhamento de Tarefas Públicas**: Compartilhe tarefas públicas com outros usuários para que eles possam visualizá-las.
- **Comentários em Tarefas**: Usuários que fizerem login podem comentar em tarefas de outros usuários, promovendo interação e colaboração.

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **[NextAuth.js](https://next-auth.js.org/)**: Biblioteca de autenticação para Next.js, suportando login com Google e GitHub.
- **[Firebase](https://firebase.google.com/)**: Plataforma para gerenciamento de autenticação e banco de dados em tempo real.
- **[PrimeReact](https://www.primefaces.org/primereact/)**: Biblioteca de componentes React para uma interface de usuário elegante e interativa.

## 📦 Como Começar

1. **Clone o Repositório**: 
    ```bash
    git clone https://github.com/ArnaldoLima12/tarefas.git
    ```

2. **Instale as Dependências**:
    ```bash
    cd gerenciador-de-tarefas
    npm install
    ```

3. **Configure as Variáveis de Ambiente**: 
   Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

    ```plaintext
    # Provides
    GOOGLE_CLIENT_ID =
    GOOGLE_CLIENT_SECRET =
    GITHUB_ID =
    GITHUB_SECRET =

    # Next Config
    NEXTAUTH_URL =
    NEXT_PUBLIC_URL =
    NEXTAUTH_SECRET =
    JWT_SECRET =
    SECURE_COOKIE =

    # Firebase
    NEXT_PUBLIC_APP_API_KEY =
    NEXT_PUBLIC_APP_AUTH_DOMAIN =
    NEXT_PUBLIC_APP_PROJECT_ID =
    NEXT_PUBLIC_APP_STORAGE_BUCKET =
    NEXT_PUBLIC_APP_MESSAGING_SENDER_ID =
    NEXT_PUBLIC_APP_ID =
    ```

4. **Inicie o Servidor de Desenvolvimento**:
    ```bash
    npm run dev
    ```

5. **Abra o Navegador**: Vá para [http://localhost:3000](http://localhost:3000) e comece a usar o Gerenciador de Tarefas!

## 🤔 Dúvidas e Contribuições

Se você tiver dúvidas ou quiser contribuir para o projeto, sinta-se à vontade para abrir uma [issue](https://github.com/ArnaldoLima12/tarefas/issues) ou fazer um [pull request](https://github.com/ArnaldoLima12/tarefas/pulls). 

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

Obrigado por conferir o projeto! 🚀
