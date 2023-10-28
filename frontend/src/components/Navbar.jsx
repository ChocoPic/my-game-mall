import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { M, S, XL, XS, black, gray, primary, secondary_light} from '../style_variable'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/userFunction'

const Container =  styled.div`
  display: flex;
  padding: 0px 32px;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80px;
`
const UserMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  right: 0;
  padding: 2px 24px;
  width: 100%;
  height: 100%;
`
const LogoText = styled.div`
  display: inline-block;
`
const C = styled.span`
  color: ${props => props.color};
  font-family: Jua;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -2px;
`
const ProfileContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 12px;
  border: solid 1px ${gray};
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Button = styled.span`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 1.5rem;
  text-align: center;
  vertical-align: middle;
  color: ${black};
  font-size: ${XS};
  font-weight: 600;
  cursor: pointer;
`
const Navbar = () => {
  const LOGO = "MYPLAY".split("");  //출력할 텍스트
  const [curIndex, setCurIndex] = useState(0);//출력할 인덱스
  const [isAuth, setIsAuth] = useState();
  const [checkAuth, setCheckAuth] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    setIsAuth(sessionStorage.getItem("isAuth"));
  })
  // useEffect(()=>{  //useState가 비동기작업이라서 딜레이가 발생했다.
  //   //그동안의 해결책: 임시변수를 사용하기 / 로딩되면 랜더링하기
  //   //요번 해결책: 의존성배열을 넣어서 갱신되면 수행할 동작을 여기에 넣기 
  //   console.log(isAuth); 
  // },[isAuth])

  function handleLogout(){
    logout();
    setIsAuth(false);
  }

  return (
    <Container>
      <LogoText>
        {LOGO.map((char, index) => (
          <C key={index}
            color={index%2==0 ? primary : secondary_light}
          >{char}</C>
        ))}
      </LogoText>
      <UserMenu>
        {/* <AiOutlineShoppingCart size={48} color={primaryLight}/> */}        
        {isAuth==='true'?
            <><Button onClick={handleLogout}>로그아웃</Button>
            {/* <ProfileContainer>
              <ProfileImg src="./img/프로필이미지.jpg" alt='프로필이미지'/>
            </ProfileContainer>*/}</>
          :<Button onClick={()=>navigate('/login')}>로그인</Button> 
            
        }
      </UserMenu>
    </Container>
  )
}

export default Navbar