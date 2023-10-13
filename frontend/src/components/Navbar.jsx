import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { primary, primaryLight, secondaryDark, secondaryLight, tertiary, tertiaryLight } from '../color'

const Container =  styled.div`
  display: flex;
  padding: 0px 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${primaryLight};
`
const UserMenu = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: end;
`
const LogoText = styled.div`
  display: inline-block;
`
const C = styled.span`
  color: ${props => props.color};
  font-family: Jua;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`
const ProfileContainer = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  margin: 12px 0 12px 2px;
  border: solid 1px ${primaryLight};
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Navbar = () => {
  const LOGO = "MYPLAY".split("");  //출력할 텍스트
  const [curIndex, setCurIndex] = useState(0);//출력할 인덱스
 
  return (
    <Container>
      <LogoText>
        {LOGO.map((char, index) => (
          <C key={index}
            color={(index==0||index==2) ? secondaryDark : tertiary}
          >{char}</C>
        ))}
      </LogoText>
      <UserMenu>
        {/* <AiOutlineShoppingCart size={48} color={primaryLight}/> */}
        <ProfileContainer>
          <ProfileImg src="/img/프로필이미지.jpg" alt='프로필이미지'/>
        </ProfileContainer>
      </UserMenu>
    </Container>
  )
}

export default Navbar