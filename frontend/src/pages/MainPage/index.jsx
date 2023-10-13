import React, { useEffect, useState } from 'react'
import ImageSlider from '../../components/ImageSlider'
import CardItem from './Components/CardItem';
import styled from 'styled-components';
import data from '../../testData.json';
import { primary, primaryLight, secondaryDark, secondaryLight } from '../../color';

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
  padding: 32px 0px;
  
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1px;
`
const CategoryItem = styled.span`
  background-color: ${props => props.picked===1 ? secondaryLight : primaryLight};
  color: ${props => props.picked===1 ? 'white' : primary};
  width: 100%;
  padding: 4px 8px;
  border-radius: 1rem 0 0 1rem;

  transition: background-color 0.3s;
  &:hover{
    background-color: ${secondaryDark};
    color: white;
    cursor: pointer;
  }
`
const CategoryItemText = styled.span `
  font-size: 16px;
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
  place-items: center;
  justify-self: center;
  padding-top: 32px;
  padding-left: 32px;
`
const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]); 
  const [filter, setFilter] = useState([]);
  
  //게임 목록(products)을 세팅하는 함수
  function getProducts(data){
    setProducts(data.products);
  }
  //카테고리(tags)를 세팅하는 함수
  function getTags(data){
    const temp = [];
    data.products.forEach((item) => {
      item.tag.forEach((tag) => {
        if(!temp.includes(tag)){
          temp.push(tag)
        }
      })
    })
    temp.sort();
    setTags([["전체보기"],...temp]);
  }
  //필터 세팅하는 함수
  function getFilter(){
    const temp = Array(tags.length).fill(0)
    temp[1]=1;
    temp[5]=1;
    setFilter(temp);
  }
  function onClickFilter(){
    //TODO: 전체보기(0번) 누르면 나머진 초기화
    //카테고리 필터링 클릭 구현하기
  }

  useEffect(()=>{
    if(data){
      getProducts(data);
      getTags(data);
      getFilter();
    }
    // fetch('../../testData.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const p = data.products; 
    //     setProducts(p);
    //   })
    //   .catch((error) => {console.error('데이터 로드 실패: ', error)});
    }, []);

  return (
    <>
        {/* 이미지 슬라이더 파트 */ }
        <ImageSlider/>
        {/* Game 목록 파트*/}
        <GameListContainer>
          <div>
            <MenuText>GAME LIST</MenuText>
            <Line/>
          </div>
          <Bottom>
            <CategoryList>
              {tags.map((tag, index) => (
                <CategoryItem key={tag} picked={filter[index]}>
                  <CategoryItemText>{tag}</CategoryItemText>
                </CategoryItem>
              ))}
            </CategoryList>
            <CardList>
              {products.map((product, index) => (
                <CardItem key={index} 
                  id={product.id}
                  title={product.title}
                  taglist={product.tag}
                  img={product.image}/>
              ))}
            </CardList>
          </Bottom>
          
        </GameListContainer>

    </>
  )
}

export default MainPage