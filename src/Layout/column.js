import React from 'react'

import {Flex} from '../Primitives'

export default props => (
  <Flex
    sx={{
      flexDirection: 'column',
      gap: [3, 2, 3, 4],
    }}
    className={props.className}
  >
    {props.children}
  </Flex>
)
