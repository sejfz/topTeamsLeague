var ldata = []
var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
var nameDiv = document.getElementById("nameHolder");
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
d3.csv("player-stats.csv", function(data) {
    let tempArr = [[
        {axis: "kills", value: data[1].K},
        {axis: "Deaths", value: data[1].D},
        {axis: "Assists", value: data[1].A}
    ]]
    // for (var i = 0; i < data.length; i++) {

    //     tempArr.push(data[i]);
    // }

    return RadarChart("#radarChart", tempArr, radarChartOptions);
})