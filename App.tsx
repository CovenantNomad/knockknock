import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '@/stores/AuthProvider';
import RootScreen from '@/screens/RootScreen';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootScreen />
              <Toast />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
