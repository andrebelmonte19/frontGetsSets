  
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

    const formCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })
    
    document.getElementById("nomeAgente").innerHTML = "<h5>"+totais.nomeAgente.toUpperCase()+"</h5>";
    document.getElementById("volumeAgente").innerHTML = formCurrency.format(totais.volume);
    document.getElementById("sucesso").innerHTML = totais.totalSucesso;
    document.getElementById("falha").innerHTML = totais.totalFalha;
    document.getElementById("fraude").innerHTML = totais.totalFraude;
   

    var ctx = document.getElementById('meuGrafico');
    var meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets: [{
                data: [totais.totalSucesso,totais.totalFalha,totais.totalFraude],
                label: 'Total de Transações',
                backgroundColor: [
                    'rgb(24, 130, 81)',
                    'rgb(247, 186, 6)',
                    'rgb(213, 51, 66)']
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },

                title: {
                    display: true,
                    text: 'Dashbord Cartões',
                    family: 'Unlock',
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    font: {
                        size: 20
                    },
                                       
                }              
            }
        }
 


    });


}


function logout(){
    //localStorage.logout;
    localStorage.clear();
    window.location = "index.html";

}

function goBack() {
    window.location = "agentes.html";
}