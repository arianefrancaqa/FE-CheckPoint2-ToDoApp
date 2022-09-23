// se for chamar o fetch usar async function
async function minhaFuncaoQueChamaoFetch(param1, param2) {
    const response = await fetch('<url>')
    
    if (response.status !== 200) {
        //return undefined
        throw new Error('Um erro ocorreu na chamada da API')
    }
    const responseJson = response.json()
    return responseJson
}

// se for invocar a funcao async escrever await antes
async function minhaFuncaoQueChamaAsyncFunction() {
    const response = await minhaFuncaoQueChamaoFetch('param1', 'param2')
    // soh chega nessa linha depois que recebeu o resultado
    // da chamada da api
    // verificar valor retornado pela API
    // e escrever a logica que depende deste valor
    console.log(response)
}