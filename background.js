chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.clear();
    });

function retrieveDomainFromUrl(url) {
    url = new URL(url);
    domain = url.hostname;
    return domain;
}
function retrieveDomainFromTab(tab) {
    var currUrl = tab.url;
    var currPendingUrl = tab.pendingUrl;
    var currDomain;

    // Retrieve domain from the appropriate url
    if (currUrl != null && currUrl != "") {
        currDomain = retrieveDomainFromUrl(currUrl);
    }
    else if (currPendingUrl != null && currPendingUrl != "") {
        currDomain = retrieveDomainFromUrl(currPendingUrl);
    }
    else {
        currDomain = "";
    }
    return currDomain;
}

// Every 5 seconds, track current window, current tab's domain
// Retrieve last domain, assume 5 secs were spent on that domain
CHECK_INTERVAL_SECONDS = 1;
/**
Why use window.setInterval instead of events:
Currently Chrome API has no way of detecting when a window is covered by another program 
(aka when window.focused changes from false to true)
**/
window.setInterval(trackDomain, CHECK_INTERVAL_SECONDS*1000);
/**
Retrieve last domain
If last domain is not null, undefined, ""
    Update time spent on domain

Retrieve current window
If current window in focus
    Retrieve current domain
    Update last domain with current domain
Else
    Update last domain with null
**/
function trackDomain() {
    retrieveLastDomain(function(domain) {
        if (domain != null && domain != "") {
            updateDomainSpentTime(domain, CHECK_INTERVAL_SECONDS);
        }
    })

    chrome.windows.getLastFocused(function(window) {
        if (window.focused == true) {
            chrome.tabs.query({windowId: window.id, active: true}, function(tabs) {
                domain = retrieveDomainFromTab(tabs[0]);
                updateLastDomain(domain);
            })
        } else {
            updateLastDomain(null);
        }
    })
}

// TODO: Have the badge show time spent on listed sites
// TODO: Track whether user is interacting with the site/media is playing. If not, stop the time increment
