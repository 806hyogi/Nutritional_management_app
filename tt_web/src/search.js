import React, { useState } from 'react';
import './App.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    const apiUrl = `https://apis.data.go.kr/1471000/HtfsTrgetInfoService02/getHtfsInfoList02?pageNo=1&numOfRows=1000&serviceKey=QHNMPa5CLUXHbl%252FmRjo1EwxmmagG5hGPsSBtFmX3Sv%252FaAyA%252BLS%252Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%253D%253D&type=json&itemNm=${searchTerm}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setSearchResults(data.getHtfsInfoList02.item))
      .catch(error => console.error(error));
  }

  return (
    <div className="content">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button type="submit">검색</button>
      </form>
      {searchResults.map(result => (
        <div key={result.ndbNo}>
          <h3>{result.itemNm}</h3>
          <p>제조사: {result.mnfc}</p>
          <p>1회 제공량(g): {result.srvcAmt}</p>
          <p>칼로리(kcal): {result.calory}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;