import { useCallback, useState } from 'react';
import CodePush, { DownloadProgress } from 'react-native-code-push';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const useCodePush = () => {
  const [progress, setProgress] = useState<DownloadProgress>();
  const [isUpdating, setIsUpdating] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const updateApp = useCallback(async () => {
    try {
      setIsUpdating(true);
      await CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        undefined,
        p => {
          setProgress(p);
        },
      );
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const checkUpdateApp = useCallback(async () => {
    try {
      const update = await CodePush.checkForUpdate();
      if (!update) {
        setUpdateAvailable(false);
      } else {
        setUpdateAvailable(true);
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: '업데이트 확인 중 오류가 발생했습니다',
        visibilityTime: 2000,
      });
    }
  }, []);

  return {
    progress,
    isUpdating,
    updateAvailable,
    updateApp,
    checkUpdateApp,
  };
};

export default useCodePush;
