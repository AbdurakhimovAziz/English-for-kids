import IToken from '../models/IToken';
import IUser from '../models/IUser';
import { SERVER_URL } from './constants';

const loginUser = async (user: IUser): Promise<IToken> => {
  return fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then((data) => data.json());
};

export default loginUser;
