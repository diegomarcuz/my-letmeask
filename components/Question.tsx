import { ReactNode } from 'react'
import Image from 'next/image'

import { styled } from '../stitches.config';

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
}

const Container = styled("div", {
  background: '$whiteDetails',
  borderRadius: '8px',
  boxShadow: '0 2px 8px 0 rgba(255,255,255,0.4)',
  padding: '1.5rem',
  '& + &': {
    marginTop: '8px'
  },

  'p':  {
    color: '$blackText'
  }

})

const Footer = styled('footer', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1.5rem',

  '.user-info':  {
    display: 'flex',
    alignItems: 'center',

    'img': {
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
    },

    'span': {
      marginLeft: '8px',
      color: '#737380',
      fontSize: '14px',
    }
  }
})

const Actions = styled('div', {
  'button':  {
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    transition: 'filter 0.2s',

   ' &.like-button':  {
      display: 'flex',
      alignItems: 'flex-end',
      color: '$grayDark',
      gap: '8px',

      '&.liked':  {
        color: '$primaryButton',

        'svg path' :{
          stroke: '$primaryButton',
        }
      },

      '&:hover': {
        filter:'brightness(0.7)',
      }
    }
  }
})

export function Question({content, author, children}: QuestionProps) {
 
  return (
    <Container>
      <p>{content}</p>
      <Footer>
        <div className="user-info">
          <Image src={author.avatar} width="2rem" height="2rem" alt={author.name} />
          <span>{author.name}</span>
        </div>
        <Actions>{children}</Actions>
      </Footer>
    </Container>
  )
}