const theme = {
  colors: {
    background: ['hsl(0, 0%, 5%)', 'hsl(0, 0%, 12.5%)', 'hsl(0, 0%, 25%)'],
    heading: 'hsl(0, 0%, 100%)',
    text: 'hsl(0, 0%, 80%)',
    icon: 'hsl(0, 0%, 40%)',
    linkHover: 'hsl(207, 100%, 50%)',
    link: 'hsl(207, 65%, 70%)',
    highlight: 'hsl(335, 100%, 69%)',
    vm: 'hsl(246, 100%, 75%)',
    jupyter: 'hsl(24, 90%, 55%)'
  },
  fonts: {
    body: 'Open Sans, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
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
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)'
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading'
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
      bg: 'background.1',
      boxShadow: 'card'
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

export default theme
