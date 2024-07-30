'use client'
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
        


export default function ThemeSwitcher() {


    const [selectedTheme, setSelectedTheme] = useState({});
    const [load, setLoad] = useState(false);

    // Lista de temas
    const themes = [
        { name: 'Claro', css: 'tailwind-light' },
        { name: 'Escuro', css: 'lara-dark-blue' },
    ];  

    //Mudança do tema
    const changeTheme = (theme: { name: string; css: string } ) => {

        const linkElement = document.getElementById('theme-css') as HTMLLinkElement;

        if (linkElement) {
            linkElement.href = `/themes/${theme.css}/theme.css`;
            setSelectedTheme(theme);
        }
    };

    //Escuta a mudança de tema
    useEffect(() => {
        if(Object.keys(selectedTheme).length > 1)
            localStorage.setItem('theme', JSON.stringify(selectedTheme));       
    }, [selectedTheme])

    //Delay para corrigir o carregamento do dropdown
    useEffect(() => {
        setInterval(() => {
            setLoad(true);
        }, 1000)
    }, [])

    return (

        <>
            {load === true ? (
                <Dropdown
                    value={selectedTheme}
                    options={themes}
                    onChange={e => changeTheme(e.value)}
                    optionLabel="name"
                    placeholder="Tema"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
            ) : (
                <Skeleton width="7.5rem" height="2.938rem"/>
            )}
        </>

    );
};

