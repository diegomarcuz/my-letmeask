import { useRouter } from "next/router"
import Image from 'next/image'
import { styled } from '../../../stitches.config';
import toast, { Toaster } from 'react-hot-toast'

import logoImg from "../../../public/images/logo.svg"
import deleteImg from "../../../public/images/delete.svg"

import { Button } from "../../../components/Button"
import { Question } from "../../../components/Question"
import { useAuth } from "../../../hooks/useAuth"
import { useRoom } from "../../../hooks/useRoom"
import { RoomCode } from '../../../components/RoomCode'

import { firebase } from "../../../service/firebase"

const Header = styled("header", {
  borderBottom: '1px solid $grayDark',
  background: "$background",
  display: "flex",
  justifyContent: 'space-around',
  alignItems: 'center',
  flexFlow: 'row wrap',
  padding: '1rem 2rem',
  minHeight: '7.5rem',
 

})

const HeaderActions = styled("section", {
  display: "flex",
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexFlow: 'row wrap',
  flex: 1,
  width: "100%",
  marginLeft: '24px',
  '@tablet':{
   
    justifyContent: 'space-around',
  }
})


const Main = styled('main', {
  background: "$secondBackground",
  height: 'calc(100vh - 110px)',
  paddingTop: '2rem',

})
const RoomInfoSection = styled("section", {

  margin: '0 32px',
  "@tablet": {
    maxWidth: '45rem',
    width: '100%',
    margin: '2rem auto',

  },
  "h2": {
    fontSize: "2rem",
    fontWeight: 900,
  },
  "span": {
    color: "$grayLight"
  }
})
const QuestionListSection = styled("section", {
  margin: '0 32px',
  "@tablet": {
    maxWidth: '45rem',
    width: '100%',
    margin: '2rem auto',

  },
  "h2": {
    fontSize: "1.5rem",
    fontWeight: 900,
    margin: "16px 0"
  }

})

export default function AdminRoom() {
  const { user, signIn } = useAuth()
  const router = useRouter()
  const roomId = router.query.id as string

  const { title, questions, authorId } = useRoom(roomId)

  async function handleEndRoom() {
   const finishToast = toast.loading("Finishing...")

    await firebase.database().ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    toast.success("Room Finished!!", {id: finishToast})
    router.push('/')
  }

  async function handleDeleteQuestion(questionid: string) {
   
    if (window.confirm('Do you really want to remove the question ?')) {
      await firebase.database().ref(`rooms/${roomId}/questions/${questionid}`).remove()
    }
  }

  return (
    <>
    
      <Header>
        <a href="/">
          <Image src={logoImg} alt="" />
        </a>
        <HeaderActions>
          <RoomCode code={roomId} />
          { (user?.id !== authorId) && !user  ? (
              <Button  isOutlined type="button" onClick={signIn}>Sign in</Button>
            ) :(
              <Button
              isOutlined
              onClick={() => handleEndRoom()}
              >
                Finish Room
              </Button>
            )
          }
      
        </HeaderActions>
      </Header>

      <Main>
        <RoomInfoSection>
          <h2>Room: {title}</h2>
          {questions.length > 0 && <span>{questions.length} room(s)</span>}
        </RoomInfoSection>

        <QuestionListSection>
          <h2>Questions</h2>
          
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                {
                   user && (user?.id === authorId) && (
                    <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                    <Image src={deleteImg} alt="Remove question" />
                   </button>
                  ) 
                }
               
              </Question>
            )
          })}
        </QuestionListSection>
      </Main>
      <Toaster />
    </>
  )
}
