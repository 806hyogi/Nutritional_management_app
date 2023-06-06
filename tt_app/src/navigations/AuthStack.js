// 네비게이션 함수를 사용하기 위한 스크린을 정의하는 js파일
// login과 Signup 컴포넌트를 포함하는 Stack을 생성
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"; // 스택 내비게이션 생성
import { Login, Signup, Home } from "../screens"; // 내비게이션 스택에 표시할 화면을 나타냄
import { Platform } from "react-native"; // android, ios 대한 정보 제공
import { MaterialIcons } from "@expo/vector-icons"; // 화살표 아이콘 제공

const Stack = createStackNavigator(); // 스택을 만듬

const AuthStack = () => {
  return (  // Stack.Screen 컴포넌트는 스택 내에서 새로운 화면을 생성하는 역할을함.
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login} // 로그인 컴포넌트
        options={{ headerShown: false }} // 화면 상단 헤더를 숨김
      />
      <Stack.Screen
        name="Signup"
        component={Signup} // Signup 컴포넌트
        options={{
          headerTransparent: true, // 헤더를 투명하게 만듬
          headerTitle: "", // 헤더의 제목을 제거
          headerBackTitleVisible: false, // 이전 화면의 제목을 표시하지 않도록함.
          headerTintColor: "white", // 헤더의 아이콘 색상을 흰색으로 설정.
          headerBackImage: ({ tintColor }) => { // 화살표 아이콘을 렌더링 하는 함수 전달.
            const style = {
              marginRight: 5,
              marginLeft: Platform.OS === "ios" ? 11 : 0,
            };
            return (
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={tintColor}
                style={style}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}; // navigator는 stack을 구성하는 화면들의 네비게이션을 관리

export default AuthStack;
