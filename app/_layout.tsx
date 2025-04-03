import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SystemBars } from 'react-native-edge-to-edge';
import * as Sentry from '@sentry/react-native';
import { Pressable, Text, View } from 'react-native';

Sentry.init({
  dsn: 'https://84bb2ff4871800e3f9ad24586e126af5@o4509079718133761.ingest.us.sentry.io/4509087015567360',

  // Session replay settings
  replaysSessionSampleRate: __DEV__ ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [Sentry.mobileReplayIntegration()],

  debug: __DEV__, // Enable debug mode in development

  // enabled: !__DEV__, // Don't send reports for development builds
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Sentry.ErrorBoundary
      fallback={(error) => {
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: 'red' }}>
              An error occurred: {error.eventId}
            </Text>
            <Pressable
              style={{ backgroundColor: 'red', padding: 10 }}
              onPress={() => {
                // Handle the error or navigate to an error screen
                error.resetError();
              }}
            >
              <Text style={{ color: 'white' }}>Reset error</Text>
            </Pressable>
          </View>
        );
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <SystemBars />
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  );
});
