// 전체 내비게이션 구조 설정 구조 설정
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack"; // 로그인, 회원가입 네비게이션 스택 구조로 설정
import { Spinner } from "../components";
import { ProgressContext } from "../contexts";


const Navigation = () => {  // 앱 전체 내비게이션 구조를 설정하기 위한 컴포넌트.
    const { inProgress } = useContext(ProgressContext);
    return ( // 로딩중인 경우 앱 전체에서 로딩 스피너가 보이도록 구현
    <NavigationContainer>
      <AuthStack />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;