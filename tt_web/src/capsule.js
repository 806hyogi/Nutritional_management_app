import React, { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState([]);
  const [isStressCareChecked, setIsStressCareChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapsuleClicked, setIsCapsuleClicked] = useState(false);

  /* 폰트 상태변경 */
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = '../fonts/MBC 1961 M.ttf';
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);
  }, []);
  


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
      width: '430px',
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
      filter: isCapsuleClicked ? 'brightness(65%)' : 'none',
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
      border: isCapsuleClicked ? '2px solid limegreen' : 'none',
      borderRadius: '10%',
      marginRight: '7px',
      marginLeft: '7px',
      marginTop: '7px',
    }
  
  };

  const handleCapsuleClick = () => {
    setIsStressCareChecked(!isStressCareChecked);
    setIsCapsuleClicked(!isCapsuleClicked);
  };

  const fetchStressCareData = async () => {
    setIsLoading(true); // 로딩 상태로 설정
    const apiUrl = `https://apis.data.go.kr/1471000/HtfsTrgetInfoService02/getHtfsInfoList02?pageNo=1&numOfRows=100&serviceKey=QHNMPa5CLUXHbl%2FmRjo1EwxmmagG5hGPsSBtFmX3Sv%2FaAyA%2BLS%2Bp0bR19lkw0czMecHhPIc93D3dFxHl3cKJIg%3D%3D&type=json&stsfk=스트레스`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API 오류입니다.');
      }

      const { body } = await response.json();
      console.log(body.items); // 데이터 구조 확인
      const filteredData = body.items.filter(item => item.item.PRIMARY_FNCLTY.includes('간 건강'));
      setData(filteredData);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const handleButtonClick = () => {
    if (isStressCareChecked) {
      fetchStressCareData();
    }
  };

  useEffect(() => {
    if (!isStressCareChecked) {
      setShowResults(false); // 체크를 해제하면 결과를 숨깁니다.
    }
  }, [isStressCareChecked]);

  return (
    <div className="content">
      <div style={styles.container}>
      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/간 건강.png"
            alt="간 건강"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>간 건강</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/관절.png"
            alt="관절"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>관절</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/면역력.png"
            alt="면역력"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>면역력</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/뼈.png"
            alt="뼈"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>뼈</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/스트레스.png"
            alt="스트레스 케어"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>스트레스</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/체지방 감소.png"
            alt="체지방 감소"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>체지방 감소</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/콜레스테롤.png"
            alt="콜레스테롤"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>콜레스테롤</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/피로.png"
            alt="피로"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>피로</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/피부.png"
            alt="피부"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>피부</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/항산화.png"
            alt="항산화"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>항산화</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/혈압 감소.png"
            alt="혈압 감소"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>혈압 감소</p>
      </div>

      <div className={isCapsuleClicked ? 'capsule_contain' : ''} onClick={handleCapsuleClick} style={styles.capsule_contain}>
        <img
            src="\capsule_src/혈중 중성지질.png"
            alt="혈중 중성지질"
            onClick={() => setIsStressCareChecked(!isStressCareChecked)}
            style={styles.image}
          />
          <p className='capsule' style={styles.capsule}>혈중 중성지질</p>
      </div>

        {isStressCareChecked && (
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