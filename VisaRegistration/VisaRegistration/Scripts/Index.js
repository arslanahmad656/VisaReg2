var __lc = {};
__lc.license = 6420071; //License
__lc.group = 3;

(function () {
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);

})();

/*Browser Back button disabling */
function preventBack() {
    window.history.forward();

}
setTimeout("preventBack()", 0);
window.onunload = function () { null };
        /* end- browser back button disabling */

window.onerror = function (e) {
    return true;
}

function onLoad() {
    try {
        // sivamtime();

        //Change background....
        var loc = window.location.href;
        var imgUrl = '';
        var i = -1;
        if (loc.indexOf("Modules") > -1) {
            i = loc.indexOf("Modules")
            imgUrl = loc.substr(0, i) + "Images/EIDATheme/mainbg.jpg";
        }
        //alert(imgUrl);
        document.body.style.backgroundImage = "url(" + imgUrl + ")";
    }
    catch (ex) {
    }
}


function QuickSearch(url) {
    var value = document.getElementById("ctl00_moiSearch").value;
    window.openHolder(url + value);
    document.getElementById("ctl00_moiSearch").value = "";
    return false;
}

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-53702878-1', 'auto');
ga('send', 'pageview');

window.rsConf = { general: { usePost: true } };

//<![CDATA[
var theForm = document.forms['aspnetForm'];
if (!theForm) {
    theForm = document.aspnetForm;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>

//<![CDATA[
function CallServer(arg, context) { WebForm_DoCallback('ctl00$ContentPlaceHolder1$UCVisaInquiry1', arg, ReceiveServerData, context, null, false); } function GetFontSize() { return ''; } function IsBlueTheme() { return '0'; } function IsArabic() { return '0'; } function IsBlueColorBliendTheme() { return '0'; }//]]>


//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$ScriptManager1', document.getElementById('aspnetForm'));
Sys.WebForms.PageRequestManager.getInstance()._updateControls([], [], [], 90);
//]]>

//NOTE: Required by Calendar control of UIGFX
//pathToImages = '../../images/calendar/';
setImagePathPrefix('../../');

var serverDate = '11/04/2017';

function OnBackClick() {
    window.location = '../../../Modules/AppSecurity/Home.aspx';
    return false;
}

function OnVisaInquirySubmit() {
    var validEngine = new FormValidationEngine();
    validEngine.emptyMsg = 'Please enter data for this field';
    validEngine.formatMsg = 'Please enter Correct Format: ';
    validEngine.formatMsgDate = 'Please enter Valid' + " ";
    validEngine.language = '0';
    validEngine.showTooltip = true;
    validEngine.suppressErrorMsg = true;

    var rVal;
    try {
        rVal = validEngine.validateForm('ctl00_ContentPlaceHolder1_UCVisaInquiry1_phForm');
    }
    catch (error) {

        alert(error.description);

        validEngine.valid = false;

        if (!document.onLoadValidationInProgress) {
            //alert("Unknown error occur while validating: " + error.description);
            alert(unKnown + error.description);
        }
    }

    if (!validEngine.valid || !validEngine.validFormat) {

        if (!document.onLoadValidationInProgress) {

            //TODO: MOFA CR - Translation required
            //userRes = alert("Some fields have missing or invalid data. Cannot conitnue with save.");
            userRes = false;

            if (userRes && !validEngine.validFormat) {

                for (i = 0; i < validEngine.valErrorControls.length; i++) {
                    if (validEngine.valErrorControls[i].ctrl != undefined)
                        validEngine.valErrorControls[i].ctrl.value = "";
                }
            }
        }

        return false;
    }
    else {
        return true;
    }
}

function OnResetClick() {

    try {
        document.forms[0].reset();

        SetVisaEnabled(true);

        var txt = GetElementByUIGFXUniqueId("VisaNumber1");
        txt.focus();

        txt = GetElementByUIGFXUniqueId("VisaNumber2");
        txt.focus();

        txt = GetElementByUIGFXUniqueId("VisaNumber3");
        txt.focus();

        txt = GetElementByUIGFXUniqueId("VisaNumber4");
        txt.focus();

        txt = GetElementByUIGFXUniqueId("DateOfBirth");
        txt.focus();

        var btnResetObj = document.getElementById("ctl00_ContentPlaceHolder1_UCVisaInquiry1_btnReset");
        btnResetObj.focus();

        SetVisaEnabled(false);

        return false;
    }
    catch (e) {
        alert(e.message);
    }
}

function OnServiceSelected(combo) {
    try {
        if (combo == undefined || combo.value == "") {
            SetVisaEnabled(false);
        }
        else {
            SetVisaEnabled(true);
        }
    }
    catch (e) {
        alert(e.message);
    }
}

function SetVisaEnabled(enabled) {
    try {
        var disabledVal, backgroundColorVal;

        if (enabled == false) {
            disabledVal = true;
            backgroundColorVal = "#EEEEEE";
        }
        else {
            disabledVal = false;
            backgroundColorVal = "#FFFFFF";
        }

        var controlIdsArr = ["VisaNumber1", "VisaNumber2", "VisaNumber3", "VisaNumber4"];
        for (var x = 0; x < controlIdsArr.length; x++) {
            var control = GetElementByUIGFXUniqueId(controlIdsArr[x]);
            control.disabled = disabledVal;
            control.style.backgroundColor = backgroundColorVal;
        }
    }
    catch (e) {
        alert(e.message);
    }
}

function OnDocumentLoad() {
    SetVisaEnabled(false);
}

function ResetCode() {

}


function OnCaptchaKeyPress(event) {

    try {
        var keycode;

        if (window.event)
            keycode = window.event.keyCode;
        else if (event)
            keycode = event.keyCode;
        else if (e)
            keycode = e.which;
        else
            return true;

        if (keycode == 13) {
            //document.forms[0].submit();
            document.getElementById("ctl00_ContentPlaceHolder1_UCVisaInquiry1_btnSubmit").click();
            return false;
        }

        return (numeric_only(event));
    }
    catch (e) {
        alert(e.message);
    }
}

// Register event
$(OnDocumentLoad);

function refreshCaptchaDatel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Captcha1() {
    $("#Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Captcha1").val("");
    $("#Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Captcha1_IMG").attr('src', "CaptchaHandler.ashx?action=get&id=Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Captcha1&time=" + new Date());
}


var inputs = document.getElementsByTagName('input');

if (true == true) {

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id.match(/Email.*/)) {
            inputs[i].placeholder = "abc@domain.com";
        }

        else if (inputs[i].id.match(/Salary.*/) || inputs[i].id.match(/EstNumber.*/) || inputs[i].id.match(/EstLicenseNumber.*/) || inputs[i].id.match(/SponsorCode.*/)
            || inputs[i].id.match(/MonthlyIncome.*/) || inputs[i].id.match(/IDNo.*/) || inputs[i].id.match(/txtSponsorFileNo.*/) || inputs[i].id.match(/FawriApplicationDetail_UnifiedNo.*/) || inputs[i].id.match(/ctl00_ContentPlaceHolder1_txtId.*/)
            || inputs[i].id.match(/VisaNumber.*/)) {
            inputs[i].placeholder = "Enter Number";
        }
        else if (inputs[i].type.toLowerCase() == 'number' && inputs[i].id.match(/phone.*/)) {
            inputs[i].placeholder = "Enter Number";
        }
        else if (inputs[i].id.match(/Phone.*/) || inputs[i].id.match(/Tel.*/)) {
            inputs[i].placeholder = "02XXXXXXX";
        }

        else if (inputs[i].id.match(/Fax.*/)) {
            inputs[i].placeholder = "02XXXXXXX";

        }


        else if (inputs[i].id.match(/PermanentMobileNo.*/)) {
            inputs[i].placeholder = "00XXXXXXXXXX";
        }

        else if (inputs[i].id.match(/Mobile.*/)) {
            inputs[i].placeholder = "05XXXXXXX";
        }
        else if (inputs[i].type.toLowerCase() == 'text' && !(inputs[i].id.match(/VAL_TXT.*/))) {
            inputs[i].placeholder = "Enter Text";
        }
        else if (inputs[i].type.toLowerCase() == 'password') {
            inputs[i].placeholder = "Password";
        }




        //console.log(inputs[i].id);
    }
}
else {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id.match(/Email.*/)) {
            inputs[i].placeholder = "abc@domain.com";
        }


        else if (inputs[i].id.match(/Salary.*/) || inputs[i].id.match(/EstNumber.*/) || inputs[i].id.match(/EstLicenseNumber.*/) || inputs[i].id.match(/SponsorCode.*/)
            || inputs[i].id.match(/MonthlyIncome.*/) || inputs[i].id.match(/IDNo.*/) || inputs[i].id.match(/txtSponsorFileNo.*/) || inputs[i].id.match(/VisaNumber.*/) || inputs[i].id.match(/FawriApplicationDetail_UnifiedNo.*/) || inputs[i].id.match(/ctl00_ContentPlaceHolder1_txtId.*/)) {
            inputs[i].placeholder = "ادخل رقم";
        }
        else if (inputs[i].id.match(/Phone.*/) || inputs[i].id.match(/Tel.*/)) {
            inputs[i].placeholder = "02XXXXXXX";
        }

        else if (inputs[i].id.match(/Fax.*/)) {
            inputs[i].placeholder = "02XXXXXXX";
        }


        else if (inputs[i].id.match(/PermanentMobileNo.*/)) {
            inputs[i].placeholder = "00XXXXXXXXXX";
        }

        else if (inputs[i].id.match(/Mobile.*/)) {
            inputs[i].placeholder = "05XXXXXXX";
        }
        else if (inputs[i].type.toLowerCase() == 'text' && !(inputs[i].id.match(/VAL_TXT.*/))) {
            inputs[i].placeholder = "ادخل نص";
        }
        else if (inputs[i].type.toLowerCase() == 'password') {
            inputs[i].placeholder = "كلمة المرور";
        }





        //console.log(inputs[i].id);
    }
}


$.SiteURL = '../../../';
function searchMOI() {
    var term = $('.search-open input').val();
    window.openHolder('http://eservices.mol.gov.ae/wsworkpermitinfo/workpermitinfo.asmx' + term);
    $('.search-open').hide();

}

function StartupDropDownListFillScripts() { fillDDL('', 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaServiceTypeId', ''); fillDDL('/LookupService.svc/GetSexList', 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_GenderId', ''); fillDDL('/LookupService.svc/GetNationalityList?property={2}&val={1}', 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_NationalityId', ''); };

Sys.WebForms.PageRequestManager.getInstance().add_endRequest(StartupDropDownListFillScripts); $(document).ready(function () { StartupDropDownListFillScripts(); }); $.fn.addItems = function (data) { var hasValueSelected = 0; return this.each(function () { var list = this; list.options[0].text = list.getAttribute("PleaseSelect"); var quickCode = document.getElementById(list.id + '_VAL_TXT').value; $.each(data, function (index, itemData) { if (itemData.IsArchived != 1) { var itm = itemData.DescriptionEng; if (itm == null) itm = ''; var option = new Option(itm, itemData.Code); option["ID"] = itemData.Id; option["title"] = itemData.DescriptionEng; if (quickCode != '' && quickCode == itemData.Code) { option.selected = 'selected'; hasValueSelected = 1; document.getElementById(list.id + '_VAL_TXT').value = quickCode; } list.add(option); } }); if (hasValueSelected == 0) { document.getElementById(list.id + '_VAL_TXT').value = ''; if (list.getAttribute("CallbackFnOnBinding") != '') { eval(list.getAttribute("CallbackFnOnBinding")); } } list.options[0].text = list.getAttribute("PleaseSelect"); }); }
var uigfxIdDictionary = new Array(); var uigfxUniqueIdDictionary = new Array(); uigfxIdDictionary['VisaInquiryInfo'] = 'VisaInquiryInfo'; uigfxIdDictionary['VisaServiceTypeId'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaServiceTypeId'; uigfxIdDictionary['VisaNumber1'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber1'; uigfxIdDictionary['VisaNumber2'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber2'; uigfxIdDictionary['VisaNumber3'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber3'; uigfxIdDictionary['VisaNumber4'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber4'; uigfxIdDictionary['VisaNumber0'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber0_GRP'; uigfxIdDictionary['Name'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Name'; uigfxIdDictionary['GenderId'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_GenderId'; uigfxIdDictionary['DateOfBirth'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_DateOfBirth'; uigfxIdDictionary['NationalityId'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_NationalityId'; uigfxIdDictionary['Captcha1'] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_Captcha1'; uigfxUniqueIdDictionary[''] = 'Datel_Fawri_Web_Portal_Shared_Entities_VisaInquiryInfo_VisaNumber0_GRP'; uigfxUniqueIdDictionary['UIGFX_SERVICE_ID'] = ''; function GetElementByUIGFXId(id) { return document.getElementById(uigfxIdDictionary[id]); } function GetElementByUIGFXUniqueId(id) { return uigfxUniqueIdDictionary[id] != undefined ? document.getElementById(uigfxUniqueIdDictionary[id]) : document.getElementById(uigfxIdDictionary[id]); } function GetElementTextByUIGFXUniqueId(id) { var comboControl = GetElementByUIGFXUniqueId(id); if (comboControl == null) return ''; return document.getElementById(comboControl.id + "_VAL_TXT"); }


WebForm_InitCallback();//]]>

//<![CDATA[
Sys.Application.initialize();
//]]>

//Added By Talal for UNE-5302

$(document).ready(function () {

    langArabic = $('#hdnIsLanguageArabic').val();
    console.log($('#hdnIsLanguageArabic').val());

    if (langArabic.toLowerCase() == 'true')
        $('#divServiceCount').css('text-align', 'left');
    else
        $('#divServiceCount').css('text-align', 'right');

    //Text To Speech - Start

    var ttsFlag = 'true';
    var ttsUrl = '//app-eu.readspeaker.com/cgi-bin/rsent';
    var ttsCustId = '9037';
    var ttsVoiceEn = 'Alice';
    var ttsVoiceAr = 'Faris';

    if (typeof (ttsFlag) != 'undefined' && typeof (ttsUrl) != 'undefined' && typeof (ttsCustId) != 'undefined'
        && typeof (ttsVoiceEn) != 'undefined' && typeof (ttsVoiceAr) != 'undefined'
        && ttsFlag != '' && ttsUrl != '' && ttsCustId != '' && ttsVoiceEn != '' && ttsVoiceAr != '') {
        if (typeof (InitializeTTS) == 'function')
            InitializeTTS(ttsFlag, ttsUrl, ttsCustId, ttsVoiceEn, ttsVoiceAr);
    }

    //Text To Speech - End 

});


$('#btnTTSPlay').click(function () {

    if (typeof readyfunc == 'function')
        setTimeout(function () { readyfunc(); }, 5000);


});









//Code below to hide popup if user clicks outside of it
$("body").click(function (event) {

    if ($("#div_overlay_for_popup").is(":visible") && $(".div_popup_parent").is(":visible")) {
        var $target = $(event.target);


        if (!$target.parents().is(".div_popup_child") && !$target.is(".div_popup_child") && $target.parent().prop('tagName') != 'A' && $target.prop('id') != "aServiceCardUrl") {
            $("body").find(".div_popup_parent").hide();
            $('#div_overlay_for_popup').hide();
        }
    }
});


//Added By Talal for UNE-5609

function ShowPopup(divToShow) {

    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#div_overlay_for_popup").show();
    $('#' + divToShow).show();
}

function ClosePopup(divToClose) {

    $('#div_overlay_for_popup').hide();
    $(divToClose).parent().parent().parent().hide();
} 

//Added By Talal for UNE-5302

$(document).ready(function () {
    var manager = Sys.WebForms.PageRequestManager.getInstance();
    manager.add_endRequest(endRequest);
    manager.add_beginRequest(OnBeginRequest);

});

function OnBeginRequest(sender, args) {
    $('#div_GrayBackround').show();
    $('#div_loading').show();
}

function endRequest(sender, args) {
    $('#div_GrayBackround').hide();
    $('#div_loading').hide();
}

//Forms for which loader shouldnt appear
var arr = ['DashboardApplicationGen', 'dashboardapplicationgen', 'VisaInquiry', 'visainquiry']

$(document).ajaxSend(function (event, XMLHttpRequest, settings) {

    var isShowLoading = true;
    $.map(arr, function (elementOfArray, indexInArray) {

        if (window.location.href.indexOf(elementOfArray) >= 0)
            isShowLoading = false;

    });

    if (isShowLoading)
        ShowLoading();
});

$(document).ajaxComplete(function (event, xhr, settings) {

    var isHideLoading = true;
    $.map(arr, function (elementOfArray, indexInArray) {

        if (settings.url.indexOf(elementOfArray) >= 0)
            isHideLoading = false;
    });

    if (isHideLoading)
        HideLoading();
});

$(document).ajaxError(function (event, request, settings) {

    HideLoading();

});



function ShowLoading() {
    $('#div_GrayBackround').show();
    $('#div_loading').show();
}

function HideLoading(e) {
    $('#div_GrayBackround').hide();
    $('#div_loading').hide();
}