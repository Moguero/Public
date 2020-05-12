// function popUp(page){
//     window.open(page);
// }

// alert('tu es sur le site');

var alertMessage = "Message alerte";

var alertBox = "";
alertBox+="<div class=\"MsgAlert\">"; 
alertBox+="<center><p><br>"+alertMessage+"</p>"; 
alertBox+="<input type=\"submit\' value=\"\" onclick=\"closeAlert();HideFond();\" /></center>";
alertBox+="</div>";
console.log(alertBox);

var Alertpanel = document.getElementById("alertPanel"); // On selection le div alertPanel deja présent dans la page (mais vide)
Alertpanel.innerHTML = alertBox; // On le remplit de notre div
Alertpanel.focus(); // On lui donne le focus

function closeAlert()   //Onclick du bouton du div
{
var alertBox =  document.getElementById("alertPanel"); // On selection le div present dans la page et remplit par nos soins 
alertBox.innerHTML =""; // Et on le vide de son contenue
}

