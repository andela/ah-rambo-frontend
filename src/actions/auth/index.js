import * as types from '../../actionTypes';

const authUser = () => ({ type: types.AUTHENTICATE_USER });
const deAuthUser = () => ({ type: types.DEAUTHENTICATE_USER });

export { authUser, deAuthUser };
