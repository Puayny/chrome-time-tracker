// Functions for retrieving and saving data
function retrieveLastDomain(func) {
    // Retrieve most recent domain
    chrome.storage.local.get(["lastDomain"], function(data) {
        func(data["lastDomain"]);
    })
}

function updateLastDomain(domain) {
    // Update most recent domain
    chrome.storage.local.set({
        lastDomain: domain
    })
}

function updateDomainSpentTime(domain, timeChange) {
    // Update amount of time spent on given domain
    chrome.storage.local.get(domain, function(data) {
        timeSpent = data[domain];
        if (timeSpent == null) {
            timeSpent = timeChange;
        } else {
            timeSpent = parseInt(timeSpent) + timeChange;
        }
        var update = {};
        update[domain] = timeSpent;
        chrome.storage.local.set(update);
    })
}

function retrieveAllTrackedData(func) {
    // Retrieve all data on tracked time
    chrome.storage.local.get(null, function(items) {
        delete items["lastDomain"];
        func(items);
    })
}