import {tokenName, headerName} from '../Constants';

const TokenService = (response) => {
    if(response === false) {
        localStorage.removeItem(tokenName);
    } else {
        const authorizationHeader = response.headers[headerName];
        const jwtToken = authorizationHeader.substring(7);
        localStorage.removeItem(tokenName);
        localStorage.setItem(tokenName, jwtToken);
    }
};

export default TokenService;