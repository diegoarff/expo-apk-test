import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function DebugError() {
  const [renderError, setRenderError] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Pressable
        style={{ backgroundColor: 'red', padding: 10 }}
        onPress={() => {
          setRenderError(true);
        }}
      >
        <Text style={{ color: 'white' }}>Trigger Render Error</Text>
      </Pressable>
      <Pressable
        style={{ backgroundColor: 'red', padding: 10 }}
        onPress={() => {
          throw new Error('This is a test uncaught error!');
        }}
      >
        <Text style={{ color: 'white' }}>Trigger Uncaught Error</Text>
      </Pressable>

      {renderError ? <SomeComponent /> : null}
    </View>
  );
}

const SomeComponent = () => {
  throw new Error('This is a test render error!');
  return <></>;
};
