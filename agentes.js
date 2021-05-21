function verificaUsuario(){
    var usuario = localStorage.getItem("userCARD");

    if(!usuario) {
        window.location = "index.html";
    }

    usuario = JSON.parse(usuario);
    console.log("Usuario: " + usuario.nome);

    document.getElementById("fotoUsuario").innerHTML = `<center><img src="${usuario.foto}"  style="border-radius: 100%; margin-top: 10%;" width="60%" height="60%"></center>`;
    document.getElementById("bioUsuario").innerHTML = `<h5>${usuario.nome}</h5>
                                                       <hr>
                                                       <strong>Racf: </strong> ${usuario.racf} <br>
                                                       <strong>e-mail: </strong> ${usuario.email} <br>
                                                       <strong>Ramal: </strong> ${usuario.ramal} <br>
                                                       <strong>Depto: </strong> ${usuario.depto}`;


    fetch("http://127.0.0.1:8080/agentes")
        .then(res => res.json())
        .then(lista => preencheTabela(lista));

}

function preencheTabela(lista){


    const formCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })

    
    var strSelect = `<br>
                     <label for="agente"><strong>Agente Financeiro:</strong></label>
                     <select id="agente" name="agente" class="form-control mb-3 mt-3" onchange="usaAgente()">
                     <option value="">Selecione o agente financeiro</optin>`;

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
           strTabela = strTabela + `<tr onclick="usaAgente(${agente.id})">
                                        <td> ${agente.nome.toUpperCase()} </td>
                                        <td> ${formCurrency.format(agente.volume)} </td>
                                    </td>`
            
            strSelect = strSelect + `<option value="${agente.id}"> ${agente.nome.toUpperCase()} </optin>`;
    }

    strTabela = strTabela + `</tbody>
                             </table>`;
    strSelect = strSelect + `</select>`;

    document.getElementById("tabelaAgentes").innerHTML = strTabela;
    document.getElementById("seletorAgentes").innerHTML = strSelect;

    //console.log(lista);
}


function usaAgente(idAgente){
    
    if(!idAgente){
        var idAgente = document.getElementById("agente").value;
    }
    window.location = "dashboard.html?id=" + idAgente;
}

function logout(){
    //localStorage.logout;
    localStorage.clear();
    window.location = "index.html";

}

