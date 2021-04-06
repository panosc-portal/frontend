import React from 'react'

import {Flex} from '../Primitives'

export default (props) => (
  <Flex
    sx={{
      flexDirection: 'row',
      flexWrap: ['wrap', 'wrap', 'nowrap'],
      gap: [1, 2, 3, 4],
    }}
    className={props.className}
  >
    {props.children}
  </Flex>
)
