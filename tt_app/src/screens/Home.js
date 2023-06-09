import React, { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Home = ({ route }) => {
  const { idToken, user } = route.params;
  const [webUrl, setWebUrl] = useState(null);

  useEffect(() => {
    // idToken을 URL 파라미터로 포함시킵니다.
    const url = `https://super-pika-e90d6b.netlify.app?token=${idToken}`;
    setWebUrl(url);

    Alert.alert('로그인', `${user.nickname}님, 로그인하셨습니다.`);
  }, [idToken, user]);

  return (
    <View style={{flex: 1}}>
      {webUrl ? (
        <WebView source={{ uri: webUrl }} />
      ) : (
        <Text>웹사이트 로딩 중...</Text>
      )}
    </View>
  );
};

export default Home;
