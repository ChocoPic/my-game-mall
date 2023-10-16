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
  height: ${(props) => (props.h ? props.h : '2px')};
  background: ${(props) => (props.c ? props.c : 'rgba(0,0,0,0.2)')};
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
  position: relative;
`
const MoreButton = styled.button`
  position: absolute;
  bottom: -100px;
  left: 48%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: ${secondaryLight};
  border-radius: 20px; 
  border: none;
  padding: 4px 12px;
  cursor: pointer; 
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
  const [page, setPage] = useState(1); //더보기
  const [cnt, setCnt] = useState([]); //카테고리별 아이템 개수
  const itemsPerPage = 6;
  const platform = ["PC 게임", "모바일 게임", "닌텐도DS 게임"];

  
  ////카테고리(tags)를 세팅하는 함수
  function getTags(items){
    // 카테고리 목록 만들기
    let temp = [];
    items.forEach((item) => {
      item.tag.forEach((tag) => {
        if(!tag.includes("게임") && !temp.includes(tag)){
          temp.push(tag);
        }
      })
    })
    temp.sort();
    setTags([["전체보기"], ...temp, ...platform]);
  }
 
  ////카테고리 전환하는 함수
  function onChangeCategory(index){
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
    setPage(1); //카테고리 바뀌면 초기화
  }
  
  ///더보기 클릭시 실행할 함수
  function onMore(){
     const start = page * itemsPerPage;  //새로 표시될 아이템 인덱스
     const end = start + itemsPerPage - 1; //마지막으로 표시될 아이템 인덱스
     if(end < filteredProducts.length){
       setPage(page+1);
     }
  }


  useEffect(()=>{
    console.log('실행!');
    fetchData()
    .then((data) => {
      setProducts(data.products); //전체 데이터 불러오기
      setBanners(data.banners); //전체 배너 세팅하기
      getTags(data.products); // 전체 태그 종류 불러오기
      setFilteredProducts(data.products); //보여줄 데이터 세팅하기
    }).catch(error => console.log("데이터 로딩 실패", error));
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
            {/* 메뉴 */}
            <CategoryList>
              {tags.map((tag, index) => (
                <CategoryItem key={tag} 
                  picked={index===category? 1:0}
                  onClick={()=>onChangeCategory(index)}>
                  <CategoryItemText>{tag}</CategoryItemText>
                </CategoryItem>
              ))}
            </CategoryList>
            {/* 목록 */}
            <CardList>
              {/* 아이템들 */}
              {filteredProducts.map((product, index) => (
                (index < page*itemsPerPage) ? //더보기 전까지 표시
                  <CardItem key={index} 
                    id={product.id}
                    title={product.title}
                    taglist={product.tag}
                    img={`/my-game-mall/${product.image}`}
                    comment={product.comment}/>:''
                ))
              }
              {/* 더보기 버튼 */}
              {(page*itemsPerPage < filteredProducts.length-2)
                ? <MoreButton onClick={onMore}>더보기</MoreButton>
                : ''
              }
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