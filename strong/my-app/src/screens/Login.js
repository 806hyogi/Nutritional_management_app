import React, {useState, useRef, useEffect } from 'react';  // react Hook(함수형 컴포넌트의 상태를 관리)
import styled from "styled-components/native";  // Container, Title 스타일드 컴포넌트 정의
import { TouchableOpacity, Text } from 'react-native';
import { Input, Button } from "../components"; // components에서 Input 받아옴
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from "../utils/images";


const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
`;
 
const Container = styled.View` 
  flex: 1;
  justify-content: center;
  padding: 0 80px;
`;   // 전체 화면을 가득 채우며, 수직 방향으로 중앙 정렬을 하는 스타일을 가지고 있다.

const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
`;    // 글꼴을 30px로 설정하고 굵은 글꼴을 사용하는 스타일을 가지고 있다.

const Contents = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 4px;
`;

// 이메일을 입력해주세요.
const WhiteText = styled.Text`
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: white;
  text-align: right;
  margin-bottom: 10px;
`;



const Login = ({ navigation }) => {   // 로그인 컴포넌트에 nevigation 매개변수 받음.
    const [email, setEmail] = useState("");  // 이메일 상태변수 선언 초기값 ""
    const [password, setPassword] = useState("");  // 비밀번호 상태 변수 선언 초기값 ""
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    const passwordRef = useRef(null); // 이요소에 참조로 연결(제어 가능)

    useEffect(() => {
      setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleEmailChange = (email) => {
      const changedEmail = removeWhitespace(email);
      setEmail(changedEmail);
      setErrorMessage(
          validateEmail(changedEmail) ? "" : "이메일을 입력해주세요."
      );
    };
  
    const _handlePasswordChange = (password) => {
      setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = () => {};

  return ( // TouchableOpacity 터치하면 signup 스크린으로 이동 (onSubmitEditing에 빈값은 키보드 다음을 눌렀을때 아무일도 일어나지 않게함)
    <Background source={images.backgroundColor} resizeMode="cover">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex:1 }}
        extraScrollHeight={20}
      >
      <Container>
        <Title>LOGIN</Title>
        <Contents>
            {errorMessage != "" ? <WhiteText>{errorMessage}</WhiteText> : null}
            <Input
              value={email}
              onChangeText={_handleEmailChange}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="이메일"
              returnKeyType='next'
            />
            <Input
              ref={passwordRef}
              value={password}
              onChangeText={_handlePasswordChange}
              onSubmitEditing={_handleLoginButtonPress}
              placeholder="비밀번호"
              returnKeyType='done'
              isPassword
            />
            <Button
              title="로그인"
              disabled={disabled}
              onPress={_handleLoginButtonPress}
            />
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <WhiteText>Sign up</WhiteText>
            </TouchableOpacity>
          </Contents>
        </Container>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default Login;