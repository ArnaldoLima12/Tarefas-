import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: 'Tarefas',
  description: 'projeto de tarefas'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  )
}
