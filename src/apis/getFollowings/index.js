import CookieManager from 'react-native-cookies';
import axios from 'axios';

const fn = async (props = {}) => {
  // prettier-ignore
  const { ds_user_id: defaultUserId } = await CookieManager.get('https://www.instagram.com');
  const { userId = defaultUserId, first = 12, after } = props;
  const variables = { id: userId, first, after };
  // prettier-ignore
  const url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${JSON.stringify(variables)}`;
  return axios.get(url).then((res) => res.data);
};

export default fn;
