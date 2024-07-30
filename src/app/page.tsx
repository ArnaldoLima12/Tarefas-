import {collection, getDocs } from 'firebase/firestore';
import style from '@/styles/home.module.css';
import { Button } from "primereact/button";
import { db } from '@/services/firebase';
import Image from "next/image";
import { cache } from 'react';

export const revalidate = 400;

const getData = cache(async () => {
  
  const commentRef = collection(db, 'comentarios');
  const postRef = collection(db, 'tarefas');
  
  const [comments, posts] = await Promise.all([getDocs(commentRef), getDocs(postRef)]);

  return [comments.size || 0, posts.size || 0]
});

export default async function Home() {

  const data = await getData();

  return (
    <main className={style.main}>
      <Image src={'/hero.png'} width={300} height={200} alt="hero.png" priority={true} />

      <article>
        <p>Sistema feito para você organizar <br />seus estudos e tarefas</p>

        <div className={style.main_infos}>
          <Button >+{data[1]} posts</Button>
          <Button >+{data[0]} comentarios</Button>
        </div>
      </article>

    </main>
  );
}
