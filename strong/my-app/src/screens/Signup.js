import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native'; // 패키지를 사용하여 스타일링
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';

const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
`

// 회원가입 페이지
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;  // 전체화면을 차지하는 View 컴포넌트

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;  // 회원가입의 제목을 나타내는 text 컴포넌트

const Signup = () => {
  return (
    <Container>
      <Title>회원가입</Title>
    </Container>
  );
}; // 회원가입 페이지를 나타내는 함수형 컴포넌트

export default Signup;