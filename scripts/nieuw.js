function addOption(opt){
    let option = document.createElement('option');
    option.setAttribute('value', opt);
    option.innerHTML = opt;
    return option;
}

function addPossibleNumbers(){
    let type = document.getElementById('type').value;
    let box = document.getElementById('aantal');
    let nOpts = 8;

    while (box.childElementCount != 1) 
        box.removeChild(box.lastChild);
    
    switch(type){
        case 'CP':
            for (let i = 0; i != nOpts; i++) 
                box.appendChild(addOption(2 * i));             
            break;
        case 'KF':
            for (let i = 0; i != nOpts; i++) 
                box.appendChild(addOption(4 * i)); 
            break;
        case 'PF':
            for (let i = 0; i != nOpts; i++) 
                box.appendChild(addOption(4 * i)); 
            break;
        case 'PK':
            for (let i = 0, k = 4; i != 4; i++){
                box.appendChild(addOption(k)); 
                k = 2 * k;
            }
            break;
        case 'KO':
            for (let i = 0, k = 2; i != 4; i++){
                box.appendChild(addOption(k)); 
                k = 2 * k;
            } 
            break;
        default:
            break;
    }
}

function addFields(){
    let number = document.getElementById("aantal").value;
    let container = document.getElementById("fieldContainer");
    while (container.hasChildNodes()) {        container.removeChild(container.lastChild);
    }
    for (let i=0;i<number;i++){
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "labelInputContainer1");
        
        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.setAttribute("class", "ui");
        newInput.setAttribute("id", "teamName");
        newInput.setAttribute("required", "true");
        
        let newLabel = document.createElement("label");
        let newText = document.createTextNode("Team " + (i+1));
        newLabel.appendChild(newText);
        
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newInput);
        container.appendChild(newDiv);
    }
}

function saveVariables(){
    let naam = document.getElementById("naam").value;
    let type = document.getElementById("type").value;
    let aantal = Number(document.getElementById("aantal").value);
    let begintijd = document.getElementById("begintijd").value;
    let speelduur = document.getElementById("speelduur").value;
    let pauze = document.getElementById("pauze").value;
    let teamNames = document.querySelectorAll("#teamName");
    for (let i = 0; i < teamNames.length; i++) {
        sessionStorage.setItem('team' + i, teamNames[i].value);
    }
    sessionStorage.setItem('naam', naam);
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('aantal', aantal);  
    sessionStorage.setItem('begintijd', begintijd);
    sessionStorage.setItem('speelduur', speelduur);
    sessionStorage.setItem('pauze', pauze);
}

// There are many ways to pick a DOM node; here we get the form itself and the naam
// input box, as well as the span element into which we will place the error message.
const form  = document.getElementsByTagName('form')[0];

form.addEventListener('submit', function (event) {
  // if the naam field is valid, we let the form submit
    saveVariables();
    window.location.assign("tournament.html");
    event.preventDefault();
})

addPossibleNumbers();
addFields();

