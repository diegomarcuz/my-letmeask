import { FormEvent, useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import {BsChevronDown} from 'react-icons/bs'

import { styled } from '../../stitches.config';

import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth';

import illustrationImg from '../../public/images/illustration.svg';
import logoImg from '../../public/images/logo.svg';
import { firebase } from '../../service/firebase'




const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',

  "@tablet": {
    flexDirection: 'row',

  },

 


})

const InformativePanel = styled('aside', {
  flex: 7,
  background: '$secondBackground',
  color: '$text',
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  padding: "2rem",
  minHeight: '100vh',


  h1: {
    lineHeight: '42px',
    fontSize: '2.25rem'
  },
  p: {
    fontSize: '1.5rem',
    lineHeight: '32px',
    marginTop: '1rem',
    color: '$text',
  },
  button: {
    marginTop: '4rem',
    height: '3.125rem',
    borderRadius: '8px',
    fontWeight: 500,
    background: '$primaryButton',
    color: '$text',
    maxWidth: '20rem',
    width: "100%",

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    border: 0,
    transition: 'filter 0.2s',


    "&:hover": {
      filter: 'brightness(0.9)'
    },
     svg:{
       marginLeft: '16px'
     }
  },
  
  "@tablet": {
    minHeight: "auto",
    button: {
      display: "none"
    }

  },
})
const InteractivePanel = styled("main", {
  minHeight: '100vh',
  flex: 8,
  padding: "2rem",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  h1: {
    fontSize: '1.75rem',
    marginTop: '4rem'
  },

  h2: {
    fontSize: '1.5rem',
    margin: '2rem 0 1.5rem'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20rem',
    width: "100%",
    input: {
      height: '3.125rem',
      borderRadius: '8px',
      padding: '0 1rem',
      background: '#fff',
      border: '1px solid $grayMedium',
    },

    button: {
      marginTop: '1rem',
    }
  },
  p: {
    maxWidth: '20rem',
    width: "100%",
    fontSize: '14px',
    color: '$grayDark',
    marginTop: '1rem',

    a: {
      color: '#0f62fe',
      marginLeft: '5px'
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
      toast.error("Add room code!")
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
      <Toaster />

      <InformativePanel>
        <Image src={illustrationImg} alt="illustration" />
        <h1>Every question has an answer</h1>
        <p>Learn and share knowledge with other</p>
        <button
          onClick={() => window.scroll(
            { top: window.innerHeight, behavior: 'smooth' }
          )}>
          Room creation
          
            <BsChevronDown/>
        </button>
      </InformativePanel>
      <InteractivePanel >
        <Image src={logoImg} alt="logo" />

        <h1>Hey, {user?.name}</h1>
        <h2>Create a new room</h2>

        <form onSubmit={handleNewRoom}>
          <input
            onChange={event => setRoomName(event.target.value)}
            type="text"
            placeholder="Room name"
            value={roomName}
          />
          <Button type="submit">Join the room</Button>
        </form>
        <p>
         Know a room ?
          <Link href="/">
            <a>Go here</a>
          </Link>
        </p>

      </InteractivePanel>

    </Container>
  )
}
