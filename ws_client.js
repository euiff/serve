const websocket = require('websocket-stream')
var http = require('follow-redirects').http;

// no lugar da url voce pode colocar o link direto de iptv de algum canal, ou pode colcar a url RTSP de uma câmera CFTV/IP
// ou caso voce tenha um arquivo de video hospedado em algum servidor, pode ser usado aqui tambem.
req = http.get(`https://livegarra.onrender.com/channel/UCuODGS_c39psNvI8f3bYN_g.m3u8`, (resposta) => { 
        
        // resposta da requisição da url
        console.log('status da resposta:', resposta.statusCode)
        
        //url do servidor onde está rodando o script server (lembre de abrir as portas necessarias no servidor)
        let ws = websocket('https://icb2.onrender.com/:8098') // é criado um objeto websocket para se conectar ao servidor
        
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
