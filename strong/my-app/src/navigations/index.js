import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // 전체 내비게이션 구조 설정
import AuthStack from "./AuthStack"; // 네비게이션 스택 구조로 설정

const Navigation = () => {  // 앱 전체 내비게이션 구조를 설정하기 위한 컴포넌트.
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Navigation;