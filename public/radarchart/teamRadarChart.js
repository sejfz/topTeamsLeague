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
        playerName.onclick = function() { selectplayer(parseInt(playerName.id)) };
        playerSelect.appendChild(playerName)
        data[i].id = i;
    }
    playerInfoArray = data
    
    RadarChart("#radarChart", outputData, radarChartOptions);
    outputData.splice(0, 1)
    colourArray.splice(0, 1)
})

function selectplayer(id) {
    for (let i=0; i<selectedPlayers.length; i++) {
        if (selectedPlayers[i].id === id) {
            return
        }
    }
    var temp = document.getElementById("playerCardTemplate");
    let playerColour = getRandomColor()
    var clon = temp.content.cloneNode(true);
    playerInfoArray[id].playerColour = playerColour
    clon.querySelector(".playerCard").id = "player_" + id
    clon.querySelector(".playerName").textContent = playerInfoArray[id].Player
    clon.querySelector(".playerTeam").textContent = playerInfoArray[id].Team
    clon.querySelector(".playerPos").textContent = playerInfoArray[id].Pos
    clon.querySelector(".playerColour").style.backgroundColor = playerColour
    clon.querySelector(".delete").onclick = function() { removePlayer(parseInt(id)) };

    document.getElementById("playerProfiles").appendChild(clon);
    addPlayer(id)
}

function addPlayer(playerId) {
    selectedPlayers.push(playerInfoArray[playerId])
    colourArray.push(playerInfoArray[playerId].playerColour)
    updatePlayer()
}

function updatePlayer() {
    outputData = []
    //colourArray = []
    
    for (let i=0; i<selectedPlayers.length; i++) {
        // colourArray.push(selectedPlayers[i].playerColour)
        // console.log(colourArray)   
        let tempArr = [
            {axis: "Win rate", value: parseFloat(selectedPlayers[i]["W%"])},
            {axis: "First blood rate", value: parseFloat(selectedPlayers[i]["FB%"])},
            {axis: "Kill participation", value: parseFloat(selectedPlayers[i]["KP"])},
            {axis: "Average share of team death", value: parseFloat(selectedPlayers[i]["DTH%"])},
            {axis: "Gold share", value: parseFloat(selectedPlayers[i]["GOLD%"])},
            {axis: "Damage", value: parseFloat(selectedPlayers[i]['DMG%'])}
        ]
        outputData.push(tempArr)
    }
    //console.log(radarChartOptions.color)
    return RadarChart("#radarChart", outputData, radarChartOptions);
}

function removePlayer(id) {
    let removePlayerId = null;
    for (let i=0; i<selectedPlayers.length; i++) {
        console.log({play: selectedPlayers[i].id, id: id})
        if (selectedPlayers[i].id === id) {
            
            for (let j=0; j<colourArray.length; j++) {
                if (selectedPlayers[i].playerColour === colourArray[j]) {
                    colourArray.splice(j, 1)
                }
            }
            selectedPlayers.splice(i, 1)
        }
    }
    
    document.getElementById("player_" + id).remove()
    if (selectedPlayers.length<1) {
        outputData = [[
            { axis: "Win rate", value: 0 },
            { axis: "First blood rate", value: 0 },
            { axis: "Kill participation", value: 0},
            { axis: "Average share of team death", value: 0 },
            { axis: "Gold share", value: 0 },
            { axis: "Damage", value: 0 }
        ]]
        RadarChart("#radarChart", outputData, radarChartOptions);
    } else {
        updatePlayer()
    }
    

}