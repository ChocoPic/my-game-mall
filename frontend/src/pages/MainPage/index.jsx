import React, { useEffect, useState } from 'react'
import ImageSlider from '../../components/ImageSlider'
import CardItem from './Components/CardItem';
import styled from 'styled-components';
import { primary, primaryLight, secondaryDark, secondaryLight } from '../../color';
import { fetchData } from '../../utils/fetchDatas';
import MyChart from '../../components/Chart';

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
  background-color: none;
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
  bottom: -80px;
  left: 48%;
  font-size: 1rem;
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
  width: 100%;
  height: auto;
`
const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 32px 0px;
`
const ChartDiv = styled.div`
  display: block;
  margin: 40px;
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
  
  ////카테고리(tags)를 세팅하는 함수
  function getTags(items){
    //// 카테고리 목록 만들기
    let temp_category = [];
    items.forEach((item) => {
      item.tag.forEach((tag) => {
        if(!temp_category.includes(tag)){
          temp_category.push(tag);
        }
      })
    })
    //카테고리 보기 좋게 정렬
    temp_category.sort(); //사전순 정렬
    temp_category.sort((a, b) => {  //플랫폼은 뒤로
      let aa = a.charAt(a.length-1);
      let bb = b.charAt(a.length-1);
      if(((aa=="임")&&(bb!="임"))||((aa=="임")&&(bb=="임"))){
        return 1
      }
      else{
        return -1
      }
    });
    setTags(["전체보기", ...temp_category]);

    
    ////카테고리별 개수 세기
    let temp_cnt = Array(temp_category.length+1).fill(0);
    temp_cnt[0] = items.length;
    items.forEach((item) => {
      item.tag.forEach((tag) => {
        for(let i=0; i<=temp_category.length; i++){ //카테고리==태그면 개수 +1 
          if(temp_category[i] == tag){
            temp_cnt[i+1]++;
          }
        }
      })
    })
    setCnt([items.length, ...temp_cnt]);
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
     if(page*itemsPerPage - filteredProducts.length < 0){
       setPage(page+1);
     }
  }

  useEffect(()=>{
    fetchData()
    .then((data) => {
      setProducts(data.products); //전체 데이터 불러오기
      setBanners(data.banners); //전체 배너 세팅하기
      getTags(data.products); // 전체 태그 종류 불러오기
      setFilteredProducts(data.products); //보여줄 데이터 세팅하기
    }).catch(error => console.log("데이터 로딩 실패", error));
  },[]);

  const about_platform = {
    labels: ["PC","모바일","콘솔"],
    datasets: [
      {
        data: [cnt[cnt.length-3],cnt[cnt.length-2],cnt[cnt.length-1]],
        backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)']
      },
    ],
  };
  const about_genre = {
    labels: tags.slice(1, tags.length-3),
    datasets:[
      {
        data: cnt.slice(2,cnt.length-3),
        backgroundColor:['#FF8080','#CDFAD5','#FFF89A','#9ADCFF','#C1AEFC']
      }
    ]
  };

  if(!products || !tags){
    return(<div>로딩중...</div>)
  }else{
    console.log(tags, cnt);
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
                  (index<page*itemsPerPage) ? //더보기 전까지 표시
                    <CardItem key={index} 
                      id={product.id}
                      title={product.title}
                      taglist={product.tag}
                      img={`/my-game-mall/${product.image}`}
                      comment={product.comment}/>:''
                  ))
                }
                {/* 더보기 버튼 */}
                {(page*itemsPerPage - filteredProducts.length < 0)
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
              <ChartContainer>
                <ChartDiv><MyChart data={about_platform} title='플랫폼별 게임현황' type='bar'/></ChartDiv>
                <ChartDiv><MyChart data={about_genre} title='장르 선호도' type='doughnut'/></ChartDiv>
              </ChartContainer>
            </div>
          </GameChartContainer>
      </>
    )
  } 
}

export default MainPage