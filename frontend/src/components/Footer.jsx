import React from 'react'
import styled from 'styled-components'
import { primary, primaryLight, secondaryDark, tertiary, tertiaryLight } from '../color'

const Text = styled.span`
  display: block;
  width: 100;
  text-align: end;
  padding: 16px 32px;
  background-color: ${primaryLight};
  font-size: 12px;
`
const Link = styled.a`
  display: inline-block;
  margin-left: 12px;
  color: ${tertiaryLight};
  font-weight: bold;
  text-decoration: none;
  background-color: ${primary};
  padding: 1px 8px;
  border-radius: 8px;
`

const Footer = () => {
  return (
    <Text>
      <span>@made by CJ</span>
      <Link href='https://github.com/ChocoPic'>Github</Link>
    </Text>
    
  )
}

export default Footer