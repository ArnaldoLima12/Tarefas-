import CommentArea from '@/components/layout/CommentArea';
import {doc, getDoc } from 'firebase/firestore';
import style from '@/styles/tarefas.module.css';
import { Fieldset } from 'primereact/fieldset';
import Title from '@/components/layout/Title';
import { redirect } from 'next/navigation';
import { Avatar } from 'primereact/avatar';
import { db } from '@/services/firebase';


export default async function Tarefas({ params }: { params: { id: string } }) {

    async function loadTask() {

        const docRef = doc(db, 'tarefas', params.id);
        const snapshot = await getDoc(docRef);

        if (snapshot.data() === undefined) {
            return redirect('/');
        }
        else if (!snapshot.data()?.public) {
            return redirect('/');
        }
        else {
            const task = {
                id: snapshot.id,
                created: new Date(snapshot.data()?.created.seconds * 1000).toLocaleDateString(),
                task: snapshot.data()?.tarefa,
                public: snapshot.data()?.public,
                user: snapshot.data()?.user,
                avatar: snapshot.data()?.avatar
            }

            return task;
        }
    }

    const task = await loadTask();

    const legendTemplate = (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
            <Avatar image={task.avatar} shape="circle" />
            <span className="font-bold">{task.created}</span>
        </div>
    );

    return (

        <>
            <Title title='Detalhes da tarefa' />
            <main>
                <section className={style.contain}>
                    <article>
                        <Fieldset legend={legendTemplate} style={{borderColor: '#3183ff'}}>
                            <p>{task.task}</p>
                        </Fieldset>
                    </article>
                </section>
                <CommentArea id={params.id}/>
            </main>
        </>

    )
}
