import { FormEvent, useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { styled } from '@stitches/react';

import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth';

import illustrationImg from '../../public/images/illustration.svg';
import logoImg from '../../public/images/logo.svg';
import { firebase } from '../../service/firebase'




const Container = styled("div", {
  display: 'flex',
  alignItems: 'stretch',
  height: '100vh',


  aside: {
    flex: 7,
    background: '#835afd',
    color: '#fff',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    padding: '120px 80px',


    h1: {
      lineHeight: '42px',
      fontSize: '36px'
    },
    p: {
      fontSize: '24px',
      lineHeight: '32px',
      marginTop: '16px',
      color: '#f8f8f8'
    }
  },

  main: {
    flex: 8,
    padding: "0px 32px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    h2: {
      fontSize: '24px',
      margin: '64px 0 24px'
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '320px',
      width: "100%",
      input: {
        height: '50px',
        borderRadius: '8px',
        padding: '0 16px',
        background: '#fff',
        border: '1px solid #a8a8b3',
      },

      button: {
        marginTop: '16px',
      }
    },
    p: {
      maxWidth: '320px',
      width: "100%",
      fontSize: '14px',
      color: '#737380',
      marginTop: '16px',

      a: {
        color: '#e559f9',
        marginLeft: '5px'
      }
    }


  }

})



export default function NewRoom() {
  const [roomName, setRoomName] = useState('');
  const router = useRouter();

  const { user } = useAuth();


  useEffect(() => {
    if (!user) {
      router.push('/')
    }

  }, [])

  async function handleNewRoom(event: FormEvent) {
    event.preventDefault()

    if (roomName.trim() == "") {
      return;
    }

    const database = firebase.database();
    const roomRef = database.ref("/rooms")

    const { key: firebaseRoomId } = await roomRef.push({
      authorId: user?.id,
      roomName: roomName,



    })


    router.push(`/admin/rooms/${firebaseRoomId}`) // relative path

  }

  return (
    <Container>


      <aside>
        <Image src={illustrationImg} alt="illustration" />
        <h1>Toda pergunta tem uma resposta</h1>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main >
        <Image src={logoImg} alt="logo" />

        <h1>Ei, {user?.name}</h1>
        <h2>Criar uma nova sala</h2>

        <form onSubmit={handleNewRoom}>
          <input
            onChange={event => setRoomName(event.target.value)}
            type="text"
            placeholder="Nome da sala"
            value={roomName}
          />
          <Button type="submit">Entrar na sala</Button>
        </form>
        <p>
          Quer entrar em uma sala existente?
          <Link href="/">
            <a>Clique aqui</a>
          </Link>
        </p>

      </main>

    </Container>
  )
}
