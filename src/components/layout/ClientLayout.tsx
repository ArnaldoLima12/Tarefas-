'use client'
import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import 'primeicons/primeicons.css';
import "@/styles/globals.css";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  const [theme, setTheme] = useState<string>('lara-dark-blue'); // Tema padrão

  useEffect(() => {
  
    const getInitialTheme = () => {
      if (typeof window !== "undefined") { // Verifica se está no ambiente do navegador
        
        const userTheme = localStorage.getItem('theme');
        
        if (userTheme) {
          const theme = JSON.parse(userTheme);
          return theme.css;
        }
      }
      return 'lara-dark-blue'; // Tema padrão
    };

    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <link
          id="theme-css"
          rel="stylesheet"
          href={`/themes/${theme}/theme.css`}
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
