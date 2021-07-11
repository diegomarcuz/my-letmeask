import Image from 'next/image'
import copyImg from '../public/images/copy.svg'
import toast, { Toaster,  } from 'react-hot-toast'
import { styled } from '../stitches.config';

type RoomCodeProps = {
  code: string
}
const Button = styled("button", {
  display: 'flex',
  height: '40px',
  borderRadius: '8px',
  margin: '8px 0',

  background: '#fff',
  border: ' 1px solid $primaryButton',
  cursor: 'pointer',
  overflow: 'hidden',



  'div': {
    background: '$primaryButton',
    padding: '5px 6px 2px 6px',
    height: '100%',
  },

  'span': {
    alignSelf: 'center',
    flex: 1,
    padding: '0 16px 0 12px',
    width: '230px',
    fontSize: '14px',
    fontWeight: 500,
  },
})

export function RoomCode(props: RoomCodeProps) {

 

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast.success("Copied to clipboard!", {position: 'top-right'})
  }

  return (
    <>
    
      <Toaster/>
      <Button onClick={copyRoomCodeToClipboard}>
        <div>
          <Image src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala: {props.code}</span>
      </Button>
    </>
  )
}