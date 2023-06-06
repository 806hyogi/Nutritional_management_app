import React, { useState } from 'react';

// 검색바 컴포넌트
const SearchBar = () => {
  // searchText 상태와 이를 업데이트하는 setSearchText 함수를 useState 훅을 사용하여 초기화
  const [searchText, setSearchText] = useState('');

  // 입력값 변경에 대한 이벤트 핸들러
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // 검색 버튼 클릭에 대한 이벤트 핸들러
  const handleSearch = () => {
    // 검색 기능을 여기에 구현합니다.
    console.log(`검색어: ${searchText}`);
  };

  // 검색바 컴포넌트를 렌더링
  return (
    <div>
      <input
        type="text"
        placeholder="게시글 검색..."
        value={searchText}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
