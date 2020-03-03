import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

// const Loading = () => <ActivityIndicator animating color={Colors.red800} />;
interface Props {
  visible: boolean;
  animation: 'none' | 'slide' | 'fade';
}
const Loading = (props: Props) => {
  return (
    <Spinner
      visible={props.visible}
      textContent="Loading..."
      textStyle={{color: '#253145'}}
      animation={props.animation}
    />
  );
};
export default Loading;
