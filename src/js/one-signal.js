import { ONE_SIGNAL_TAG } from '@/const/one-signal';

export const initOneSignal = () => {
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  window.OneSignalDeferred.push(OneSignal => {
    OneSignal.init({
      appId: '1e9d166b-c11a-46f1-b088-a511f69e05a6',
    });

    OneSignal.User.PushSubscription.addEventListener('change', event => {
      OneSignal.User.addTag(
        ONE_SIGNAL_TAG.registered,
        event.current.optedIn && event.current.token ? '1' : '0',
      );
    });
  });
};

export const changeUserTag = (key, value) => {
  if (!window.OneSignal || !key || !value) return;

  window.OneSignal.User.addTag(key, value);
};

export const waitForTagsUpdate = () => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const tags = window.OneSignal.User.getTags();

      if (tags[ONE_SIGNAL_TAG.registered] === '2') {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });
};

export const getIsUserOptedIn = () => {
  if (!window.OneSignal) return;

  return (
    window.OneSignal.User.PushSubscription.optedIn &&
    window.OneSignal.User.PushSubscription.token
  );
};
