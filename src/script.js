
let getById = (id, parent) => parent ? parent.getElementById(id) : getById(id, document);
let getByClass = (className, parent) => parent ? parent.getElementsByClassName(className) : getByClass(className, document);
let contactList = []
let chatList = [];

$(document).on('click', '.pop', function () {
    const base64 = 'data:image/png;base64, '+ $(this).attr('data-full-src')
	$("#image-selected").attr('src', base64)
	$('#imagemodal').modal('show')
	$('#download').attr('href', base64)
	// 
});

$(document).on('click', '#conectar', function () {
	const cliendID = $("#clientSocket").val()
	// return false

	$(this).attr('disabled', true)
	$(this).html(`
		<div style="width: 100%;text-align: center;display: flex;align-items: center;" id="div-loader">
			<p style="margin: 0;margin-right: 10px;">Conectando</p>
			<img src="images/loader-branco.gif" alt="" style="width: 20px;">
		</div>
	`)
	$.ajax({
		method: 'GET',
		url: `http://127.0.0.1:3331/conectar?id=${cliendID}`, 
		dataType: 'json',
		data: {},
		success: async function(result){
			console.log(result)
			// contactList = result
		}
	});
});

$('.needs-validation').submit(async function(event){
	event.preventDefault()
	let error = false

	$("#btnchat").attr('disabled', true)
	$("#btnchat").html('Inciando <img src="images/loader-branco.gif" alt="" style="width: 18px;">')

	if (!this.checkValidity()) {
		error = true
		event.preventDefault()
		event.stopPropagation()
	}
	
	this.classList.add('was-validated')

	if(error){
		$("#btnchat").attr('disabled', false)
		$("#btnchat").html('Iniciar chat')
		return false
	}

	const chat_id = $("#new-number-chat").val()+'@c.us'
	await $.ajax({
		method: 'GET',
		url: `http://127.0.0.1:3331/newchat`, 
		dataType: 'json',
		data: {
			chat_id: chat_id
		},
		success: async function(result){
			console.log(result)
			// contactList = result
			await chatList[0].push(result);
			viewChatList()
		}
	});

	$("#btnchat").attr('disabled', false)
	$("#btnchat").html('Iniciar chat')
	$("#exampleModal").modal('toggle');
	return false
})
// Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
// 		  alert('oi 1')
//         }

//         form.classList.add('was-validated')
//       }, false)
//     })
// })()
$(document).on('click', '#newChat', function () {
	$(this).attr('disabled', true)
	$(this).html('Inciando <img src="images/loader-branco.gif" alt="" style="width: 18px;">')
	return false
	
});

var socket = io.connect("http://localhost:3331");

$(document).ready(function(){  
	if(sessionStorage.getItem("wpp_status") == 'conected'){
		$("#conectar").attr('disabled', false)
		$("#conectar").html('Conectar')
		$("#conectar").hide()
		$("#div-login").hide()
		$("#main-container").show()
		init_wpp();
	}
	var ready = false;

	$(".pop").on("click", function() {
		alert($(this).attr('src'))
	 });

	$("#input").on("keyup", function(event) {
		if (event.keyCode === 13) {
		  event.preventDefault();
		  sendMessage()
		}
    });

        // socket.on('connection')
		// socket.on("update", function(msg) {
		// 	alert('oiuooioi')
		// });
	
	socket.on('connect', function() {
	
		var id = socket.io.engine.id;
		$("#clientSocket").val(id);
		// socket.on("teste", function(data) {
		// 	alert('chegou')
		// });

		socket.emit("join", {
			msg: 'teste',
			client_id: id,
			sender: '5521979394604@c.us'
		});
	
		socket.on("update", function(msg) {
			addMessageToMessageArea(msg, true)

		});

        socket.on("wpp_connected", function(msg) {
			sessionStorage.setItem("wpp_status", "conected");
			// addMessageToMessageArea(msg, true)
			// socket.disconnect(true)
			$("#conectar").attr('disabled', false)
			$("#conectar").html('Conectar')
			$("#conectar").hide()
            $("#div-login").hide()
            $("#main-container").show()
            init_wpp();
		});

		socket.on("wpp_disconnected", function(msg) {
			// addMessageToMessageArea(msg, true)
			// socket.disconnect(true)
			$("#conectar").attr('disabled', false)
			$("#conectar").html('Conectar')
			$("#conectar").hide()
            $("#msg-qrcode").show()
		});
		
        socket.on("message", function(data) {

            $("#testeh1").val(data)
            socket.emit('message')
            if(data == 'CONNECTED'){
                // alert('conectado')
            }
		});

        socket.on("ready",async function(data) {
            console.log('============== po ==================')
            console.log(data)
            await setSrc()
            document.getElementById('qrcode').src = data
		});

        socket.emit('message')
        socket.emit('ready')
		
	}); 


});
function setSrc(){
	 document.getElementById('qrcode').src = ''
}
const DOM =  {
	chatListArea: getById("chat-list-area"),
	messageArea: getById("message-area"),
	inputArea: getById("input-area"),
	chatList: getById("chat-list"),
	messages: getById("messages"),
	chatListItem: getByClass("chat-list-item"),
	messageAreaName: getById("name", this.messageArea),
	idConversation: getById("conversation-id", this.messageArea),
	messageAreaPic: getById("pic", this.messageArea),
	messageAreaNavbar: getById("navbar", this.messageArea),
	messageAreaDetails: getById("details", this.messageAreaNavbar),
	messageAreaOverlay: getByClass("overlay", this.messageArea)[0],
	messageInput: getById("input"),
	profileSettings: getById("profile-settings"),
	profilePic: getById("profile-pic"),
	profilePicInput: getById("profile-pic-input"),
	inputName: getById("input-name"),
	// username: getById("username"),
	// displayPic: getById("display-pic"),
};

let mClassList = (element) => {
	return {
		add: (className) => {
			element.classList.add(className);
			return mClassList(element);
		},
		remove: (className) => {
			element.classList.remove(className);
			return mClassList(element);
		},
		contains: (className, callback) => {
			if (element.classList.contains(className))
				callback(mClassList(element));
		}
	};
};

// 'areaSwapped' is used to keep track of the swapping
// of the main area between chatListArea and messageArea
// in mobile-view
let areaSwapped = false;

// 'chat' is used to store the current chat
// which is being opened in the message area
let chat = null;

// this will contain all the chats that is to be viewed
// in the chatListArea

// this will be used to store the date of the last message
// in the message area
let lastDate = "";

// 'populateChatList' will generate the chat list
// based on the 'messages' in the datastore
async function busca(){
	await $.ajax({
		method: 'GET',
		url: "http://127.0.0.1:3331/tcs", 
		success: function(result){
			var json = JSON.parse(result)
			console.log('1')
			 return  json
	
		  }
	});
}

let populateChatList = async () => {
	// chatList = [];

	let present = {};
	// contactList.forEach((msg) => {
		await $.ajax({
			method: 'POST',
			url: "http://127.0.0.1:3331/chats", 
			success: async function(result){
				contactList = result
				await chatList.push(result);
				console.log(chatList)
				 $("#div-loader").hide()
			  }
		});
	// 	chat.isGroup = false
	// 	chat.contact = msg
	// 	chat.name = msg.name;
	// 	chat.msg = {};

	// 	// chat.unread = (msg.sender !== user.id && msg.status < 2) ? 1: 0;

	// 	// if (present[chat.name] !== undefined) {
	// 	// 	chatList[present[chat.name]].msg = msg;
	// 	// 	chatList[present[chat.name]].unread += chat.unread;
	// 	// } else {
	// 		// present[chat.name] = chatList.length;
	// 		// chatList.push(chat);
	// 	// }
		
	// });
	// MessageUtils.getMessages()
	// .sort((a, b) => mDate(a.time).subtract(b.time))
	// .forEach((msg) => {
	// 	let chat = {};
		
	// 	chat.isGroup = msg.recvIsGroup;
	// 	chat.msg = msg;
	// 	// console.log(contactList)
	// 	if (msg.recvIsGroup) {
	// 		chat.group = groupList.find((group) => (group.id === msg.recvId));
	// 		chat.name = chat.group.name;
	// 	} else {
	// 		chat.contact = contactList.find((contact) => (msg.sender !== user.id) ? (contact.id === msg.sender) : (contact.id === msg.recvId));
	// 		chat.name = chat.contact.name;
	// 	}

	// 	chat.unread = (msg.sender !== user.id && msg.status < 2) ? 1: 0;

	// 	if (present[chat.name] !== undefined) {
	// 		chatList[present[chat.name]].msg = msg;
	// 		chatList[present[chat.name]].unread += chat.unread;
	// 	} else {
	// 		present[chat.name] = chatList.length;
	// 		console.log(chat)
	// 		chatList.push(chat);
	// 	}
	// });
};

let viewChatList = () => {
	DOM.chatList.innerHTML = "";
	console.log(chatList)
	chatList[0]
	.forEach((elem, index) => {
		// console.log(index)
		console.log(elem)

		let statusClass = elem.msg.status < 2 ? "far" : "fas";
		let unreadClass = elem.unread ? "unread" : "";

		DOM.chatList.innerHTML += `
		<div data-conversation="${elem.contact.number}" class="chat-list-item d-flex flex-row w-100 p-2 border-bottom ${unreadClass}" onclick="generateMessageArea(this, ${index})">
			<img src="${elem.pic}" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;">
			<div class="w-50">
				<div class="name">${elem.name}</div>
				<div class="small last-message"  style="display: none;">
				</div>
			</div>
			<div class="flex-grow-1 text-right">
				<div class="small time">${mDate(elem.msg.time).chatListFormat()}</div>
				<div class="badge badge-success badge-pill small" id="unread-count" style="display: none;"> ! </div>
			</div>
		</div>
		`;
	});
};

let generateChatList = async () => {
	await populateChatList();
	viewChatList();
};

let addDateToMessageArea = (date) => {
	DOM.messages.innerHTML += `
	<div class="mx-auto my-2 bg-primary text-white small py-1 px-2 rounded">
		${date}
	</div>
	`;
};

let newMessageToMessageArea = async (msg) => {
	let msgDate = new Date(msg.time).toLocaleDateString('pt-PT');
	let dt = new Date(msg.time)
	var mes = ("0" + (dt.getMonth() + 1)).slice(-2);
	

	if (lastDate != msgDate) {
		addDateToMessageArea(msgDate);
		lastDate = msgDate;
	}

	await $.ajax({
		type: 'GET',
		url: "http://127.0.0.1:3331/teste", 
		dataType: 'json',
		data: {
			message: msg.body,
			number_chat: msg.recvId
		},
		beforeSend: async function(){
			let sendStatus = `<i class="${msg.status < 2 ? "far" : "fas"} fa-clock"></i>`;
			/* <div class="options">
				<a href="#"><i class="fas fa-angle-down text-muted px-2"></i></a>
			</div> */
			// ${(msg.sender === user.id) ? sendStatus : ""}

			DOM.messages.innerHTML += `
			<div class="align-self-${msg.sender === user.id ? "end self" : "start"} p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
				${chat.isGroup ? htmlForGroup : ""}
				<div class="d-flex flex-row">
					<div class="body m-1 mr-2">Matheus - WEBDEC<br><br>${msg.body}</div>
					<div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
						${mDate(msg.time).getTime()}
						<i id="${msg.recvId}-enviando" class="far fa-clock"></i>
						<i id="${msg.recvId}-enviada" style="display:none" class="far fa-check-circle"></i>
					</div>
				</div>
			</div>
			`;
		
			DOM.messages.scrollTo(0, DOM.messages.scrollHeight);
		},
		success: async function(result){
			if (result.status) {
				var ele = document.getElementById(`${msg.recvId}-enviando`);
				console.log(ele)
				ele.remove()
				var ele = document.getElementById(`${msg.recvId}-enviada`);
					ele.style.display = "";
			}
		}
	});
	return
	// let sendStatus = `<i class="${msg.status < 2 ? "far" : "fas"} fa-check-circle"></i>`;

};

let addMessageToMessageArea = async (msg, receiveMessage = false, before= false) => {
	let sendStatus = `<i class="${msg.status < 2 ? "far" : "fas"} fa-clock"></i>`;
	let messageBody = msg.body
	console.log(msg.isImage)
	if(msg.isImage){
		messageBody = `
			<img class="pop" data-full-src="${msg.imageUrl}" src="data:image/png;base64, ${messageBody}" alt="Red dot" />
		`
	}
	let msgDate = new Date(msg.time).toLocaleDateString('pt-PT');
		let dt = new Date(msg.time)
		var mes = ("0" + (dt.getMonth() + 1)).slice(-2);
	
		const time = dt.toLocaleTimeString('pt-BR', {
			// en-US can be set to 'default' to use user's browser settings
			hour: '2-digit',
			minute: '2-digit',
		  });

		  if(before){
		$(DOM.messages).find("#carregar-mais").remove()
		DOM.messages.insertAdjacentHTML("afterbegin", `
			<div style="text-align: center;" class="my-2">
				<button id="carregar-mais" class="px-3 py-1 shadow-sm" onclick="seachMoreMessages('${String(chat.contact.number)}')"> 
					<i class="fas fa-redo mr-2  d-none d-md-block"></i> Carregar mais
				</button>
			</div>
		`); 

		DOM.messages.insertAdjacentHTML("afterbegin", `
		<div class="align-self-${msg.sender === user.id ? "end self" : "start"} p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
			${chat.isGroup ? htmlForGroup : ""}
			<div class="d-flex flex-row">
				<div class="body m-1 mr-2">${messageBody}</div>
				<div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
					${time}
					${msg.sender === user.id ? 
						'<i id="${msg.recvId}-enviada" class="far fa-check-circle"></i>'
					
						: ""} 
				</div>
			</div>
		</div>
		`);
		return false
	}
	
	if(msg.sender == DOM.idConversation.value)
	{
		// console.log( dt.getDate() + "/" + mes+ "/" +dt.getFullYear())
		if (lastDate != msgDate) {
			addDateToMessageArea(msgDate);
			lastDate = msgDate;
		}
	
		
			DOM.messages.innerHTML += `
			<div class="align-self-${msg.sender === user.id ? "end self" : "start"} p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
				${chat.isGroup ? htmlForGroup : ""}
				<div class="d-flex flex-row">
					<div class="body m-1 mr-2">${messageBody}</div>
					<div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
						${time}
						${msg.sender === user.id ? 
							'<i id="${msg.recvId}-enviada" class="far fa-check-circle"></i>'
						
							: ""} 
					</div>
				</div>
			</div>
			`;
		 
		DOM.messages.scrollTo(0, DOM.messages.scrollHeight);
	} else {
		if(receiveMessage == true)
		{

			$(".chat-list-item").each(function(){
				if(msg.sender == $(this).attr('data-conversation')){
					const unread = $(this).find("#unread-count") 
					const lastText = $(this).find(".last-message") 
					lastText.text(msg.body)
					lastText.show()
					unread.show()
				} 
					// }
					// receiveMessage == true

				// }
			})
		} else {
					let dt = new Date(msg.time)
					const time = dt.toLocaleTimeString('pt-BR', {
						// en-US can be set to 'default' to use user's browser settings
						hour: '2-digit',
						minute: '2-digit',
					  });
	
					DOM.messages.innerHTML += `
						<div class="align-self-${msg.sender === user.id ? "end self" : "start"} p-1 my-1 mx-3 rounded bg-white shadow-sm message-item">
							${chat.isGroup ? htmlForGroup : ""}
							<div class="d-flex flex-row">
								<div class="body m-1 mr-2">${messageBody}</div>
								<div class="time ml-auto small text-right flex-shrink-0 align-self-end text-muted" style="width:75px;">
									${time}
									${msg.sender === user.id ? 
										'<i id="${msg.recvId}-enviada" class="far fa-check-circle"></i>'
									
										: ""} 
								</div>
							</div>
						</div>
						`;
							
						DOM.messages.scrollTo(0, DOM.messages.scrollHeight);
		}
	}

};

let generateMessageArea = async (elem, chatIndex) => {
	chat = chatList[0][chatIndex];
	$(elem).find('#unread-count').hide()
	$(elem).find('.last-message').text('')
	$(elem).find('.last-message').hide()
	DOM.idConversation.value = chat.contact.number
	// return false
	mClassList(DOM.inputArea).contains("d-none", (elem) => elem.remove("d-none").add("d-flex"));
	mClassList(DOM.messageAreaOverlay).add("d-none");

	[...DOM.chatListItem].forEach((elem) => mClassList(elem).remove("active"));

	mClassList(elem).contains("unread", () => {
		 MessageUtils.changeStatusById({
			isGroup: chat.isGroup,
			id: chat.isGroup ? chat.contact.id : chat.contact.id
		});
		mClassList(elem).remove("unread");
		mClassList(elem.querySelector("#unread-count")).add("d-none");
	});

	if (window.innerWidth <= 575) {
		mClassList(DOM.chatListArea).remove("d-flex").add("d-none");
		mClassList(DOM.messageArea).remove("d-none").add("d-flex");
		areaSwapped = true;
	} else {
		mClassList(elem).add("active");
	}

	DOM.messageAreaName.innerHTML = chat.name;
	DOM.messageAreaPic.src = chat.isGroup ? chat.pic : chat.pic;

	let msgs = MessageUtils.getByContactId(chat.contact.id);

	DOM.messages.innerHTML = "";

	await $.ajax({
		method: 'GET',
		url: `http://127.0.0.1:3331/chat/allmessages?number_chat=${chat.contact.number}`, 
		success: async function(result){
			console.log()
			msgs = result
			// contactList = result
			// await chatList.push(result);

			 $("#div-loader").hide()
		  }
	});

	DOM.messages.innerHTML += `
		<div style="text-align: center;" class="my-2">
			<button id="carregar-mais" class="px-3 py-1 shadow-sm" onclick="seachMoreMessages('${String(chat.contact.number)}')"> 
				<i class="fas fa-redo mr-2  d-none d-md-block"></i> Carregar mais
			</button>
		</div>
	`;

	lastDate = "";
	msgs
	.sort((a, b) => new Date(a.time).getDate())
	.forEach((msg) => addMessageToMessageArea(msg, false));
};

let seachMoreMessages = async (elem) => {
	$("#carregar-mais").attr('disabled', true)
	$("#carregar-mais").css('cursor', 'not-allowed')
	$("#carregar-mais").html(`
	<div style="width: 100%;text-align: center;display: flex;align-items: center;" id="div-loader">
						<img src="images/loader.gif" alt="" style="width: 20px;">
						<p style="margin: 0;">Buscando</p>
					</div>
	`)
	let msgs = MessageUtils.getByContactId(chat.contact.id);
	await $.ajax({
		method: 'GET',
		url: `http://127.0.0.1:3331/chat/moremessages?number_chat=${chat.contact.number}`, 
		success: async function(result){
			console.log(result)
			msgs = result
		}
	});

	msgs
	.sort((a, b) => new Date(a.time).getDate())
	.forEach((msg) => addMessageToMessageArea(msg, false, true));
};

let showChatList = () => {
	if (areaSwapped) {
		mClassList(DOM.chatListArea).remove("d-none").add("d-flex");
		mClassList(DOM.messageArea).remove("d-flex").add("d-none");
		areaSwapped = false;
	}
};

let sendMessage = () => {
	let value = DOM.messageInput.value;
	DOM.messageInput.value = "";
	if (value === "") return;
	// console.log(chat)
	// console.log(chat.contact.number)
	let msg = {
		// sender: chat.contact.number,
		sender: "5521979394604@c.us",
		body: value,
		time: mDate().toString(),
		status: 1,
		recvId: chat.contact.number,
		recvIsGroup: chat.isGroup
	};

	newMessageToMessageArea(msg);
	// MessageUtils.addMessage(msg);
	// // console.log(msg)
	// return
	generateChatList();
};

let showProfileSettings = () => {
	DOM.profileSettings.style.left = 0;
	DOM.profilePic.src = user.pic;
	DOM.inputName.value = user.name;
};

let hideProfileSettings = () => {
	DOM.profileSettings.style.left = "-110%";
	// DOM.username.innerHTML = user.name;
};

window.addEventListener("resize", e => {
	if (window.innerWidth > 575) showChatList();
});

let init_wpp = () => {
	// DOM.username.innerHTML = user.name;
	// DOM.displayPic.src = user.pic;
	// DOM.profilePic.stc = user.pic;
	DOM.profilePic.addEventListener("click", () => DOM.profilePicInput.click());
	DOM.profilePicInput.addEventListener("change", () => console.log(DOM.profilePicInput.files[0]));
	DOM.inputName.addEventListener("blur", (e) => user.name = e.target.value);
	generateChatList();

	console.log("Click the Image at top-left to open settings.");
};

init_wpp();