import breakpoints from './breakpoints'
const theme = {
  colors: {
    text: 'hsl(0, 0%, 20%)',
    background: 'hsl(0, 0%, 95%)',
    middleground: 'hsl(0, 0%, 90%)',
    foreground: 'hsl(0, 0%, 80%)',
    primary: '#07c',
    secondary: '#30c',
    muted: '#f6f6f9',
    gray: '#dddddf',
    highlight: 'hsla(205, 100%, 40%, 0.125)',
    heading: 'hsl(0, 0%, 0%)',
  },
  fonts: {
    body: 'Open Sans, system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    icon: 20,
    nav: 32,
    image: 270,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'body',
      color: 'heading',
      fontSize: [1, 2, 2, 3],
      mb: [1, 2],
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'light',
      lineHeight: 'heading',
      marginBottom: 3,
      fontSize: [3, 4, 4, 5],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },
    card: {
      p: 3,
      bg: 'middleground',
    },
    badge: {
      p: 1,
      bg: 'foreground',
    },
    keyword: {
      p: [1],
      mr: [1],
      my: [1],
      bg: 'foreground',
    },
    link: {
      color: 'primary',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'text',
        textDecoration: 'none',
      },
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      },
    },
  },
  buttons: {
    primary: {
      fontSize: [2, 1, 1, 1, 4],
      fontWeight: 'bold',
      color: 'primary',
      bg: 'foreground',
      borderRadius: 'default',
      ':hover': {
        color: 'text',
      },
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      bg: 'foreground',
      color: 'text',
      outline: 'none',
      ':hover': {
        color: 'primary',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
  breakpoints,
}
export default theme
