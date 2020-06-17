export default {
  colors: {
    background: ['hsl(0, 0%, 95%)', 'hsl(0, 0%, 90%)', 'hsl(0, 0%, 80%)'],
    heading: 'hsl(0, 0%, 5%)',
    text: 'hsl(0, 0%, 20%)',
    icon: 'hsl(0, 0%, 60%)',
    linkHover: 'hsl(207, 100%, 50%)',
    link: 'hsl(207, 74%, 39%)',
    highlight: 'hsl(335, 46%, 50%)',
    jupyter: 'hsl(24, 90%, 55%)',
    vm: 'hsl(257, 100%, 65%)'
  },
  fonts: {
    body: "'Open Sans', sans-serif",
    heading: 'inherit'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48
  },
  radii: {
    default: 4,
    circle: 99999
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'heading'
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7]
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle'
    },
    card: {
      p: 2,
      bg: 'background.1'
    },
    link: {
      color: 'link'
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'link'
      }
    }
  },
  buttons: {
    link: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background.1',
      bg: 'link',
      borderRadius: 'default'
    },
    outline: {
      variant: 'buttons.link',
      color: 'link',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px'
    },
    highlight: {
      variant: 'buttons.link',
      color: 'background.1',
      bg: 'highlight'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }
}
