import { ONE_SIGNAL_TAG } from '@/const/one-signal';

export const initOneSignal = () => {
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  window.OneSignalDeferred.push(OneSignal => {
    OneSignal.init({
      appId: import.meta.env.VITE_ONE_SIGNAL_APP_ID,
    });

    OneSignal.User.PushSubscription.addEventListener('change', event => {
      OneSignal.User.addTag(
        ONE_SIGNAL_TAG.registered,
        event.current.optedIn ? '1' : '0',
      );
    });
  });
};

export const getUserOnesignalId = () => {
  if (!window.OneSignal) return;

  return window.OneSignal.User.onesignalId;
};

export const getIsUserOptedIn = () => {
  if (!window.OneSignal) return;

  return (
    window.OneSignal.User.PushSubscription.optedIn &&
    window.OneSignal.User.PushSubscription.token
  );
};
