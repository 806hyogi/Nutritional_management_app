// 로그인 화면 컴포넌트

import React, {useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext } from '../contexts';
import styled from "styled-components/native";
import { TouchableOpacity, Text } from 'react-native';
import { Input, Button } from "../components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from "../utils/images";
import {Alert} from 'react-native';
import {login} from '../utils/firebaseConfig';


// 전체 화면을 이미지로 채우는 역할
const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
`;


// 전체 화면을 가득 채우며 수직 방향으로 중양 정렬을 하는 스타일을 가짐.
const Container = styled.View` 
  flex: 1;
  justify-content: center;
  padding: 0 80px;
`;


// 글꼴 사이즈와 bold을 사용하는 스타일을 가짐.
const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
`;


// 배경색을 가지고 있는 styled-component
const Contents = styled.View`
  backgroundColor: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 4px;
`;


// 글꼴 색상 흰색 + 오른쪽 정렬 (이메일을 입력해주세요.)
const WhiteText = styled.Text`
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: white;
  text-align: right;
  margin-bottom: 10px;
`;


// 로그인 컴포넌트에 nevigation 매개변수 받음.
const Login = ({ navigation }) => {
  // spinner 사용
  const {spinner} = useContext(ProgressContext);
  
  // 이메일, 비밀번호, 에러메세지, disabled 번수 초기화
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    const passwordRef = useRef(null); // useRef 사용.

    // email, password, errorMessage 값이 변경될때마다 disabled 업데이트
    useEffect(() => {
      setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    // email 값 변경
    const _handleEmailChange = (email) => {
      const changedEmail = removeWhitespace(email); // 공백 제거
      setEmail(changedEmail);
      setErrorMessage( // 이메일이 유효하지 않는 경우?
          validateEmail(changedEmail) ? "" : "이메일을 입력해주세요."
      );
    };
    
    // password 값 변경
    const _handlePasswordChange = (password) => {
      setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async() => {
      try {
        spinner.start(); // spinner 시작
        const user = await login({email, password}); // 이메일, 비밀번호 인자 전달
        Alert.alert("로그인 성공", user.email);

      } catch(e) {
        Alert.alert("로그인 실패", "이메일과 비밀번호를 다시 확인하세요.");

      } finally {
        spinner.stop(); // spinner 중지
      }
    };


// TouchableOpacity 터치하면 signup 스크린으로 이동 (onSubmitEditing에 빈값은 키보드 다음을 눌렀을때 아무일도 일어나지 않게함)
  return (
    <Background source={images.backgroundMe} resizeMode="cover">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex:1 }} // 전체화면 가득채움
        extraScrollHeight={20} // 키보드가 열렸을때 추가로 스크롤할 높이 설정
      >
      <Container>
        <Title>LOGIN</Title>
        <Contents>
            {errorMessage != "" ? <WhiteText>{errorMessage}</WhiteText> : null}
            <Input
              value={email}
              onChangeText={_handleEmailChange} // 컴포넌트의 동작
              onSubmitEditing={() => passwordRef.current.focus()} // 다음칸의 포커스 이동
              placeholder="이메일" // 미리 안내 메세지 출력
              returnKeyType='next'
            />
            <Input
              ref={passwordRef}
              value={password}
              onChangeText={_handlePasswordChange} // 컴포넌트의 동작
              onSubmitEditing={_handleLoginButtonPress} // 컴포넌트의 동작
              placeholder="비밀번호" // 미리 안내 메세지 출력
              returnKeyType='done'
              isPassword
            />
            <Button
              title="로그인"
              disabled={disabled}
              onPress={_handleLoginButtonPress} // 컴포넌트의 동작
            />
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <WhiteText>Sign up</WhiteText>
            </TouchableOpacity>
          </Contents>
        </Container>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default Login;