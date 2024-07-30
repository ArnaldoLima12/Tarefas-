'use client'
import { addDoc, collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { InputTextarea } from "primereact/inputtextarea"

import style from "@/styles/tarefas.module.css"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "primereact/button"
import { db } from "@/services/firebase"
import { Fieldset } from "primereact/fieldset"


interface CommentProps {
    id: string
    comment: string,
    created: Date,
    user: string,
    name: string,
    taskId: string
}

export default function CommentArea({ id }: { id: string }) {

    const { data: session } = useSession();

    const [input, setInput] = useState<string>("");
    const [comments, setComments] = useState<CommentProps[]>([]);

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (input === '') return;

        if (!session?.user?.email || !session.user?.name) return;

        try {
            await addDoc(collection(db, 'comentarios'), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: id
            });

            setInput('');
        }
        catch (error) {
            console.log(error);
        }


    }

    const handleDelete = async (id : string) => {
      try
      { 
        if(!session?.user) return;
        const commentRef = doc(db, 'comentarios', id);
        await deleteDoc(commentRef);
      }
      catch(error)
      {
        console.log(error);
      }
    }

    useEffect(() => {

        async function loadComments() {

            const commentRef = collection(db, 'comentarios');

            const q = query(
                commentRef,
                orderBy('created', 'desc'),
                where('taskId', '==', id)
            )

            onSnapshot(q, (snapshot) => {

                let list = [] as CommentProps[];

                snapshot.forEach(doc => {

                    list.push({
                        id: doc.id,
                        comment: doc.data().comment,
                        created: new Date(doc.data().created.seconds * 1000),
                        user: doc.data().user,
                        name: doc.data().name,
                        taskId: doc.data().taskId
                    })
                })

                setComments(list);
            })
        }

        if (id != undefined)
            loadComments();
    }, [])


    return (
        <section className={style.contain}>
            <article className={style.form_comment}>
                <h2>Deixar comentário</h2>
                <form onSubmit={handleSubmit}>
                    <InputTextarea
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        placeholder="Digite seu comentário"
                        rows={10}
                        cols={80}
                        autoResize
                        style={{ width: '100%' }} />
                    <Button
                        disabled={!session?.user}
                        label='Enviar comentário' />
                </form>
            </article>

            <article>
                <h3>Todos comentários</h3>

                {comments.length < 1 ? (
                    <div>
                        <p>Sem comentários</p>
                    </div>
                ) : (
                    <div className={style.container_comment}>
                        {comments.map(comment => (
                            <Fieldset key={comment.id}>
                                <div className={style.header_comment}>
                                    <span className={style.name_comment}>{comment.name}</span>
                                    <span>{comment.created.toLocaleDateString()}</span>
                                </div>
                                <div className={style.main_comment}>
                                    <p>{comment.comment}</p>
                                    {session?.user?.email === comment.user && (
                                        <Button onClick={() => handleDelete(comment.id)} icon="pi pi-trash" text severity="danger" aria-label="Exclude" />
                                    )}
                                </div>
                            </Fieldset>
                        ))}
                    </div>
                )}


            </article>
        </section>
    )
}