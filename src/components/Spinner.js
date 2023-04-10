// styled-components와 useContext를 사용하여 스피너 생성하는 컴포넌트
import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import styled, { ThemeContext } from "styled-components/native";


// 스피너가 표시될 배경 요소를 정의하는 스타일 컴포넌트
const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;


// Container을 사용하여 스피너를 랜더링하는 함수형 컴포넌트
const Spinner = () => {
  const theme = useContext(ThemeContext); // 현재 사용하는 테마 정보를 가져옴.
  return(  // 스피너를 랜더링
    <Container>
      <ActivityIndicator size={"large"} color={theme.text} />
    </Container>
  );
};

export default Spinner;
