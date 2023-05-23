import React, { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null); // 새로운 state 추가
  const [selectedCapsuleIndex, setSelectedCapsuleIndex] = useState(null); // 새로운 state 추가

  /* 폰트 상태변경 */
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = '../fonts/MBC 1961 M.ttf';
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);
  }, []);
  
  const capsules = [
    '간 건강',
    '관절',
    '면역력',
    '뼈',
    '스트레스',
    '체지방 감소',
    '콜레스테롤',
    '피로',
    '피부',
    '항산화',
    '혈압 감소',
    '혈중 중성지질',
  ];

  /* CSS-in-JS 스타일 정의 */
  const styles = {

    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center', // Center align capsules horizontally
      alignItems: 'center', // Center align capsules vertically
      marginTop: '0px',
      color: 'black',
      width: '330px',
      overflowY: 'hidden',
      fontLink: 'MBC, Monaco, monospace',
      fontSize: '13px',
    },

    item: {
      backgroundColor: '#f8f8f8',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '13px',
      margin: '15px 0',
    },
    button: {
      marginTop: '15px',
      marginBottom: '15px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    image: {
      width: '100px',
      heigh: '100px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '10%',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
    },
    
    /* 로딩스패너 */
    loadingSpinner: {
      display: 'inline-block',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      border: '2px solid white',
      borderTopColor: 'transparent',
      margin: '10px',
      padding: '10px',
      animation: 'spin 0.1s linear infinite',

    },
    '@keyframes spin': {
      to: {
        transform: 'rotate(360deg)',
      },
    },
    
    /* 캡슐 css */
    capsule: {
      color: 'white',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '0px',
      marginBottom: '5px',
    },

    capsule_contain: {
      padding: '0px',
      border: selectedCapsule ? '2px solid limegreen' : 'none',
      borderRadius: '10%',
      marginRight: '7px',
      marginLeft: '7px',
      marginTop: '7px',
    }
  
  };

  const handleCapsuleClick = (index) => {
    setSelectedCapsuleIndex(index);
    setSelectedCapsule(capsules[index]);
    setData([]);
  };

  const fetchStressCareData = async (selectedCapsule, pageNo = 1) => {
    setIsLoading(true); // 로딩 상태로 설정
    const apiUrl = `https://apis.data.go.kr/1471000/HtfsTrgetInfoService02/getHtfsInfoList02?pageNo=${pageNo}&numOfRows=100&serviceKey=QHNMPa5CLUXHbl%2FmRjo1EwxmmagG5hGPsSBtFmX3Sv%2FaAyA%2BLS%2Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%3D%3D&type=json`;
  
    try {
      const response = await fetch(`${apiUrl}&pageNo=${pageNo}`);
      if (!response.ok) {
        throw new Error('API 오류입니다.');
      }
  
      const { body } = await response.json();
  
      const filteredData = body.items.filter((item) => item.item.PRIMARY_FNCLTY.includes(selectedCapsule));
      setData((prevData) => [...prevData, ...filteredData]);
  
      if (body.totalCount > pageNo * 100) {
        await fetchStressCareData(selectedCapsule, pageNo + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };
  
  
  const handleButtonClick = () => {
    if (selectedCapsuleIndex !== null) {
      const selectedCapsule = capsules[selectedCapsuleIndex];
      setData([]);
      fetchStressCareData(selectedCapsule);
    }
  };
  

  useEffect(() => {
    switch (selectedCapsule) {
      case '간 건강':
        // 간 건강 정보를 보여줍니다.
        break;
      case '관절':
        // 관절 정보를 보여줍니다.
        break;
      case '면역력':
        // 면역력 정보를 보여줍니다.
        break;
      case '뼈':
        // 뼈 정보를 보여줍니다.
        break;
      case '스트레스':
        // 스트레스 정보를 보여줍니다.
        break;
      case '체지방 감소':
        // 체지방 감소 정보를 보여줍니다.
        break;
      case '콜레스테롤':
        // 콜레스테롤 정보를 보여줍니다.
        break;
      case '피로':
        // 피로 정보를 보여줍니다.
        break;
      case '피부':
        // 피부 정보를 보여줍니다.
        break;
      case '항산화':
        // 항산화 정보를 보여줍니다.
        break;
      case '혈압 감소':
        // 혈압 감소 정보를 보여줍니다.
        break;
      case '혈중 중성지질':
        // 혈중 중성지질 정보를 보여줍니다.
        break;
      default:
        setShowResults(false); // 선택된 캡슐이 없을 때는 결과를 숨깁니다.
        break;
    }
  }, [selectedCapsule]);
  
  return (
    <div className="content">
    <div style={styles.container}>
      <div
          className={selectedCapsuleIndex === 0 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(0)}
          style={
            selectedCapsuleIndex === 0
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
        <img
          src="\capsule_src/간 건강.png"
          alt="간 건강"
          style={styles.image}
        />
        <p className='capsule' style={styles.capsule}>간 건강</p>
      </div>

      <div
          className={selectedCapsuleIndex === 1 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(1)}
          style={
            selectedCapsuleIndex === 1
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/관절.png"
            alt="관절"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            관절
          </p>
        </div>

        <div
          className={selectedCapsuleIndex === 2 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(2)}
          style={
            selectedCapsuleIndex === 2
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/면역력.png"
            alt="면역력"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            면역력
          </p>
        </div>

        <div
          className={selectedCapsuleIndex === 3 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(3)}
          style={
            selectedCapsuleIndex === 3
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/뼈.png"
            alt="뼈"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            뼈
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 4 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(4)}
          style={
            selectedCapsuleIndex === 4
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/스트레스.png"
            alt="스트레스"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            스트레스
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 5 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(5)}
          style={
            selectedCapsuleIndex === 5
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/체지방 감소.png"
            alt="체지방 감소"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            체지방 감소
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 6 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(6)}
          style={
            selectedCapsuleIndex === 6
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/콜레스테롤.png"
            alt="콜레스테롤"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            콜레스테롤
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 7 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(7)}
          style={
            selectedCapsuleIndex === 7
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/피로.png"
            alt="피로"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            피로
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 8 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(8)}
          style={
            selectedCapsuleIndex === 8
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/피부.png"
            alt="피부"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            피부
          </p>
      </div>


      <div
          className={selectedCapsuleIndex === 9 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(9)}
          style={
            selectedCapsuleIndex === 9
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/항산화.png"
            alt="항산화"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            항산화
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 10 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(10)}
          style={
            selectedCapsuleIndex === 10
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/혈압 감소.png"
            alt="혈압 감소"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            혈압 감소
          </p>
        </div>


        <div
          className={selectedCapsuleIndex === 11 ? 'capsule_contain' : ''}
          onClick={() => handleCapsuleClick(11)}
          style={
            selectedCapsuleIndex === 11
              ? { ...styles.capsule_contain, backgroundColor: 'limegreen', border: '2px solid limegreen' }
              : styles.capsule_contain
          }
        >
          <img
            src="\capsule_src/혈중 중성지질.png"
            alt="혈중 중성지질"
            style={styles.image}
          />
          <p className="capsule" style={styles.capsule}>
            혈중 중성지질
          </p>
        </div>


        {selectedCapsuleIndex !== null && (
          <button onClick={handleButtonClick} style={styles.button}>
            영양제 추천
          </button>
        )}

        
        {isLoading ? (

        <span style={styles.loadingSpinner}></span>

        ) : showResults ? (
          data.map(item => (
            <div key={item.item.PRDLST_NM} style={styles.item}>
              <h3>{item.item.PRDLST_NM}</h3>
              <br />
              <p>제조사: {item.item.BSSH_NM}</p>
              <p>제조일: {item.item.PRMS_DT}</p>
              <p>설명: {item.item.DISPOS}</p>
              <p>섭취방법: {item.item.NTK_MTHD}</p>
              <p>보관방법: {item.item.CSTDY_MTHD}</p>
              <p>주의사항: {item.item.IFTKN_ATNT_MATR_CN}</p>
              <p>기능: {item.item.PRIMARY_FNCLTY}</p>
              <p>규격: {item.item.STDR_STND}</p>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
export default Search;