"use client";

import { useSession, signOut } from "next-auth/react";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import React, { useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Menu } from 'primereact/menu';
import LoginForm from "./LoginForm";

export default function Header() {

    const menu = useRef(null);
    const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const { data: session, status } = useSession();

    const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (menu.current) {
            (menu.current as any).toggle(e);
        }
    };

    const itemsMenu = [
        {
            template: () => {
                return (
                    <div style={{ display: 'flex', gap: 5, justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                        <Avatar image={session?.user?.image as string} shape="circle" />
                        <span className="ml-2">{session?.user?.name as string}</span>
                    </div>
                );
            }
        },
        {
            separator: true
        },
        {
            label: 'Opções',
            items: [
                {
                    label: 'Refresh',
                    icon: 'pi pi-refresh',
                }
            ]
        },
        {
            label: 'Perfil',
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        signOut({ callbackUrl: '/' });
                    },
                }
            ]
        }
    ];

    return (
        <header className="header">

            <div className="header-contain">
                <h1>Tarefas<span>+</span></h1>
                <div className="header-options">
                    {status === 'authenticated' ? (
                        <>
                            <Toast ref={toast}></Toast>
                            <Menu model={itemsMenu} popup ref={menu} id="popup_menu" />
                            <Button onClick={handleMenu} aria-controls="popup_menu" aria-haspopup style={{ color: 'white' }}>
                                Meu painel
                            </Button>
                        </>
                    ) : (
                        <Button style={{ color: "white" }} onClick={() => setVisible(true)}>Acessar</Button>
                    )}
                    <ThemeSwitcher />
                </div>
            </div>
            <Dialog
                draggable={false}
                resizable={false}
                visible={visible}
                onHide={() => setVisible(false)}
                header='Login' style={{ width: '40vw' }}
                breakpoints={{ '960px': '75vw', '641px': '70vw' }}
            >
                <LoginForm />
            </Dialog>
        </header>
    );
}
