var all;
$(document).ready(function () {


    //disable copy paste for DATE controls
    $('input[rule*="DATE"]').bind('copy paste', function (e) {
        e.preventDefault();
    });
    all = $(document).find('input,select');
    setMaxLengthForTextArea();
});

function setMaxLengthForTextArea() {
    $(function () {
        $('textarea[maxlength]').each(function () {
            var $textarea = $(this);
            var maxlength = $textarea.attr('maxlength');
            var val = $textarea.val();
            $textarea.val(val.slice(0, maxlength));
            var func = function () {
                $textarea.val($textarea.val().slice(0, maxlength));
            }
            $textarea.bind('keypress', function () {
                return ($textarea.val().length < maxlength);
            });
            $textarea.bind('keyup', func);
            $textarea.bind('blur', func);
        });
    });
}

function fillDDL(url, ddl, callback) {

    try {

        var quickTxbVal = document.getElementById(ddl + '_VAL_TXT').value;

        var dropdown = document.getElementById(ddl);
        if (dropdown.options.length > 0 && dropdown.getAttribute("PleaseWait") != '')
            dropdown.options[0].text = dropdown.getAttribute("PleaseWait");

        for (var j = 1; j < dropdown.options.length; j++) {
            if (dropdown.options[j].value == quickTxbVal) {
                dropdown.selectedIndex = j;
                DropDownLoadCompleted(ddl)
                if (callback != undefined) {
                    eval(callback);
                }
                return;
            }
        }
        if (url == null || null == '')
            return;
        var urlJSON = url;

        if (quickTxbVal != '') {
            urlJSON = url.replace('{1}', quickTxbVal);
            urlJSON = urlJSON.replace('{2}', 'Code');
            urlJSON = urlJSON.replace('{5}', quickTxbVal);
        }
        urlJSON = urlJSON.replace('{1}', '-1');
        urlJSON = urlJSON.replace('{2}', '-1');
        urlJSON = urlJSON.replace('{5}', '-1');
        urlJSON = urlJSON.replace('{15}', uigfxUniqueIdDictionary['UIGFX_SERVICE_ID']);




        if (urlJSON != '') {
            $.getJSON(urlJSON, null, function (data) {
                var ddlControl = "[id$='" + ddl + "']";
                if (data != null) {
                    ClearDropDown(ddl);
                    $(ddlControl).addItems(data);
                }
                else
                    DropDownLoadCompleted(ddl);

                if (callback != undefined) {
                    eval(callback);
                }
            });
        }
    } catch (err) {

    }
}

function fillDDLCascading(url, ddl, chlidInfo, callback, childcallback) {
    if (chlidInfo != '')
        fillDDL(url, ddl, callback);

    var arrInfo = chlidInfo.split('|');
    for (var i = 0; i < arrInfo.length; i++) {
        if (arrInfo[i].length > 0) {
            var childInfo = arrInfo[i].split(',');
            fillChildDDLInitial(childInfo[0], childInfo[1], ddl, childcallback);
        }
    }
}

function fillChildDDLInitial(url, ddl, parentControl, callback) {
    ClearDropDown(ddl);
    var parentValue = null;
    if (parentControl != null) {
        if (document.getElementById(parentControl + '_VAL_TXT') != null) {
            parentValue = document.getElementById(parentControl + '_VAL_TXT').value;
        }
    }
    if (document.getElementById(ddl + '_VAL_TXT') != null)
        var selectedCode = document.getElementById(ddl + '_VAL_TXT').value;
    if (parentValue == null || parentValue == '')
        return;

    var dropdown = document.getElementById(ddl);
    if (dropdown.options.length > 0)
        dropdown.options[0].text = dropdown.getAttribute("PleaseWait");

    var urlJSON = url.replace('{1}', document.getElementById(parentControl + '_VAL_TXT').value);
    urlJSON = urlJSON.replace('{2}', 'ParentCode');
    urlJSON = urlJSON.replace('{5}', selectedCode);
    urlJSON = urlJSON.replace('{15}', uigfxUniqueIdDictionary['UIGFX_SERVICE_ID']);
    if (dropdown.getAttribute("RefUniqueId") != null)
        urlJSON = urlJSON.replace('{20}', GetQuickTextbox(GetElementByUIGFXUniqueId(dropdown.getAttribute("RefUniqueId"))));

    if (urlJSON != '') {
        $.getJSON(urlJSON, null, function (data) {
            var ddlControl = "[id$='" + ddl + "']";

            if (data != null) {
                ClearDropDown(ddl);
                $(ddlControl).addItems(data);
            }
            else
                DropDownLoadCompleted(ddl);
            if (callback != undefined) {
                eval(callback);
            }
        });
    }
}

function ClearDependentControls(dependentControls) {
    if (dependentControls != '') {
        var arrInfo = dependentControls.split('|');
        for (var i = 0; i < arrInfo.length; i++) {
            if (arrInfo[i] != '') {
                var ddl = document.getElementById(arrInfo[i])
                var quickSelectionTxb = document.getElementById(arrInfo[i] + '_VAL_TXT')
                quickSelectionTxb.value = '';
                ddl.value = '';
                ClearDropDown(arrInfo[i]);
                if (ddl.onchange) ddl.onchange();
                if (ddl.onblur) ddl.onblur();
            }
        }
    }
}

function fillChildDDL(url, ddl, parentControl, dependentControls) {
    ClearDependentControls(dependentControls);
    ClearDropDown(ddl);
    var cntrlQuickSelection = document.getElementById(ddl + '_VAL_TXT');
    var dropdown = document.getElementById(ddl);
    cntrlQuickSelection.value = '';
    var urlJSON = url.replace('{1}', document.getElementById(parentControl).value);
    urlJSON = urlJSON.replace('{2}', 'ParentCode');
    urlJSON = urlJSON.replace('{15}', uigfxUniqueIdDictionary['UIGFX_SERVICE_ID']);
    if (dropdown.getAttribute("RefUniqueId") != null)
        urlJSON = urlJSON.replace('{20}', GetQuickTextbox(GetElementByUIGFXUniqueId(dropdown.getAttribute("RefUniqueId"))));

    if (dropdown.options.length > 0)
        dropdown.options[0].text = dropdown.getAttribute("PleaseWait");

    if (urlJSON != '') {
        $.getJSON(urlJSON, null, function (data) {
            var ddlControl = "[id$='" + ddl + "']";
            if (data != null)
                $(ddlControl).addItems(data);
            else
                DropDownLoadCompleted(ddl);
        });
    }
}

function DropDownLoadCompleted(ddl) {
    var cntrl = document.getElementById(ddl);
    cntrl.options[0].text = cntrl.getAttribute("PleaseSelect");
}

function ClearDropDown(ddl) {
    var cntrl = document.getElementById(ddl);
    if (cntrl != null) {
        var len = cntrl.options.length;
        var firstOption;
        if (len > 0)
            firstOption = cntrl.options[0];

        if (len != null && len > 0)
            for (i = 0; i < len; i++) {
                cntrl.remove(0);
            }

        if (firstOption != null)
            cntrl.add(firstOption);
    }
}

function SetValueToTextbox(controlId, value) {
    var control = document.getElementById(controlId);
    control.value = value;
}

function SelectItemByValueDdl(controlId, value, url, callback) {
    var control = document.getElementById(controlId);
    control.value = value;
    if (url == '' || url == null)
        return;
    fillDDL(url, controlId, callback);
}

function SelectItemByValue(controlId, value, url, chlidInfo, parentId, dependentControls, callback, childcallback) {

    var control = document.getElementById(controlId);
    control.value = value;

    if (parentId != '') {
        fillChildDDLInitial(url, controlId, parentId, childcallback);
    }
    else
        fillDDL(url, controlId, callback);

    ClearDependentControls(dependentControls);

    if (chlidInfo != '') {
        var arrInfo = chlidInfo.split('|');
        for (var i = 0; i < arrInfo.length; i++) {
            if (arrInfo[i].length > 0) {
                var childInfo = arrInfo[i].split(',');
                var quickSelectionTxb = document.getElementById(childInfo[1] + '_VAL_TXT')
                quickSelectionTxb.value = '';
                fillChildDDLInitial(childInfo[0], childInfo[1], controlId, childcallback);
            }
        }
    }
}


function OpenPopup(ddl, url) {
    var retVal;
    retVal = window.showModalDialog(url, "", "dialogWidth:640px;dialogHeight:480px");

    var checkval = retVal.split("|")

    checkval

}

function load() {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", "NewResidency.js");
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function LoadJsFile(jsFileName) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

//function ShowControl(controlId) {
//    var cntrl = document.getElementById(controlId + '_GRP');
//    cntrl.style.visibility = "visible";
//}
//function HideControl(controlId) {
//    var cntrl = document.getElementById(controlId + '_GRP');
//    cntrl.style.visibility = "hidden";
//}

function GetGroupControlByUniqueId(UniqueId) {
    var ctrl = GetElementByUIGFXUniqueId(UniqueId);
    if (ctrl != null && ctrl != undefined)
        return document.getElementById(ctrl.id + "_GRP");
    return null;
}
function showFor(UniqueIds, ctrl, value, CallerFn, DefCallerFn)
{
    $.each(UniqueIds.split(","), function (index, UniqueId) {
        if (ctrl != null && ctrl != undefined && ctrl.value == value) {
            $(GetGroupControlByUniqueId(UniqueId)).fadeIn(600);
            if (CallerFn != undefined) CallerFn();
        }
        else if (ctrl != null && ctrl != undefined && ctrl.value != value) {
            $(GetGroupControlByUniqueId(UniqueId)).fadeOut(600);
            if (DefCallerFn != undefined) DefCallerFn();
        }
        });
}
$.fn.newLicenseLoad = false;
function pickFor(UniqueId, ctrl, value, targetValue, targetValueIfNot, CallerFn, DefCallerFn) {
   
    if($(GetGroupControlByUniqueId(UniqueId)).children('select,input').val()=="" && $.fn.newLicenseLoad ==false) $.fn.newLicenseLoad=true;
    if (ctrl == null || ctrl == undefined || $.fn.newLicenseLoad==false) return;
    if ( ctrl.value == value ) {
        $(GetGroupControlByUniqueId(UniqueId)).children('select,input').val(targetValue);
        var changeCtrl=$(GetGroupControlByUniqueId(UniqueId)).children('select');
        changeCtrl.change();
            if (CallerFn != undefined) CallerFn();
        }
    else {
        $(GetGroupControlByUniqueId(UniqueId)).children('select,input').val(targetValueIfNot);
        var changeCtrl = $(GetGroupControlByUniqueId(UniqueId)).children('select');
        changeCtrl.change();
            if (DefCallerFn != undefined) DefCallerFn();
        }
}
function DisableControl(control) {
    $.each($(control).children(':input'), function (index) {
        $(this).val() != undefined || $(this).val() != "" ?
        (this.tagName == 'INPUT' ? this.setAttribute('readonly', 'readonly') : $(this).children('option:not(:selected)').attr('disabled', true))

        : (this.tagName == 'INPUT' ? this.removeAttribute('readonly') : $(this).children('option:not(:selected)').removeAttr('disabled'));
    })
  
}
//Touseef : Functuion to set and unset RULE based on the SHOW / HIDE Control
function SetRuleByUniqueId(UniqueId, Rule, Value) {
    var ctrl = GetElementByUIGFXUniqueId(UniqueId);
    if (ctrl != null && ctrl != undefined) {
        if (Value == '') {
            //Remove the Rule from selector based on the Rule Parameter
            $(document.getElementById(ctrl.id)).removeAttr("" + Rule + "");
        }
        else {
            $(document.getElementById(ctrl.id)).attr("" + Rule + "", "" + Value + "");
        }
    }
}

function ReceiveServerData(arg, context) {
    var arrContext = context.split('|');
    if (arrContext[1] == 'Translate')
        TranslateComplete(arrContext[2], arg)
    else if (arrContext[1] == 'TranslateAll') {
        var controls = arrContext[2].split('~');
        var controlValues = arg.split('~');
        for (var i = 0; i < controls.length; i++) {
            if (controls[i] != '' && controls[i] != null && controls[i] != undefined)
                TranslateComplete(GetElementByUIGFXUniqueId(controls[i]).name, controlValues[i]);
        }
    }
}

function TranslateComplete(controlId, value) {

    var ctrl = document.getElementById(controlId);
    if (value != '-1' && value != '' && value != undefined)
        ctrl.value = value;
}

function Translate(arcntrl, encntrl, lang, fun) {

    var validationResult = true;

    if (fun != null && fun != undefined && fun != '')
        validationResult = eval(fun + '(\'' + lang + '\')');

    if (validationResult == null || validationResult == undefined || !validationResult)
        return false;

    var vArContrl = document.getElementById(arcntrl);
    var vEnContrl = document.getElementById(encntrl);

    if (lang == 'Ar')
        CallServer(vArContrl.value, 'UIGFX|Translate|' + encntrl);
    else
        CallServer(vEnContrl.value, 'UIGFX|Translate|' + arcntrl);
}


function GetLanguage() {
    var languageControl = document.getElementById("uigfx_language_field");
    return languageControl.value;
}

function BypassConfirmation() {

    var isValid = $('#aspnetForm').valid();

    if (isValid)
        return true;
    else {
        var answer = confirm("Page has some errors. Do you want to continue?")
        if (answer == true) {
            $("#aspnetForm").validate().cancelSubmit = true;
            return true;
        }
        else
            return false;
    }
}


function BypassValidation() {
    $("#aspnetForm").validate().cancelSubmit = true;
}

function QuickSelectionNumericOnly(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (event) keycode = event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    selected_text = '';
    if (document.selection) {
        var selection = document.selection.createRange();
        var selected_text = selection.text;
    }


    if ((keycode == 32) && (selected_text != "")) {
        return false;
    }
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13)) {
        return false;
    }
    else return true;
}
function SelectRadioItem(val, nameOfRadioControl) {
    var hf = document.getElementById(nameOfRadioControl);
    var arr = document.getElementsByName(nameOfRadioControl + '_RGROUP');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == hf.value) {
            arr[i].checked = 'checked';
            break;
        }
    }
}
function SelectVesselNavigationItem(val, UniqueId) {   
    document.getElementById('Datel_Fawri_Web_Portal_SeaportApplicationService_FawriApplicationSeaportDto_VesselNavigationLicence_VAL_TXT').value = val;
}

function DefaultToZero(value1)
{
    return value1 == undefined ? 0 : value1;
}
function DefaultToEmpty(value1)
{
    return value1 == undefined ? '' : value1;
}

function UpdateRadioSelectionHF(val, nameOfSelectionHF) {
    var hfRadioButton = document.getElementById(nameOfSelectionHF);
    hfRadioButton.value = val;
}

function enter_to_tab(e) {

    if (event.keyCode !== 13)
        return;
    
    var thisCtrl = $(e.currentTarget);

    var doIt = false;
    all.each(function () {
        if (doIt) {
            $(this).focus();            
            doIt = false;            
        }
        if (thisCtrl.attr('name') == $(this).attr('name')) {
            doIt = true;
        }
    });
}

function TranslateAll(arabicControls, englishControls, action) {
    var lstArabicControls = arabicControls.split('~');
    var lstEnglishControls = englishControls.split('~');

    var arabicContent = "";
    var englishContent = "";

    for (var i = 0; i < lstArabicControls.length; i++) {
        if (lstArabicControls[i] != '' && lstArabicControls[i] != null) {
            englishContent += GetElementByUIGFXUniqueId(lstEnglishControls[i]).value + "~";
            arabicContent += GetElementByUIGFXUniqueId(lstArabicControls[i]).value + "~";
        }
    }

    if (action == 'Ar') {
        //alert(arabicContent + ' -------  UIGFX|TranslateAll|' + englishControls);
        CallServer(arabicContent, 'UIGFX|TranslateAll|' + englishControls);
    }
    else {
        //alert(englishContent + ' ---- UIGFX|TranslateAll|' + arabicControls)
        CallServer(englishContent, 'UIGFX|TranslateAll|' + arabicControls);
    }
}
function GetQuickTextbox(control) {
    return document.getElementById(control.name + "_VAL_TXT").value;
}

function GetQuickTextboxControl(dropdownControl) {
    if (dropdownControl != null)
        return document.getElementById(dropdownControl.name + "_VAL_TXT");
}

function GetQuickAnchorControl(dropdownControl) {
    if (dropdownControl != null)
        return document.getElementById(dropdownControl.name + "_anch");
}

function SelectInvalidTab(ctrlId) {
    var control = document.getElementById(ctrlId);
    if (control != undefined) {
        var tabGroupKey = control.getAttribute("TabGroupKey");
        var subTabId;

        if (tabGroupKey != undefined) {
            subTabId = tabGroupKey;
        }
        else {
            var subTabControl = $('#' + control.id).parent().parent().parent();
            if (subTabControl != undefined) {
                subTabId = subTabControl.attr('id');
            }
        }
        var index = $('#tabs a[href="#' + subTabId + '"]').parent().index();
        $('#tabs').tabs({ selected: index });
    }
}

function EnableDropdownList(id) {
    $("#" + id).attr("disabled", false);    
    $("#" + id + "_VAL_TXT").attr("readonly", false);
    $("#" + id).next().children().show();
}

function DisableSearchDialogueButton(id) {
    $("#" + id).next().children().hide();
}