var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

var playerSelect = document.getElementById("playerSelect");

var nameDiv = document.getElementById("nameHolder");
var playerName = document.getElementById("playerName");
var playerTeam = document.getElementById("playerTeam");
var playerPos = document.getElementById("playerPos");

var color = d3.scale.ordinal()
    .range(["#EDC951", "#CC333F", "#00A0B0"]);

var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 100,
    levels: 5,
    roundStrokes: true,
    color: color
};

var outputData = [[
    { axis: "Information Visualization", value: 0 },
    { axis: "Statistical", value: 0 },
    { axis: "Programming", value: 0},
    { axis: "Human-computer interaction programming", value: 0 },
    { axis: "Evaluating", value: 0 },
    { axis: "Collaboration", value: 0 }
]]
d3.csv("../player-stats.csv", function(data) {
    let tempArr = [[
        {axis: "Win rate", value: parseFloat(data[1]["W%"])},
        {axis: "First blood rate", value: parseFloat(data[1]["FB%"])},
        {axis: "Kill participation", value: parseFloat(data[1]["KP"])},
        {axis: "Average share of team death", value: parseFloat(data[1]["DTH%"])},
        {axis: "Gold share", value: parseFloat(data[1]["GOLD%"])},
        {axis: "Damage", value: parseFloat(data[1]['DMG%'])}
    ]]
    for (let i =0; i<data.length; i++) {
        let playerName = document.createElement("option")
        playerName.innerHTML = data[i].Player
        playerName.value = i
        playerSelect.appendChild(playerName)
    }
    console.log(data)
    return RadarChart("#radarChart", tempArr, radarChartOptions);
})
function updatePlayer() {
    var playerId = playerSelect.value
    d3.csv("../player-stats.csv", function(data) {
        let tempArr = [[
            {axis: "Win rate", value: parseFloat(data[playerId]["W%"])},
            {axis: "First blood rate", value: parseFloat(data[playerId]["FB%"])},
            {axis: "Kill participation", value: parseFloat(data[playerId]["KP"])},
            {axis: "Average share of team death", value: parseFloat(data[playerId]["DTH%"])},
            {axis: "Gold share", value: parseFloat(data[playerId]["GOLD%"])},
            {axis: "Damage", value: parseFloat(data[playerId]['DMG%'])}
        ]]
        console.log(data)
        playerName.innerHTML = data[playerId].Player;
        playerTeam.innerHTML = data[playerId].Team;
        playerPos.innerHTML = data[playerId].Pos;
        return RadarChart("#radarChart", tempArr, radarChartOptions);
    })
}