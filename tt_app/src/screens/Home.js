import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const Home = ({ route }) => {
  const { idToken, user } = route.params;
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    if (webViewLoaded) {
      Alert.alert('로그인', `${user.nickname}님, 로그인하셨습니다.`);
    }
  }, [webViewLoaded, user]);

  return (
    <WebView
      source={{ uri: `https://superb-pony-41e90a.netlify.app/${idToken}` }}
      onLoad={() => setWebViewLoaded(true)}
    />
  );
};

export default Home;
