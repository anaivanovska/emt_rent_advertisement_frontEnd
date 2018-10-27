import {tokenName, headerName} from '../Constants';

const TokenService = (response) => {
    const authorizationHeader = response.headers[headerName]
    const jwtToken = authorizationHeader.substring(7);
    localStorage.removeItem(tokenName);
    localStorage.setItem(tokenName, jwtToken);
}

export default TokenService;