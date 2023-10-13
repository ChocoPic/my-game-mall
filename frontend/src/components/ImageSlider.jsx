import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {GoDotFill} from 'react-icons/go'
import { primary, secondaryLight} from '../color';
const Container = styled.div`
  width: auto;
  height: 520px;
  display: flex;
  flex-direction: vertical;
  justify-content: center;
  align-items: center;
  position: relative;
`
const StyledImage = styled.img`
  width: auto;
  height: 100%;
`
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 24px;
  display: flex;
  height: auto;
  width: auto;
`
const StyledButton = styled.button`
  width: ${props => props.w};
  height: ${props => props.h};
  display: inline;
  flex-direction: horiziontal;
  align-items: center;
  background-color: #ffffff00;
  color: ${props => props.cur? secondaryLight : primary};
  border: none;
  :hover{
    color: ${secondaryLight};
  } 
  
`
const ImageSlider = () => {
  const items = [
    "/img/image1.png", "/img/image2.png"
  ];

  const [curIndex, setCurIndex] = useState(0)

  useEffect(()=>{
    const time = setInterval(()=>{
      setCurIndex(curIndex => 
          curIndex == items.length-1 ? 0 : curIndex+1
        );
    },5000);
    return ()=>{
      clearInterval(time);
    };
  },[curIndex]);

  const onLeft = () => {
    setCurIndex(
      curIndex == 0 ? items.length-1 : curIndex-1
    )
  }
  const onRight = () => {
    setCurIndex(
      curIndex == items.length-1 ? 0 : curIndex+1
    )
  }

  return (
      <Container className='image-slider'> 
        {items.map((image,index) =>
          index==curIndex? 
          <StyledImage key={image}
            src={image}
            alt={image}
          />:''
        )}
        <ButtonContainer>
          <StyledButton onClick={onLeft}><FaArrowAltCircleLeft size={32}/></StyledButton>
          {Array.from({length:items.length},(_,index) => (
            index==curIndex?
            <StyledButton cur key={index} w={10} h={10} onClick={()=>setCurIndex(index)}><GoDotFill/></StyledButton>
            :<StyledButton key={index} w={10} h={10} onClick={()=>setCurIndex(index)}><GoDotFill/></StyledButton>
            ))}
          <StyledButton onClick={onRight}><FaArrowAltCircleRight size={32}/></StyledButton>
        </ButtonContainer>
    </Container>
  )
}

export default ImageSlider