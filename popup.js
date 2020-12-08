let loggingDisplay = document.getElementById('loggingDisplay');

function displayTrackedData(data, maxNumDisplay=50) {
    // Convert to array of [key, value]
    data = Object.entries(data);
    // Sort by time spent (descending)
    data = data.sort(function(a,b) {return b[1]-a[1]})
    for (var i=0; i<data.length && i<maxNumDisplay; i++) {
        domain = data[i][0];
        timeSpent = Math.floor(data[i][1] / 60);
        var domainTimeP = document.createElement("p");
        domainTimeP.innerHTML = `${domain}: ${timeSpent} minutes`;
        loggingDisplay.appendChild(domainTimeP);
    }
}

retrieveAllTrackedData(displayTrackedData);