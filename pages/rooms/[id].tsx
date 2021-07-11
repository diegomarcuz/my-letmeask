import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import Image from 'next/image'
import { styled } from '../../stitches.config';
import toast, { Toaster } from 'react-hot-toast'


import logoImg from "../../public/images/logo.svg"

import { firebase } from "../../service/firebase"

import { Button } from "../../components/Button"
import { Question } from "../../components/Question"
import { RoomCode } from '../../components/RoomCode'

import { useAuth } from "../../hooks/useAuth"
import { useRoom } from "../../hooks/useRoom"

const Header = styled("header", {
  borderBottom: '1px solid $grayDark',
  background: "$background",
  display: "flex",
  justifyContent: 'space-around',
  alignItems: 'center',
  flexFlow: 'row wrap',
  padding: '1rem 2rem',
  minHeight: '7.5rem',
  button:{
    marginLeft: '24px'
  }

})


const Main = styled('main', {
  background: "$secondBackground",
  height: 'calc(100vh - 110px)',
  paddingTop: '2rem',

})

const SendYourQuestionSection = styled("section", {
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
  "form": {
    margin: '1.5rem 0',

    "textarea": {
      maxWidth: '100%',
      width: '100%',
      resize: 'vertical',
      height: '100px',
      borderRadius: '5px',
      border: 0,
      padding: '8px',
      boxShadow: '0 2px 8px 0 rgba(255,255,255,0.4)',

      "&:focus": {
        borderColor: '#fff'
      },
      "&::placeholder": {
        color: '$blackText '
      }

    },
    "section.footer": {
      marginTop: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      "p": {
        fontSize: '14px',
        color: '$grayDark ',
        "button": {
          marginLeft: '3px',
          background: 'transparent',
          border: 0,
          color: '$primaryButton ',
          textDecoration: 'underline',
          cursor: "pointer"
        }

      },

    }

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

type Question = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean


}

export default function Room() {
  const { user, signIn } = useAuth()
  const [newQuestion, setNewQuestion] = useState("")
  const router = useRouter();
  const roomId = router.query.id as string

  const { title, questions } = useRoom(roomId)




  async function handleNewQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() == "") {
      toast.error("Add room code!")
      return;
    }
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    const question = {
      author: {
        name: user.name,
        avatar: user.photoURL
      },
      content: newQuestion,
      isHighlighted: false,
      isAnswered: false


    }
    const database = firebase.database();
    await database.ref(`rooms/${roomId}/questions`).push(question)

    toast.success('Question created!');
    setNewQuestion("")
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    const database = firebase.database();
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
    }
  }
  return (

    <>
      <Toaster />
      <Header>
        <a href="/">
          <Image src={logoImg} alt="" />
        </a>
        <RoomCode code={roomId} />
      </Header>
      <Main>
        <SendYourQuestionSection>

          <h2>Room: {title}</h2>

          <form onSubmit={handleNewQuestion}>
            <textarea
              placeholder="Ask your question"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <section className="footer">
              {!user && (
                <p>
                  In order to send your question,
                  <button type="button" onClick={signIn}>sign in</button>.
                </p>
              )}

              <Button disabled={!user} type="submit">Send the Question</Button>

            </section>
          </form>
        </SendYourQuestionSection>

        <QuestionListSection>
          <h2>Questions</h2>

          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  className={`like-button ${question.likeId ? 'liked' : ''}`}
                  type="button"
                  aria-label="Like question"
                  onClick={() => handleLikeQuestion(question.id, question.likeId)}
                >

                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Question>
            )
          })}
        </QuestionListSection>

      </Main>
    </>
  )
}