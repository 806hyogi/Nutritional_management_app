import React, { useState } from "react";
import { StatusBar, Image } from "react-native";  // 화면 상단 상태바와 텍스트, 이미지 렌더링
import AppLoading from 'expo-app-loading'; // 앱이 처음 실행 될때 필요한 리소스가 모두 로드될 때까지 로딩화면 표시
import { Asset } from 'expo-asset'; // asset클래스의 이미지 파일과 같은 리소스를 캐시하고 로드
import * as Font from 'expo-font'; // 폰트를 객체를 가져와서 로드
import { ThemeProvider } from "styled-components/native";  // 전체 테마 적용
import { theme } from "./theme";  // theme.js파일에서 가져온 테마 객체를 themeprovider에 전달하여 앱 전체 적용.(스타일 속성 포함)
import Navigation from "./navigations";
import { ProgressProvider } from "./contexts";


// 배열로 받은 이미지를 캐시하고 캐시된 이미지를 반환하는 함수
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {  // image 배열의 요소가 문자열인지 이미지 파일인지?
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};


// 배열로 받은 폰트들을 로드하고 로드된 폰트들을 반환하는 함수
const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};



const App = () => {
  const [isReady, setIsReady] = useState(true);  // isReady의 상태를 관리

  const _loadAssets = async () => {
    const imageAssets = cacheImages([  // 이미지와 폰트를 로드
      require("../assets/icons/splash.png"), // 로딩 이미지 넣는곳
      ...Object.values(images),
    ]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };
  
  return isReady ? (   // isReady 값이 true일때 앱의 전반적인 테마 설정
    <ThemeProvider theme = {theme}>
      <ProgressProvider>
        <StatusBar barStyle="dark-content" hidden />
        <Navigation />
      </ProgressProvider>
    </ThemeProvider>
    ) : (
    <AppLoading// 앱이 로딩중일때 나타나는 이미지와 폰트
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
      /> 
    );
  };

export default App;