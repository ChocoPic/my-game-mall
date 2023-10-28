import React from 'react'
import styled from 'styled-components'
import { XS, gray, gray_light, secondary, secondary_light, white} from '../style_variable'

const Text = styled.span`
  display: block;
  width: 100;
  text-align: end;
  padding: 16px 32px;
  background-color: ${gray_light};
  font-size: ${XS};
`
const Link = styled.a`
  display: inline-block;
  margin-left: 12px;
  color: ${secondary};
  font-weight: bold;
  text-decoration: none;
  background-color: ${white};
  padding: 1px 8px;
  border-radius: 8px;
`

const Footer = () => {
  return (
    <Text>
      <span>@made by CJ</span>
      <Link href='https://github.com/ChocoPic' target='_blank'>Github</Link>
    </Text>
    
  )
}

export default Footer