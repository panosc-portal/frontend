import React from 'react'

import {Image} from 'rebass/styled-components'
import styled from 'styled-components'

export default (props) => (
  <SImage sx={{width: props.notWide || '100%'}} {...props} />
)

const SImage = styled(Image)`
  display: block;
`
