import {  useRouter } from "next/router"
import Image from 'next/image'
import { styled } from '@stitches/react';

import logoImg from "../../../public/images/logo.svg"
import deleteImg from "../../../public/images/delete.svg"

import { Button } from "../../../components/Button"
import { Question } from "../../../components/Question"

import { useRoom } from "../../../hooks/useRoom"
import {RoomCode} from '../../../components/RoomCode'

import { firebase } from "../../../service/firebase"

const Header = styled("header", {
  borderBottom: '1px solid #E2E2E2',
  display: "flex",
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '0 32px',
  minHeight: '120px',
  marginBottom: '32px',
  "div.actions":{
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '440px',
    margin: '0 16px',
    "button":{
      '@media (max-width: 760px)':{
        margin: '8px 0',
      }
    }
    

  },

  'button': {
    height: '40px',
    borderRadius: '8px',
    overflow: 'hidden',
  
    background: '#fff',
    border:' 1px solid #835afd',
    cursor: 'pointer',
  
    display: 'flex',
  
    'div': {
      background: '#835afd',
      padding: '5px 6px 2px 6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  
    'span': {
      display: 'block',
      alignSelf: 'center',
      flex: 1,
      padding: '0 16px 0 12px',
      width: '230px',
      fontSize: '14px',
      fontWeight: 500,
    }


  }




})


const Main = styled('main', {
  margin: '0 16px',
  "@media (min-width: 720px)":{
    maxWidth: '720px',
    width: '100%',
    margin: '0 auto',
    
  }, 

  "h2": {
    fontSize: "20px",
    fontWeight: 900,
  },
  "form": {
    margin: '24px 0',

    "textarea": {
      maxWidth: '100%',
      width: '100%',
      resize: 'vertical',
      height: '100px',
      borderRadius: '5px',
      border: 0,
      padding: '8px',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.4)',

      "&:focus": {
        borderColor: '#835AFD'
      }

    },
    "section.footer": {
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      "p": {
        fontSize: '14px',
        color: '#737380',
        "button": {
          marginLeft: '3px',
          background: 'transparent',
          border: 0,
          color: '#835AFD',
          textDecoration: 'underline'
        }

      },

    }

  }


})

export default function AdminRoom() {
  const router = useRouter()
  const roomId = router.query.id as string

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await firebase.database().ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    router.push('/')
  }

  async function handleDeleteQuestion(questionid: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await firebase.database().ref(`rooms/${roomId}/questions/${questionid}`).remove()
    }
  }

  return (
    <>
      <Header>
          <Image src={logoImg} alt="Letmeask" />
          <div className="actions">
            <RoomCode code={roomId}/>
            <Button 
              isOutlined
              onClick={() => handleEndRoom()}
            >
              Encerrar sala
            </Button>
          </div>
      </Header>

      <Main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <Image src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </Main>
      </>
  )
}
