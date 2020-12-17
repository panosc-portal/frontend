import React from 'react'

import {Image} from 'rebass/styled-components'
import styled from 'styled-components'

export default props => <SImage {...props} />

const SImage = styled(Image)`
  display: block;
  width: 100%;
`
