function verificaUsuario(){
    var usuario = localStorage.getItem("userCARD");

    if(!usuario) {
        window.location = "index.html";
    }

    usuario = JSON.parse(usuario);
    console.log("Usuario: " + usuario.nome);

    document.getElementById("fotoUsuario").innerHTML = `<img src="${usuario.foto}" width="60%">`;
    document.getElementById("bioUsuario").innerHTML = `<h3>${usuario.nome}</h3>
                                                       <hr>
                                                       <strong>RACF: </strong> ${usuario.racf} <br>
                                                       <strong>EMAIL: </strong> ${usuario.email} <br>
                                                       <strong>RAMAL: </strong> ${usuario.ramal} <br>
                                                       <strong>DEPTO: </strong> ${usuario.depto}`;


    fetch("http://127.0.0.1:8080/agentes")
        .then(res => res.json())
        .then(lista => preencheTabela(lista));

}

function preencheTabela(lista){
    
    var strSelect = `<br>
                     <label for="agente">Selecione o Agente Financeiro:</label>
                     <select id="agente" name="agente" class="form-control mb-3 mt-3" onchange="usaAgente()">`;

    var strTabela = `<table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col"> Nome do Parceiro </th>
                                <th scope="col"> Volume Transacional </th>
                            </tr>
                        </thead>
                        <tbody>`;
    
 
    for (i=0; i<lista.length; i++){
           var agente = lista[i];
           strTabela = strTabela + `<tr>
                                        <td> ${agente.nome} </td>
                                        <td> ${agente.volume} </td>
                                    </td>`
            
            strSelect = strSelect + `<option value="${agente.id}"> ${agente.nome} </optin>`;
    }

    strTabela = strTabela + `</tbody>
                             </table>`;
    strSelect = strSelect + `</select>`;

    document.getElementById("tabelaAgentes").innerHTML = strTabela;
    document.getElementById("seletorAgentes").innerHTML = strSelect;

    //console.log(lista);
}


function usaAgente(){
    var idAgente = document.getElementById("agente").value;
    window.location = "dashboard.html?id=" + idAgente;


    //console.log(idAgente);

}

function logout(){
    //localStorage.logout;
    localStorage.clear();
    window.location = "index.html";

}

