import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import {BsChevronDown} from 'react-icons/bs'

import { styled } from '../stitches.config';

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { firebase } from '../service/firebase'

import illustrationImg from '../public/images/illustration.svg';
import googleImg from '../public/images/google-icon.svg';
import logoImg from '../public/images/logo.svg';

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

})

const CreateRoomBtn = styled('button', {
  marginTop: '4rem',
  height: '3.125rem',
  borderRadius: '8px',
  fontWeight: 500,
  background: '$action',
  color: '$text',
  maxWidth: '20rem',
  width: "100%",

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',
  border: 0,
  transition: 'filter 0.2s',
  p: {
    marginLeft: '8px'
  },

  "&:hover": {
    filter: 'brightness(0.9)'
  }

})

const Separator = styled('div', {
  fontSize: '14px',
  color: '$grayMedium',

  margin: '2rem 0',
  display: 'flex',
  alignItems: 'center',
  maxWidth: '20rem',
  width: "100%",
  "&::before": {
    content: '',
    flex: 1,
    height: '1px',
    marginRight: '1rem',
    background: '$grayMedium'
  },
  "&::after": {
    content: '',
    flex: 1,
    height: '1px',
    marginLeft: '1rem',
    background: '$grayMedium'
  }
})



export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const { signIn, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signIn()
    }
    router.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomId.trim() === '') {
      toast.error("Add room code!")
      return;
    }

    const roomRef = await firebase.database().ref(`rooms/${roomId}`).get()

    if (!roomRef.exists()) {
      toast.error('Room does not exists!')
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Room already closed!')
      return;
    }  
    toast.success("Let's chat!!")
    if(user?.id === roomRef.val().authorId){
      router.push(`/admin/rooms/${roomRef.key}`)
    }else{
      router.push(`/rooms/${roomRef.key}`)
    }
  }

  return (
    <Container>
      <Head>
        <title>Let me ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <InformativePanel>
        <Image src={illustrationImg} alt="illustration" />
        <h1>Every question has an answer</h1>
        <p>Learn and share knowledge with other</p>
        <button
          onClick={() => window.scroll(
            { top: window.innerHeight, behavior: 'smooth' }
          )}>
          Room actions
          
            <BsChevronDown/>
        </button>
      </InformativePanel>
      <InteractivePanel >
        <Image src={logoImg} alt="logo" />
        <CreateRoomBtn onClick={handleCreateRoom}>
          <Image src={googleImg} alt="logo" />
          <p>Create room with Google</p>
        </CreateRoomBtn>
        <Separator> or join the room</Separator>

        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="Room code"
            onChange={event => setRoomId(event.target.value)}
            value={roomId}
          />
          <Button type="submit">Join the room</Button>
        </form>
      </InteractivePanel>


    </Container>
  )
}
