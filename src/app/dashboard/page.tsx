'use client'
import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { useSession } from 'next-auth/react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { db } from '@/services/firebase';
import Link from 'next/link';
import Title from '@/components/layout/Title';

import style from '@/styles/dashboard.module.css'

interface TasksProps {
  id: string,
  created: Date,
  task: string,
  public: boolean
  user: string,
  avatar: string
}

export default function Dashboard() {

  const { data: session, status } = useSession();

  const toast = useRef(null);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  const handleTask = async (e: FormEvent) => {

    try {
      e.preventDefault();
      if (input === '') return;

      await addDoc(collection(db, 'tarefas'), {
        tarefa: input,
        public: checked,
        created: new Date(),
        user: session?.user?.email,
        avatar: session?.user?.image
      });

      setInput("");
      setChecked(false);
    }
    catch (error) {
      console.log(error);
    }

  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, "tarefas", id);
      await deleteDoc(docRef);
      (toast.current as any).show({ severity: 'success', summary: 'Success', detail: 'Tarefa apagada com sucesso', life: 3000 });
    }
    catch (error) {
      (toast.current as any).show({ severity: 'error', summary: 'Error', detail: 'Erro ao deletar tarefa', life: 3000 });
    }

  }

  const handleShare = async (id: string) => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/tarefas/${id}`);
    (toast.current as any).show({ severity: 'info', summary: 'Info', detail: 'URL copiada com sucesso!', life: 3000 });
  }

  const generatePDF = async () => {

    if (tasks.length < 1) return;

    const response = await fetch('/api/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tasks }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {

    async function loadTask() {

      const tarefasRef = collection(db, 'tarefas');
      const q = query(
        tarefasRef,
        orderBy('created', 'desc'),
        where('user', '==', session?.user?.email),
      );

      onSnapshot(q, (snapshot) => {

        let list = [] as TasksProps[];

        snapshot.forEach(doc => {

          list.push({
            id: doc.id,
            created: doc.data().created,
            task: doc.data().tarefa,
            public: doc.data().public,
            user: doc.data().user,
            avatar : doc.data().avatar
          });
        });

        setTasks(list);
      });
    }

    if (session?.user?.email !== undefined)
      loadTask();

  }, [session?.user?.email])

  return (
    <>

      <Title title='Dashboard'/>
      <main className={style.main}>

        <Toast ref={toast} />

        <section>
          <article>
            <form onSubmit={handleTask}>
              <h2>Qual a sua tarefa?</h2>
              <InputTextarea
                value={input}
                onChange={e => setInput(e.target.value)}
                cols={80}
                rows={10}
                autoResize
                placeholder='Digite sua tarefa...' />

              <div className={style.input_group}>
                <Checkbox
                  inputId='public'
                  onChange={e => setChecked(e.checked as boolean)}
                  checked={checked} />

                <label htmlFor="public" className="ml-2">Deixar tarefa pública</label>
              </div>

              <Button
                style={{ color: 'white', width: '100%' }}
                label='Registrar' />
            </form>
          </article>
        </section>

        <section className={style.container}>
          <div className={style.task_group}>
            <h2>Minhas tarefas</h2>

            {tasks.length > 0 && (
              <Button label='Exportar' onClick={generatePDF} />
            )}

            {tasks.map(task => (
              <article className={style.task} key={task.id}>
                {task.public && (
                  <div className={style.task_header}>
                    <label>Public</label>
                    <Button icon='pi pi-share-alt' text onClick={() => handleShare(task.id)} />
                  </div>
                )}

                <div className={style.task_main}>
                  {task.public ? (
                    <Link href={`/tarefas/${task.id}`}> <p>{task.task}</p> </Link>
                  ) : (
                    <p>{task.task}</p>
                  )}
                  <Button onClick={() => handleDelete(task.id)} icon="pi pi-trash" text severity="danger" aria-label="Exclude" />
                </div>
              </article>
            ))}

          </div>
        </section>
      </main>
    </>
  );
}
