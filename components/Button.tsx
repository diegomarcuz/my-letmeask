import { ButtonHTMLAttributes } from 'react'
import { styled } from '../stitches.config'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}


export function Button({ isOutlined = false, ...props }: ButtonProps) {

  const Button = styled("button", {
    height: '3.125rem',
    borderRadius: '8px',
    fontWeight: 500,
    background: '$primaryButton',
    padding: '0 2rem',
    color: '$text',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    border: 0,
    transition: 'filter 0.2s',
    '&.outlined':  {
      background: '#fff',
      border:' 1px solid #835afd',
      color: '#835afd',
    },

    "&:not(:disabled):hover": {
      filter: 'brightness(0.9)'
    },
    "&:disabled": {
      opacity: '0.6',
      cursor: 'not-allowed'
    },
  
    
  })


  return (
    <Button className={`${isOutlined ? 'outlined' : ''}`} {...props} />
  )
}