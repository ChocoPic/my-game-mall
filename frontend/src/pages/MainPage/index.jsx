import React, { useEffect, useState } from 'react'
import ImageSlider from '../../components/ImageSlider'
import CardItem from './Components/CardItem';
import styled from 'styled-components';
import { primary, primaryLight, secondaryDark, secondaryLight } from '../../color';
import { fetchData } from '../../utils/fetchDatas';

///////TODO:
///////상단바 프로필이미지 변경하기
///////페이지 하단 차트(필터 바꿔가면서 볼 수 있게)

/* <더 해볼만한거>
성능 개선
더보기 기능
이미지도 서버에 올리기
다크모드 라이트모드
로그인, 관리자페이지
데이터 더 넣기
*/


//전체
const GameListContainer = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: 32px;
  padding-right: 32px; 
  background-color: ${primaryLight}
`
//섹션 제목
const MenuText = styled.span`
  color: ${primary};
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
`
const Line = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(0,0,0,0.2);
`
//카테고리 영역
const Bottom = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const CategoryList = styled.div`
  width: auto;
  height 100%;
  padding: 16px 0px;
  
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0px;
`
const CategoryItem = styled.span`
  background-color: ${props => props.picked===1 ? secondaryLight : primaryLight};
  color: ${props => props.picked===1 ? 'white' : primary};
  width: 100%;
  padding: 2px 8px;
  border-radius: 1rem 0 0 1rem;

  transition: background-color 0.3s;
  &:hover{
    background-color: ${secondaryDark};
    color: white;
    cursor: pointer;
  }
`
const CategoryItemText = styled.span `
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  white-space: nowrap;
  pointer-events: none;
`
// 카드 영역
const CardList = styled.div`
  width: 100%;
  height 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
  place-items: start;
  justify-self: start;
  padding-top: 32px;
  padding-left: 64px;
`
// 차트 영역
const GameChartContainer = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: 32px;
  padding-right: 32px; 
  background-color: ${primaryLight}
`

const MainPage = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]); 
  const [category, setCategory] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  //카테고리(tags)를 세팅하는 함수
  function getTags(items){
    //카테고리 목록 배열 세팅
    let temp = [];
    items.forEach((item) => {
      item.tag.forEach((tag) => {
        if(!temp.includes(tag)){
          temp.push(tag);
        }
      })
    })
    temp.sort();
    setTags([["전체보기"], ...temp]);
  }

  //카테고리 전환하는 함수
  function changeCategory(index){
    setCategory(index);
    if(index!=0){
      let temp = []
      products.forEach(product=> {
        if(product.tag.includes(tags[index])){
          temp.push(product);
        }
      })
      setFilteredProducts(temp);
    }else{
      setFilteredProducts(products);
    }
  }

  useEffect(()=>{
    fetchData()
    .then((data) => {
      setProducts(data.products);
      setFilteredProducts(data.products);
      getTags(data.products);
      setBanners(data.banners);
    }).catch(error => console.log("배너 로딩 실패", error));
  },[]);


  return (
    <>
        {/* 이미지 슬라이더 파트 */ }
        <ImageSlider items={banners}/>
        {/* Game 목록 파트*/}
        <GameListContainer>
          <div>
            <MenuText>GAME LIST</MenuText>
            <Line/>
          </div>
          <Bottom>
            <CategoryList>
              {tags.map((tag, index) => (
                <CategoryItem key={tag} 
                  picked={index===category? 1:0}
                  onClick={()=>changeCategory(index)}>
                  <CategoryItemText>{tag}</CategoryItemText>
                </CategoryItem>
              ))}
            </CategoryList>
            <CardList>
              {filteredProducts.map((product, index) => (
                <CardItem key={index} 
                  id={product.id}
                  title={product.title}
                  taglist={product.tag}
                  img={product.image}
                  comment={product.comment}/>
              ))}
            </CardList>
          </Bottom>
        </GameListContainer>
        {/* 게임 차트로 보기 - chart.js? */}
        <GameChartContainer>
          <div>
            <MenuText>SUMMARY</MenuText>
            <Line/>
          </div>
        </GameChartContainer>
    </>
  )
}

export default MainPage