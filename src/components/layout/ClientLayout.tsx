'use client'
import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import 'primeicons/primeicons.css';
import "@/styles/globals.css";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const [theme, setTheme] = useState<string>('lara-dark-blue'); // Tema padrão
  const [load, setLoadding] = useState<boolean>(true);

  useEffect(() => {

    const getInitialTheme = () => {

      const userTheme = localStorage?.getItem('theme');

      if (userTheme) {
        const theme = JSON.parse(userTheme);
        setTheme(theme.css)
      }

      setLoadding(false);
    };

    getInitialTheme();

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
          {load !== true && (
            <Container>
              <Header />
              {children}
            </Container>
          )}
          </body>
        </html>
  );
}
