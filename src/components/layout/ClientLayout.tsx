'use client'
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import 'primeicons/primeicons.css';
import "@/styles/globals.css"



export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  // Função para verificar o tema no localStorage
  const getInitialTheme = () => {

    const userTheme = localStorage.getItem('theme');

    if (userTheme) {
      const theme = JSON.parse(userTheme);
      return theme.css;
    }

    return 'lara-dark-blue'; // Tema padrão
  };

  const initialTheme = getInitialTheme();

  return (
    <html lang="pt-br">
      <head>
        <link
          id="theme-css"
          rel="stylesheet"
          href={`/themes/${initialTheme}/theme.css`}
        />
      </head>
      <body>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
