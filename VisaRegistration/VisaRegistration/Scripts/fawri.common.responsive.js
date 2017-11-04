/* 
The intended purpose of this file for and Responsive and AAA accessiblity related stuff
Auther: Mahendren Ganesan
Last Modified:12/11/2015
Modified by:
note: any kind of application core functional scripts can be placed into other appropriate locations.
*/

$(document).ready(function () {
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
    function EndRequestHandler(sender, args) {
        $(".form-group .date").each(function () { $(this).datepicker({ format: "dd-M-yyyy", autoclose: true }); });
    }
    register();
});
function doUnload() {
    if (window.event.clientX < 0 && window.event.clientY < 0) {
        alert("Window is closing...");
    }
};
register = function (language) {
    register.WrapTable();
    register.registerToggle();
    register.FormLoadEvents();
    if (language != '' && language != undefined) register.bootstrapDatePicker(language);
    register.Accessibility();
    //Default values seciton;
    $.fn.CurrentTop = 0;
};
register.WrapTable = function () {
    register.WrapTable.InitializeWrapHeader();
    register.WrapTable.DigestLinkUnderScore();
};
register.WrapTable.InitializeWrapHeader = function () {
    register.WrapTable.SetColumnLabelOnResize();
    register.WrapTable.InitializeReArrnage();
    register.WrapTable.RemoveColGroup();
    register.HighlightWarningRows();
};
register.WrapTable.SetColumnLabelOnResize = function () {
    $('.wrap-table').each(function () {
        var table = $(this); $('tr', this).each(function () {$('td', this).each(function (i) { var label = $('th', table).eq(i).html();
                label = label && label.trim().length > 0 ? label : "";
                if (label.length > 0) {$(this).append("<span class='wrap-table-label' style='display:none;'>" + label + "</span>");}});});});
};

register.WrapTable.DigestLinkUnderScore = function () {
    $('.digest-link a').each(function () {
        var text = $(this).html();
        text = text.replace(/\_/g, ' ');
        $(this).html(text);
    });
};

register.WrapTable.InitializeReArrnage = function () {
    if ($('.wrap-table>tbody>tr>td').length == 1) //Header Count
        $('.removeBlankInputDiv>div').remove();
    else { //Add empty columns with col-*-1 to cover the full width
        $('.removeBlankInputDiv>div:not(:has(input))').remove();
        var leng = 12 - $('.removeBlankInputDiv>div:has(input)').length;
        for (var index = 0; index < leng; index++) {$('.removeBlankInputDiv').append("<div class='col-sm-1'/>");}
        $('.removeBlankInputDiv>div:has(input)').each(function () { $(this).addClass("col-sm-1"); });
        }
};
register.registerToggle = function () {
    var t = $('.bootstrap-toggle');
    if (t && t.bootstrapToggle) {
        t.bootstrapToggle();
    }
    $('.tglAdvancedSearchOptions').change(function () {
        $(this).prop('checked') ? $('.tglAdvancedSearchOptions-event').show('slow') : $('.tglAdvancedSearchOptions-event').hide('slow');
        $(this).prop('checked') ? $('.hdnTglAdvancedSearchOptions').val('true').trigger('change') : $('.hdnTglAdvancedSearchOptions').val('false').trigger('change');
    });
    $('.tglAdvancedSearchOptions').bootstrapToggle($('.hdnTglAdvancedSearchOptions').val() == "true" ? 'on' : 'off');

    $('.tglShowMoreRatings').change(function () {
        rating($(this).prop('checked'), 3);
    });
};
register.WrapTable.RemoveColGroup = function () {
    $('.remove-colgroup col').remove();
};
register.HighlightWarningRows = function () {
   
    $('.RowWarning').closest('tr').addClass('RowWarning');
}

window.openHolder = window.open;
window.open = function (url, windowName, windowFeatures) {
    window.open.enableModelPopupForWindowOpen = true;
    if (window.open.enableModelPopupForWindowOpen && window.open.enableModelPopupForWindowOpenLocal != false && register.ModelOpenExemption(url)) { OpenModelPopup(url); return false; } else
    {
        window.open.enableModelPopupForWindowOpenLocal = true;
        window.openHolder(url, windowName, windowFeatures);
        return true;
    }
};

//List of url's which dose not need bootstrap popup
register.ModelOpenExemption = function (url) {
    url = url.toLowerCase();
    return !(url.indexOf('.pdf') != -1 ||
        url.indexOf('report.aspx') != -1 ||
        url.indexOf('reportviewer.aspx') != -1 ||
        url.indexOf('dailystatusreport.aspx') != -1 ||
        url.indexOf('reportcaller.aspx') != -1 ||
        url.indexOf('viewvisadocuments.aspx') != -1 ||
        url.indexOf('weeklyvisastatusreport.aspx') != -1 ||
        url.indexOf('evisareport') != -1 ||
        url.indexOf('reportviewer.aspx') != -1 ||
        url.indexOf('scanner.aspx') != -1);
};

register.popupEvent = null;
var MessageEvent = function (argString) {
    var retValue = false;
    //Close the popup
    $('.ContentPopupDialog .close').click();
    if (register.popupEvent != null) {
        retValue = register.popupEvent(argString);
        register.popupEvent = null;
    }
    //else alert('Choosen Value is:' + argString + ',Implement register.popupEvent handler for model event....');
    return retValue;
};

var MessageEventWithPos = function (argString, pos) {
    MessageEvent(argString);
    window.scrollTo(0, pos);
};

var OnContentPopupDialogClose = function () {
    if (typeof PopupOnClose === 'function') {
        var retValue = PopupOnClose();
    } else {
        $('.ContentPopupDialog .close').click();
    }
};

register.popupSetDialogSize = null;
var OnContentPopupDialogSize = function (height, width) {
    if (register.popupSetDialogSize != null)
        var retValue = register.popupSetDialogSize();
    else {
        $('.ContentPopupDialog .modal-dialog.modal-xs').width(width);
        $('.ContentPopupDialog .popup-content-modal-body').css('min-height', height + 'px');
    }
};

$(document).ready(function(){
    //if($('.ddlSponsorType:visible').length==1 && $('.MultipleSponsorsTable tbody>tr').length>1)$('.MultipleSponsor').click();
    $('.chkMultiSelect input').click(function(){ var clickItem=$(this); $('.chkMultiSelect input').each(function() {if(clickItem.attr('id')!=this.id)$(this).attr('checked', false);}); //t/odo:Mah endren
    if($('.chkMultiSelect input:checked').length<1) $('.btnSponsorSelection').attr('Disabled','Disabled');else $('.btnSponsorSelection').removeAttr('Disabled');});
});


register.ContainerPopupDialogMode = "";

register.popupEventSponsor = null;
var MessageSponsorEvent = function (argString) {
    $('.ContentPopupDialog .close').click();
    Datel.Fawri.Web.Portal.ApplServices.ApplSponsors.GetUserApplSponsorDetails(argString, OnGetUserApplSponsorDetailsSuccess, OnGetUserApplSponsorDetailsFailed);
};
OpenModelPopup = function (url) {
    if ($('.ContentPopupDialog:visible').length == 0) {
        $('.ContentPopupDialogClick').click();
        $('.ContentPopupDialog').show();
    }
    if (register.ContainerPopupDialogMode != "")
        $('.ContentPopupDialog .modal-dialog').removeClass('modal-xs').addClass(register.ContainerPopupDialogMode);
    var objTag = '<object id="popup-obj" onload="$(\'.ContentPopupDialog .loading\').hide();" style="width:100%;min-height:inherit;max-height: inherit;" id="contentarea" standby="loading..." type="text/html" data="' + url + '"></object>'
    document.getElementById("popup-content-modal-body").innerHTML = objTag;
    register.ContainerPopupDialogMode = "";
};
ShowErrorMessage = function (selector, message) {
    if ($(selector).length > 0) {
        $(selector).hide().html(message).show('slow').delay(7000).fadeOut('slow');
        $('html, body').animate({ scrollTop: $(selector).offset().top }, 1000);
    } else
        alert(message);
};

ShowErrorMessageNoHide = function (selector, message) {
    if ($(selector).length > 0) {
        $(selector).hide().html(message).show('slow');
    } else
        alert(message);
};

register.bootstrapDatePicker = function (lang) {
    (function ($) {
        $.fn.datepicker.dates['ar'] = {
            days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
            daysShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
            daysMin: ["ح", "ن", "ث", "ع", "خ", "ج", "س", "ح"],
            months: ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"],
            monthsShort: ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"],
            today: "هذا اليوم",
            rtl: true
        };
    }(jQuery));
    $('.input-group.date').datepicker({
        format: "dd-M-yyyy",
        autoclose: true,
        language: lang,
        todayHighlight: true
    });

};

var fawri_wait = (function () {
    var increment = 50;
    var nanobar = null;
    var timer = null;
    function start() {
        if (!timer) {
            nanobar = new Nanobar({ bg: '#acf', id: 'mynano' });
            nanobar.go(increment);
            timer = setInterval(function () {
                increment = Math.min(increment * 1.1, 99);
                nanobar.go(increment);
            }, 2000);
        }
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            nanobar.go(100);
        }
    }

    return { start: start, stop: stop };
})();


register.FormLoadEvents = function () {
    if ($) {
        $({
            beforeSend: fawri_wait.start,
            complete: fawri_wait.stop
            // ......
        });
    }

    if (Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {

        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(fawri_wait.start);
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(fawri_wait.stop);

    }


    window.onbeforeunload = fawri_wait.start;


};
UpdateDilalogMessage = function (value) {
    UpdateDialog(value);
};


//Accessibility 
register.Accessibility = function () {
    //TTS
//    register.Accessibility.TTS();
    //AAA font
    register.Accessibility.AAAaccessibilityRegister();
    register.Accessibility.RefreshAAASize();
};


//Accessibility 
//Text to Speach
//register.Accessibility.TTS = function() {
//    if ($('.AudioDiv').length > 0)
//        $('body').click(function(e) {
//            var text = register.Accessibility.TTS.getSelectedText();
//            if (text != '')
//                register.Accessibility.TTS.ShowPlay($.SiteURL + "Responsive/Modules/External/Speak.aspx?message=" + encodeURIComponent(text));
//        });
//};
//register.Accessibility.TTS.getSelectedText = function() {
//    if (window.getSelection) {
//        return window.getSelection().toString();
//    } else if (document.selection) {
//        return document.selection.createRange().text;
//    }
//    return '';
//};

//register.Accessibility.TTS.PlayText = function() {
//    if (playUrl != null) {
//        playInProgress = true;
//        var tPlayUrl = playUrl;
//        playUrl = null;
//        $("#speak").attr("src", tPlayUrl).trigger('play');
//        $(".AudioDiv>.btnPlay").hide();
//        $(".AudioDiv>audio").show().delay(5000).fadeOut(function() { playInProgress = false; });
//    }
//};
//    var playInProgress = false;
//    var playUrl = null;
//register.Accessibility.TTS.ShowPlay = function(sourceUrl) {
//    if (playInProgress == true) return;
//    playUrl = sourceUrl;
//    $(".AudioDiv>audio").hide();
//    $(".AudioDiv>.btnPlay").show().delay(5000).fadeOut();

//};

//AAA only to retain selection.
register.Accessibility.AAAaccessibilityRegister = function () { $('.aaa-accessibility a').click(function () { register.Accessibility.SetAAA($(this).attr('value')); }); }
register.Accessibility.SetAAA = function (value) {
    if (localStorage.getItem("AAASize") != value) localStorage.setItem("AAASize", value);
    register.Accessibility.RefreshAAASize();
};
register.Accessibility.RefreshAAASize = function () {
    var ls_aaaSize = localStorage.getItem("AAASize");
    $('.aaa-accessibility a').removeClass("not-active");
    $('.aaa-accessibility a').each(function () { $('body').removeClass($(this).attr('value')); });
    $('.aaa-accessibility a[value="' + ls_aaaSize + '"]').addClass("not-active");

}
function registerWarningMessage() {
   
    if ($('.ApplicantViolation').length > 0)
        ShowErrorMessageNoHide('.GridErrorMessage', '<label> ' + $('input.RowWarning').attr('ApplicantViolationErrorMessage') + ' </label>');

    else if ($('.RowWarning .ChkPayableApp>input[type=checkbox][checked=checked]').length > 0)
        ShowErrorMessageNoHide('.GridErrorMessage', '<label> ' + $('input.RowWarning').attr('SponsorViolationErrorMessage') + ' </label>');

    else if ($('.QuotaViolation').length > 0)
        ShowErrorMessageNoHide('.GridErrorMessage', '<label> ' + $('input.RowWarning').attr('QuotaErrorMessage') + ' </label>');
    else
        $('.GridErrorMessage').hide();
}
/* 
The intended purpose of this file for and Responsive and AAA accessiblity related stuff
Auther: Mahendren Ganesan
Last Modified:12/11/2015
Modified by:
note: any kind of application core functional scripts can be placed into other appropriate locations.
*/