import React, { useState, useEffect } from 'react';
import './App.css';

function Capsule() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [supplementData, setSupplementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiUrl = `https://apis.data.go.kr/1471000/HtfsTrgetInfoService02/getHtfsInfoList02?pageNo=1&numOfRows=100&serviceKey=QHNMPa5CLUXHbl%2FmRjo1EwxmmagG5hGPsSBtFmX3Sv%2FaAyA%2BLS%2Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%3D%3D&type=json`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API 오류입니다.');
      }
      
      const data = await response.json();
      const items = data?.response?.body?.items ?? [];
      setSupplementData(prevData => [...prevData, ...items]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const recommendSupplements = () => {
    if (isLoading) {
      return; // 데이터 로딩이 아직 완료되지 않은 경우 처리하지 않음
    }

    const selectedSupplements = supplementData.filter(item => selectedItems.includes(item.htfsCode));
  
    // 선택된 영양제 정보를 활용하여 처리하는 로직을 구현해야 함
    console.log(selectedSupplements);
    // 선택된 영양제 정보를 화면에 표시하거나 처리하는 로직을 작성해주세요.
  };
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedItems(prevItems => [...prevItems, value]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item !== value));
    }
  };

  return (
    <div className="content">
      <div>
        <label>
          <input
            type="checkbox"            
            value="1"
            checked={selectedItems.includes("1")}
            onChange={handleCheckboxChange}
          />
          스트레스케어
        </label>
        {/* 나머지 체크박스 항목들을 동일한 방식으로 추가 */}
      </div>
      <button onClick={recommendSupplements}>영양제 추천</button>
    </div>
  );
}

export default Capsule;

