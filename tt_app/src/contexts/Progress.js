import React, {useState, createContext} from 'react';

const ProgressContext = createContext({
  inProgress: false, // 로딩 상태를 나타냄
  spinner: () => {} // 로딩 스페너를 컨트롤
});


// inProgress를 변경할 수 있는 상태 useState, spinner함수 정의
const ProgressProvider = ({children}) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };

  const value = {inProgress, spinner}; // 로딩상태 관리
  return(
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };