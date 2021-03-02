var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
var playerInfoArray = []
var selectedPlayers = []
var outputData = [[
    { axis: "Win rate", value: 0 },
    { axis: "First blood rate", value: 0 },
    { axis: "Kill participation", value: 0},
    { axis: "Average share of team death", value: 0 },
    { axis: "Gold share", value: 0 },
    { axis: "Damage", value: 0 }
]]
var playerSelect = document.getElementById("playerSelect");

var nameDiv = document.getElementById("nameHolder");
var playerName = document.getElementById("playerName");
var playerTeam = document.getElementById("playerTeam");
var playerPos = document.getElementById("playerPos");
var colourArray = ["#00A0B0"]
var color = d3.scale.ordinal()
    .range(colourArray);

var radarChartOptions = {
    w: 300,
    h: 300,
    margin: margin,
    maxValue: 100,
    levels: 5,
    roundStrokes: true,
    color: color
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

d3.csv("../player-stats.csv", function(data) {
    for (let i =0; i<data.length; i++) {
        let playerName = document.createElement("p");
        playerName.innerHTML = data[i].Player
        playerName.className = "playerName"
        playerName.id = i
        playerName.onclick = function() { selectplayer(playerName.id) };
        playerSelect.appendChild(playerName)
        data[i].id = i;
    }
    playerInfoArray = data
    
    return RadarChart("#radarChart", outputData, radarChartOptions);
})

function selectplayer(id) {
    var temp = document.getElementById("playerCardTemplate");
    let playerColour = getRandomColor()
    var clon = temp.content.cloneNode(true);
    clon.querySelector(".playerName").textContent = playerInfoArray[id].Player
    clon.querySelector("#playerTeam").textContent = playerInfoArray[id].Team
    clon.querySelector("#playerPos").textContent = playerInfoArray[id].Pos
    clon.querySelector(".playerColour").style.backgroundColor = playerColour
    clon.querySelector(".delete").onclick = function() { removePlayer(id) };

    document.getElementById("playerProfiles").appendChild(clon);
    colourArray.push(playerColour)
    selectedPlayers.push(playerInfoArray[id])
    updatePlayer(id)
}

function updatePlayer(playerId) {
    let tempArr = [
        {axis: "Win rate", value: parseFloat(playerInfoArray[playerId]["W%"])},
        {axis: "First blood rate", value: parseFloat(playerInfoArray[playerId]["FB%"])},
        {axis: "Kill participation", value: parseFloat(playerInfoArray[playerId]["KP"])},
        {axis: "Average share of team death", value: parseFloat(playerInfoArray[playerId]["DTH%"])},
        {axis: "Gold share", value: parseFloat(playerInfoArray[playerId]["GOLD%"])},
        {axis: "Damage", value: parseFloat(playerInfoArray[playerId]['DMG%'])}
    ]
    outputData.push(tempArr)
    return RadarChart("#radarChart", outputData, radarChartOptions);
}

function removePlayer(id) {
    //for (let i=0; i<)
}