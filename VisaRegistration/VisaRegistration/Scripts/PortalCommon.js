function CloneApplication(applicationId, currentServiceId, userId, siteUrl) {
    window.open(siteUrl + "/modules/visamanagement/serviceselectionpopup.aspx?opType=copy&applicationId=" + applicationId + "&sid=" + currentServiceId);
    return false;
}

function CloneApplicationCallback(successUrl, errorMessage) {
    if (errorMessage) {
        alert(errorMessage)
    }
    else {
        window.location.href = successUrl;
    }
}

//Added by Talal

function MakeAJAXCall(url, params, type, callback) {

    $.ajax({
        url: url,
        data: params,
        dataType: "json",
        type: type,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error + ' , Status: ' + status);
        },
        failure: function (response) {
            alert(response.responseText);
        }
    });
}