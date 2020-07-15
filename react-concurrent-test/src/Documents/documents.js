import React from 'react'
import {Box} from 'rebass/styled-components'
import styled from 'styled-components'
import Document from './document'

const Documents = ({data}) => {
  return (
    <DocumentList>
      {data.map(document => (
        <Document key={document.pid} document={document} />
      ))}
    </DocumentList>
  )
}

export default Documents

const DocumentList = styled(Box)`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: ${props => props.theme.space[3]};
`

