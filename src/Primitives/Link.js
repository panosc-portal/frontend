import React from 'react'

import {Link} from 'rebass/styled-components'

export default props => <Link target={props.blank && '_blank'} {...props} />
