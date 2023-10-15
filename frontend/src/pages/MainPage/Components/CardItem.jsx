import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { secondaryDark, secondaryLight } from '../../../color'

const Container = styled.div`
  background-color: #ffffff;
  width: 210px;
  height: 245px;
  display: block;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  vertical-align: center;
  position: relative;
  z-index:10;
`
const Back = styled.div`
  width: 70%;
  height: 50%;
  margin: 16px;

  position: absolute;
  z-index: -10;
  top: 0;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word; 
`
const Img = styled.div`
  width: ${props => (props.hovered ? '1px' : '100%') };
  height: 150px;
  border-radius: 12px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;

  transition: ${props => (props.hovered ? 'width 1s ease' : 'none')};
`
const TextContainer = styled.div`
  padding: 12px;
`
const TitleText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 4px;
`
const TagBadge = styled.span`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 1.5rem;
  border: solid 0.2px ${secondaryLight};
  text-align: center;
  vertical-align: middle;
  color: ${secondaryLight};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  margin-right: 4px;
`

const CardItem = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    hovered={hovered}>
      <Img src={props.img} hovered={hovered}/>
      <Back>
        {props.comment}</Back>
      <TextContainer>
        <TitleText>{props.title}</TitleText>
        {props.taglist && 
          props.taglist.map((t, index) =>(
            <TagBadge key={index}>{t}</TagBadge>
          ))
        }
      </TextContainer>
      
    </Container>
  )    
}

export default CardItem