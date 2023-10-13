//데이터를 읽어오는 함수
export async function fetchData(name){
    try{
        const response = await fetch('http://localhost:5000/'+name);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('데이터 가져오기 실패', error);
    }
}