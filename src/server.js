const fs = require('fs');
import Messages from './app/models/Messages';
import BotDialog from './app/models/BotDialog'
import Conversation from './app/models/Conversation'
import ConversationStage from './app/models/ConversationStage'
const app = require('./app');
const https = require('https');
const server = https.createServer(app);
const venom = require('venom-bot');
const port = 3331;
const { Server } = require('socket.io')

const io = require("socket.io")(server, {
    cors: {
        // origin: "http://localhost",
        origin: "*",
        methods: ["GET", "POST"],
      }
});

let clients = [];

app.get('/teste-servidor', function(req,res) {
    return res.json({teste: true})

})

io.on("connection", function (socket_client) { 
    const id = socket_client.id
    console.log("##############")
    console.log(socket_client.handshake.query.user);
    console.log("##############")
    clients[socket_client.handshake.query.user] = id 
    app.get('/conectar', function(req,res) {
        const token = req.query.token
        // const client_id = clients['5521979394604@c.us']
        const client_id = clients[socket_client.handshake.query.user]

        // socket_client.to(client_id).emit("teste")

        venom.create({
            session: token, //name of session
            multidevice: true, 
            logQR: false,
            headless: true,
            useChrome: false,
            chromiumVersion: '970485',
            statusFind: (statusSession, session) => {
                console.log('=============' + statusSession + '===================');
                console.log('Session name: ', session);
            },
            catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
    
                console.log(base64Qrimg)
                console.log(asciiQR)
                console.log('====DISCONECTED ======')
                socket_client.to(client_id).emit("wpp_disconnected")
    
                var matches = base64Qrimg.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/),
                    response = {};
                
                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }
       
                response.type = matches[1];
                response.data = new Buffer.from(matches[2], 'base64');
                
                var imageBuffer = response;
    
                require('fs').writeFile(
                    './src/images/out.png',
                    imageBuffer['data'],
                    'binary',
                    function (err) {
                        if (err != null) {
                            console.log(err);
                        }
                    }
                );
                console.log('============mudou========')
                
                socket_client.to(client_id).emit('ready', base64Qrimg)
                // socket_client.to(client_id).emit('ready', './images/out.png')
            },
            
        })
        .then((client) => {
            console.log("wpp_disconnected")

            start(client, client_id, token)
        })
        .catch((erro) => {
            console.log(erro);
        });
    })
    // })

    async function start(client, client_id, token) {
        // socket_client.emit('wpp_connected')
        let url = ''
        console.log("=========================================")
        console.log(client_id)
        console.log("=========================================")
        socket_client.to(client_id).emit("wpp_connected")
        console.log('====CONECTED ======')
        // console.log(client_id)

        // io.on("connection", function (socket_client) {  
            
            client.onMessage(async (message) => {
                if (message.type != venom.MessageType.STICKER) {
                // const client_id = clients['5521979394604@c.us']
                // socket_client.to(client_id).emit("update", 'message')
                const conversation = await Conversation.findOne({
                    where: {
                        chat_id: message.from
                    }
                })
                
                if(conversation){
                    console.log('#############################')
                    console.log(message)
                    console.log('#############################')

                    const socketId =  clients[conversation.ssid]
                

                // return false
                    const mensagem = message.body
                    const from = message.from
                    const contact_name = message.sender.pushname
     
                // if (message.from === "5521981642364@c.us") {
                //     const conversation = await Conversation.findOne({
                //         where: {
                //             user_id: 1,
                //             chat_id: "5521981642364@c.us"
                //         }
                //     })
                    
                //     if(conversation)
                //     {
                //         const stage = await ConversationStage.findOne({
                //             where: {
                //                 conversation_id: conversation.id,
                //                 end_at: null
                //             }
                //         })
                //         console.log('=====================')
                //         console.log(stage)
                //         // return false
                //         if(!stage){
                //             let dialog = await BotDialog.findOne({
                //                 where: { action: 'start' }
                //             })
                //             console.log(contact_name)
                //             let options = `${dialog.message_bot}`
                //             let resp = ''
                //             if(dialog.response_options){
                //                 resp = JSON.parse(dialog.response_options)
                //                 resp.options.map(e => {
                //                     options += `\n\n${e.call_dialog}- ${e.value} \n`
                //                 })  
                //             } 

                //             client.sendText(from, options)
                //             .then(async (result) => {
                //                 if(!result.error){
                //                     await ConversationStage.create({
                //                         conversation_id: conversation.id,
                //                         dialog_id: dialog.id,
                //                         start_at: new Date()
                //                     })
                //                 }
                //                 console.log("Result: ", result); //return object success
                //             })
                //             .catch((erro) => {
                //                 console.error("Error when sending: ", erro); //return object error
                //             });
                //             console.log(options)
                //             return false
                //         }

                //         let dialog = await BotDialog.findOne({
                //             where: { id: stage.dialog_id }
                //         })

                //         let sequence = dialog.sequence

                //         if(dialog.response_options){

                //             if( dialog.sequence === 0){
                //             let resp = ''
                //                     resp = JSON.parse(dialog.response_options)

                //                 for(var i=0; i < resp.options.length; i++){
                //                     if(String(resp.options[i].call_dialog) === String(mensagem)){
                //                         sequence = mensagem
                //                     }
                //                 }
                //             }
                //         } 

                //         let nextMessage = await BotDialog.findOne({
                //             where: { id: sequence }
                //         })
                //         // console.log(sequence)
                //         // console.log(nextMessage)
                //         // return false
                //         let options = `${nextMessage.message_bot.replace('{{nome}}', mensagem)}`
                //         let resp = ''
                //         if(nextMessage.response_options){
                //             resp = JSON.parse(nextMessage.response_options)
                //             options += `\n\n`
                            
                //             resp.options.map(e => {
                //                 options += `${e.call_dialog}- ${e.value} \n`
                //             })  
                //         } 

                //         client.sendText(from, options)
                //             .then(async (result) => {
                //                 if(!result.error){
                //                     await stage.update({
                //                         dialog_id: nextMessage.id,
                //                     })
                //                 }
                //                 console.log("Result: ", result); //return object success
                //             })
                //             .catch((erro) => {
                //                 console.error("Error when sending: ", erro); //return object error
                //             });
                //         return false
                //     }
                //     // let dialog = await BotDialog.findOne({
                //     //     where: { sequence: mensagem }
                //     // })
                     
                //     // if(!dialog){
                //     //     dialog = await BotDialog.findOne({
                //     //         where: { sequence: 1 }
                //     //     })
                //     // }
     
                //     // let options = `${dialog.message_bot.replace('{nome}', contact_name)}\n\n`
                //     // let resp = ''
                //     // if(dialog.response_options){
                //     //     resp = JSON.parse(dialog.response_options)
                //     //     resp.options.map(e => {
                //     //         options += `${e.call_dialog}- ${e.value} \n`
                //     //     })  
                //     // } 
                     
                    
    
                // }
     
                    const a = message;

                    try {
                        let contact2 = {}
                        let chat = {}
                        let url = ''
                        
                        try {
                            const image = await client.getProfilePicFromServer(String(a.from));
                            url = image? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                        } catch (error) {
                            url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                        }
                        const message = {
                            sender: a.from,
                            body: a.content,
                            time: new Date(a.t),
                            timestamp: a.t,
                            audioBase64: '',
                            isAudio: false,
                            status: 1,
                            recvId: a.to,
                            receivid: a.fromMe,
                            recvIsGroup: false,
                            id:  a.to,
                            isImage: false,
                            imageUrl: ''
                        }
                        
                        
                        await new Promise(async (resolve, reject) => {  
            
                            if (a.type == venom.MessageType.VOICE) {
                                const buffer = await  client.decryptFile(a);
                                const audio64 =  buffer.toString('base64');
        
                                message.audioBase64 = audio64
                                message.isAudio = true
                                message.body = ''
                                
                            }
                            
                            resolve()
                    }); 
                        // console.log(message)
                        // return false
                        //------------- IMAGEM
                        await new Promise(async (resolve, reject) => {  
            
                            if (a.type == venom.MessageType.IMAGE) {
                                const buffer = await  client.decryptFile(a);
                                const imagem64 =  buffer.toString('base64');
        
                                message.imageUrl = imagem64
                                message.isImage = true
                                // message.body = ''
                                
                            }
                            
                            resolve()
                        }); 

                        // if (a.type == venom.MessageType.IMAGE) {
                        //     const buffer = await client.decryptFile(a);
                        //     await fs.writeFile('teste.jpg', buffer, (err) => {
                                
                        //     });
                        //     var imageAsBase64 = await fs.readFileSync('./teste.jpg', 'base64');
                        //         message.imageUrl = imageAsBase64
                        //         message.isImage = true
                        // }
                        // console.log('===============')
                        // console.log(socketId)
                        // console.log(clients)
                        // console.log('===============')
                        socket_client.to(socketId).emit("update", message)
                        
                        // io.to(client_id).emit("update", message);
                        // socket_client.emit("update", message);
        
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            });
            
            url = '/'+token+'/checkStatus'
            // console.log("URL 1::::::"+ url)
            app.get(url, async (req, res) => {
                return res.json({status: 'OK'})
            })
            
            url = '/'+token+'/receive'
            // console.log("URL 2::::::"+ url)

            app.get(url,  async(req,res)=>{
                // const client_id = clients['5521979394604@c.us']
                const message = {
                    sender: '5521972527882@c.us',
                    body: 'Hi',
                    time: '1970-01-20T01:35:56.825Z',
                    timestamp: 1647356825,
                    status: 1,
                    recvId: '5521979394604@c.us',
                    recvIsGroup: false,
                    id: '5521979394604@c.us'
                  }
    
                  try {
                      io.to(client_id).emit("update", message);
                      socket_client.to(client_id).emit("update", message);
                  } catch (error) {
                    console.log(error)                      
                  }
            });

            url = '/'+token+'/send'
            // console.log("URL 3::::::"+ url)
            
            app.post(url, async(req,res)=>{    
                const number = req.body.number;
                const message = req.body.message;
        
                client.sendText(number, message).then(response =>{
                    res.status(200).json({
                        status: true,
                        message: 'Mensagem enviada',
                        response: response
                    });
                }).catch(err =>{
                    res.status(500).json({
                        status: false,
                        message: 'Mensagem não enviada',
                        response: err.text
                    });
                });
            });
            url = '/'+token+'/chat/allmessages'
            app.get(url, async(req,res)=> {
                const number = req.query.number_chat
                const conversation = await client.getAllMessagesInChat(String(number));
                

                let allmessages = []
                
                await new Promise(async (resolve, reject) => { 
                for(var i=0; i < conversation.length; i++){
                    let chat = {}
                    const conv = conversation[i]
                   
                    // console.log("::::::::::::::::::::::::::::")
                    // console.log(conv)
                    // console.log("::::::::::::::::::::::::::::")
                    const message = {
                        sender: conv.from,
                        body: conv.content,
                        time: new Date(conv.timestamp),
                        timestamp: conv.timestamp,
                        status: 1,
                        recvId: conv.to,
                        receivid: conv.fromMe,
                        recvIsGroup: false,
                        id: conv.rowId,
                        isImage: false,
                        imageUrl: ''
                    }
                        
                    if (conv.type == venom.MessageType.IMAGE) {
                        const buffer = await  client.decryptFile(conv);
                        const imagem64 =  buffer.toString('base64');

                        message.imageUrl = imagem64
                        message.isImage = true
                        // message.body = ''
                        
                    }

                    if (conv.type == venom.MessageType.VOICE) {
                        const buffer = await  client.decryptFile(conv);
                        const audio64 =  buffer.toString('base64');

                        message.audioBase64 = audio64
                        message.isAudio = true
                        message.body = ''

                        //  fs.writeFile('teste.mp3', buffer, async (err) => {
                        //     if (err)
                        //         console.log(err);
                        //     else {
                        //         var audio64 =  await fs.readFileSync('./teste.mp3', 'base64');
                        //         console.log(audio64)
                        //         message.audioBase64 = audio64
                        //         message.isAudio = true
                        //         message.body = ''
                        //         console.log('oi 2')
                        //         resolve()

                        //     }
                            
                        // });
                    }
    
                     allmessages.push(message)
                }
                resolve()

            });

                console.log('enviou')
                return res.json(allmessages)
            }); 
            url = '/'+token+'/chat/moremessages'
            // console.log("URL 5::::::"+ url)
            app.get(url, async(req,res)=>{
                const number = req.query.number_chat        
                const conversation = await client.loadEarlierMessages(number);
        
                let allmessages = []
                await new Promise(async (resolve, reject) => {  
                    for(var i=0; i < conversation.length; i++){
                        let chat = {}
                        const conv = conversation[i]
                        const message = {
                            sender: conv.from,
                            body: conv.content,
                            audioBase64: '',
                            isAudio: false ,
                            time: new Date(conv.timestamp),
                            timestamp: conv.timestamp,
                            receivid: conv.fromMe,
                            status: 1,
                            recvId: conv.to,
                            recvIsGroup: false,
                            id: conv.rowId
                        }

                        if (conv.type == venom.MessageType.VOICE) {
                            const buffer = await  client.decryptFile(conv);
                            const audio64 =  buffer.toString('base64');
    
                            message.audioBase64 = audio64
                            message.isAudio = true
                            message.body = ''
                            
                        }
                        allmessages.push(message)
                    }
                    
                    
                    resolve()
            }); 
                
                
                return res.json(allmessages)
            }); 
            url = '/'+token+'/newchat'
            // console.log("URL 6::::::"+ url)
            app.get(url, async (req,res)=>{
                const user = await client.getNumberProfile(req.query.chat_id);
                let chat = {}
                let url = ''
                
                let conversation = await Conversation.findOne({
                    where: {
                        // ssid: req.query.ssid,
                        chat_id: req.query.chat_id
                    }
                })
                
                if(!conversation)
                {
                    conversation = await Conversation.create({
                        ssid: req.query.ssid,
                        chat_id: req.query.chat_id
                    })
                }

                if(conversation){

                    try {
                        const image = await client.getProfilePicFromServer(String(req.query.chat_id));
                        url = image ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    } catch (error) {
                        url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    }
    
                    let contact2 = {}
                    contact2.id = req.query.chat_id
                    contact2.name = user.displayName ?  user.displayName :  user.pushname;
                    contact2.number = req.query.chat_id;
                    chat.pic =  url;
                    contact2.lastSeen= "Apr 29 2018 17:58:02"
    
                    const lastMessage = await client.getAllMessagesInChat(String(req.query.chat_id));
                    
                    chat.isGroup = false
                    chat.contact = contact2
                    chat.name = user.displayName ? user.displayName : user.pushname;
                    chat.msg = {};
                    chat.lastMessage = lastMessage
                    await conversation.update({
                        ssid: req.query.ssid,
                    })
                    return res.status(200).json(chat)
                }

                
                return res.status(400).json({erro: 'Ocorreu um erro ao inserir conversa.'})

            })
            url = '/'+token+'/chats'
            // console.log("URL 7::::::"+ url)
            app.post(url, async(req,res)=>{
                const conversation = await Conversation.findAll({
                    where: {user_id : 1}
                })

                let allchats = []

                for (const conv of conversation) {
                    const user = await client.getNumberProfile(conv.chat_id);

                    let chat = {}
                    let url = ''
                    
                    try {
                        const image = await client.getProfilePicFromServer(String(conv.chat_id));
                        url = image ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    } catch (error) {
                        url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    }

                    let contact2 = {}
                    contact2.id = conv.chat_id
                    contact2.name = user.displayName ?  user.displayName :  user.pushname;
                    contact2.number = conv.chat_id;
                    chat.pic =  url;
                    contact2.lastSeen= "Apr 29 2018 17:58:02"
    
                    const lastMessage = await client.getAllMessagesInChat(String(conv.chat_id));
                        
                    chat.isGroup = false
                    chat.contact = contact2
                    chat.name = user.displayName ? user.displayName : user.pushname;
                    chat.msg = {};
                    chat.lastMessage = lastMessage
        
                    allchats.push(chat)
                }

                return res.json(allchats)
    
                const chats = await client.getAllChatsContacts();
                
                
                for(var i=0; i < chats.length; i++){
                    // if(!a.isGroup){
                        let chat = {}
                        const a = chats[i]
                        let url = ''
                    
                        try {
                            const image = await client.getProfilePicFromServer(String(a.id._serialized));
                            url = image? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                        } catch (error) {
                        url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                        }
                        let contact2 = {}
                        contact2.id = a.t
                        contact2.name = a.name ? a.name : a.contact.formattedName;
                        contact2.number =  a.id._serialized;
                        chat.pic =  url;
                        contact2.lastSeen= "Apr 29 2018 17:58:02"
        
                        const lastMessage = await client.getAllMessagesInChat(String(a.id._serialized));
                        
                        chat.isGroup = a.isGroup
                        chat.contact = contact2
                        chat.name = a.name ? a.name : a.contact.formattedName;
                        chat.msg = {};
                        chat.lastMessage = lastMessage
            
                        allchats.push(chat)
                }
                
                return res.json(allchats)
            }); 
            url = '/'+token+'/teste'
            // console.log("URL 8::::::"+ url)
            app.get(url, async(req,res)=>{
                const mensagem = `${req.query.message}`
                
                // const conversationExist = await Conversation.findOne({
                //     where: {
                //         ssid: req.query.ssid,
                //         chat_id: req.query.number_chat
                //     }
                // })
                
                // if(!conversationExist){
                    // const conversation = await Conversation.create({
                    //     ssid: req.query.ssid,
                    //     chat_id: req.query.chat_id
                    // })

                    // if(conversation){
                        client.sendText(req.query.number_chat, mensagem).then(response =>{
                            return res.status(200).json({
                                status: true,
                                message: 'Mensagem enviada',
                                response: response
                            });
                        }).catch(err =>{
                            return res.status(500).json({
                                status: false,
                                message: 'Mensagem não enviada',
                                response: err.text
                            });
                        });
                    // }
                // }

                // return res.status(500).json({
                //     status: false,
                //     message: 'Mensagem não enviada',
                //     response: 'Ocorreu um erro ao enviar a mensagem.'
                // });
            });
            
            
    }
})

    
server.listen(port, function(){
    console.log('App running on : ' + port);
})
