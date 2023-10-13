import React, { useEffect, useState } from 'react'
import ImageSlider from '../../components/ImageSlider'
import CardItem from './Components/CardItem';
import styled from 'styled-components';
import data from '../../testData.json';
import { primaryLight, secondaryLight } from '../../color';

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
  color: #000;
  font-family: 'Jua';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const Line = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.20);
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
  padding: 48px 0px;
  margin-left: 32px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`
const CategoryItem = styled.span`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
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
  // const tags = ["MMORPG", "AOS", "FPS", "퍼즐", "리듬", "액션", "어드벤쳐"];
  const [tags, setTags] = useState([]); 
  
  //게임 목록(products)을 세팅하는 함수
  function getProducts(data){
    setProducts(data.products);
  }

  //카테고리(tags)를 세팅하는 함수
  function getTags(data){
    const temp = []
    data.products.forEach((item) => {
      item.tag.forEach((tag) => {
        if(!temp.includes(tag)){
          temp.push(tag)
        }
      })
    })
    temp.sort();
    setTags(temp);
  }


  useEffect(()=>{
    if(data){
      getProducts(data);
      getTags(data);
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
        {/* 이미지 */ }
        <ImageSlider/>
        {/* Game */}
        <GameListContainer>
          {/* 카테고리(태그) */}
          <div>
            <MenuText>GAME LIST</MenuText>
            <Line/>
          </div>
          <Bottom>
            <CategoryList>
              {tags.map(tag => 
                <CategoryItem key={tag}>{tag}</CategoryItem>
              )}
            </CategoryList>
            <CardList>
              {data.products.map((product, index) => (
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