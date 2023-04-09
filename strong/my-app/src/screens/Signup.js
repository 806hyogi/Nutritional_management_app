// 회원가입 페이지

import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext } from "../contexts";
import styled from 'styled-components/native'; // 패키지를 사용하여 스타일링
import { Image, Input, Button } from "../components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import {Alert} from 'react-native';
import {signup} from '../utils/firebase';


// 이미지 변수 정의
const images = {
  background: require('../../assets/images/background.png'),
};


// 전체화면을 차지하는 이미지 컴포넌트
const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
`;


// 전체 화면을 차지하는 View 컴포넌트
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
`;


// 회원가입의 제목을 나타내는 text 컴포넌트
const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;


// 회원가입의 정보를 입력하는 input 컴포넌트들을 담는 view 컴포넌트
const Contents = styled.View`
  backgroundColor: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
`;


const WhiteText = styled.Text`
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: white;
  margin-bottom: 13px;
`;


// signup 함수형 컴포넌트 정의
const Signup = () => {
  const { spinner } = useContext(ProgressContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();


  // 텍스트에 조건에 맞는 값 입력
  useEffect(() => {
      if(didMountRef.current){
        let _errorMessage = "";
        if(!name) {
          _errorMessage = "닉네임을 입력해주세요.";
        } else if(!validateEmail(email)) {
          _errorMessage = "이메일을 입력해주세요.";
        } else if(password.length < 6) {
          _errorMessage = "6자 이상의 비밀번호를 입력해주세요.";
        } else if (password!==passwordConfirm) {
          _errorMessage = "입력하신 비밀번호가 일치하지 않습니다.";
        } else {
          _errorMessage = "";
        }
        setErrorMessage(_errorMessage)
      } else {
        didMountRef.current = true;
      }
  }, [name, email, password, passwordConfirm]);


  // 상태 값이 변경되었을 때 errorMessage를 갱신하는 코드 작성
  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);


  // 회원가입 버튼이 눌렷을 때 실행되는 코드
  const _handleSignupButtonPress = async () => {
    try{
      spinner.start(); // spinner 시작

      const user = await signup({ email, password }); // firebase signup 함수 호출
      Alert.alert("Signup Success", user.email);

    } catch (e) {
      Alert.alert("Signup Error", e.message);

    } finally {
      spinner.stop(); // spinner 중지
    }
  };


  return (
    <Background source={images.background} resizeMode="cover">
        <KeyboardAwareScrollView
          extraScrollHeight={20}
          contentContainerStyle={{flex:1}}
        >
        <Container>
          <Title>회원가입</Title>
          <Contents>
            {errorMessage != "" ? <WhiteText>{errorMessage}</WhiteText> : null}
            <Input
              value={name}
              onChangeText={(text) => setName(text)}
              onSubmitEditing={() => {
                setName(name.trim());
                emailRef.current.focus();
              }}
              onBlur={() => setName(name.trim())}
              placeholder = "닉네임"
              returnKeyType="next"
            />
            <Input
              ref={emailRef}
              value={email}
              onChangeText={(text) => setEmail(removeWhitespace(text))}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="이메일"
              returnKeyType="next"
            />
            <Input
              ref={passwordRef}
              value={password}
              onChangeText={(text) => setPassword(removeWhitespace(text))}
              onSubmitEditing={() => passwordConfirmRef.current.focus()}
              placeholder="비밀번호"
              returnKeyType="next"
              isPassword
            />
            <Input
              ref={passwordConfirmRef}
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
              onSubmitEditing={_handleSignupButtonPress}
              placeholder="비밀번호 확인"
              returnKeyType="done"
              isPassword
            />
            <Button
              title="회원가입"
              disabled={disabled}
              onPress={_handleSignupButtonPress}
            />
          </Contents>
      </Container>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default Signup;