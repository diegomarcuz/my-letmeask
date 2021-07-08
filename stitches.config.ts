import { global, createCss } from '@stitches/react';

const {styled} = createCss({
  theme:{
    colors: {
      background: "#161616",
      secondBackground: '#262626',
      text: "#f4f4f4",
      blackText: '#29292E',
      shadow: '#050206',
      gradient: '#485BFF',
      danger: '#E73F5D',
      action: '#EA4335',
      grayDark: '#737380',
      grayMedium: '#A8A8B3',
      grayLight: '#DBDCDD',
      whiteDetails: '#FEFEFE',
      pinkDark: "#E559F9",
      pinkLight: "#D67EE2",
      hoverPurple: "#6F4BD8",
      hoverDanger: '#D73754',
      hoverGrayMedium: '#7E7E86',
      hoverGrayLight: '#CECECE',
      primaryButton: '#0f62fe'

    }
  
    
  },
  media:{
    desktop: "(min-width: 1032px)",
    tablet: "(min-width:760px)",
    smartphone: "(min-width:320px)"
  }
  
})

const globalStyles = global({
  '*':{
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',

  },
  body: {
   fontFamily: 'Roboto, sans-serif',
    background: "$background",
    color: "$text",
    minHeight: '100vh'
  },


  a: {
    color: 'inherit',
    textDecoration: 'none'
  },
  html:{
    fontSize: '87.5%', //14px
    "@media screen and (min-width:760px)":{
      fontSize: '93.75%' //15px
    },
    "@media screen and (min-width: 1032px)":{
      fontSize: '100%'
    },
  }



})

export { globalStyles, styled}