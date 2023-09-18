import api from './api';
import fb from './fb';

import type { Response } from '../types/resopnseType';

async function getJwtToken() {
  await fb.loadScript();
  fb.init();
  const response: Response = (await fb.getLoginStatus()) as Response;
  let accessToken: string;
  if (response['status'] === 'connected') {
    accessToken = response.authResponse.accessToken;
  } else {
    const response: Response = (await fb.login()) as Response;
    if (response['status'] === 'connected') {
      accessToken = response.authResponse.accessToken;
    } else {
      throw new Error('登入失敗');
    }
  }
  const { data } = await api.signin({
    provider: 'facebook',
    access_token: accessToken,
  });
  const jwtToken = data.access_token;
  return jwtToken;
}

export default getJwtToken;
