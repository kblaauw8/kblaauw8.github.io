// Creating Team object. 
function Team(number, name) { 
    this.d_number = number;
    this.d_name = name; 
    this.d_played = 0;
    this.d_won = 0;
    this.d_lost = 0;
    this.d_draw = 0;
    this.d_points = 0;
    this.d_gf = 0;
    this.d_ga = 0;
    this.d_gd = 0;
    this.d_KO = true;
    this.d_left = true;
    this.printInfo = function() { 
        alert(  "Number: " + this.d_number + "\n" +
                "Name: " + this.d_name + "\n" +
                "GF: " + this.d_gf);  
    } 
    this.reset = function() {
        this.d_played = 0;
        this.d_won = 0;
        this.d_lost = 0;
        this.d_draw = 0;
        this.d_points = 0;
        this.d_gf = 0;
        this.d_ga = 0;
        this.d_gd = 0;
        this.d_KO = true;
    }
} 

function processInput(){
    Naam = sessionStorage.getItem('naam');
    Type = sessionStorage.getItem('type');
    Aantal = parseInt(sessionStorage.getItem('aantal'));
    Begintijd = sessionStorage.getItem('begintijd');
    Speelduur = sessionStorage.getItem('speelduur');
    Pauze = sessionStorage.getItem('pauze');
    for (let i = 0; i < Aantal; i++) 
        TeamNamen[i] = sessionStorage.getItem('team' + i);
    KO_aantal = Type == 'PK' ? Aantal / 2 : Aantal;
    
    document.getElementById("displayName").innerHTML = Naam;
}

function setType(type){
    sessionStorage.setItem('type', type);
}

function sort(poule) { 
    let i, shouldSwitch;
    let switching = true;
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        for (i = 0; i < poule.length - 1; i++) {
            shouldSwitch = false;
            if (!compare(poule[i], poule[i + 1])) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // swith the two teams
            let temp = poule[i];
            poule[i] = poule[i + 1];
            poule[i + 1] = temp;
            // say that switching is done
            switching = true;
        }
    } 
}

function compare(team1, team2){
    let ptsA = team1.d_points;
    let ptsB = team2.d_points;
    let gdA = team1.d_gd;
    let gdB = team2.d_gd;
    let gfA = team1.d_gf;
    let gfB = team2.d_gf;

    if (ptsA < ptsB) 
        return false;
    else if(ptsA == ptsB && gdA < gdB)
        return false;
    else if(ptsA == ptsB && gdA == gdB && gfA < gfB)
        return false;
    else 
        return true;
    
}

function makeRoundRobinPairings(players) {
    if (players.length % 2 == 1) 
        players.push(null);
    
    const playerCount = players.length;
    const rounds = playerCount - 1;
    const half = playerCount / 2;
    const tournamentPairings = [];
    const playerIndexes = players.map((_, i) => i).slice(1);

    for (let round = 0; round < rounds; round++) {
        const roundPairings = [];
        const newPlayerIndexes = [0].concat(playerIndexes);
        const firstHalf = newPlayerIndexes.slice(0, half);
        const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();

        for (let i = 0; i < firstHalf.length; i++) {
            let pairing = round % 2 == 0 ?
            [players[firstHalf[i]], players[secondHalf[i]]]:
            [players[secondHalf[i]], players[firstHalf[i]]];
            roundPairings.push(pairing);
        }

        playerIndexes.push(playerIndexes.shift());
        tournamentPairings.push(roundPairings);
    }
    return tournamentPairings;
}

function thText(text, num){
    let cell = document.createElement("th");
    cell.setAttribute("colspan", num);
    let string = document.createTextNode(text);
    cell.appendChild(string);
    return cell;
}

function makeLeft(){
    let row = document.getElementsByClassName("row");
    let box = make("div", "left");
    row[0].appendChild(box);
    let outLineLeftBox = make("div", "outLineLeft");
    let subheader = make("div", "subheader");
    let tabContent1 = make("div", "tabcontent", "Stand");
    let tabContent2 = make("div", "tabcontent", "Uitslag");
    let buttonsBox = make("div", "box1");
    let tabBox = make("div", "tab");
    subheader.appendChild(makeHeader('h2', "Stand"));
    tabContent1.appendChild(make("div", "box2", "standSpace"));
    tabContent2.appendChild(make("div", "box2", "resultSpace"));
    
    let but1 = document.createElement("button");
    but1.innerHTML = "Stand";
    but1.setAttribute("class", "tablinks");
    but1.setAttribute("id", "defaultOpen");
    but1.onclick = function() {openTab(event, 'Stand')};
    
    let but2 = document.createElement("button");
    but2.innerHTML = "Uitslag";
    but2.setAttribute("class", "tablinks");
    but2.setAttribute("id", "");
    but2.onclick = function() {openTab(event, 'Uitslag')};
    tabBox.appendChild(but1);
    tabBox.appendChild(but2);
    buttonsBox.appendChild(tabBox);
    outLineLeftBox.appendChild(subheader);
    outLineLeftBox.appendChild(tabContent1);
    outLineLeftBox.appendChild(tabContent2);
    outLineLeftBox.appendChild(buttonsBox);
    box.appendChild(outLineLeftBox);

    let standBox = document.getElementById("standSpace");
    if (Type == 'PF' || Type == 'KF'){
        let header1 = makeHeader('h1', "Poule A");
        let header2 = makeHeader('h1', "Poule B");
        standBox.appendChild(header1);
        standBox.appendChild(make("div", "box3", "pouleStand"));
        standBox.appendChild(header2);
        standBox.appendChild(make("div", "box3", "pouleStand"));
    }
    else if (Type == 'CP'){
        standBox.appendChild(make("div", "box3", "cpStandBox"));
    }

    let resultBox = document.getElementById("resultSpace");
    resultBox.appendChild(makeHeader('h1', "Uitslag"));
    resultBox.appendChild(make("div", "box3", "finalResult")); 
}

function makeRight(){
    let row = document.getElementsByClassName("row");
    let box1 = make("div", "right");
    let box = make("div", "outLineRight", "right");
    row[0].appendChild(box1);
    box1.appendChild(box);

    let tabContent1 = make("div", "tabcontent", "Group");
    let tabContent2 = make("div", "tabcontent", "Knockout");
    let buttonsBox = make("div", "box1");
    let tabBox = make("div", "tab");
    
    let but1 = document.createElement("button");
    but1.innerHTML = "Groepsfase";
    but1.setAttribute("class", "tablinks");
    but1.setAttribute("id", "defaultOpen");
    but1.onclick = function() {openTab(event, 'Group')};
    
    let but2 = document.createElement("button");
    but2.innerHTML = "Kockout-fase";
    but2.setAttribute("class", "tablinks");
    but2.setAttribute("id", "");
    but2.onclick = function() {openTab(event, 'Knockout')};
    tabBox.appendChild(but1);
    tabBox.appendChild(but2);
    buttonsBox.appendChild(tabBox);  

    let box3_1 = make("div", "box3");
    let box3_2 = make("div", "box3");
    let box5_1 = make("div", "box5");
    let box5_2 = make("div", "box5");
    
    let subheader0 = make("div", "subheader");
    let subheader1 = make("div", "subheader");
    let subheader2 = make("div", "subheader");
    subheader0.appendChild(makeHeader('h2', "Speelschema"));
    subheader1.appendChild(makeHeader('h2', "Groepsfase"));
    subheader2.appendChild(makeHeader('h2', "Knockout-fase"));

    let finalArray = ["Finale", "Halve finale", "Kwart Finale", "Achtste Finale"];
    
    if (Type == 'PF'){
        box.appendChild(subheader0);
        box.appendChild(box5_1);
        box.appendChild(box5_2);
        box5_1.appendChild(makeHeader('h1', "Poule wedstrijden"));
        box5_1.appendChild(box3_1);
        box3_1.appendChild(make("div", "box3", "pouleGamesBox"));
        box3_1.appendChild(make("div", "box3", "pouleGamesBox"));
        box5_2.appendChild(makeHeader('h1', "Finale wedstrijden"));
        box5_2.appendChild(box3_2);
        box3_2.appendChild(make("div", "box3", "finalGamesBox"));
    }
    else if (Type == 'KF'){
        box.appendChild(subheader0);
        box.appendChild(box5_1);
        box.appendChild(box5_2);
        box5_1.appendChild(makeHeader('h1', "Poule wedstrijden"));
        box5_1.appendChild(box3_1);
        box3_1.appendChild(make("div", "box3", "pouleGamesBox"));
        box3_1.appendChild(make("div", "box3", "pouleGamesBox"));
        box5_2.appendChild(makeHeader('h1', "Finale wedstrijden"));
        box5_2.appendChild(box3_2);
        box3_2.appendChild(make("div", "box3", "finalGamesBox"));
        box3_2.appendChild(make("div", "box3", "finalGamesBox"));
    }
    else if (Type == 'CP'){
        box.appendChild(subheader0);
        box.appendChild(box3_1);
        for (let i = 0; i != Aantal - 1; i++)
            box3_1.appendChild(make("div", "box3", "cpRoundGamesBox"));
    }
    else if (Type == 'KO'){
        box.appendChild(subheader0);
        box.appendChild(box3_1);
        rounds = getBaseLog(2, KO_aantal);
        for (let round = 0; round != rounds;  round++){
            let box4 = make("div", "box4");
            let box5 = make("div", "box5")
            let box = make("div", "box");
            box.appendChild(makeHeader('h1', finalArray[rounds - 1 - round]));
            box4.appendChild(box);
            box4.appendChild(box5);
            for (let game = 0; game != GamesPerRound(round);  game++){
                let box6 = make("div", "box6");
                let box3 = make("div", "box3", "KOfinal");
                box6.appendChild(box3);
                box5.appendChild(box6);                            
            }
            box3_1.appendChild(box4);
        }
    }
    else if (Type == 'PK'){
        box.appendChild(tabContent1);
        box.appendChild(tabContent2);
        box.appendChild(buttonsBox);
        tabContent1.appendChild(subheader1);
        tabContent1.appendChild(box3_1);
        for (let i = 0; i != Aantal / 4;  i++){
            let box4 = make("div", "box4");
            box4.appendChild(make("div", "box").appendChild(makeHeader('h1', "Poule " + numToLet(i))));
            box4.appendChild(make("div", "box3", "pouleGames"));
            box4.appendChild(make("div", "box3", "pkPouleStandBox"));
            box3_1.appendChild(box4);
        }
        tabContent2.appendChild(subheader2);
        tabContent2.appendChild(box3_2);
        rounds = getBaseLog(2, KO_aantal);
        for (let round = 0; round != rounds;  round++){
            let box4 = make("div", "box4");
            let box5 = make("div", "box5")
            let box = make("div", "box");
            box.appendChild(makeHeader('h1', finalArray[rounds - 1 - round]));
            box4.appendChild(box);
            box4.appendChild(box5);
            for (let game = 0; game != GamesPerRound(round);  game++){
                let box6 = make("div", "box6");
                let box3 = make("div", "box3", "KOfinal");
                box6.appendChild(box3);
                box5.appendChild(box6);                            
            }
            box3_2.appendChild(box4);
        }
    }
}


function numToLet(num){
  let s = '', t;
  t = (num) % 26;
  s = String.fromCharCode(65 + t);
  return s
}

function make(type, class_, id_){
    let el = document.createElement(type);
    el.setAttribute("class", class_);
    el.setAttribute("id", id_);
    return el;
}

function makeHeader(type, text)
{
    let nHeader = document.createElement(type);
    nHeader.setAttribute("class", "custom1");
    let nText = document.createTextNode(text);
    nHeader.appendChild(nText);
    return nHeader;
}

function newNumInput(){
    let newInput = document.createElement("input");
    newInput.type = "number";
    newInput.setAttribute("min", '0');
    newInput.setAttribute("step", '1');
    return newInput; 
}

function newKOTable(id_)
{
    let table = document.createElement("table");
    table.setAttribute("class", "KOgame");
    table.setAttribute("id", id_);

    let row_0 = document.createElement("tr");
    let row_1 = document.createElement("tr");
    let cell_0 = document.createElement("td");
    let cell_1 = document.createElement("td");
    let cell_2 = document.createElement("td");
    let cell_3 = document.createElement("td");
    let cell_4 = document.createElement("td");
    let cell_5 = document.createElement("td");
    let cell_6 = document.createElement("td");
    let cell_7 = document.createElement("td");
    let text_0 = document.createTextNode("Tijd");
    let text_1 = document.createTextNode("Veld");
    
    cell_0.appendChild(text_0);
    cell_1.appendChild(text_1);
    cell_3.appendChild(newNumInput());
    cell_7.appendChild(newNumInput());
    cell_4.appendChild(crText("19:00"));
    cell_5.appendChild(crText("1"));

    row_0.appendChild(cell_0);
    row_0.appendChild(cell_1);
    row_0.appendChild(cell_2);
    row_0.appendChild(cell_3);
    row_1.appendChild(cell_4);
    row_1.appendChild(cell_5);
    row_1.appendChild(cell_6);
    row_1.appendChild(cell_7);

    table.appendChild(row_0);
    table.appendChild(row_1);

    return table;
}

function makeSchedule()
{
    let finalArray = ["Achtste Finales", "Kwart Finales", "Halve Finales", "Finales"];

     if (Type == 'KO')
    {
        let finalSpaces = document.querySelectorAll("#KOfinal");
        for (let i = 0; i != Aantal - 1; i++) 
            finalSpaces[i].appendChild(newKOTable(i));
    }
    else if (Type == 'PF' || Type == 'KF')
    {
        let pouleSpaces = document.querySelectorAll("#pouleGamesBox");
        for (let i = 0; i != pouleSpaces.length; i++) 
            pouleSpaces[i].appendChild(newPouleTable(Teams_PF[i], "pf", "Poule " + numToLet(i)));

        let finalSpaces = document.querySelectorAll("#finalGamesBox");
        for (let i = 0; i != finalSpaces.length; i++) 
            finalSpaces[i].appendChild(newFinalTable(Aantal / 2, "finalGame" + i, finalArray[finalArray.length - finalSpaces.length + i]));
    }
    else if (Type == 'CP')
    {
        let compRoundSpaces = document.querySelectorAll("#cpRoundGamesBox");
        for (let i = 0; i != compRoundSpaces.length; i++) 
            compRoundSpaces[i].appendChild(newCompRoundTable(Teams, i));
    }
    else if (Type == 'PK')
    {
        let pouleSpaces = document.querySelectorAll("#pouleGames");
        for (let i = 0; i != pouleSpaces.length; i++) 
            pouleSpaces[i].appendChild(newPouleTable(Teams_PK[i], "pk", "Groepswedstrijden"));

        let finalSpaces = document.querySelectorAll("#KOfinal");
        for (let i = 0; i != finalSpaces.length; i++) 
            finalSpaces[i].appendChild(newKOTable(i));
    }
}

function makeStandings()
{
    if (Type == 'PF' || Type == 'KF'){
        let standingSpaces = document.querySelectorAll("#pouleStand");
        for (let i = 0; i != standingSpaces.length; i++)
            standingSpaces[i].appendChild(newStandTable(Aantal / 2));
    } 
    if (Type == 'PK'){
        let standingSpaces = document.querySelectorAll("#pkPouleStandBox");
        for (let i = 0; i != standingSpaces.length; i++)
            standingSpaces[i].appendChild(newStandTable(4));
    }   
    if (Type == 'CP'){
        let standingSpaces = document.querySelectorAll("#cpStandBox");
        for (let i = 0; i != standingSpaces.length; i++)
            standingSpaces[i].appendChild(newStandTable(Aantal));
    }  
}

function makeResults()
{
    if (Type == 'PF' || Type == 'KF' || Type == 'CP'){
        let standingSpaces = document.querySelectorAll("#finalResult");
        for (let i = 0; i != standingSpaces.length; i++)
            standingSpaces[i].appendChild(newResultTable(Aantal));
    } 
}

function getBaseLog(y, x) {
  return Math.log(x) / Math.log(y);
}

function makeTimes(number){
    times = new Array(number)
    for (let i = 0; i != number; i++) 
        times[i] = minutesToTime(timeToMinutes(Begintijd) + i * (timeToMinutes(Speelduur) + timeToMinutes(Pauze)));
    return times;
}

function newResultTable(aantal){
    let table = crType("table");
    table.setAttribute("class", "resultTable");

    let row_0 = crType("tr");
    row_0.appendChild(thText('#', 1));
    row_0.appendChild(thText('Team', 1));
    table.appendChild(row_0);

    while (table.childElementCount != 1) 
        table.removeChild(table.lastChild);
    
    for (let row = 0; row != aantal; row++){
        let row_n = crType("tr");
        for (let col = 0; col != 2; col++) {
            let cell_n = crType("td");
            if (col == 0)
                cell_n.appendChild(crText(row + 1));
            row_n.appendChild(cell_n);
        }
        table.appendChild(row_n);
    }
    return table;
}

function newStandTable(aantal){
    let table = crType("table");
    table.setAttribute("class", "standTable");

    let row_0 = crType("tr");
    row_0.appendChild(thText('#', 1));
    row_0.appendChild(thText('Team', 1));
    row_0.appendChild(thText('WG', 1));
    row_0.appendChild(thText('W', 1));
    row_0.appendChild(thText('V', 1));
    row_0.appendChild(thText('G', 1));
    row_0.appendChild(thText('Pnt', 1));
    row_0.appendChild(thText('+/-', 2));
    table.appendChild(row_0);

    while (table.childElementCount != 1) 
        table.removeChild(table.lastChild);
    
    for (let row = 0; row != aantal; row++){
        let row_n = crType("tr");
        for (let col = 0; col != 9; col++) {
            let cell_n = crType("td");
            row_n.appendChild(cell_n);
        }
        table.appendChild(row_n);
    }
    return table
}

function newPouleTable(teams, class_, header){
    let nRounds = teams.length - 1;
    let nGamesPerRound = teams.length / 2;
    let pairs = makeRoundRobinPairings(teams);
       
    let table = crType("table");
    table.setAttribute("class", class_);
    let row_0 = crType("tr");
    let row_1 = crType("tr");
    let cell_0 = crType("th");
    let cell_1 = crType("td");
    let cell_2 = crType("td");
    let cell_3 = crType("td");
    cell_0.setAttribute("colspan", 7);
    cell_3.setAttribute("colspan", 5);
    cell_0.appendChild(crText(header));
    cell_1.appendChild(crText("Tijd"));
    cell_2.appendChild(crText("Veld"));
    cell_3.appendChild(crText("Teams"));
    row_0.appendChild(cell_0); 
    row_1.appendChild(cell_1);
    row_1.appendChild(cell_2);
    row_1.appendChild(cell_3);
    table.appendChild(row_0);
    table.appendChild(row_1);
    
    for (let round = 0; round != nRounds; round++)
        for (let game = 0; game != nGamesPerRound; game++){
            let team1 = pairs[round][game][0];
            let team2 = pairs[round][game][1];
            let row_2 = crType("tr");
            let cell_4 = crType("td");
            let cell_5 = crType("td");
            let cell_6 = crType("td");
            let cell_7 = crType("td");
            let cell_8 = crType("td");
            let cell_9 = crType("td");
            let cell_10 = crType("td");
            row_2.setAttribute("class", "game");
            row_2.setAttribute("id", "pouleGame")
            cell_6.appendChild(crText(team1.d_name));
            cell_10.appendChild(crText(team2.d_name));
            cell_6.setAttribute("id", team1.d_number);
            cell_10.setAttribute("id", team2.d_number);
            cell_4.appendChild(crText("19:00"));
            cell_5.appendChild(crText("1"));
            cell_8.appendChild(crText("-"));
            cell_7.appendChild(newNumInput());
            cell_9.appendChild(newNumInput());
            row_2.appendChild(cell_4);
            row_2.appendChild(cell_5);
            row_2.appendChild(cell_6);
            row_2.appendChild(cell_7);
            row_2.appendChild(cell_8);
            row_2.appendChild(cell_9);
            row_2.appendChild(cell_10);
            table.appendChild(row_2);
        }
    return table;
}

function newCompRoundTable(teams, round){
    let nGamesPerRound = teams.length / 2;
    let pairs = makeRoundRobinPairings(teams);
       
    let table = crType("table");
    table.setAttribute("class", "cp");
    let row_0 = crType("tr");
    let row_1 = crType("tr");
    let cell_0 = crType("th");
    let cell_1 = crType("td");
    let cell_2 = crType("td");
    let cell_3 = crType("td");
    cell_0.setAttribute("colspan", 7);
    cell_3.setAttribute("colspan", 5);
    cell_0.appendChild(crText("Ronde " + (round + 1)));
    cell_1.appendChild(crText("Tijd"));
    cell_2.appendChild(crText("Veld"));
    cell_3.appendChild(crText("Teams"));
    row_0.appendChild(cell_0); 
    row_1.appendChild(cell_1);
    row_1.appendChild(cell_2);
    row_1.appendChild(cell_3);
    table.appendChild(row_0);
    table.appendChild(row_1);
    
    for (let game = 0; game != nGamesPerRound; game++){
        let team1 = pairs[round][game][0];
        let team2 = pairs[round][game][1];
        let row_2 = crType("tr");
        let cell_4 = crType("td");
        let cell_5 = crType("td");
        let cell_6 = crType("td");
        let cell_7 = crType("td");
        let cell_8 = crType("td");
        let cell_9 = crType("td");
        let cell_10 = crType("td");
        row_2.setAttribute("class", "game");
        row_2.setAttribute("id", "pouleGame")
        cell_6.appendChild(crText(team1.d_name));
        cell_10.appendChild(crText(team2.d_name));
        cell_6.setAttribute("id", team1.d_number);
        cell_10.setAttribute("id", team2.d_number);
        cell_4.appendChild(crText("19:00"));
        cell_5.appendChild(crText("1"));
        cell_8.appendChild(crText("-"));
        cell_7.appendChild(newNumInput());
        cell_9.appendChild(newNumInput());
        row_2.appendChild(cell_4);
        row_2.appendChild(cell_5);
        row_2.appendChild(cell_6);
        row_2.appendChild(cell_7);
        row_2.appendChild(cell_8);
        row_2.appendChild(cell_9);
        row_2.appendChild(cell_10);
        table.appendChild(row_2);
    }
    return table;
}

function newFinalTable(aantal, gameID, header){
       
    let table = crType("table");
    table.setAttribute("class", "fi");
    let row_0 = crType("tr");
    let row_1 = crType("tr");
    let cell_0 = crType("th");
    let cell_1 = crType("td");
    let cell_2 = crType("td");
    let cell_3 = crType("td");
    cell_0.setAttribute("colspan", 7);
    cell_3.setAttribute("colspan", 5);
    cell_0.appendChild(crText(header));
    cell_1.appendChild(crText("Tijd"));
    cell_2.appendChild(crText("Veld"));
    cell_3.appendChild(crText("Teams"));
    row_0.appendChild(cell_0); 
    row_1.appendChild(cell_1);
    row_1.appendChild(cell_2);
    row_1.appendChild(cell_3);
    table.appendChild(row_0);
    table.appendChild(row_1);
    
    for (let game = 0; game != aantal; game++){
            let row_2 = crType("tr");
            let cell_4 = crType("td");
            let cell_5 = crType("td");
            let cell_6 = crType("td");
            let cell_7 = crType("td");
            let cell_8 = crType("td");
            let cell_9 = crType("td");
            let cell_10 = crType("td");
            row_2.setAttribute("class", "game");
            row_2.setAttribute("id", gameID);
            cell_4.setAttribute("id", game);
            cell_4.appendChild(crText("19:00"));
            cell_5.appendChild(crText("1"));
            cell_8.appendChild(crText("-"));
            cell_7.appendChild(newNumInput());
            cell_9.appendChild(newNumInput());
            row_2.appendChild(cell_4);
            row_2.appendChild(cell_5);
            row_2.appendChild(cell_6);
            row_2.appendChild(cell_7);
            row_2.appendChild(cell_8);
            row_2.appendChild(cell_9);
            row_2.appendChild(cell_10);
            table.appendChild(row_2);
        }
    return table;
}

function crType(type){
    return document.createElement(type);
}

function crText(text){
    return document.createTextNode(text);
}

function newTimeInput(time){
    let newInput = document.createElement("input");
    newInput.type = "time";
    newInput.setAttribute("value", time);
    newInput.setAttribute("required", true);
    return newInput;
}

function upTable(table, teams){
    sort(teams);
    for (let i = 0; i != teams.length; i++){
        let row = table.childNodes[i + 1];
        row.childNodes[0].innerHTML = i + 1;
        row.childNodes[1].innerHTML = teams[i].d_name;
        row.childNodes[2].innerHTML = teams[i].d_played;
        row.childNodes[3].innerHTML = teams[i].d_won;
        row.childNodes[4].innerHTML = teams[i].d_lost;
        row.childNodes[5].innerHTML = teams[i].d_draw;
        row.childNodes[6].innerHTML = teams[i].d_points;
        row.childNodes[7].innerHTML = teams[i].d_gf;
        row.childNodes[8].innerHTML = teams[i].d_ga;
    }
}

function upTables(){
    switch(Type){
        case 'PK':
            let tables = document.getElementsByClassName("standTable");
            for (i = 0; i != tables.length; i++)
                upTable(tables[i], Teams_PK[i]);
            break;
        case 'PF':
            let tables1 = document.getElementsByClassName("standTable");
            for (i = 0; i != tables1.length; i++)
                upTable(tables1[i], Teams_PF[i]);
            break;
        case 'KF':
            let tables2 = document.getElementsByClassName("standTable");
            for (i = 0; i != tables2.length; i++)
                upTable(tables2[i], Teams_PF[i]);
            break;
        case 'CP':
            let tables3 = document.getElementsByClassName("standTable");
            for (i = 0; i != tables3.length; i++)
                upTable(tables3[i], Teams_CP);
            break;
        default:
            break;
    }     
}

function toDate(dStr,format) {
    let now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0,dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
        now.setSeconds(0);
        return now;
    }else 
        return "Invalid Format";
}

function timeToMinutes(time) {
    let h = time.substr(0,time.indexOf(":"));
    let m = time.substr(time.indexOf(":")+1);
    let minutes = 60 * Number(h) + Number(m);
    return minutes;
}

function minutesToTime(minutes) {
    if (minutes >= (24 * 60)){
        minutes -= (24 * 60)
    }
    let min = minutes % 60;
    minutes -= min;
    let hour = minutes / 60;
    let time = hour + ":" + min;
    if (min < 10) {
        time += "0";
    }
    return time;
}

function played(item){
    return item.d_played == Aantal / 2 - 1;
}

function played1(item){
    return item.d_played == Aantal - 1;
}

function played2(item){
    return item.d_played == 3;
}

function upSchedule(){ 
    let pouleGames = document.querySelectorAll("#poule");
    for (let i = 0; i != pouleGames.length; ++i){
        pouleGames[i].childNodes[2].innerHTML =  Teams[pouleGames[i].childNodes[2].id].d_name;
        pouleGames[i].childNodes[6].innerHTML =  Teams[pouleGames[i].childNodes[6].id].d_name;
    }

    if (Type == 'PF') {
        let finalGames0 = document.querySelectorAll("#finalGame0")
        for (let i = 0; i != finalGames0.length; i++) {
            sort(Teams_PF[0]);
            sort(Teams_PF[1]);
            finalGames0[i].childNodes[2].id = Teams_PF[0].every(played) ? Teams_PF[0][i].d_number : undefined;
            finalGames0[i].childNodes[6].id = Teams_PF[1].every(played) ? Teams_PF[1][i].d_number : undefined;
            finalGames0[i].childNodes[2].innerHTML = Teams_PF[0].every(played) ? Teams_PF[0][i].d_name : i + 1 + 'e poule A';
            finalGames0[i].childNodes[6].innerHTML = Teams_PF[1].every(played) ? Teams_PF[1][i].d_name : i + 1 + 'e poule B';
        }
    }
    if (Type == 'KF') {
        let finalGames0 = document.querySelectorAll("#finalGame0")
        for (let i = 0; i != finalGames0.length; i++) {
            sort(Teams_PF[0]);
            sort(Teams_PF[1]);
            idx1 = isEven(i) ? 0 : 1;
            idx2 = isEven(i) ? 1 : 0;
            idx3 = i - (i % 2);
            tekst1 = isEven(i) ? "poule A" : "poule B";
            tekst2 = isEven(i) ? "poule B" : "poule A";
            finalGames0[i].childNodes[2].id = Teams_PF[idx1].every(played) ? Teams_PF[idx1][idx3].d_number : undefined;
            finalGames0[i].childNodes[6].id = Teams_PF[idx2].every(played) ? Teams_PF[idx2][idx3 + 1].d_number : undefined;
            finalGames0[i].childNodes[2].innerHTML = Teams_PF[idx1].every(played) ? Teams_PF[idx1][idx3].d_name : idx3 + 1 + 'e ' + tekst1;
            finalGames0[i].childNodes[6].innerHTML = Teams_PF[idx2].every(played) ? Teams_PF[idx2][idx3 + 1].d_name : idx3 + 2 + 'e ' + tekst2;
        }
        let finalGames1 = document.querySelectorAll("#finalGame1")
        for (let i = 0; i != finalGames1.length; i++) {
            tekst = (i % 2 == 0) ? "winnaar" : "verliezer";
            numb  = (i % 2 == 0) ? 1 : 0;
            finalGames1[i].childNodes[2].id = typeof(Teams_FI1[2 * i]) != 'undefined' ? Teams_FI1[2 * i].d_number : "";
            finalGames1[i].childNodes[6].id = typeof(Teams_FI1[2 * i + 1]) != 'undefined' ? Teams_FI1[2 * i + 1].d_number : "";
            finalGames1[i].childNodes[2].innerHTML = typeof(Teams_FI1[2 * i]) != 'undefined' ? Teams_FI1[2 * i].d_name : tekst + " HF " + (i + numb);
            finalGames1[i].childNodes[6].innerHTML = typeof(Teams_FI1[2 * i + 1]) != 'undefined' ? Teams_FI1[2 * i + 1].d_name : tekst + " HF " + (i + numb + 1);
        }
    }

    else if (Type == 'KO'){
        let KOfinals = document.getElementsByClassName("KOgame");
        for (round = 0; round != getBaseLog(2, Aantal); round++) {
            let roundGames = GamesPerRound(round);
            let roundIndex = 0;
            for (idx = round; idx != 0; idx--)
                roundIndex += GamesPerRound(idx - 1);
            for (game = 0; game != roundGames; game++) {
                KOfinals[roundIndex + game].childNodes[0].childNodes[2].id = typeof(Teams_KO[round][2 * game]) != 'undefined' ? Teams_KO[round][2 * game].d_number : "";
                KOfinals[roundIndex + game].childNodes[1].childNodes[2].id = typeof(Teams_KO[round][2 * game + 1]) != 'undefined' ? Teams_KO[round][2 * game + 1].d_number : "";
                KOfinals[roundIndex + game].childNodes[0].childNodes[2].innerHTML = typeof(Teams_KO[round][2 * game]) != 'undefined' ? Teams_KO[round][2 * game].d_name : "";
                KOfinals[roundIndex + game].childNodes[1].childNodes[2].innerHTML = typeof(Teams_KO[round][2 * game + 1]) != 'undefined' ? Teams_KO[round][2 * game + 1].d_name : "";
            } 
        }       
    }
    else if (Type == 'PK'){
        for (let i = 0; i != Teams_PK.length; i++){
            sort(Teams_PK[i]);
            let pouleFinished = Teams_PK[i].every(played2)
            Teams_KO[0][2 * i] = pouleFinished ? Teams_PK[i][0] : undefined;
            Teams_KO[0][2 * i + 1] = pouleFinished ? Teams_PK[i][1] : undefined;
        }

        let KOfinals = document.getElementsByClassName("KOgame");
        for (round = 0; round != getBaseLog(2, KO_aantal); round++) {
            let roundGames = GamesPerRound(round);
            let roundIndex = 0;
            for (idx = round; idx != 0; idx--)
                roundIndex += GamesPerRound(idx - 1);
            for (game = 0; game != roundGames; game++) {
                KOfinals[roundIndex + game].childNodes[0].childNodes[2].id = typeof(Teams_KO[round][2 * game]) != 'undefined' ? Teams_KO[round][2 * game].d_number : "";
                KOfinals[roundIndex + game].childNodes[1].childNodes[2].id = typeof(Teams_KO[round][2 * game + 1]) != 'undefined' ? Teams_KO[round][2 * game + 1].d_number : "";
                KOfinals[roundIndex + game].childNodes[0].childNodes[2].innerHTML = typeof(Teams_KO[round][2 * game]) != 'undefined' ? Teams_KO[round][2 * game].d_name : "";
                KOfinals[roundIndex + game].childNodes[1].childNodes[2].innerHTML = typeof(Teams_KO[round][2 * game + 1]) != 'undefined' ? Teams_KO[round][2 * game + 1].d_name : "";
            } 
        }       
    }
}

function isEven(n) {
   return n % 2 == 0;
}

function GamesPerRound(round){
    return Math.pow(2, getBaseLog(2, KO_aantal) - 1 - round);
}

function upResults(){
    let tables = document.getElementsByClassName("resultTable");
    for (let i = 0; i != Aantal; i++) 
            tables[0].childNodes[i + 1].childNodes[1].innerHTML = typeof(Teams_FI[i]) != 'undefined' ? Teams_FI[i].d_name : "";
}

function resetTeams() {
    for (var i = 0; i < Teams.length; i++) {
    Teams[i].reset();
    }
}

function clearScores(className){    
    let inputs = document.getElementsByClassName(className);
    for (let i = 0; i < inputs.length; i++) 
        inputs[i].value = '';
}

function reset(item){
    item.reset();
}

function processScore(a, b, score1, score2){
    score1 = Number(score1);
    score2 = Number(score2);
    Teams[a].d_played++;
    Teams[b].d_played++;
    if (score1 > score2) {
        Teams[a].d_won++;
        Teams[a].d_points += 3;
        Teams[b].d_lost++;
        Teams[b].d_points += 0;
    } else if (score2 > score1){
        Teams[b].d_won++;
        Teams[b].d_points += 3;
        Teams[a].d_lost++;
        Teams[a].d_points += 0;
    } else {
        Teams[a].d_draw++;
        Teams[b].d_draw++;
        Teams[a].d_points++;
        Teams[b].d_points++;
    }
    Teams[a].d_gf += score1;
    Teams[b].d_gf += score2;
    Teams[a].d_ga += score2;
    Teams[b].d_ga += score1;
    Teams[a].d_gd = (Teams[a].d_gf - Teams[a].d_ga);
    Teams[b].d_gd = (Teams[b].d_gf - Teams[b].d_ga);
}

function newScore(game){    

    Teams.forEach(reset);
    if (Type == 'PF' || Type == 'KF' || Type == 'CP' || Type == 'PK') {
        let pouleGames = document.querySelectorAll("#pouleGame");
        pouleGames.forEach(processPouleGame)
    }
    if (Type == 'PF') {
        let finalGames = document.querySelectorAll("#finalGame0");
        finalGames.forEach(processFinalGame)
    }
    if (Type == 'KF') {
        let finalGames = document.querySelectorAll("#finalGame0");
        finalGames.forEach(processFinalGame1)
        let finalGames1 = document.querySelectorAll("#finalGame1");
        finalGames1.forEach(processFinalGame)
    }
    if (Type == 'KO' || Type == 'PK'){
        let KOfinals = document.querySelectorAll(".KOgame");
        KOfinals.forEach(processKOGame);
    }   
}

function updateTournament(){
    upTables();
    upSchedule();
    if (Type != 'KO' && Type != 'PK'){
        upResults();
    }
}

function findKORound(gID, aantal){
    let round = 0, value = aantal / 2;
    while (gID >= value)
    {
        round++;
        value += aantal / Math.pow(2, round + 1);
    }
    return round;
}

function findKOGame(gID, aantal){
    let round = 0, value = aantal / 2, corr = 0;
    while (gID >= value)
    {
        round++;
        value += aantal / Math.pow(2, round + 1);
        corr += aantal / Math.pow(2, round);
    }
    return gID - corr;
}

function processKOGame(game){
    game.className = game.className.replace("active", "");
    game.childNodes[0].className = game.childNodes[0].className.replace("active", "");
    game.childNodes[1].className = game.childNodes[1].className.replace("active", "");
    let team1 = Teams[game.childNodes[0].childNodes[2].id];
    let team2 = Teams[game.childNodes[1].childNodes[2].id];
    let score1 = game.childNodes[0].childNodes[3].firstChild.value;
    let score2 = game.childNodes[1].childNodes[3].firstChild.value;
    let gID = Number(game.id);
    let bothKnown = typeof(team1) != 'undefined' && typeof(team2) != 'undefined';
    let scoreKnown = score1.length != 0 && score2.length != 0 && score1 != score2;
    game.className += bothKnown && scoreKnown ? " active" : "";
    let roundN = findKORound(gID, KO_aantal);
    let gameN = findKOGame(gID, KO_aantal);
    Teams_KO[roundN + 1][gameN] = bothKnown && scoreKnown ? Number(score1) > Number(score2) ? team1 : team2 : undefined;
    game.childNodes[0].className += bothKnown && scoreKnown && Number(score1) > Number(score2) ? " active" : "";     
    game.childNodes[1].className += bothKnown && scoreKnown && Number(score1) < Number(score2) ? " active" : "";   
    console.log('Teams_KO', Teams_KO);
    updateTournament();
}

function processFinalGame(game){
    game.className = game.className.replace("active", "");
    let team1 = Teams[game.childNodes[2].id];
    let team2 = Teams[game.childNodes[6].id];
    let score1 = game.childNodes[3].firstChild.value;
    let score2 = game.childNodes[5].firstChild.value;
    let finalID = Number(game.childNodes[0].id);
    if (score1.length == 0 || score2.length == 0 || score1 == score2) {
        Teams_FI[2 * finalID] = undefined;
        Teams_FI[2 * finalID + 1] = undefined;
    } 
    else {
        game.className += " active";
        Teams_FI[2 * finalID] = Number(score1) > Number(score2) ? team1 : team2;
        Teams_FI[2 * finalID + 1] = Number(score1) > Number(score2) ? team2 : team1;
    } 
    updateTournament();
}

function processFinalGame1(game){
    game.className = game.className.replace("active", "");
    let team1 = Teams[game.childNodes[2].id];
    let team2 = Teams[game.childNodes[6].id];
    let score1 = game.childNodes[3].firstChild.value;
    let score2 = game.childNodes[5].firstChild.value;
    let finalID = Number(game.childNodes[0].id);
    let add = isEven(finalID) ? 0 : -1;
    if (score1.length == 0 || score2.length == 0 || score1 == score2) {
        Teams_FI1[finalID * 2 + add] = undefined;
        Teams_FI1[finalID * 2 + 2 + add] = undefined;
    } 
    else {
        game.className += " active";
        Teams_FI1[finalID * 2 + add] = Number(score1) > Number(score2) ? team1 : team2;
        Teams_FI1[finalID * 2 + 2 + add] = Number(score1) > Number(score2) ? team2 : team1;
    } 
    updateTournament();
}

function processPouleGame(game){
    game.className = game.className.replace("active", "");
    let team1 = game.childNodes[2].id;
    let team2 = game.childNodes[6].id;
    let score1 = game.childNodes[3].firstChild.value;
    let score2 = game.childNodes[5].firstChild.value;
    if (score1.length != 0 && score2.length !=0) {
        processScore(team1, team2, score1, score2);
        game.className += " active";
    }
    updateTournament();
}

function fillTeams() {
    for (let i = 0; i != Aantal; i++) {
    Teams[i] = new Team(i, TeamNamen[i]);
    Teams[i].d_left = i < Aantal / 2;
    Teams_CP[i] = Teams[i];
    }

    for (let i = 0; i != 2; i++)
        Teams_PF[i] = Teams.slice((Aantal / 2) * i, (Aantal / 2) * (i + 1));  

    for (let i = 0; i != Aantal / 4; i++) 
        Teams_PK[i] = Teams.slice(4 * i, 4 * (i + 1));
      
    for (let i = 0; i != Teams_KO.length; i++) 
        Teams_KO[i] = new Array(Aantal); 

    if (Type == 'KO')
        Teams_KO[0] = Teams;   

    if (Type != 'KO' && Type != 'PK') 
        makeLeft();
}

let Naam, Type, Aantal, Begintijd, Speelduur, Pauze, KO_aantal;
let TeamNamen = [];

// process input from memory
processInput();

Teams = new Array(Aantal);
Teams_PF = new Array(2);
Teams_CP = new Array(Aantal);
Teams_PK = new Array(Aantal / 4);
Teams_KO = new Array(getBaseLog(2, Aantal) + 1);
Teams_FI = new Array(Aantal);
Teams_FI1 = new Array(Aantal);

fillTeams();
makeRight();
makeSchedule();
makeStandings();
makeResults();
updateTournament();

if (Type == 'KO' || Type == 'PK') {
    let box = document.getElementsByClassName("right");
    box[0].className += " active";
    let box1 = document.getElementsByClassName("outLineRight");
    box1[0].className += " active";
}

const games = document.querySelectorAll(".game");
for (let i = 0; i != games.length; i++) {
    games[i].childNodes[3].firstChild.addEventListener('input', function (event) {newScore(games[i])});
    games[i].childNodes[5].firstChild.addEventListener('input', function (event) {newScore(games[i])});
}

const KOgames = document.getElementsByClassName("KOgame");
for (let i = 0; i != KOgames.length; i++) {
    KOgames[i].childNodes[0].childNodes[3].firstChild.addEventListener('input', function (event) {newScore(games[i])});
    KOgames[i].childNodes[1].childNodes[3].firstChild.addEventListener('input', function (event) {newScore(games[i])});
}






