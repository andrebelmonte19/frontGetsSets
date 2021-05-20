  
function geraRelatorio(){
    var strUser = localStorage.getItem("userCARD");
    if (!strUser){
        window.location = "index.html";
    }

    var strId = window.location.search;

    console.log("capturado da url = "+strId);
    var id = strId.substr(4);

    console.log("ID filtrado = "+id);

    fetch("http://localhost:8080/transacoestotais/"+id)
        .then(res=>res.json())
        .then(totais => montaDashBoard(totais));
}

function montaDashBoard(totais){
    
    document.getElementById("nomeAgente").innerHTML = "<h5>"+totais.nomeAgente+"</h5>";
    document.getElementById("volumeAgente").innerHTML = totais.volume;
    document.getElementById("sucesso").innerHTML = totais.totalSucesso;
    document.getElementById("falha").innerHTML = totais.totalFalha;
    document.getElementById("fraude").innerHTML = totais.totalFraude;
}


function logout(){
    //localStorage.logout;
    localStorage.clear();
    window.location = "index.html";

}

function goBack() {
    window.history.back();
}