import { baseUrl } from './constants.js'

export async function login(emailEntry, passwordEntry) {
    let postBodyLogin = {
      email: emailEntry,
      password: passwordEntry
    };
  
    const response = await fetch(`${baseUrl}/v1/users/login`, {
      method: "POST",
      body: JSON.stringify(postBodyLogin),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    if (response.status !== 201) {
        return undefined
    }

    const responseJson = await response.json()
    const jwt = responseJson.jwt
    return jwt
}

export async function signup(nome, sobrenome, email, password) {    
    let postBodyLogin = {
        firstName: nome,
        lastName: sobrenome,
        email: email,
        password: password
    };
      
    const response = await fetch(`${baseUrl}/v1/users`, {
        method: "POST",
        body: JSON.stringify(postBodyLogin),
        headers: { 
            "Content-type": "application/json; charset=UTF-8" 
        },
    })
    
    if (response.status !== 201) {
        return undefined
    }

    const responseJson = await response.json()
    const jwt = responseJson.jwt

    return jwt
}

export async function getMe() {
    const response = await fetch(`${baseUrl}/v1/users/getMe`,{
        headers: { 
            "Content-type": "application/json; charset=UTF-8" ,
            authorization: getJwt(),
        },
    })

    if (response.status !== 200) {
        return undefined
    }

    const responseJson = await response.json()
    return responseJson
}

export function getJwt() {
    let token = localStorage.getItem("jwt_ctd");
    console.log(`Retorno do getJwt(): ${token}`);
    return token;
}