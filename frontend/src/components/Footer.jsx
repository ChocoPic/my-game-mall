import React from 'react'
import styled from 'styled-components'
import { primaryLight } from '../color'

const Text = styled.span`
  display: block;
  width: 100;
  text-align: end;
  padding: 4px 16px;
  background-color: ${primaryLight};
`

const Footer = () => {
  return (
    <Text>@made by CJ</Text>
  )
}

export default Footer