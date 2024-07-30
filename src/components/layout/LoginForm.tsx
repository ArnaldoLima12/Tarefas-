import style from '@/styles/login.module.css';
import { signIn } from "next-auth/react"
import { Button } from "primereact/button"

export default function LoginForm() {
    return (
        <div className={style.form}>
            <Button severity='success' icon='pi pi-google' label='Google' onClick={() => signIn('google', { callbackUrl: '/dashboard' })}/>
            <Button severity='success' icon='pi pi-github' label='GitHub' onClick={() => signIn('github', { callbackUrl: '/dashboard' })}/>
        </div>
    )
}