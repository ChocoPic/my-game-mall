import React from 'react'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { primaryLight } from '../color'

const Container =  styled.div`
  display: flex;
  padding: 0px 32px;
  justify-content: space-between;
  align-items: center;
`
const UserMenu = styled.div`
  display: inline-flex;
  align-items: center;
  justifh-content: end;
`
const LogoText = styled.span`
  color: #000;
  // font-family: Noto-Sans-KR;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`
const ProfileContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin: 12px 0 12px 8px;
  border: solid 1px ${primaryLight};
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Navbar = () => {
  return (
    <Container>
      <LogoText>MYPLAY</LogoText>
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