import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './styles';
import login from '../../apis/login';

const Comp = ({ onSuccess }) => {
  const [data, setData] = useState({});
  const { width } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <WebView
        style={[{ width }]}
        source={{ uri: 'https://www.instagram.com/accounts/login/' }}
        injectedJavaScript={require('./injected-scripts/login').default}
        onMessage={createOnMessage({ data, setData, onSuccess })}
      />
    </View>
  );
};

export default Comp;

function createOnMessage({ data, setData, onSuccess }) {
  return (event) => {
    const input = JSON.parse(event.nativeEvent.data);
    if (input.type === 'setData') {
      setData((val) => ({ ...val, ...input.data }));
    } else if (input.type === 'submit') {
      login(data)
        .then(onSuccess)
        .catch(console.log);
    }
  };
}
