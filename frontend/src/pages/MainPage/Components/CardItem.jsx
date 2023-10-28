import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { M, S, XS, black, card_height, card_width, gray, gray_light, primary, secondary, secondary_dark, secondary_light, white } from '../../../style_variable'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  background: ${white};
  width: 280px;
  position: relative;
  margin-bottom: 32px;
`
const Back = styled.div`
  z-index: 0;
  width: 70%;
  height: 50%;
  margin: 16px;
  position: absolute;
  top: 0;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${XS};
  white-space: pre-wrap;
  word-wrap: break-word; 
  color: ${black};
`
const Img = styled.div`
  z-index: 1;
  width: ${props => (props.hovered==1 ? '1px' : '100%') };
  height: 210px;
  border-radius: 12px;
  outline: 2px solid rgba(0,0,0,0.1);
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-color: ${gray};

  transition: ${props => (props.hovered===1 ? 'width 1s ease' : 'none')};
`
const TextContainer = styled.div`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  // border: 1px solid ${gray_light};
`
const TitleText = styled.span`
  color: black;
  font-size: ${M};
  font-weight: normal;
`
const BadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 4px;
  align-self: stretch;
  flex-wrap: wrap;
`
const TagBadge = styled.span`
  display: flex;
  font-size: ${XS};
  font-weight: semi-bold;
  padding: 6px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  opacity: 0.8;
  background: ${props => props.platform==1? secondary : primary};
  color: ${white};
`

const CardItem = (props) => {
  const [hovered, setHovered] = useState(0);

  return (
    <Container 
    onMouseEnter={() => setHovered(1)}
    onMouseLeave={() => setHovered(0)}
    hovered={hovered}>
      <Img src={props.img} hovered={hovered}/>
      <Back>
        {props.comment}</Back>
      <TextContainer>
        <TitleText>{props.title}</TitleText>
        <BadgeContainer>
        {props.taglist && 
          props.taglist.map((t, index) =>(
            t.slice(-2)=="게임"? 
            <TagBadge key={index} platform={1}>{t}</TagBadge>
            :<TagBadge key={index}>{t}</TagBadge>
          ))
        }
        </BadgeContainer>

      </TextContainer>
      
    </Container>
  )    
}

export default CardItem