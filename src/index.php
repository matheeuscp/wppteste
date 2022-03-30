<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>Whatsapp</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">
	
</head>

<body> 
	
	<!-- Creates the bootstrap modal where the image will appear -->
	<div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header" style="display: flex;justify-content: right;align-items: center;padding: 0;">
			<a href="" id="download" download>
				<i class="fas fa-download mx-3  d-none d-md-block"></i>
			</a>
			<button type="button" class="close" data-dismiss="modal" style="margin: 0 !important;padding-top: 10px;"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		  </div>
		  <div class="modal-body" style="text-align: center;">
			<!-- <img src="" id="imagepreview" style="width: 400px; height: 264px;" > -->
			<img src="" id="image-selected" alt="Red dot" />
			
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
		  </div>
		</div>
	  </div>
	</div>
	<div class="page-hero  align-items-center justify-content-center" id="div-login" style="text-align: center; ">
		<div class="row">
			<div class="col-6 mx-auto">
				<img src="./images/logo_webdec.png" alt="">
			</div>
		</div>  
		<div class="row">
			<div class="col-3 mx-auto">
				<div class="alert alert-primary row" role="alert">
					<div class="row" id="msg-qrcode" style="display:none">
						<div class="col-md-12">
							<p>Leia o QRCode</p>
						</div>
						<div class="col-md-12">
							<small>Em caso de QRCode inválido, atualize a página.</small>
						</div>
						
	
						<div class="col-md-12 mx-auto" style="margin-top: 30px;">
							<img  src="" id="qrcode" alt="">
						</div>
					</div>
					<div class="row" style="width: 100%; padding: 10px 0;">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary" id="conectar">
								<p style="margin: 0;">Conectar</p>
							</button>
							<!-- <input type="text" id="clientSocket" value=""> -->
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
								<p style="margin: 0;">WPP</p>
							</button>
							<input type="hidden" id="number-wpp">
							<!-- <button type="button" class="btn dropdown-item" >
								WPP
							</button> -->
							<!-- Modal -->
							<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2Label" aria-hidden="true">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
									  	<div class="modal-header">
											<!-- <h5 class="modal-title" id="exampleModal2Label">Nova conversa</h5> -->
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
									  	</div>
									  	<div class="modal-body">
											<?php require_once('./conversation.html') ?> 
										</div>
								  	</div>
								</div>
							</div>
						
						</div>
					</div>
				</div>
			</div>  
		
		<div class="row">
			<div class="col-6 ">
				<!-- <img src="./images/out.png" alt=""> -->

			</div>
		</div>  
	</div>
	<div class="container-fluid" id="main-container"  style=" display: none;">
		<div class="row h-100">
			<div class="col-12 col-sm-5 col-md-4 d-flex flex-column" id="chat-list-area" style="position:relative; height: 100% !important;">
				<img src="" id="qrcode" alt="">
				
				<!-- Navbar -->
				<div class="row d-flex flex-row align-items-center p-2" id="navbar">
					<img alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px; cursor:pointer;" src="./images/webcred_logo_branco.png">
					<!-- <div class="text-white font-weight-bold" id="username"></div> -->
					<div class="nav-item dropdown ml-auto">
						<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v text-white"></i></a>
						<div class="dropdown-menu dropdown-menu-right">
							 <button type="button" class="btn dropdown-item" data-toggle="modal" data-target="#exampleModal">
								Nova Conversa
							  </button>
							<!--<a class="dropdown-item" href="#">Archived</a>
							<a class="dropdown-item" href="#">Starred</a>
							<a class="dropdown-item" href="#">Settings</a> -->
							<!-- <a class="dropdown-item" href="#">Log Out</a> -->
						</div>
					</div>
				</div>
				
				  
				  <!-- Modal -->
				  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
					  <div class="modal-content">
						<div class="modal-header">
						  <h5 class="modal-title" id="exampleModalLabel">Nova conversa</h5>
						  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						  </button>
						</div>
						<div class="modal-body">
							
							<form class="row g-3 needs-validation" novalidate style="padding: 0px 15px;"> 
								<div class="input-group mb-3">
									<div class="input-group-prepend">
									  <span class="input-group-text" id="basic-addon1">
										<i class="fas fa-phone "></i>
									  </span>
									</div>
									<input type="text" class="form-control" placeholder="Ex: 5521999999999" id="new-number-chat" aria-label="Username" aria-describedby="basic-addon1" required>
									<div class="invalid-feedback">
										Preencha o celular.
									  </div>
								</div> 
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
								<!-- <button type="submit" class="btn btn-primary" id="newChat"></button> -->
								<button class="btn btn-primary" type="submit" id="btnchat" >Iniciar chat</button>
							</div>
						</form>
					  </div>
					</div>
				  </div>
				  
				<!-- Chat List -->
				<div class="row" id="chat-list" style="overflow:auto;">
					<div style="width: 100%;text-align: center; padding-top: 50px;" id="div-loader">
						<img src="images/loader.gif" alt="">
						<p>Sincronizando</p>
				 
					</div>
				</div>
	
				<!-- Profile Settings -->
				<div class="d-flex flex-column w-100 h-100" id="profile-settings">
					<div class="row d-flex flex-row align-items-center p-2 m-0" style="background:#009688; min-height:65px;">
						<i class="fas fa-arrow-left p-2 mx-3 my-1 text-white" style="font-size: 1.5rem; cursor: pointer;" onclick="hideProfileSettings()"></i>
						<div class="text-white font-weight-bold">Profile</div>
					</div>
					<div class="d-flex flex-column" style="overflow:auto;">
						<img alt="Profile Photo" class="img-fluid rounded-circle my-5 justify-self-center mx-auto" id="profile-pic">
						<input type="file" id="profile-pic-input" class="d-none">
						<div class="bg-white px-3 py-2">
							<div class="text-muted mb-2"><label for="input-name">Your Name</label></div>
							<input type="text" name="name" id="input-name" class="w-100 border-0 py-2 profile-input">
						</div>
						<div class="text-muted p-3 small">
							This is not your username or pin. This name will be visible to your WhatsApp contacts.
						</div>
						<div class="bg-white px-3 py-2">
							<div class="text-muted mb-2"><label for="input-about">About</label></div>
							<input type="text" name="name" id="input-about" value="" class="w-100 border-0 py-2 profile-input">
						</div>
					</div>
					
				</div>
			</div>
	
			<!-- Message Area -->
			<div class="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-8 p-0 h-100" id="message-area">
				<input type="hidden" id="conversation-id" value=""/>
	
				<div class="w-100 h-100 overlay"></div>
	
				<!-- Navbar -->
				<div class="row d-flex flex-row align-items-center p-2 m-0 w-100" id="navbar">
					<div class="d-block d-sm-none">
						<i class="fas fa-arrow-left p-2 mr-2 text-white" style="font-size: 1.5rem; cursor: pointer;" onclick="showChatList()"></i>
					</div>
					<a href="#"><img src="https://via.placeholder.com/400x400" alt="Profile Photo" class="img-fluid rounded-circle mr-2" style="height:50px;" id="pic"></a>
					<div class="d-flex flex-column">
						<div class="text-white font-weight-bold" id="name"></div>
						<div class="text-white small" id="details"></div>
					</div>
					<div class="d-flex flex-row align-items-center ml-auto">
						<a href="#"><i class="fas fa-search mx-3 text-white d-none d-md-block"></i></a>
						<a href="#"><i class="fas fa-paperclip mx-3 text-white d-none d-md-block"></i></a>
						<a href="#"><i class="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i></a>
					</div>
				</div>
	
				<!-- Messages -->
				<div class="d-flex flex-column" id="messages">
					<p>Carregar Mais</p>
					
				</div>
	
				<!-- Input -->
				<div class="d-none justify-self-end align-items-center flex-row" id="input-area">
					<!-- <a href="#"><i class="far fa-smile text-muted px-3" style="font-size:1.5rem;"></i></a> -->
					<input type="text" name="message" id="input" placeholder="Mensagem" class="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm" style="margin-left: 10px;">
					<i class="fas fa-paper-plane text-muted px-3" style="cursor:pointer;" onclick="sendMessage()"></i>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="container-fluid" id="main-container">
		<div class="row h-100">
			<div class="row d-flex flex-row align-items-center p-2 m-0" style="background:#009688; min-height:65px;">
				<img src="./images/logo_webdec.png" alt="">
			</div>
			<div class="row d-flex flex-row align-items-center p-2 m-0" style="background:#009688; min-height:65px;">

				<img src="./images/out.png" alt="">
			</div>
		</div> 
	</div> -->
	<!-- <div style="display: flex;height: 100vh;align-items: center;justify-content: center;">
		<div>
			

		</div>
	</div> -->

	
	<script src="js/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
	    crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
		crossorigin="anonymous"></script>
	<script src="datastore.js"></script>
	<script src="date-utils.js"></script>
	<script src="js/socket-io.js"></script>
	<script src="script.js"></script>
	<script src="script-socket.js"></script>
	<!-- <script src="js/socket-io.js"></script> -->
  <script src="assets/js.js"></script>

</body>

</html>