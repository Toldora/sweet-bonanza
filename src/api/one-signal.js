import { oneSignalApi } from './instance';

const patchUser = async (onesignalId, properties) => {
  const response = await oneSignalApi.patch(
    `/apps/${
      import.meta.env.VITE_ONE_SIGNAL_APP_ID
    }/users/by/onesignal_id/${onesignalId}`,
    { properties },
  );
  return response.data;
};

export { patchUser };
