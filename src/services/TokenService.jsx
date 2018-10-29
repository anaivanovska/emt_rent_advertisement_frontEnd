import {tokenName, headerName} from '../Constants';

const TokenService = (response) => {
    console.log('Response in tokenService '  + response);
    console.log(response);
    const authorizationHeader = response.headers[headerName];
    console.log('Authorization header: ');
    console.log(authorizationHeader);
    const jwtToken = authorizationHeader.substring(7);
    localStorage.removeItem(tokenName);
    localStorage.setItem(tokenName, jwtToken);
    console.log(jwtToken + " - " + tokenName);
};

export default TokenService;