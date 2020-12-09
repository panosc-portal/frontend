import React from 'react'

import {Flex, Link} from '../Primitives'

const BottomNavigation = ({sidebar, setSidebar}) => (
  <Flex
    as="footer"
    sx={{
      width: '100%',
      height: '3rem',
      position: 'fixed',
      justifyContent: 'space-evenly',
      bottom: 0,
      bg: 'foreground',
    }}
  >
    <Link variant="nav" onClick={() => setSidebar('left')}>
      Left
    </Link>
    <Link variant="nav" onClick={() => setSidebar(false)}>
      Middle
    </Link>
    <Link variant="nav" onClick={() => setSidebar('right')}>
      Right
    </Link>
  </Flex>
)

export default BottomNavigation
