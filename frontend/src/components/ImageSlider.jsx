import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import {GoDotFill} from 'react-icons/go'
import {white, primary_dark, L, XL, M} from '../style_variable';

const FullWidthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`
const ImageSliderContainer = styled.div`
  height: 100%;
  min-width: 1080px;
  max-width: 1440px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: relative;
`
const BackBluredImg = styled.img`
  filter: blur(10px);
  position : absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
`
const Darker = styled.div`
  background-color: rgba(0,0,0,0.7);
  position : absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
`
// 배너 위 글자관련
const LayerContainer = styled.div`
  display: flex;
  width: 95%;
  height: 95%;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  z-index: 100;
`
const BannerTextContainer = styled.div`
  display: flex;
  width: 35%;
  min-width: 400px;
  max-width: 500px;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 32px;
  flex-shrink: 0;
  align-self: stretch;
`
const TitleText = styled.span`
  color: ${white};
  font-size: 72px;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.25);
  line-height: 90%;
  letter-spacing: -4px; 
  white-space: pre-wrap;
`
const MiniText = styled.span`
  align-self: stretch;
  color: ${white};
  text-shadow: 2px 2px 1px rgba(0,0,0,0.25);
  font-size: ${M};
  opacity: 90%;
  font-weight: 200;
  word-wrap: break-word; 
  overflow-wrap: break-word;
  white-space: pre-wrap;
`
//배너 이미지 관련
const StyledImage = styled.img`
  height: 520px;
  min-width: 1080px;
  max-width: 1080px;
  object-fit: cover;
`
//배너 이미지 넘기는 버튼 관련
const ButtonContainer = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: horizontal;
  align-items: end;
  justify-content: end;
  border-radius: 8px;
  gap: 8px;
`
const StyledButton = styled.button`
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬 */
  background-color: rgba(0,0,0,0);
  padding: 0px;
  margin: 0px;
  color: ${props => props.cur==1? primary_dark : 'white'};
  border: none;
  :hover{
    color: ${primary_dark};
  }   
`
const IndexText = styled.span`
  color : ${white};
  font-size: ${M};
  font-weight: 200;
  text-shadow: 2px 2px 1px rgba(0,0,0,0.25);
  vertical-align: bottom;
  &::first-letter {
    font-size: ${XL}; /* 원하는 크기로 조절 */
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
  //로딩 시간문제! 예외처리를 해주자
  return (
    <FullWidthContainer>
      {/* 화면이 큰 경우 보이는 배경 */}
      <BackBluredImg src={ items.length==0 ?'':`/my-game-mall/${items[curIndex].image}`} alt='배경'/>
      <Darker/>
      <LayerContainer>
          <BannerTextContainer>
            <TitleText>{items.length==0 ? '' : items[curIndex].title}</TitleText>
            <MiniText>{items.length==0 ? '' : items[curIndex].text}</MiniText>
          </BannerTextContainer>
          <ButtonContainer>
            <StyledButton onClick={onLeft}><AiOutlineLeft size={20}/></StyledButton>
            <IndexText>{curIndex+1} /{items.length}</IndexText>
            <StyledButton onClick={onRight}><AiOutlineRight size={20}/></StyledButton>
          </ButtonContainer>
        </LayerContainer>
      <ImageSliderContainer>
        {/* 이미지 */}
        {items && items.map((item, index) => (
          index==curIndex &&
          <>
          <StyledImage key={index}
            src={`/my-game-mall/${item.image}`}
            alt={item.id}
          />
          </>
        ))}
      </ImageSliderContainer>

    </FullWidthContainer>
  )
}

export default ImageSlider