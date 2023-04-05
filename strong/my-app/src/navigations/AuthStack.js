// login과 Signup 컴포넌트를 포함하는 Stack을 생성
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup } from "../screens";

const Stack = createStackNavigator(); // 스택을 만듬

const AuthStack = () => {
  return (  // Stack.Screen 컴포넌트는 스택 내에서 새로운 화면을 생성하는 역할을함.
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}; // navigator는 stack을 구성하는 화면들의 네비게이션을 관리

export default AuthStack;