import { ONE_SIGNAL_TAG } from '@/const/one-signal';

export const initOneSignal = () => {
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  if (!window.OneSignalDeferred) return;

  window.OneSignalDeferred.push(OneSignal => {
    OneSignal.init({
      appId: '1e9d166b-c11a-46f1-b088-a511f69e05a6',
    });

    OneSignal.Notifications.addEventListener('permissionChange', permission => {
      if (permission) {
        OneSignal.User.addTag(ONE_SIGNAL_TAG.registered, '1');
      }
    });
  });
};

export const changeUserTag = (key, value) => {
  if (!window.OneSignal || !key || !value) return;

  window.OneSignal.User.addTag(key, value);
};

export const getIsUserOptedIn = () => {
  if (!window.OneSignal) return;

  return (
    window.OneSignal.User.PushSubscription.optedIn &&
    window.OneSignal.User.PushSubscription.token
  );
};
