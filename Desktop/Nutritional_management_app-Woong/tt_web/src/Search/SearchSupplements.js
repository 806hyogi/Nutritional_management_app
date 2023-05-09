import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchSupplements = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://apis.data.go.kr/1471000/HtfsInfoService03', // 이 부분은 실제 API endpoint로 바꾸어야 합니다.
        {
          params: {
            serviceKey: 'QHNMPa5CLUXHbl%2FmRjo1EwxmmagG5hGPsSBtFmX3Sv%2FaAyA%2BLS%2Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%3D%3D', // 이 부분은 실제 API key로 바꾸어야 합니다.
            // 필요한 다른 파라미터들도 이 부분에 추가합니다.
          },
        },
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.ingredients.includes(searchTerm) // 'ingredients'는 실제 성분 데이터를 담고 있는 프로퍼티로 바꾸어야 합니다.
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ingredient"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {filteredData.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2> {/* 'name'은 실제 제품 이름 데이터를 담고 있는 프로퍼티로 바꾸어야 합니다. */}
          <p>{item.ingredients}</p> {/* 'ingredients'는 실제 성분 데이터를 담고 있는 프로퍼티로 바꾸어야 합니다. */}
        </div>
      ))}
    </div>
  );
};

export default SearchSupplements;