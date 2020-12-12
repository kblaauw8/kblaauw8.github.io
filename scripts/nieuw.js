function showOptions(evt, tabName) {
    let type = document.getElementById('type').value;

    POcontainers = document.getElementsByClassName("labelInputContainer PO");
    KOcontainers = document.getElementsByClassName("labelInputContainer KO");
    CPcontainers = document.getElementsByClassName("labelInputContainer CP");
    hide(POcontainers);
    hide(KOcontainers);
    hide(CPcontainers);

    switch(type){
        case 'CP':
            show(CPcontainers);        
            break;
        case 'PK':
            show(POcontainers);
            show(KOcontainers);
            break;
        case 'KO':
            show(KOcontainers);
            break;
        default:
            break;
    }

}

function hide(array){
    for (i = 0; i < array.length; i++) 
        array[i].style.display = "none";
}

function show(array){
    for (i = 0; i < array.length; i++) 
        array[i].style.display = "flex";
}

function addOption(opt){
    let option = document.createElement('option');
    option.setAttribute('value', opt);
    option.innerHTML = opt;
    return option;
}

function up1(step, max, id) {
    document.getElementById(id).value = parseInt(document.getElementById(id).value) + parseInt(step);
    if (document.getElementById(id).value >= parseInt(max)) {
        document.getElementById(id).value = max;
    }
}
function down1(step, min, id) {
    document.getElementById(id).value = parseInt(document.getElementById(id).value) - parseInt(step);
    if (document.getElementById(id).value <= parseInt(min)) {
        document.getElementById(id).value = min;
    }
}
function down2(step, id) {
    let type = document.getElementById('type').value;
    let min = type == 'PK' ? Math.max(2 * parseInt(document.getElementById('nPoules').value), 2) : 2;
    document.getElementById(id).value = parseInt(document.getElementById(id).value) - parseInt(step);
    if (document.getElementById(id).value <= parseInt(min)) {
        document.getElementById(id).value = min;
    }
}
function addPossibleNumbers(){
    let type = document.getElementById('type').value;
    let box = document.getElementById('nTeams');
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

function num2let(num){
  let s = '', t;
  t = (num) % 26;
  s = String.fromCharCode(65 + t);
  return s
}

function makeHeader(type, text)
{
    let nHeader = document.createElement(type);
    nHeader.setAttribute("class", "custom1");
    let nText = document.createTextNode(text);
    nHeader.appendChild(nText);
    return nHeader;
}

function addPouleFields(){
    let npoules = document.getElementById("nPoules").value;
    let container = document.getElementById("pouleFieldContainer");
    let type = document.getElementById("type").value;
    while (container.hasChildNodes()) {container.removeChild(container.lastChild);
    }
    for (let i=0;i<npoules;i++){
        if (type == 'CP' || type == 'KO')
            text = "Deelnemers";
        else
            text = "Poule " + num2let(i);
        let poulebox = document.createElement("div");
        poulebox.setAttribute("class", "poulebox");
        let subheader = document.createElement("div");
        subheader.setAttribute("class", "subheader_poule");
        subheader.appendChild(makeHeader('h2', text));
        let cont = document.createElement("div");
        cont.setAttribute("class", "teamFieldContainer");
        poulebox.appendChild(subheader);
        poulebox.appendChild(cont);
        container.appendChild(poulebox);
    }
    addTeamFields();
}

function addTeamFields(){
    let nteams = document.getElementById("nTeams").value;
    let npoules = document.getElementById("nPoules").value;
    let containers = document.getElementsByClassName("teamFieldContainer");
    let tobeplaced = nteams;
    let tobefilled = npoules;
    let teamindex = 1;
    for (let i=0;i!=containers.length;i++){
        while (containers[i].hasChildNodes()) {containers[i].removeChild(containers[i].lastChild);
        }
        let ntpp = Math.ceil(tobeplaced/tobefilled);
        let stop = Math.min(ntpp, tobeplaced);
        for(let j=0;j!=stop;j++){
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.setAttribute("class", "teamInput");
            newInput.setAttribute("required", "true");
            newInput.setAttribute("placeholder", "Team " + teamindex++);
            containers[i].appendChild(newInput);
            tobeplaced--;
        }
        tobefilled--;
    }
}

function saveVariables(){
    let naam = document.getElementById("naam").value;
    let type = document.getElementById("type").value;
    let nTeams = Number(document.getElementById("nTeams").value);
    let nPoules= Number(document.getElementById("nPoules").value);
    let nThroughPoule = Number(document.getElementById("nThroughPoule").value);
    let nPlaysCP = Number(document.getElementById("nPlaysCP").value);
    let nPlaysPO = Number(document.getElementById("nPlaysPO").value);
    let nPlaysKO = Number(document.getElementById("nPlaysKO").value);
    let nPlaysFI = Number(document.getElementById("nPlaysFI").value);
    //let begintijd = document.getElementById("begintijd").value;
    //let speelduur = document.getElementById("speelduur").value;
    //let pauze = document.getElementById("pauze").value;
    let teamNames = document.getElementsByClassName("teamInput");
    for (let i = 0; i < teamNames.length; i++)
        sessionStorage.setItem('team' + i, teamNames[i].value);
    sessionStorage.setItem('naam', naam);
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('nTeams', nTeams);  
    sessionStorage.setItem('nPoules', nPoules);
    sessionStorage.setItem('nThroughPoule', nThroughPoule);
    sessionStorage.setItem('nPlaysCP', nPlaysCP);
    sessionStorage.setItem('nPlaysPO', nPlaysPO);
    sessionStorage.setItem('nPlaysKO', nPlaysKO);
    sessionStorage.setItem('nPlaysFI', nPlaysFI);
}

// There are many ways to pick a DOM node; here we get the form itself and the naam
// input box, as well as the span element into which we will place the error message.
const form  = document.getElementsByTagName('form')[0];

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (inputControl()){
        saveVariables();
        window.location.assign("tournament.html");
    }
})

function inputControl(){
    // Todo
    return true;
}

function setOptions(){
    switch(document.getElementById('type').value){
        case 'CP':
            document.getElementById("nPoules").value = 1;        
            break;
        case 'KF':
            document.getElementById("nPoules").value = 2;  
            break;
        case 'PF':
            document.getElementById("nPoules").value = 2;  
            break;
        case 'PK':
            document.getElementById("nPoules").value = 2;
            break;
        case 'KO':
            document.getElementById("nPoules").value = 1;
            break;
        default:
            break;
    }
    addPouleFields();  
    matchOptions();
    addTeamFields();
}

function matchOptions(){
    if (parseInt(document.getElementById("nTeams").value) < 2 * parseInt(document.getElementById("nPoules").value)){
        document.getElementById("nTeams").value = 2 * parseInt(document.getElementById("nPoules").value);
        //document.getElementById("nTeams")
    }
    addTeamFields();
}

showOptions();
//addPossibleNumbers();
setOptions();

