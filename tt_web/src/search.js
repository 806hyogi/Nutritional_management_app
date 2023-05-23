import React, { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // CSS-in-JS 스타일 정의
  const styles = {
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0px',        
        color: 'black',
        width: '330px',
        overflowY: 'hidden',
        fontFamily: 'Monaco, monospace',
    },
    input: {
        width: '85%',
        padding: '10px',
        margin:'10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    item: {
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '13px',
        margin: '15px 0',
  },
};

  useEffect(() => {
    fetchPage(1);
  }, []);

  const fetchPage = async (pageNo) => {
    const apiUrl = `https://apis.data.go.kr/1471000/HtfsTrgetInfoService02/getHtfsInfoList02?pageNo=${pageNo}&numOfRows=100&serviceKey=QHNMPa5CLUXHbl%2FmRjo1EwxmmagG5hGPsSBtFmX3Sv%2FaAyA%2BLS%2Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%3D%3D&type=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API 오류입니다.');
      }
      
      const { body } = await response.json();
      setData(prevData => [...prevData, ...body.items.map(item => item.item)]);

      // 만약 더 많은 페이지가 있다면, 다음 페이지를 요청합니다.
      if (body.totalCount > pageNo * 100) {
        fetchPage(pageNo + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자가 검색어를 입력한 경우에만, 해당 검색어를 포함하는 아이템을 필터링해서 반환합니다.
  const filteredData = searchTerm
    ? data.filter(item => item.PRDLST_NM.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

    return (
      
    <div className="content">
      <div style={styles.container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          style={styles.input}
        />
        {filteredData.map(item => (
          <div key={item.PRDLST_NM} style={styles.item}>
            <h3>{item.PRDLST_NM}</h3>
            <br/>
            <p>제조사: {item.BSSH_NM}</p>
            <p>제조일: {item.PRMS_DT}</p>
            <p>설명: {item.DISPOS}</p>
            <p>섭취방법: {item.NTK_MTHD}</p>
            <p>보관방법: {item.CSTDY_MTHD}</p>
            <p>주의사항: {item.IFTKN_ATNT_MATR_CN}</p>
            <p>기능: {item.PRIMARY_FNCLTY}</p>
            <p>규격: {item.STDR_STND}</p>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default Search;