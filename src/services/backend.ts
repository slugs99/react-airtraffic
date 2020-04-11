import axios from 'axios';
import { sendGet, sendPost } from 'services/BackendFactory';

const usersGET = async (opts: Request): Promise<Response> => {
  return sendGet({
    resource: `user/`,
    ...opts,
  });
};

const userPOST = async (
  opts: RequestPOST<{
    email: string;
    name?: string;
    password: string;
  }>,
): Promise<Response> => {
  return sendPost({
    resource: `user/`,
    ...opts,
  });
};

const loginPOST = async (
  opts: RequestPOST<{
    email: string;
    password: string;
  }>,
): Promise<UserData> => {
  return sendPost({
    resource: `auth/login`,
    ...opts,
  });
};

const getFlights1hourInterval = async (): Promise<[]> => {
  const end = Math.floor(new Date('2020-03-01').getTime() / 1000),
  begin = Math.floor(end - 60 * 60);
  const flightsUrl = `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`;
  return axios
      .create({
        timeout: 25000,
        headers: { 'Content-Type':  'application/json' }
      })
      .get(flightsUrl)
      .then((res) => {
        return res.data;
      });
}



export default usersGET;
export { usersGET, userPOST, loginPOST, getFlights1hourInterval };