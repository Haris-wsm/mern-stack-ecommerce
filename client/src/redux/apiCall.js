import { publicRequest } from '../requestMothod';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

export const login = async (dispath, user) => {
  dispath(loginStart());

  try {
    const res = await publicRequest.post('/auth/login', user);
    dispath(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispath(loginFailure());
  }
};
