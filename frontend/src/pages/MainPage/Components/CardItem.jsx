import React from 'react'
import styled from 'styled-components'
import { secondaryDark, secondaryLight } from '../../../color'

const Container = styled.div`
  background-color: #ffffff;
  width: 200px;
  height: 245px;
  display: block;
  border-radius: 4px;
  // box-shadow: 2px 2px 5px rgba(0,0,0,0.5)
`
const Img = styled.div`
  width: 200px;
  height: 150px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
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
//TODO: 태그 리스트 출력 안됨

const CardItem = (props) => {
  return (
    <Container>
      <Img src={props.img}/>
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