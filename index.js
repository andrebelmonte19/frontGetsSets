function enviarDados(){

    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Vc digitou: " + txtLogin + " / " + txtSenha);

    var msgBody = {
        email   : txtLogin,
        racf    : txtLogin,
        senha   : txtSenha
    }

    var cabecalho = {
        method  : "POST",
        body    : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }

    }

    fetch("http://127.0.0.1:8080/login", cabecalho).then(res=> trataResultado(res));
}

function trataResultado(res){

    if(res.status == 200){
        res.json().then(usuario => {
            localStorage.setItem("userCARD",JSON.stringify(usuario));
            window.location = "agentes.html";

        });
    }
    else if (res.status == 403){
        document.getElementById("msgErro").innerHTML = "Senha invalida!";
    }
    else if(res.status == 404){
        document.getElementById("msgErro").innerHTML = "Usuario invalido!"
    }
    else{
        document.getElementById("msgErro").innerHTML = "Erro desconhecido!";
    }


}


function tratarEnter(event){
    if (event.keyCode == 13){
        enviarDados();
    }
}
