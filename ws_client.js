const websocket = require('websocket-stream')
var http = require('follow-redirects').http;

// no lugar da url voce pode colocar o link direto de iptv de algum canal, ou pode colcar a url RTSP de uma câmera CFTV/IP
// ou caso voce tenha um arquivo de video hospedado em algum servidor, pode ser usado aqui tambem.
req = http.get(`http://live-as-01-03.video.globo.com/j/eyJhbGciOiJSUzUxMiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJjb3VudHJ5X2NvZGUiOiJCUiIsImRvbWFpbiI6ImxpdmUtYXMtMDEtMDMudmlkZW8uZ2xvYm8uY29tIiwiZXhwIjoxNjkzOTIxNTcwLCJpYXQiOjE2OTM4MzUxNzAsImlzcyI6InBsYXliYWNrLWFwaS1wcm9kLWdjcCIsIm93bmVyIjoiNjBjMTMzOGYtZTNlMi00YjM1LThlMDItNzY5MTFjMTczNzc2IiwicGF0aCI6Ii9udS9mKGJNaW49MjAwMCxpPTIpL2dsb2JvLWNhdC9wbGF5bGlzdC5tM3U4In0.A4aY4Y1qeQeUFY88xCns0iuY04gQMCpmeZQymf28SK5CPNoFfA3bXSzAAhMMnIz006O78TtX555ICRmi15jVqe5tTMHE0bzw67wh-VAZW2oZEKDLsh_KDw-52ehq2mz0nQ88pyBbvLBolyPIX6ZdiUnAtWzhPdENFBoDp4RZzc9jaA3WNZ9Ac3QQhEA_0WWmz7-46kAhBQo8r1g4SsLLHwwhOSCX8s1f5A0R4uYo8rQQGDOmqayB6X8vAcVbeXzg_-w9gO-7K7I8lREMRHM5z1UNaAy0j_MZ1cRphme2n-TBXISRsMJaoOwnQkdpLuaK3ShH8MZXjtMaDzVhoOtsuQ/nu/f(bMin=2000,i=2)/globo-cat/globo-cat-audio_1=96000-video=3442944.m3u8`, (resposta) => { 
        
        // resposta da requisição da url
        console.log('status da resposta:', resposta.statusCode)
        
        //url do servidor onde está rodando o script server (lembre de abrir as portas necessarias no servidor)
        let ws = websocket('http://191.252.93.185:8098') // é criado um objeto websocket para se conectar ao servidor
        
        // a stream de resposta é retransmitida atraves do websocket
        resposta.pipe(ws)

        resposta.once('data', () =>{
            console.log('enviando...')
        })
        resposta.on('error', ()=>{
            console.log('erro ao receber request...')
        })
        resposta.on("close", ()=>{
            console.log('encerrando stream...')
            resposta.unpipe(ws)
            ws.close()
        })
})
