var ldata = []
d3.csv("player-stats.csv", function(data) {
    
    for (var i = 0; i < data.length; i++) {
        ldata.push(data[i]);

    }
}).then(
	console.log(ldata.length)
)
