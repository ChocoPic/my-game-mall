//데이터를 읽어오는 함수
const jsonServerPath = 'https://chocopic.github.io/testDB/index.json';
const jsonLocalPath = '/testData.json';

//json-server 버전
export async function fetchData(){
    try{
        const response = await fetch(jsonServerPath);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('데이터 가져오기 실패', error);
    }
}