const websocket = require('websocket-stream')
var http = require('follow-redirects').http;

// no lugar da url voce pode colocar o link direto de iptv de algum canal, ou pode colcar a url RTSP de uma câmera CFTV/IP
// ou caso voce tenha um arquivo de video hospedado em algum servidor, pode ser usado aqui tambem.
req = http.get(`https://live-as-01-03.video.globo.com/j/eyJhbGciOiJSUzUxMiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJjb3VudHJ5X2NvZGUiOiJCUiIsImRvbWFpbiI6ImxpdmUtYXMtMDEtMDMudmlkZW8uZ2xvYm8uY29tIiwiZXhwIjoxNjkzOTIwNTg1LCJpYXQiOjE2OTM4MzQxODUsImlzcyI6InBsYXliYWNrLWFwaS1wcm9kLWdjcCIsIm93bmVyIjoiNjBjMTMzOGYtZTNlMi00YjM1LThlMDItNzY5MTFjMTczNzc2IiwicGF0aCI6Ii9udS9mKGJNaW49MjAwMCxpPTIpL2dsb2JvLWNhdC9wbGF5bGlzdC5tM3U4In0.cVXJ-FxYmOHG99UHuxGP5QFVFQJ-HAvqJAFMH6M3WZBBPkNy7yepMSMQAI-ICRLJc7xDk5e9s1cb2p4IK3oSZGUzxOoJjsaRTT9E2LgEaj9gkbkFvyGpiA2JQk-ULDWfSBEAVJ6bnyMM0T0UpbLIR5tekFXDq0D6NP5UaQUpMYvYQBUX0VwRx6y821nFm5LJLIx-i3suzf1Y_FgdGkWgqKKFQ9Yun8S1PxFWUylrNzwWXO7aLN1Zl-AkqAV1AZK3H9ys8l5Ka8Aw__EMXf1vVC5xsFCxbGEcOQqVInGMZ8geSHTzEPAzEdBpvnQvMS3AIB9h-k4Fsb3rEMc9R19-8g/nu/f(bMin=2000,i=2)/globo-cat/globo-cat-audio_1=96000-video=3442944.m3u8`, (resposta) => { 
        
        // resposta da requisição da url
        console.log('status da resposta:', resposta.statusCode)
        
        //url do servidor onde está rodando o script server (lembre de abrir as portas necessarias no servidor)
        let ws = websocket('https://icb1.onrender.com/:8098') // é criado um objeto websocket para se conectar ao servidor
        
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
