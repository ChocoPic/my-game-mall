import React, { useEffect, useState } from 'react'
import ImageSlider from '../../components/ImageSlider'
import CardItem from './Components/CardItem';
import styled from 'styled-components';
import { primary, primary_dark, black, white, gray, secondary, max_width, gray_light, M, XL, S, XS } from '../../style_variable';
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

// 배너
const BannerContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 520px;
`

//섹션 공용
const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: flex-start; /* 세로로 상단 정렬 */
  flex-direction: column;
  gap: 60px;
  padding: 0px 32px 0px 32px;
`
const SectionTitle = styled.div`
  display: flex;
  max-width: ${max_width};
  width: 100%;
  height: auto;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`
const TitleText = styled.span`
  color: ${black};
  text-align: start;
  font-size: ${XL};
  font-weight: bold;
  letter-spacing: -4px;
  display: block;
  white-space: nowrap;
`
const Line = styled.div`
  width: ${(props) => (props.w ? props.w : '100%')};
  height: ${(props) => (props.h ? props.h : '2px')};
  background: ${(props) => (props.c ? props.c : gray_light)};
  margin: ${props => props.margin? props.margin : '16px 0px'};
  border: none;
`
const SectionContent = styled.div`
  max-width: ${max_width};
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

//카테고리 목록 메뉴
const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 32px;
  height: 100%;
  width: 150px;
`
const CategoryItem = styled.span`
  background-color: ${white};
  display: flex;
  height: 32px;
  align-items: end;
  justify-content: end;
  text-align: right;
  
  width: ${props=> props.picked===1 ? '100%' : 'auto'};
  font-size: ${props=> props.picked===1 ? M : S};
  color: ${props=> props.picked===1 ? black : gray};
  border-bottom:  ${props => props.picked==1? '1px solid black' : 'none'};

  transition: 
    width 1s ease,
    font-size 0.1s ease;

  &:hover{
    color: ${props => props.picked_color};
    font-size: ${M};
    border-bottom: 1px solid ${props => props.picked_color};
    cursor: pointer;
  }
`

// 게임리스트
const GameListContainer = styled.div`
  display: flex;
  padding-top: 96px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`
const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  width: 100%;
  height 100%;
  justify-content: start;
  align-items: center;
  align-content: flex-start;
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
`
const BtnMargin = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  align-items: start;
  justify-content: center;
`
const MoreButton = styled.button`
  display: flex;
  font-size: ${S};
  padding: 0px 4px 4px 4px;
  width: auto;
  gap: 8px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-bottom: 1px solid ${gray};
  color: ${black};
  font-weight: bold;
  
  &:hover{
    cursor: pointer;
    color: ${primary};
    border-bottom: 1px solid ${primary};
  }
`

// 차트 영역
const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: ${max_width};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 64px;
`
const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 60px;
  margin-bottom: 60px;
`
const ChartDiv = styled.div`
  display: block;
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
  const platformCnt = 3;
  
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
        {/* Banner Section */ }
        <BannerContainer>
          <ImageSlider items={banners}/>
        </BannerContainer>
        {/* GameList Section*/}
        <Bottom>
          <GameListContainer>
            <SectionTitle>
              <Line w={'32px'} margin={'0px'} h={'4px'} c={black}/>
              <TitleText>GAME LIST</TitleText>
            </SectionTitle>
            <SectionContent>
               {/* 카테고리 목록(메뉴) */}
               <CategoryList>
                {tags.map((tag, index) => (
                  <>
                  {index==tags.length-platformCnt && <Line/>}
                  <CategoryItem key={tag} 
                    picked={index===category? 1:0}
                    onClick={()=>onChangeCategory(index)}
                    picked_color={index>tags.length-platformCnt-1? secondary :primary}>
                   {tag}
                  </CategoryItem>
                  </>
                ))}
              </CategoryList>
              {/* 게임 목록 */}
              <GameList>
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
                <BtnMargin>
                  {(page*itemsPerPage - filteredProducts.length < 0)
                    ? <MoreButton onClick={onMore}>더보기</MoreButton>
                    : ''
                  }
                </BtnMargin>
              </GameList>
            </SectionContent>
          </GameListContainer>
          {/* Summary Section */}
          <SummaryContainer>
            <SectionTitle>
              <Line w={'32px'} margin={'0px'} h={'4px'} c={black}/>
              <TitleText>SUMMARY</TitleText>
            </SectionTitle>
            <SectionContent>
              <ChartContainer>
                <ChartDiv><MyChart data={about_platform} title='플랫폼별 게임현황' type='bar'/></ChartDiv>
                <ChartDiv><MyChart data={about_genre} title='장르 선호도' type='doughnut'/></ChartDiv>
              </ChartContainer>
            </SectionContent>
          </SummaryContainer>    
        </Bottom>
      </>
    )
  } 
}

export default MainPage