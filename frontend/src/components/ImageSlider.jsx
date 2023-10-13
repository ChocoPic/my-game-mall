import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {GoDotFill} from 'react-icons/go'
import { primary, primaryLight, secondaryDark, secondaryLight} from '../color';

const SliderContainer = styled.div`
  width: 100%;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Container = styled.div`
  width: auto;
  height: 520px;
  position: relative;
`
const BackImg = styled.img`
  filter: blur(10px);
  position : absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`
const Darker = styled.div`
  background-color: rgba(0,0,0,0.7);
  position : absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const BannerText = styled.div`
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: rgba(0,0,0,0.7);
  background-color: rgba(255,255,255,0.3);
  border-radius: 1rem 0 0 1rem;
  padding: 0 0.5rem;
  position: absolute;
  bottom: 16px;
  right: 0;
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
  color: ${props => props.cur==1? secondaryDark : 'white'};
  border: none;
  :hover{
    color: ${secondaryDark};
  } 
  
`
const ImageSlider = (props) => {
  const { items } = props;
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
    <SliderContainer>
      <BackImg src={`/img/${items[curIndex].image}`} alt='배경'/>
      <Darker/>
      <Container className='image-slider'> 
        {items.map((item, index) => (
          index==curIndex &&
          <StyledImage key={index}
            src={`/img/${item.image}`}
            alt={item.id}
          />
        ))}
        <ButtonContainer>
          <StyledButton onClick={onLeft}><FaArrowAltCircleLeft size={32}/></StyledButton>
          {Array.from({length:items.length},(_,index) => (
            index==curIndex?
            <StyledButton cur={1} key={index} w={10} h={10} onClick={()=>setCurIndex(index)}><GoDotFill/></StyledButton>
            :<StyledButton cur={0} key={index} w={10} h={10} onClick={()=>setCurIndex(index)}><GoDotFill/></StyledButton>
            ))}
          <StyledButton onClick={onRight}><FaArrowAltCircleRight size={32}/></StyledButton>
        </ButtonContainer>
        {/* <BannerText>{items[curIndex].text}</BannerText> */}
      </Container>
    </SliderContainer>
  )
}

export default ImageSlider