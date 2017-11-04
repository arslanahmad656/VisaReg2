
// Here, We r going to write Form Validation Engine Class that will required all the parameter or properties
// to be set before using this Validation Engine or later Rule Based Form Validation Engine...
//Class FormValidationEngine...
function FormValidationEngine() {
    this.msg = "";
    this.formatMsg = "";
    this.formatMsgDate = "";
    this.suppressErrorMsg = false;
    this.allowFailedValidation = true;
    this.showErrorInColumn = false;
    this.showTooltip = false;
    this.valid = true;
    this.validFormat = true;
    this.count = 0;
    this.elements = new Array();
    this.valErrorControls = new Array();
    this.language = "0";
    this.description = "VALFAIL";
    this.emptyFields = new Array();
    this.invalidFields = new Array();
    this.validateHidden = false;
    this.invalidControlIds = new Array();
}

function ValidatedControl(eMsg, fMsg, control, fieldName) {
    this.emptyMsg = eMsg;
    this.formatMsg = fMsg;
    this.ctrl = control;
    this.fieldName = fieldName;
}

// End Form Validation Engine Class....

var valLang = "0";
var currentAreaId = '';
var currentAreaSearch = '';
var dateAllowedMinYear = 1900;

FormValidationEngine.prototype.validateDiv = function validateDiv(divId, validateDisabled) {
    //alert(document.evaluate('//input', document, null, XPathResult.ANY_TYPE, null ));
    var objDiv = document.getElementById(divId);
    var elements = objDiv.getElementsByTagName('input');
    var selElements = objDiv.getElementsByTagName('select');
    //elements.concat(selElements);
    var allElems = concatArray(elements, selElements);
    myBubbleSort(allElems);

    if (this.validateElements(allElems, validateDisabled))
        return true;
    return false;
}

//Main function of the validate class to start validation....
FormValidationEngine.prototype.validateForm = function (divId, validateDisabled) {
    //valLang = Lang;     
    var elements = document.getElementsByTagName('input');
    var selElements = document.getElementsByTagName('select');
    var txtAreas = document.getElementsByTagName('TEXTAREA');
    var allElems = concatArray(elements, selElements);
    allElems = concatArray(allElems, txtAreas);

    myBubbleSort(allElems);

    //this.getRuleElements(document.getElementById(divId));

    if (this.validateElements(allElems, validateDisabled)) {

        return true;
    }
    return false;
}

FormValidationEngine.prototype.getRuleElements = function (node) {
    //alert("Node Lenght: " + node.childNodes.length);
    if (node.childNodes.length > 0) {
        for (i = 0; i < node.childNodes.length; i++) {
            //alert("Tag Name: " + node.childNodes[i]);
            if (node.childNodes[i].attributes != undefined && node.childNodes[i].attributes["Rule"] != undefined) {
                //alert(node.childNodes[i].attributes["Rule"].value);
                this.elements[this.count++] = node.childNodes[i];
            }
            else {
                this.getRuleElements(node.childNodes[i]);
            }
        }
    }
}

function getCheckedValue(radioObj) {
    if (!radioObj)
        return "";
    var radioLength = radioObj.length;
    if (radioLength == undefined)
        if (radioObj.checked)
            return radioObj.value;
        else
            return "";
    for (var i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            return radioObj[i].value;
        }
    }
    return "";
}

function validateCaptcha(id) {

    var code = $("#" + id).val();
    var result = false;
    if (code.length == 7) {
        $.ajax({
            type: 'GET',
            url: 'CaptchaHandler.ashx?action=validate&id=' + id + '&code=' + code + '&time=' + new Date(),
            dataType: 'json',
            success: function (data) {
                $.each(data, function (key, val) {
                    if (key == 'result')
                        result = val;
                });
            },
            data: {},
            async: false
        });
    }
    if (!result) {
        eval('refreshCaptcha' + id + '()');
    }
    return result;
}

FormValidationEngine.prototype.validateElement = function (element, validateDisabled) {
    var elements = new Array();
    elements[0] = element;
    return this.validateElements(elements, validateDisabled);
}

FormValidationEngine.prototype.validateElements = function (elements, validateDisabled) {

    var k = 0;
    var emptyFieldsIndex = 0, invalidFieldsIndex = 0, invalidControlIdsIndex = 0;

    for (i = 0; i < elements.length; i++) {
        var elementValue = "";

        // Element value
        if (elements[i].type == "radio") {
            // For radio type, get the value of selected item in this radio button group
            var radBtns = document.getElementsByName(elements[i].name);
            elementValue = getCheckedValue(radBtns);
        }
        else {
            elementValue = elements[i].value;
        }

        // Filter out watermark
        if (elements[i].attributes["watermark"] != undefined) {
            if (elements[i].attributes["watermark"].value == elementValue) {
                elementValue = '';
            }
        }

        // Currently, its not getting possible to apply Rule attribute to generated input tag for radio control
        //  so add condition for this radio type specifically
        if (elements[i].attributes["Rule"] != undefined ||
            elements[i].type == "radio") {

            var validateReadOnly = (elements[i].attributes["ValidateReadOnly"] != undefined && elements[i].attributes["ValidateReadOnly"] == "true");

            if (!this.validateHidden) {
                if ($(elements[i]).is(':hidden') && !($(elements[i]).hasClass('fawri-calendar')) && !validateReadOnly) {
                    continue;
                }
            }

            if (validateDisabled == undefined || validateDisabled == false) {
                if (elements[i].disabled == "disabled" || elements[i].disabled == true ||
                    (elements[i].attributes["readonly"] != undefined && elements[i].attributes["readonly"].value == "readonly") ||
                    (elements[i].attributes["readOnly"] != undefined && elements[i].attributes["readOnly"].value == "true")) {
                    continue;
                }
            }

            if (elements[i].type == "radio" && elements[i].attributes["Rule"] == undefined) {
                continue;
            }
            var rules = "";

            if (elements[i].type == "radio") {
                // Use split to generate array type instead of string
                rules = "*".split(',');
            }
            else {
                rules = elements[i].attributes["Rule"].value.split('|');
            }

            //alert(rules);
            var hasData = true;
            var isDate = false;
            var isCustom = false;
            var isCustomMsg = "";
            var isValidFormat = true;
            var fieldValidationMsgData = new ValidatedControl("", "", elements[i], "");
            var isDblMandatory = false;

            for (j = 0; j < rules.length; j++) {

                //alert(rules[j] +" : "+ elements[i].value);
                if (rules[j] == "*" || rules[j] == "**") {
                    //alert(CheckValidCharacters(elements[i].value, "NumEmpty"));
                    //TODO: The value check of -1 in following statement should only
                    //  be done for drop down control, and not for text box control
                    //  because if -1 happens to be valid value for some text box control
                    //  then this code will wrongly mark it as invalid / empty
                    //  control
                    hasData = elementValue != "" && elementValue != "-1";
                    if (rules[j] == "**") {
                        isDblMandatory = true;
                    }
                    //                    if (!hasData) {
                    //                        alert(elements[i].name + "," + elementValue);
                    //                    }
                }
                else if (elementValue != "") {

                    if (rules[j] == "MIN") {
                        if (IsNumericss(elementValue)) {
                            var iCustVal = parseInt(elements[i].attributes["CustVal"].value);
                            isValidFormat = parseInt(elementValue) > iCustVal;
                            isCustom = true;
                            isCustomMsg = elements[i].attributes["CUSTFUNC_MSG"].value.split('|')[this.language];
                        }
                    }
                    else if (rules[j] == "NUM") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "NumEmpty", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "POBOX" || rules[j] == "POBOX_MAX_LEN") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "numdash", fieldValidationMsgData, this.language);
                        if (rules[j] == "POBOX_MAX_LEN" && isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                    }
                    else if (rules[j] == "PASSPORT" || rules[j] == "PASSPORT_MAX_LEN") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "EN_AR_NUM_SPACE", fieldValidationMsgData, this.language);
                        if (rules[j] == "PASSPORT_MAX_LEN" && isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                    }
                    if (rules[j] == "NUM_LEN" || rules[j] == "NUM_VISA") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "NumEmpty", fieldValidationMsgData, this.language);
                        if (isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length == txtLen);
                            if (!isValidFormat) {
                                isCustom = true;
                                if (this.language == "0") {
                                    isCustomMsg = "Data length for this field should be " + txtLen;
                                }
                                else {
                                    isCustomMsg = "حجم البيانات لهذا الحقل يجب أن تتكون من " + txtLen + " حقل";
                                }
                            }
                        }
                    }
                    if (rules[j] == "EST_NUM_VISA") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "NumEmpty", fieldValidationMsgData, this.language);
                        if (isValidFormat) {
                            var firstTextLen = elements[i].attributes["FirstLength"].value
                            var secondTextLen = elements[i].attributes["SecondLength"].value;
                            isValidFormat = (elements[i].value.length == firstTextLen || elements[i].value.length == secondTextLen);
                            if (!isValidFormat) {
                                isCustom = true;
                                if (this.language == "0") {
                                    isCustomMsg = "Data length for this field should be " + firstTextLen + " " + secondTextLen;
                                }
                                else {
                                    isCustomMsg = "حجم البيانات لهذا الحقل يجب أن تتكون من " + firstTextLen + " حقل";
                                }
                            }
                        }
                    }
                    else if (rules[j] == "CAPTCHA") {
                        isValidFormat = validateCaptcha(elements[i].id);
                        fieldValidationMsgData.formatMsg = " ";
                    }
                    else if (rules[j] == "EN" || rules[j] == "EN_MAX_LEN") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "char", fieldValidationMsgData, this.language);
                        if (rules[j] == "EN_MAX_LEN" && isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                    }
                    else if (rules[j] == "ENSYM") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "charnumsym", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "ENSYM_NOSPC") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "charnum", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "LOGIN_NAME") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "charlogin", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "ENBUILD") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "charbuilding", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "ENBUILD_MOL_MAX_LEN") {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, "ENBUILD_MOL_MAX_LEN", fieldValidationMsgData, this.language, "-\\/,.");
                        if (isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                    }
                    else if (rules[j] == "ARSYM") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "arabicsym", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "ARNDQ") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "arnumdashq", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "EN_AR_NUM_SPACE") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "bothnum", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "EN_AR_NUM_SPACE_LF") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "EN_AR_NUM_SPACE_LF", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "MOB") {
                        isValidFormat = valMobile(elementValue);
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                fieldValidationMsgData.formatMsg = "10 digit phone number starting with 05";
                            }
                            else {
                                fieldValidationMsgData.formatMsg = "10 أرقام للهاتف تبدأ ب 05";
                            }
                        }
                    }
                    else if (rules[j] == "PWD") {
                        isValidFormat = valPassword(elementValue);
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                isCustomMsg = "Password: Minimum 08 characters length, at least one lower case character, at least one upper case character, at least one number and at least one special characters [!@#$%^&*?].";
                                isCustom = true;
                                break;
                            }
                            else {
                                isCustomMsg = "كلمة السر: حد ادني 8 حروف و يجب ان تحتوي علي الاقل علي حرف كبير وحرف صغير ورقم و وحرف خاص [!@#$%^&*?].";
                                isCustom = true;
                                break;
                            }
                        }
                    }
                    else if (rules[j] == "MOB_FORMATTED") {
                        isValidFormat = valMobileFormatted(elementValue);
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                fieldValidationMsgData.formatMsg = "10 digit phone number starting with 05";
                            }
                            else {
                                fieldValidationMsgData.formatMsg = "10 أرقام للهاتف تبدأ ب 05";
                            }
                        }
                    }
                    else if (rules[j] == "IMOB") {
                        isValidFormat = valInternationalMobile(elementValue);
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                fieldValidationMsgData.formatMsg = "Min. 11 digit phone number & prefix '+' is acceptable";
                            }
                            else {
                                fieldValidationMsgData.formatMsg = "يجب إدخال 11 رقما على الأقل و يمكن استخدام علامة +";
                            }
                        }
                    }
                        //                    else if (rules[j] == "IMOB_FORMATTED") {
                        //                        isValidFormat = valInternationalMobileFormatted(elementValue);
                        //                        if (!isValidFormat) {
                        //                            if (this.language == "0") {
                        //                                fieldValidationMsgData.formatMsg = "Min. 11 digit phone number";
                        //                            }
                        //                            else {
                        //                                fieldValidationMsgData.formatMsg = "11 رقم للهاتف كحد أدنى";
                        //                            }
                        //                        }
                        //                    }
                    else if (rules[j] == "TEL") {
                        isValidFormat = valTelephone(elementValue);
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                fieldValidationMsgData.formatMsg = "9 digit phone number starting with 0";
                            }
                            else {
                                fieldValidationMsgData.formatMsg = "9 أرقام للهاتف تبدأ ب 0";
                            }
                        }
                    }
                    else if (rules[j] == "TEL_MOL" || rules[j] == "MOB_MOL") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "TelMOL", fieldValidationMsgData, this.language);
                        if (isValidFormat) {
                            var len;
                            if (rules[j] == "TEL_MOL") {
                                len = 10;
                            }
                            else {
                                len = 15;
                            }
                            if (elementValue.length > len) {
                                //  All additional chars should be truncated
                                elements[i].value = elementValue.substring(0, len);
                            }
                        }
                    }
                        //                    else if (rules[j] == "TEL_FORMATTED") {
                        //                        isValidFormat = valTelephoneFormatted(elementValue);
                        //                        if (!isValidFormat) {
                        //                            if (this.language == "0") {
                        //                                fieldValidationMsgData.formatMsg = "9 digit phone number starting with 0";
                        //                            }
                        //                            else {
                        //                                fieldValidationMsgData.formatMsg = "9 أرقام للهاتف تبدأ ب 0";
                        //                            }
                        //                        }
                        //                    }
                    else if (rules[j] == "AR" || rules[j] == "AR_MAX_LEN") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "arabic", fieldValidationMsgData, this.language);
                        if (rules[j] == "AR_MAX_LEN" && isValidFormat) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                    }
                    else if (rules[j] == "EMAIL" || rules[j] == "EMAIL_MAX_LEN" || rules[j] == "EMAIL_MOL_MAX_LEN") {
                        if (rules[j] == "EMAIL" || rules[j] == "EMAIL_MAX_LEN") {
                            isValidFormat = validateEmail(elementValue);
                        }
                        else {
                            isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, "EMAIL_MOL_MAX_LEN", fieldValidationMsgData, this.language, '@_-.');
                        }
                        if (isValidFormat && (rules[j] == "EMAIL_MAX_LEN" || rules[j] == "EMAIL_MOL_MAX_LEN")) {
                            var txtLen = elements[i].attributes["CustTag"].value;
                            isValidFormat = (elements[i].value.length <= txtLen);
                            if (!isValidFormat) {
                                if (elements[i].attributes["TrimData"].value == "true") {
                                    elements[i].value = elements[i].value.substring(0, txtLen);
                                    isValidFormat = true;
                                }
                                else {
                                    isCustom = true;
                                    if (this.language == "0") {
                                        isCustomMsg = "Data length for this field should not be greater than " + txtLen;
                                    }
                                    else {
                                        isCustomMsg = "حجم البيانات لهذا الحقل لا يجب أن تتعدى ال" + txtLen + " حقل";
                                    }
                                }
                            }
                        }
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                if (isCustom) {
                                    fieldValidationMsgData.formatMsg = isCustomMsg;
                                }
                                else {
                                    fieldValidationMsgData.formatMsg = "Email address format not correct";
                                }
                            }
                            else {
                                if (isCustom) {
                                    fieldValidationMsgData.formatMsg = isCustomMsg;
                                }
                                else {
                                    fieldValidationMsgData.formatMsg = "صيغة البريد الإلكتروني غير صحيحة";
                                }
                            }
                        }
                    }
                        //Touseef for testing
                    else if (rules[j] == "DATE") {

                        isValidFormat = chkingdate(elementValue);
                        isDate = true;
                        if (!isValidFormat) {
                            if (this.language == "0") {
                                fieldValidationMsgData.formatMsg = "Valid date format: dd-mmm-yyyy [Range: 01-Jan-1900 to 31-Dec-9999]";
                            }
                            else {
                                fieldValidationMsgData.formatMsg = "الصيغة الصحيحة للتاريخ هي: ي ي-ش ش ش-س س س س [المدى: 01-يناير-1900 إلى 31-ديسمبر-9999]";
                            }
                            break;
                        }
                    }
                    else if (rules[j] == "ENGNO") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "EngNo", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "ENGAR") {
                        isValidFormat = CheckValidCharactersWithMsg(elementValue, "engArabic", fieldValidationMsgData, this.language);
                    }
                    else if (rules[j] == "CUSTFUNC") {//Put your own method here...
                        var customFunction = elements[i].attributes["CustTag"].value;
                        isValidFormat = eval(customFunction);
                        if (!isValidFormat && elements[i].attributes["CUSTFUNC_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CUSTFUNC_MSG"].value.split('|')[this.language];
                            isCustom = true;
                            break;
                        }
                    }
                    else if (rules[j] == "CDV_IPD") {

                        isValidFormat = CustomDateValidation(elements[i], "IPD");
                        if (!isValidFormat && elements[i].attributes["CDV_IPD_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_IPD_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_IFD") {

                        isValidFormat = CustomDateValidation(elements[i], "IFD");
                        if (!isValidFormat && elements[i].attributes["CDV_IFD_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_IFD_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_IFCD") {
                        isValidFormat = CustomDateValidation(elements[i], "IFCD");
                        if (!isValidFormat && elements[i].attributes["CDV_IFCD_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_IFCD_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_CDG") {

                        isValidFormat = CustomDateValidation(elements[i], "CDG");
                        if (!isValidFormat && elements[i].attributes["CDV_CDG_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_CDG_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_CDL") {

                        isValidFormat = CustomDateValidation(elements[i], "CDL");
                        if (!isValidFormat && elements[i].attributes["CDV_CDL_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_CDL_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_CDD") {

                        isValidFormat = CustomDateValidation(elements[i], "CDD");
                        if (!isValidFormat && elements[i].attributes["CDV_CDD_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_CDD_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "CDV_CBD") {

                        isValidFormat = CustomDateValidation(elements[i], "CBD");
                        if (!isValidFormat && elements[i].attributes["CDV_CBD_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CDV_CBD_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == "FINEDATE_20") {
                        isValidFormat = CustomDateValidation(elements[i], "FINEDATE_20");
                        if (!isValidFormat && elements[i].attributes["CUSTFUNC_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CUSTFUNC_MSG"].value.split('|')[this.language];
                            isDate = false;
                            isCustom = true;
                            break;
                        }
                        else {
                            isDate = true;
                        }
                    }
                    else if (rules[j] == 'FINE_ACCOMPANIED') {
                        isValidFormat = parseInt(elements[i].value) < 100;
                        if (!isValidFormat && elements[i].attributes["CUSTFUNC_MSG"] != undefined) {
                            isCustomMsg = elements[i].attributes["CUSTFUNC_MSG"].value.split('|')[this.language];
                            isCustom = true;
                            break;
                        }
                    }

                    else if (rules[j] == 'ENNUMSYM') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '-().&amp;');
                    }
                    else if (rules[j] == 'ARNUMSYM') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '-().&amp;');
                    }
                    else if (rules[j] == 'ENARNUMSYM') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '/-,.:()\<>[] {}=+');
                    }
                    else if (rules[j] == 'ENARNUMSYMESERV') {
                        
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '-/\\');
                    }
                    else if (rules[j] == 'NUMAMTESERV') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '.');
                    }
                    else if (rules[j] == 'ENARSYMESERV') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '-/\\');
                    }
                    else if (rules[j] == 'NUMSLASH') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, '/');
                    }
                    else if (rules[j] == 'ENNUMSPC') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, ' ');
                    }
                    else if (rules[j] == 'ARNUMSPC') {
                        isValidFormat = CheckValidCharactersWithMsgAndSpecialChars(elementValue, rules[j], fieldValidationMsgData, this.language, ' ');
                    }
                    else if (rules[j] == 'ENARNUMTOGGLE') {

                        if (this.language == "1")
                            isValidFormat = CheckValidCharactersWithMsg(elementValue, "arabic", fieldValidationMsgData, this.language);
                        else
                            isValidFormat = CheckValidCharactersWithMsg(elementValue, "char", fieldValidationMsgData, this.language);

                    }
                }
            }

            if (!hasData || !isValidFormat) {

                var ctrlId = this.getControlId(elements[i]);

                //****************************************************
                //depends on the variable define extenally for localization support
                var formatStr = fieldValidationMsgData.formatMsg;
                var emptyStr = this.emptyMsg != null ? this.emptyMsg : "Please enter data for this field ";

                if (formatStr == "") {
                    if (isDate) {
                        formatStr = this.formatMsgDate != null ? this.formatMsgDate : "Please enter Valid Date: ";
                    }
                    else if (isCustom) {
                        formatStr = isCustomMsg;
                    }
                    else {
                        var formatStr = this.formatMsg != null ? this.formatMsg : "Please enter Correct Format: ";
                    }
                }

                //***********************************************
                if (this.suppressErrorMsg == false) {
                    if (!hasData) {
                        if (!document.onLoadValidationInProgress) {
                            alert(emptyStr + ctrlId);
                        }
                        //Show tooltip if enabled...
                        if (this.showTooltip)
                            elements[i].title = emptyStr;
                    }
                    else {
                        if (!document.onLoadValidationInProgress) {
                            alert(formatStr + ctrlId);
                        }
                        //Show tooltip if enabled...
                        if (this.showTooltip)
                            elements[i].title = formatStr;
                    }
                    //Focus the element...
                    elements[i].focus();
                    return false;
                }

                if (!hasData) {
                    //alert(emptyStr + ctrlId);
                    this.emptyFields[emptyFieldsIndex] = ctrlId;
                    emptyFieldsIndex = emptyFieldsIndex + 1;
                    this.invalidControlIds[invalidControlIdsIndex] = elements[i];
                    invalidControlIdsIndex += 1;
                }
                else {
                    this.invalidFields[invalidFieldsIndex] = ctrlId;
                    invalidFieldsIndex = invalidFieldsIndex + 1;
                    this.invalidControlIds[invalidControlIdsIndex] = elements[i];
                    invalidControlIdsIndex += 1;
                }

                // Set control background color
                if (!hasData) {
                    if (!isDblMandatory) {
                        //Change Backgound color...
                        markEmptyCtrl(elements[i]);
                    }
                    else {
                        markDblMandatoryCtrl(elements[i]);
                    }
                }
                else {
                    //alert("test2");
                    markInvalidDataCtrl(elements[i]);
                }

                //Show tooltip if enabled...
                if (this.showTooltip) {
                    elements[i].title = !hasData ? emptyStr : formatStr;
                }

                //save control and msgs...
                if (!isValidFormat) {
                    this.valErrorControls[k] = new ValidatedControl(emptyStr + ctrlId, formatStr, elements[i], ctrlId);
                    k = k + 1;

                    try {
                        if (elements[i].attributes["ValidationMsgLabel"] != undefined &&
                            elements[i].attributes["Rule"].value.indexOf("NUM_VISA") == -1) {
                            var validationMsgLblId = elements[i].attributes["ValidationMsgLabel"].value;
                            var validationMsgLbl = document.getElementById(validationMsgLblId);
                            validationMsgLbl.innerHTML = formatStr;
                        }
                    }
                    catch (error) {

                        alert(error.message);
                    }
                }
                else {
                    try {
                        if (elements[i].attributes["ValidationMsgLabel"] != undefined) {
                            var validationMsgLblId = elements[i].attributes["ValidationMsgLabel"].value;
                            var validationMsgLbl = document.getElementById(validationMsgLblId);
                            validationMsgLbl.innerHTML = '';
                        }
                    }
                    catch (error) { }
                }

                this.valid = this.valid ? hasData : false;
                this.validFormat = this.validFormat ? isValidFormat : false;

                if (!hasData && isDblMandatory) {
                    this.dblMandatoryMissing = true;
                    this.invalidControlIds[invalidControlIdsIndex] = elements[i];
                    invalidControlIdsIndex += 1;
                }
            }
            else {
                //restore control default state...
                markDefaultCtrl(elements[i]);
                elements[i].title = '';

                try {
                    if (elements[i].attributes["ValidationMsgLabel"] != undefined) {
                        var validationMsgLblId = elements[i].attributes["ValidationMsgLabel"].value;
                        var validationMsgLbl = document.getElementById(validationMsgLblId);
                        validationMsgLbl.innerHTML = '';
                    }
                }
                catch (error) { }

            } // end else of if (!hasData || !isValidFormat)

        } // end if (elements[i].attributes["Rule"] != undefined)

        // end for (i = 0; i < elements.length; i++)

    }



    return true;
}

FormValidationEngine.prototype.validateCtrl = function InjectValidationEvent() {
    var elements = document.getElementsByTagName('input');

    for (i = 0; i < elements.length; i++) {
        if (elements[i].attributes["Rule"] != null) {
            ApplyValidationEvent(elements[i], elements[i].attributes["Rule"].value.replace('*|', ''));
        }
    }

}

function ApplyValidationEvent(elem, rule) {
    if (rule == "NUM") {
        elem.setAttribute("onkeypress", "return numeric_only(event);");
    }

}

FormValidationEngine.prototype.getControlId = function (elem) {
    var ctrlId = "";
    if (elem.attributes["Desc"] != undefined) {
        ctrlId = elem.attributes["Desc"].value.split('|')[this.language];
    }
    else {
        var ind = elem.id.lastIndexOf("_");
        if (ind < 0) ind = 0;
        ctrlId = elem.id.substring(ind + 1);
    }
    return ctrlId;
}

function CustomDateValidation(elem, objValType) {
    switch (objValType) {
        // IPD = Is Previous Date                                                                       
        case "IPD":
            return isFutureDate(elem.value) == false;
            break;

            // IFD = Is Future Date                                                                     
        case "IFD":
            return isFutureDates(elem.value);
            break;

            // IFCD = Is Future or Current Date                                                                     
        case "IFCD":
            return isFutureCurrentDate(elem.value);
            break;

            //CDG= Compare Date Greater                                                                   
        case "CDG":
            var tag = elem.attributes["CustTag"].value;
            var obj = document.getElementById(tag);
            if (obj == undefined && GetElementByUIGFXUniqueId != undefined)
                obj = GetElementByUIGFXUniqueId(tag);

            return IsDateGreater(elem.value, obj.value);
            break;

            //CDG= Compare Date Lesser                                                                     
        case "CDL":
            var tag = elem.attributes["CustTag"].value;
            var obj = document.getElementById(tag);
            if (obj == undefined && GetElementByUIGFXUniqueId != undefined)
                obj = GetElementByUIGFXUniqueId(tag);
            return IsDateGreater(elem.value, obj.value) == false;
            //CDD = Check Date Duration                                                                   
        case "CDD":
            var obj = elem.attributes["CCD_CT"]; //Custom Tag for CCD
            //return isWithinDuration(elem.value, obj.value.split('|')[0], obj.value.split('|')[1]);
            return IsDateGreater(elem.value, obj.value.split('|')[0]);
        case "CBD":
            var obj = elem.attributes["CustTag"];
            var cval = document.getElementById(obj.value.split('|')[0]).value;
            var initDate = convertToDate(cval);
            var endDate = convertToDate(cval);
            endDate.setYear(initDate.getYear() + parseInt(obj.value.split('|')[1]));
            return isWithinDuration(elem.value, cval, initDate.getDate() + "/" + (initDate.getMonth() + 1) + "/" + endDate.getYear());
        case "FINEDATE_20":
            {
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var today = getServerDate();
                var dd = today.getDate();
                dd = PadZeroLeft(dd, 2);
                var mm = today.getMonth(); //January is 0!
                var yyyy = today.getFullYear() - 20;
                return IsDateGreater(elem.value, '' + dd + '-' + months[mm] + '-' + yyyy);
            }
    }
    return true;
}

function PadZeroLeft(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function IsDateGreater(date1, date2) {
    // window.alert("issueDate : "+issueDate+ " birthDate : "+birthDate+" Result : "+ (issueDate > birthDate));
    return convertToDate(date1) >= convertToDate(date2);
}

function isWithinDuration(objDate, objDateBegin, objDateEnd) {
    if (convertToDate(objDate) >= convertToDate(objDateBegin) && convertToDate(objDate) <= convertToDate(objDateEnd))
        return true;
    else
        return false;
}

function isFutureDate(obj) {
    var currentDate = getServerDate(); //new Date(year, month, daym);
    var dteDate;
    dteDate = convertToDate(obj);
    return currentDate < dteDate;
}

function isFutureCurrentDate(obj) {
    var currentDate = getServerDate(); //new Date(year, month, daym);
    var dteDate;
    dteDate = convertToDate(obj);
    return currentDate <= dteDate;
}

function isFutureDates(obj) {
    var currentDate = getServerDate(); //new Date(year, month, daym);
    var dteDate;
    dteDate = convertToDate(obj);
    return currentDate < dteDate;
}

//This method is not calling instead of general Script getMonth()
//This method is calling when the dates are compared during validation of the page
function getMonth(a) {
    switch (a) {
        case 'Jan':
        case 'JAN':
        case 'Jan':
        case 'يناير':
        case '\u064A\u0646\u0627\u064A\u0631':
            return 1;

        case 'Feb':
        case 'FEB':
        case 'feb':
        case 'فبراير':
        case '\u0641\u0628\u0631\u0627\u064A\u0631':
            return 2;

        case 'Mar':
        case 'MAR':
        case 'mar':
        case 'مارس':
        case '\u0645\u0627\u0631\u0633':
            return 3;

        case 'Apr':
        case 'APR':
        case 'apr':
        case 'ابريل':
        case 'أبريل':
        case '\u0627\u0628\u0631\u064A\u0644':
            return 4;

        case 'May':
        case 'MAY':
        case 'may':
        case 'مايو':
        case '\u0645\u0627\u064A\u0648':
            return 5;

        case 'Jun':
        case 'JUN':
        case 'jun':
        case 'يونيو':
        case '\u064A\u0648\u0646\u064A\u0648':
            return 6;

        case 'Jul':
        case 'JUL':
        case 'jul':
        case 'يوليو':
        case '\u064A\u0648\u0644\u064A\u0648':
            return 7;

        case 'Aug':
        case 'AUG':
        case 'aug':
        case 'ٲغسطس':
        case 'اغسطس':
        case 'أغسطس':
        case '\u0672\u063A\u0633\u0637\u0633':
            return 8;

        case 'Sep':
        case 'SEP':
        case 'sep':
        case 'سبتمبر':
        case '\u0633\u0628\u062A\u0645\u0628\u0631':
            return 9;

        case 'Oct':
        case 'OCT':
        case 'oct':
        case 'ٲكتوبر':
        case 'اكتوبر':
        case 'أكتوبر':
        case '\u0672\u0643\u062A\u0648\u0628\u0631':
            return 10;

        case 'Nov':
        case 'NOV':
        case 'nov':
        case 'نوفمبر':
        case '\u0646\u0648\u0641\u0645\u0628\u0631':
            return 11;

        case 'Dec':
        case 'DEC':
        case 'dec':
        case 'ديسمبر':
        case '\u062F\u064A\u0633\u0645\u0628\u0631':
            return 12;
    }
}

//For getting server date....
function getServerDate() {
    var dateFilter = /^\d{2}\/\d{2}\/\d{4}$/;
    var dateFilter2 = /^\d{2}-[A-Z]{1}[a-z]{2}-\d{4}$/

    if (dateFilter.test(serverDate)) {
        obj1 = serverDate.split("/");
        var obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), parseInt(obj1[1], 10))
        dteDate = new Date(obj[0], obj[1] - 1, obj[2]);
        return dteDate;
    }
    else if (dateFilter2.test(serverDate)) {
        obj1 = serverDate.split("-");
        var obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), getMonth(obj1[1]))
        dteDate = new Date(obj[0], obj[1] - 1, obj[2]);
        return dteDate;
    }
}

function convertToDate(objDate) {
    //    var dateFilter = /^\d{2}\/\d{2}\/\d{4}$/;
    //    var dateFilter2 = /^\d{2}-[A-Z]{1}[a-z]{2}-\d{4}$/
    var dateFilter1 = /^(0[1-9]|[12][0-9]|3[01])[-](JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[-](19|[2-9][0-9])\d\d$/;
    var dateFilter2 = /^(0[1-9]|[12][0-9]|3[01])[-](يناير|فبراير|مارس|أبريل|ابريل|مايو|يونيو|يوليو|ٲغسطس|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|ٲكتوبر|نوفمبر|ديسمبر)[-](19|[2-9][0-9])\d\d$/;

    if (dateFilter1.test(objDate)) {
        obj1 = objDate.split("-");
        //var obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), parseInt(obj1[1], 10))
        var obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), getMonth(obj1[1]))
        dteDate = new Date(obj[0], obj[2] - 1, obj[1]);
        return dteDate;
    }
    else if (dateFilter2.test(objDate)) {
        obj1 = objDate.split("-");
        var obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), getMonth(obj1[1]))
        dteDate = new Date(obj[0], obj[2] - 1, obj[1]);
        return dteDate;
    }
}

function fillTestValues() {
    var elements = document.getElementsByTagName('input');

    for (i = 0; i < elements.length; i++) {
        if (elements[i].attributes["Test"] != null)
            elements[i].value = elements[i].attributes["Test"].value;
    }
}

// ****************** Engine Helper Function *************************
function concatArray(arr1, arr2) {
    var arr = new Array();

    for (i = 0; i < arr1.length; i++) {
        arr[i] = arr1[i];
    }
    var curPos = arr1.length;
    for (j = 0; j < arr2.length; j++) {
        arr[curPos++] = arr2[j];
    }
    return arr;
}

function compareElem(a, b) {
    //alert("TabIndex: "+ elems[0].getAttribute("TabIndex").value);

    var aInd = 0;
    var bInd = 0
    if (a.getAttribute("ValSeq") == null || b.getAttribute("ValSeq") == null) {

    }
    else {
        aInd = a.getAttribute("ValSeq");
        bInd = b.getAttribute("ValSeq");

    }

    return aInd < bInd;
}
function myBubbleSort(arrayName) {
    for (var i = 0; i < (arrayName.length) ; i++)
        for (var j = i + 1; j < arrayName.length; j++)
            if (compareElem(arrayName[j], arrayName[i])) {
                var dummy = arrayName[i];
                arrayName[i] = arrayName[j];
                arrayName[j] = dummy;
            }
}
// ****************** Engine Helper Function Finish *************************

function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (CheckValidCharacters(elementValue.charAt(0), "NumEmpty") == true)
        return false;
    return emailPattern.test(elementValue);
}

function checkingDateYear(fld) {
    var dateParts = new Array();
    dateParts = trim(fld).split("-");

    if (dateParts[dateParts.Length - 1] > dateAllowedMinYear)
        return false;
    else
        return true;
}

//To Validate Date Control
function chkingdate(fld) {
    var tfld = trim(fld);
    //var dateFilter2 = /^\d{2}-[A-Z]{1}[a-z]{2}-\d{4}$/
    //var dateFilter1 = /^\d{2}\/\d{2}\/\d{4}$/;
    var dateFilter2 = /^(0[1-9]|[12][0-9]|3[01])[-](JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[-](19|[2-9][0-9])\d\d$/;
    var dateFilter3 = /^(0[1-9]|[12][0-9]|3[01])[-](يناير|فبراير|مارس|أبريل|ابريل|مايو|يونيو|يوليو|ٲغسطس|أغسطس|اغسطس|سبتمبر|ٲكتوبر|اكتوبر|أكتوبر|نوفمبر|ديسمبر)[-](19|[2-9][0-9])\d\d$/;

    var flag = false;
    if (dateFilter2.test(tfld) || dateFilter3.test(tfld))
        flag = true;

    return flag;
}
//***************************************************Date Validation***********************************************

var dtCh = "/";
var minYear = 1900;
var maxYear = 2100;

function isIntgr(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFb(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysAry(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}

function isValidDate(dtStr) {
    var daysInMonth = DaysAry(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strDay = dtStr.substring(0, pos1)
    var strMonth = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }
    month = parseInt(strMonth)
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {
        //alert("The date format should be : dd/mm/yyyy")
        return false
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        //alert("Please enter a valid month")
        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFb(year)) || day > daysInMonth[month]) {
        //alert("Please enter a valid day")
        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        //alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear)
        return false
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isIntgr(stripCharsInBag(dtStr, dtCh)) == false) {
        alert("Please enter a valid date")
        return false
    }
    return true
}

//***************************************************Date Validation***********************************************
function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}
function IsArabicOnly(value) {
    var sNewVal = "";
    var sFieldVal = value;

    for (var i = 0; i < sFieldVal.length; i++) {

        var ch = sFieldVal.charAt(i);
        var c = ch.charCodeAt(0);

        if (c == 32) {
        }
        else if (c < 1536 || c > 1791) {
            return false;
        }
    }
    return true;
}

function IsArabicWithCustomSymbol(value, sym) {
    var sNewVal = "";
    var sFieldVal = value;

    for (var i = 0; i < sFieldVal.length; i++) {

        var ch = sFieldVal.charAt(i);
        var c = ch.charCodeAt(0);

        if (c == 32) {
        }
        else if (!(c >= 1536 && c <= 1791) && (sym.indexOf(String.fromCharCode(c)) == -1)) {
            return false;
        }
    }
    return true;
}

function IsArabicWithCustomSymbolWOSpace(value, sym) {
    for (var i = 0; i < value.length; i++) {
        if (value.charAt(i).charCodeAt(0) == 32)
            return false;
    }
    return IsArabicWithCustomSymbol;
}

function IsSpecializedArabicsOnly(value) {
    var sNewVal = "";
    var sFieldVal = value;

    for (var ik = 0; ik < sFieldVal.length; ik++) {

        var ch = sFieldVal.charAt(ik);
        var c = ch.charCodeAt(0);

        if (c == 32) {
        }
        else if (c < 1536 || c > 1791) {
            if (!IsNumericss(ch))
                return false;
        }
    }
    return true;
}
function IsNumericss(sText) {
    var ValidChars = "0123456789.-,";
    var IsNumber = true;
    var Char;

    for (il = 0; il < sText.length && IsNumber == true; il++) {
        Char = sText.charAt(il);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}

function CheckValidCharactersWithMsg(str, validationType, fieldValidationMsgData, lang) {
    return CheckValidCharactersWithMsgAndSpecialChars(str, validationType, fieldValidationMsgData, lang, '');
}

function CheckValidCharactersWithMsgAndSpecialChars(str, validationType, fieldValidationMsgData, lang, specialChars) {

    var result = CheckValidCharactersWithSpecialChars(str, validationType, specialChars);
    // lang: 0 = English, Else Arabic

    if (!result) {

        if (validationType == "char" || validationType == "EN_SPACE") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف الإنجليزية مسموح بها هنا";
            }
        }
        else if (validationType == "charnum") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets and digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا";
            }
        }
        else if (validationType == "EN_AR_NUM_SPACE" || validationType == "EN_AR_NUM") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, and digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية والعربية مسموح بها هنا";
            }
        }
        else if (validationType == "bothCharPlusNumeric") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, digits and special characters [-,.] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية والعربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [-,.]";
            }
        }
        else if (validationType == "charlogin") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, digits and special characters [_.] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية والعربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [_.]";
            }
        }
        else if (validationType == "charnumsym") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets, digits and special characters [-,.] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [-,.]";
            }
        }
        else if (validationType == "ENARNUMSYMESERV") {

            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, digits and special characters [-/\\] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [-,.]";
            }
        }
        else if (validationType == "NUMAMTESERV") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only digits and special characters [.] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والرمز الخاصة [.] مسموح بها هنا";
            }
        }
        else if (validationType == "ENARSYMESERV") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english and arabic alphabets, and special characters [-/\\] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [-,.]";
            }
        }
        else if (validationType == "arabicnumsym") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets, digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف العربية مسموح بها هنا";
            }
        }
        else if (validationType == "charbuilding") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only English, Arabic alphabets, digits and special characters [,.\/-] are allowed.";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [,.\\/-]";
            }
        }
        else if (validationType == "charsym") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets, and special characters [,.\\/-] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [,.\\/-]";
            }
        }
        else if (validationType == "ensymsp" || validationType == "EN_SPACE_SPL_CHAR1") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets, and special characters [.,-] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [.,-]";
            }
        }
        else if (validationType == "arabicsym" || validationType == "AR") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets, and special chracters [.-,\\/] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف العربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [,.\\/-]";
            }
        }
        else if (validationType == "arsymsp" || validationType == "AR_SPACE_SPL_CHAR1") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets, and special chracters [.,-] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف العربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [.,-]";
            }
        }
        else if (validationType == "engArabic") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets are allowed. Empty space not allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف الإنجليزية والعربية مسموح بها هنا، ولا يسمح بإضافة فراغات بين الأحرف";
            }
        }
        else if (validationType == "numdash") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only digits and special character [-] is allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والرمز الخاصة [-] مسموح بها هنا";
            }
        }
        else if (validationType == "TelMOL") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only digits and special character [+-] is allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والرمز الخاصة [-+] مسموح بها هنا";
            }
        }
        else if (validationType == "NumEmpty") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام مسموح بها هنا";
            }
        }
        else if (validationType == "EngNo") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets and digits are allowed. Empty space not allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا، ولا يسمح بإضافة فراغات بين الأحرف";
            }
        }
        else if (validationType == "Boths") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف الإنجليزية والعربية مسموح بها هنا";
            }
        }
        else if (validationType == "arabic") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف العربية مسموح بها هنا";
            }
        }
        else if (validationType == "arnumdashq") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأحرف العربية مسموح بها هنا";
            }
        }
        else if (validationType == "bothnum" || validationType == "EN_AR_NUM_SPACE_LF") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, and digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "يمكن إدخال الأحرف العربية والإنجليزية والأرقام فقط";
            }
        }
        else if (validationType == "ENBUILD_MOL_MAX_LEN") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic and english alphabets, digits and special characters [" + specialChars + "] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية والعربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [" + specialChars + "]";
            }
        }
        else if (validationType == "EMAIL_MOL_MAX_LEN") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets, digits and special characters [" + specialChars + "] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [" + specialChars + "]";
            }
        }
        else if (validationType == "ENNUMSYM") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only English alphabets, digits and special characters [" + specialChars + "] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [" + specialChars + "]";
            }
        }
        else if (validationType == "ARNUMSYM") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only Arabic alphabets, digits and special characters [" + specialChars + "] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف العربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [" + specialChars + "]";
            }
        }
        else if (validationType == "ENARNUMSYM") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only Arabic and English alphabets, digits and special characters [" + specialChars + "] are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية والعربية مسموح بها هنا بالإضافة إلى الرموز والحروف الخاصة [" + specialChars + "]";
            }
        }
        else if (validationType == "NUMSLASH") {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only digits and special character [/] is allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والرمز الخاصة [/] مسموح بها هنا";
            }
        }

        else if (validationType == 'ENNUMSPC') {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only english alphabets and digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف الإنجليزية مسموح بها هنا";
            }
        }
        else if (validationType == 'ARNUMSPC') {
            if (lang == "0") {
                fieldValidationMsgData.formatMsg = "Only arabic alphabets and digits are allowed";
            }
            else {
                fieldValidationMsgData.formatMsg = "فقط الأرقام والأحرف العربية مسموح بها هنا";
            }
        }

    }

    return result;

}

function CheckValidCharacters(str, validationType) {
    return CheckValidCharactersWithSpecialChars(str, validationType, '');
}

function CheckValidCharactersWithSpecialChars(str, validationType, specialChars) {
    var flag = true;

    // Note: For AR language validation, use custom method IsArabicWithCustomSymbol()
    var EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var NUM = "0123456789";
    var SPACE = " ";
    var SPL_CHAR_1 = "-,.";
    var SLASH = "/";

    var checkstrChar = EN + SPACE;
    var checkstrCharNum = EN + NUM + SPACE;
    var checkstrCharNumSym = EN + NUM + SPACE + SPL_CHAR_1;
    var checkstrCharSym = EN + SPACE + ".,\\/-";
    var checkNumWitoutSpace = EN + NUM;
    var checkTelMOL = NUM + "-+";
    var checkNumAndDash = NUM + "-";
    var checkNumEmpty = NUM;
    var checkstrLoginName = EN + NUM + "._";
    var checkStrCharSymSpace = EN + SPACE + SPL_CHAR_1;
    var found = true;
    var checkstr = "";

    if (specialChars == undefined) {
        specialChars = '';
    }

    if (validationType == "bothnum" || validationType == "ENBUILD_MOL_MAX_LEN")
        return IsArabicWithCustomSymbol(str, NUM + EN + SPACE + specialChars);
    else if (validationType == "EN_AR_NUM_SPACE_LF")
        return IsArabicWithCustomSymbol(str, EN + NUM + SPACE + "\n\r" + specialChars);
    else if (validationType == "bothsym")
        return IsArabicWithCustomSymbol(str, EN + SPACE + ".,\\/-" + specialChars);
    else if (validationType == "checkBothChar" || validationType == "Boths")
        return IsArabicWithCustomSymbol(str, EN + SPACE + specialChars);
    else if (validationType == "char" || validationType == "EN_SPACE")
        checkstr = checkstrChar;
    else if (validationType == "charnum")
        checkstr = checkstrCharNum;
    else if (validationType == "bothCharPlusNumeric")
        return IsArabicWithCustomSymbol(str, checkstrCharNumSym + specialChars);
    else if (validationType == "charnumsym")
        checkstr = checkstrCharNumSym;
    else if (validationType == "charlogin")
        checkstr = checkstrLoginName;
    else if (validationType == "arabicnumsym")
        return IsArabicWithCustomSymbol(str, NUM + specialChars);
    else if (validationType == "charbuilding")
        return IsArabicWithCustomSymbol(str, EN + SPACE + NUM + ",.\\/-" + specialChars);
    else if (validationType == "NUMAMTESERV")
        return IsArabicWithCustomSymbol(str, NUM + ".");
    else if (validationType == "ENARNUMSYMESERV")
        return IsArabicWithCustomSymbol(str, EN + SPACE + NUM + "-/\\" + specialChars);
    else if (validationType == "ENARSYMESERV")
        return IsArabicWithCustomSymbol(str, EN + SPACE + "-/\\" + specialChars);
    else if (validationType == "charsym")
        checkstr = checkstrCharSym;
    else if (validationType == "arabicsym")
        return IsArabicWithCustomSymbol(str, ".-,\\/" + specialChars);
    else if (validationType == "engArabic")
        return IsArabicWithCustomSymbol(str, EN + specialChars);
    else if (validationType == "numdash")
        checkstr = checkNumAndDash;
    else if (validationType == "TelMOL")
        checkstr = checkTelMOL;
    else if (validationType == "NumEmpty")
        checkstr = checkNumEmpty;
    else if (validationType == "EngNo" || validationType == "EN_NUM" || validationType == "EMAIL_MOL_MAX_LEN")
        checkstr = checkNumWitoutSpace;
    else if (validationType == "arabic")
        return IsArabicOnly(str);
    else if (validationType == "EN_AR_NUM")
        return IsArabicWithCustomSymbol(str, EN + NUM + specialChars);
    else if (validationType == "EN_AR_NUM_SPACE")
        return IsArabicWithCustomSymbol(str, EN + NUM + SPACE + specialChars);
    else if (validationType == "arnumdashq") {
        return IsSpecializedArabicsOnly(str);
    }
    else if (validationType == "ensymsp" || validationType == "EN_SPACE_SPL_CHAR1") {
        checkstr = checkStrCharSymSpace;
    }
    else if (validationType == "arsymsp" || validationType == "AR_SPACE_SPL_CHAR1" || validationType == "AR") {
        return IsArabicWithCustomSymbol(str, SPL_CHAR_1 + specialChars);
    }
    else if (validationType == "ENNUMSYM") {
        checkstr = EN + NUM + SPACE + specialChars;
    }
    else if (validationType == "ARNUMSYM") {
        return IsArabicWithCustomSymbol(str, NUM + SPACE + specialChars);
    }
    else if (validationType == "ENARNUMSYM") {
        return IsArabicWithCustomSymbolWOSpace(str, EN + NUM + specialChars);
    }
    else if (validationType == "NUMSLASH") {
        checkstr = NUM + SLASH;
    }
    else if (validationType == 'ENNUMSPC') {
        checkstr = EN + NUM + SPACE;
    }
    else if (validationType == 'ARNUMSPC') {
        return IsArabicWithCustomSymbol(str, NUM + SPACE);
    }

    checkstr = checkstr + specialChars;

    for (var j = 0; j < str.length; j++) {
        if (found) {
            for (var k = 0; k < checkstr.length; k++) {
                if (str.charAt(j) == checkstr.charAt(k)) {
                    found = true;
                    break;
                }
                else {
                    found = false;
                }
            }
        }
        else {
            //            if (validationType == "EN_AR_NUM_SPACE_LF") {
            //                alert(str.charAt(j));
            //            }
            flag = false;
            break;
        }
    }
    if (found == false)
        flag = false;

    return flag;
}

// ***********************************************************************************
// Function to Validate NUMBERS
// Character ::  0-9, ENTER
function numeric_only(e) {
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


    if ((keycode == 32) && (((e.value).length == 0) || selected_text != "")) {
        return false;
    }
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13)) {
        return false;
    }
    else return true;
}

function amount_only(e) {
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


    if ((keycode == 32) && (((e.value).length == 0) || selected_text != "")) {
        return false;
    }
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13) && (keycode != 46)) {
        return false;
    }
    else return true;
}
// ***********************************************************************************

// ***********************************************************************************
// Code by Touseef / Shaheryar
// ***********************************************************************************
//Function to check mobile no. It will accept starting with 05. 

function valMobile(obj) {
    reMobileNumber = new RegExp(/^[0][5]\d{8}$/);
    return reMobileNumber.test(obj);
}

function valPassword(obj) {
    rePassword = new RegExp(/^(?=.*\d+)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?]{8,}$/);
    return rePassword.test(obj);
}

function valMobileFormatted(obj) {
    reMobileNumber = new RegExp(/^(\+?[0][5][0-9]|[0][5][0-9]\-?)\d{7}$/);
    return reMobileNumber.test(obj);
}

function valTelephone(obj) {
    reTelephoneNumber = new RegExp(/^[0]\d{8}$/);
    return reTelephoneNumber.test(obj);
}

//function valTelephoneFormatted(obj) {
//    reTelephoneNumber = new RegExp(/^(\+?[0]\d{1}|[0]\d{1}\-?)\d{7,8}$/);
//    return reTelephoneNumber.test(obj);
//}

function valInternationalMobileFormatted(obj) {
    reMobileNumber = new RegExp(/^(\+[1-9]|[0][0])(\d|\-?){10,20}$/);
    return reMobileNumber.test(obj);
}

function valInternationalMobile(obj) {
    //reMobileNumber = new RegExp(/^[0][0][9][7][1][5]\d{8}$/);
    //    reMobileNumber = new RegExp(/^(\+|00)[0-9]\d{10,13}$/);
    reMobileNumber = new RegExp(/^\+?[0-9]\d{10,20}$/);
    //alert(obj);
    return reMobileNumber.test(obj);
}

// ***********************************************************************************
//Function to check whether the fields are empty. If emtpy then change the border color

function changeDateCombosBgColor(objCtrl, color) {
    $(objCtrl).parent().parent().find('.fawri-calendar-combo').each(function () {
        this.style.backgroundColor = color;
    });

}
function markEmptyCtrl(objCtrl) {
    objCtrl.style.backgroundColor = "#B8CCDC";
    changeDateCombosBgColor(objCtrl, "#B8CCDC");
}

function markInvalidDataCtrl(objCtrl) {
    //alert(objCtrl.GetTextbox);
    // if (objCtrl.options == undefined) {
    //objCtrl.className  = "emptyCtrl";
    objCtrl.style.backgroundColor = "#FF8769";
    changeDateCombosBgColor(objCtrl, "#FF8769");
    // }
    // else
    //    objCtrl.className = "invalidDataOption";
}

function markDefaultCtrl(objCtrl) {
    // if (objCtrl.options == undefined) {
    //     objCtrl.className = "stdTextBox";
    objCtrl.style.backgroundColor = "#FFFFFF";
    changeDateCombosBgColor(objCtrl, "#FFFFFF");
    // }
    // else
    //     objCtrl.className = "dropdownCtrl";
}

function markDblMandatoryCtrl(objCtrl) {
    objCtrl.style.backgroundColor = "#7198B9"; // 507DA3
    changeDateCombosBgColor(objCtrl, "#7198B9");

}

/*************************************************************
************* Generalize lookup javascript*******************
*************************************************************/
var lookupIdList = new Array();

function openLookupSearch(type, objId, lang) {
    if (typeof enableSearchDialog == 'function' && !enableSearchDialog())
        return;
    //var personalControl = GetPInfoControlName();
    //var genderCode = document.getElementById(personalControl + "_cmbGender").value;
    lookupIdList[type] = objId;
    var wnd = openModelPopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "SelectionBox");
    return false;
}

function openModelPopup(page, title) {
    var retval;
    if (window.showModalDialog) {
        retval = window.showModalDialog(page, title, "dialogWidth:640px;dialogHeight:480px");
    }
    else {
        window.open(page, title, 'height=480px,width=640px,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no ,modal=yes');
    }
    onLookupSearchClosed(retval);
    return false;
}

function onLookupSearchClosed(argument) {
    if (argument == null) {
        return false;
    }
    var checkval = argument.split("|");
    var entity = checkval[1];
    var entityVal = checkval[0];
    var entityText = checkval[2];
    //Now get the combo from lookupIdList global object by type 
    //and update its value and text field..
    var objCmb = document.getElementById(lookupIdList[entity]);
    objCmb.value = checkval[0];
    onChangeLookup(objCmb);
    return false;
}

/*************************************************************
************* End Generalize lookup javascript **************
*************************************************************/
var lastTop;
function OpenSearchDialogGenResponsive(obj, type, combo, txtBox, lang, secCombo, secTxt, parentPath, callback) {

    register.popupEvent = UpdateDilalogMessage;

    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top != 0) {
        $.fn.CurrentTop = top;
        lastTop = top;
    }

    window.scrollTo(0, 0);
    OpenSearchDialogGen(obj, type, combo, txtBox, lang, secCombo, secTxt, parentPath, callback);
}

function OpenSearchDialogGen(obj, type, combo, txtBox, lang, secCombo, secTxt, parentPath, callback) {

    //var parentPath = '';


    if (parentPath == undefined || parentPath == null) {
        parentPath = '';
    }

    var scroll;
    // Netscape compliant
    if (typeof (window.pageYOffset) == 'number')
        scroll = window.pageYOffset;
        // DOM compliant
    else if (document.body && document.body.scrollTop)
        scroll = document.body.scrollTop;
        // IE6 standards compliant mode
    else if (document.documentElement && document.documentElement.scrollTop)
        scroll = document.documentElement.scrollTop;
        // needed for IE6 (when vertical scroll bar is on the top)
    else scroll = 0;

    switch (obj) {
        case "RS":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "SelectionBox", combo, txtBox);
            break;
        case "G":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "GenderBox", combo, txtBox);
            break;
        case "MS":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "MaritalBox", combo, txtBox);
            break;
        case "COB":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "CountryBox", combo, txtBox);
            break;
        case "N":
            var wnd = winpopupGen(parentPath + "SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "NationalityBox", combo, txtBox, secCombo, secTxt);
            break;
        case "PN":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PNationalityBox", combo, txtBox);
            break;
        case "O":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "OccupationBox", combo, txtBox);
            break;
        case "OAC":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "OccupationBox", combo, txtBox);
            break;
        case "Q":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "QualificationBox", combo, txtBox);
            break;
        case "PT":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PassportTypeBox", combo, txtBox);
            break;
        case "COI":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "CountryOfIssueBox", combo, txtBox);
            break;
        case "RG":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "ReligionBox", combo, txtBox);
            break;
        case "F":
            var religionCode = GetElementByUIGFXUniqueId('ReligionId').value;
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + religionCode + "&lang=" + lang, "EBox", combo, txtBox);
            break;
        case "L":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "FirstLanguageBox", combo, txtBox);
            break;
        case "SL":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "SecondLanguageBox", combo, txtBox);
            break;
        case "TL":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "ThirdLanguageBox", combo, txtBox);
            break;
        case "VC":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "VCBox", combo, txtBox);
            break;
        case "PC":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PCBox", combo, txtBox);
            break;
        case "E":
            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "EBox", combo, txtBox);
            break;
        case "C":

            var emirateCode;

            if (GetElementByUIGFXUniqueId('EmiratesId') != undefined)
                emirateCode = GetElementByUIGFXUniqueId('EmiratesId').value;

            if (GetElementByUIGFXUniqueId('EstEmirate') != undefined)
                emirateCode = GetElementByUIGFXUniqueId('EstEmirate').value;

            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + emirateCode + "&lang=" + lang, "EBox", combo, txtBox);
            break;
        case "A":

            var cityCode;

            if (GetElementByUIGFXUniqueId('CityId') != undefined)
                cityCode = GetElementByUIGFXUniqueId('CityId').value;

            if (GetElementByUIGFXUniqueId('EstCity') != undefined)
                cityCode = GetElementByUIGFXUniqueId('EstCity').value;

            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + cityCode + "&lang=" + lang, "EBox", combo, txtBox);
            break;
        case "S":
            var cityCode;

            if (GetElementByUIGFXUniqueId('CityId') != undefined)
                cityCode = GetElementByUIGFXUniqueId('CityId').value;

            if (GetElementByUIGFXUniqueId('EstCity') != undefined)
                cityCode = GetElementByUIGFXUniqueId('EstCity').value;

            var wnd = winpopupGen("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + cityCode + "&lang=" + lang, "EBox", combo, txtBox);
            break;
        case "SPONSOR":
            var wnd = winpopupGen("../SelectionCombo.aspx?selectedTE=" + type, "Establishments", combo, txtBox);
            break;
        case "VESSELOWNERSEARCH":
            var wnd = winpopupGen("VesselOwnerSearch.aspx?selectedTE=" + type, "Establishments", combo, txtBox);
            break;
        case "VesselSearch":
            var wnd = winpopupGen("VesselSearch.aspx?selectedTE=" + type, "Establishments", combo, txtBox);
            break;
    }

    window.scrollTo(0, scroll);
    if (callback != undefined)
        callback();
    return false;
}

function winpopupGen(page, title, combo, txtBox, secCombo, secTxtBox) {
    var retval;
    page = page + "&combo=" + combo + "&txtBox" + txtBox + "&secCombo" + secCombo + "&secTxtBox" + secTxtBox;

    if (window.showModalDialog) {
        retval = window.showModalDialog(page, title, "dialogWidth:640px;dialogHeight:480px");
    }
    else {

        window.open(page, title, 'height=480px,width=640px,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no ,modal=yes');
    }
    return OnClientCloseGen(retval, combo, txtBox, secCombo, secTxtBox);
}

function UpdateDialog(args) {
    if (args == null)
        return false;
    try {
        var windowArgs = args.split("~")
        OnClientCloseGen(windowArgs[0], windowArgs[1], windowArgs[2], windowArgs[3], windowArgs[4])
    }
    catch (error) { }
}

function OnClientCloseGen(argument, combo, txtBox, secCombo, secTxtBox) {

    if (argument == null) {
        return false;
    }
    
    checkval = argument.split("|")
    entity = checkval[1];
    entityVal = checkval[0];
    entityText = checkval[2];

    updateComboGen(combo, txtBox, checkval[0], checkval[2]);

    if (secCombo != undefined && secTxtBox != undefined) {
        updateComboGen(secCombo, secTxtBox, checkval[0], checkval[2]);
    }
    return false;
}

function updateComboGen(combo, txtBox, code, selVal, updateType) {


    if (updateType != "AREA") {
        var cntrl = document.getElementById(combo + "_VAL_TXT");
        cntrl.value = code;
        cntrl.onchange();
        return;

        sel = document.getElementById(combo);
        txtField = document.getElementById(txtBox);
        txtField.value = code;
        CheckNUpdateComb(sel, txtField, '', code, selVal);
    }
    else {
        sel = document.getElementById(selName);

        txtField = document.getElementById(txtBox);
        txtField.value = code;
        CheckNUpdateComb(sel, txtField, '', code, selVal);
    }
}
function CheckNUpdateComb(obj, txtField, ConName, val, selectedVal) {

    found = 0;
    selval = 0;

    for (var i = 0, limit = obj.options.length; i < limit; ++i) {
        if (obj.options[i].value == val) {
            selval = obj.options[i].value;
            if (selval == -1) {
                txtField.value = "";
                //alert(selval);
            }
            else {
                txtField.value = selval;
            }
            obj.options[i].selected = true;
            found = 1;
        }
    }

    if (found == 0) {
        txtField.value = "";
    }

    //window.status += found + " : " + selval + " : " + val + "; ";
    if (found == 0 && selectedVal != "") {
        cboLimit = obj.options.length;
        var optn = document.createElement("OPTION");
        optn.text = selectedVal;
        optn.value = val;
        obj.options.add(optn);
        txtField.value = val;
        for (var i = 0, limit = obj.options.length; i < limit; ++i) {
            if (obj.options[i].value == val) {
                selval = obj.options[i].value;
                if (selval == -1) {
                    txtField.value = "";
                    //alert(selval);
                }
                else {
                    txtField.value = selval;
                }
                obj.options[i].selected = true;
                found = 1;
            }
        }
    }
}



function OpenSearchDialog(obj, type, lang) {

    if (typeof enableSearchDialog == 'function' && !enableSearchDialog())
        return;
    var scroll;
    // Netscape compliant
    if (typeof (window.pageYOffset) == 'number')
        scroll = window.pageYOffset;
        // DOM compliant
    else if (document.body && document.body.scrollTop)
        scroll = document.body.scrollTop;
        // IE6 standards compliant mode
    else if (document.documentElement && document.documentElement.scrollTop)
        scroll = document.documentElement.scrollTop;
        // needed for IE6 (when vertical scroll bar is on the top)
    else scroll = 0;

    switch (obj) {
        case "RS":
            //var personalControl = GetPInfoControlName();
            //var genderCode = document.getElementById(personalControl + "_cmbGender").value;
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "SelectionBox");
            break;
        case "G":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "GenderBox");
            break;
        case "MS":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "MaritalBox");
            break;
        case "COB":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "CountryBox");
            break;
        case "N":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "NationalityBox");
            break;
        case "PN":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PNationalityBox");
            break;
        case "O":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "OccupationBox");
            break;
        case "Q":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "QualificationBox");
            break;
        case "PT":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PassportTypeBox");
            break;
        case "COI":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "CountryOfIssueBox");
            break;
        case "RG":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "ReligionBox");
            break;
        case "F":
            var personalControl = GetPInfoControlName();
            var religionCode1235 = document.getElementById(personalControl + "_cmbReligion").value;
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + religionCode1235 + "&lang=" + lang, "FaithBox");
            break;
        case "L":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "FirstLanguageBox");
            break;
        case "SL":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "SecondLanguageBox");
            break;
        case "TL":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "ThirdLanguageBox");
            break;
        case "VC":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "VCBox");
            break;
        case "PC":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "PCBox");
            break;
        case "E":
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&lang=" + lang, "EBox");
            break;
        case "C":
            var insideUAEControl1 = GetAIUAEControlName();
            var emirateCode = document.getElementById(insideUAEControl1 + "_cmbEmirate").value;
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + emirateCode + "&lang=" + lang, "CBox");
            break;
        case "A":
            var insideUAEControl1 = GetAIUAEControlName();
            var cityCode = document.getElementById(insideUAEControl1 + "_cmbCity").value;
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + cityCode + "&lang=" + lang, "ABox");
            break;
        case "S":
            var insideUAEControl1 = GetAIUAEControlName();
            var cityCode = document.getElementById(insideUAEControl1 + "_cmbCity").value;
            var wnd = winpopup("SelectionCombo.aspx?selectedTE=" + type + "&p_code=" + cityCode + "&lang=" + lang, "SBox");
            break;
        case "SPONSOR":
            var wnd = winpopup("../SelectionCombo.aspx?selectedTE=" + type, "Establishments");
            break;
    }

    window.scrollTo(0, scroll);
    return false;
}

function winpopup(page, title) {
    var retval;
    if (window.showModalDialog) {
        retval = window.showModalDialog(page, title, "dialogWidth:640px;dialogHeight:480px");
    }
    else {
        window.open(page, title, 'height=480px,width=640px,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no ,modal=yes');
    }
    return OnClientClose(retval);
}

function OnClientClose(argument) {
    if (argument == null) {
        return false;
    }

    checkval = argument.split("|")
    entity = checkval[1];
    entityVal = checkval[0];
    entityText = checkval[2];
    switch (entity) {
        case "RS":
            updateCombo("cmbLookup", "txtCode", GetLookupControlName(), checkval[0], checkval[2]);
            break;
        case "G":
            updateCombo("cmbGender", "txtSearchGender", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "MS":
            updateCombo("cmbMaritalStatus", "txtMaritalStatus", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "COB":
            updateCombo("cmbCountryOfBirth", "txtCountryOfBirth", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "N":
            updateCombo("cmbNationality", "txtNationality", GetPInfoControlName(), checkval[0], checkval[2]);
            // Auto-Select Country of Birth on selection of Nationality
            updateCombo("cmbCountryOfBirth", "txtCountryOfBirth", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "PN":
            updateCombo("cmbPreviousNationality", "txtPreviousNationality", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "O":
            updateCombo("cmbOccupation", "txtOccupation", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "Q":
            updateCombo("cmbQualification", "txtQualification", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "PT":
            updateCombo("cmbPassportType", "txtPassportType", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "COI":
            updateCombo("cmbCountryOfIssue", "txtCountryOfIssue", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
        case "RG":
            updateCombo("cmbReligion", "txtReligion", GetPInfoControlName(), checkval[0], checkval[2]);
            loadFaith(checkval[0]);
            break;
        case "F":
            updateCombo("cmbFaith", "txtFaith", GetPInfoControlName(), checkval[0], checkval[2]);
            break;
            //	    case "L":                                                                   
            //            ConName = GetPInfoControlName();                                                                   
            //            sel = document.getElementById(ConName.replace(/\_/g,"$") + "$cmbFirstLanguage");                                                                   
            //            //txtField =document.getElementById(ConName.replace(/\_/g,"$") + "$txtFLang");                                                                   
            //            //txtField.value = checkval[0];                                                                                           

            //	        break;                                                                   
            //	    case "SL":                                                                   
            //            ConName = GetPInfoControlName();                                                                   
            //            sel = document.getElementById(ConName.replace(/\_/g,"$") + "$cmbSecondLanguage");                                                                   
            //            //txtField =document.getElementById(ConName.replace(/\_/g,"$") + "$txtSLang");                                                                   
            //            //txtField.value = checkval[0];                                                                                                       

            //	        break;                                                                   
            //	    case "TL":                                                                   
            //            ConName = GetPInfoControlName();                                                                   
            //            sel = document.getElementById(ConName.replace(/\_/g,"$") + "$cmbThirdLanguage");                                                                   
            //            //txtField =document.getElementById(ConName.replace(/\_/g,"$") + "$txtTLang");                                                                   
            //            //txtField.value = checkval[0];                                                                                                       
            //	        break;                                                                   

        case "VC":
            updateCombo("cmbVehicleCountry", "txtVehicleCountry", GetLTControlName(), checkval[0], checkval[2]);
            break;
        case "PC":
            updateCombo("cmbPermanentCountry", "txtPermanentCountry", GetAOUAEControlName(), checkval[0], checkval[2]);
            break;
        case "E":
            updateCombo("cmbEmirate", "txtEmirate", GetAIUAEControlName(), checkval[0], checkval[2]);
            break;
        case "C":
            updateCombo("cmbCity", "txtCity", GetAIUAEControlName(), checkval[0], checkval[2]);
            break;
        case "A":
            updateCombo("cmbArea", "txtArea", GetAIUAEControlName(), checkval[0], checkval[2]);
            break;
        case "S":
            updateCombo("cmbStreet", "txtStreet", GetAIUAEControlName(), checkval[0], checkval[2]);
            break;
        case "SPONSOR":
            updateSponsorNumber_EstabStats(checkval[0], checkval[2], checkval[3]);
            break;
    }
    return false;
}

//Function to Update Combo
function updateCombo(selName, txtName, ConName, code, selVal, updateType) {

    if (updateType != "AREA") {
        sel = document.getElementById(ConName + "_" + selName);
        txtField = document.getElementById(ConName + "_" + txtName);
        txtField.value = code;
        CheckNUpdateComb(sel, txtField, ConName, code, selVal);
        //txtField.focus();
    }
    else {
        sel = document.getElementById(selName);
        txtField = document.getElementById(txtName);
        txtField.value = code;
        CheckNUpdateComb(sel, txtField, ConName, code, selVal);
        //txtField.focus();
    }
}
//End


function GetControlId(parentCntrl, cntrlName) {
    var cntrlId = document.getElementById(parentCntrl.replace(/\_/g, "$") + "$" + cntrlName);
    return cntrlId;
}
function GetControlByName(cntrlName) {

    var cntrl;
    switch (cntrlName) {
        case "NATURALIZATION":
            if (typeof GetNaturalizationControlName == 'function')
                cntrl = GetNaturalizationControlName();
            break;
        case "NAMES":
            if (typeof GetNamesControlName == 'function')
                cntrl = GetNamesControlName();
            break;
        case "BIRTH_DATA":
            if (typeof GetBirthControlName == 'function')
                cntrl = GetBirthControlName();
            break;
        case "PRIMARY_ADDREESS_IN_UAE":
            if (typeof GetPrimaryAddressControlName == 'function')
                cntrl = GetPrimaryAddressControlName();
            break;
        case "HOME_COUNTRY_ADDRESS":
            if (typeof GetHomeAddressControlName == 'function')
                cntrl = GetHomeAddressControlName();
            break;
        case "QUALIFICATION":
            if (typeof GetQualificationControlName == 'function')
                cntrl = GetQualificationControlName();
            break;
        case "OCCUPATION":
            if (typeof GetOccupationControlName == 'function')
                cntrl = GetOccupationControlName();
            break;
        default:
            cntrl = null;
    }
    return cntrl;
}

function validatePassportNumber(passportNumberValue, langIsEnglish) {

    var langValue;

    if (langIsEnglish.toString() == 'true') {
        langValue = "0";
    }
    else {
        langValue = "1";
    }

    var fieldValidationMsgData = new ValidatedControl("", "", "", "");

    CheckValidCharactersWithMsg(passportNumberValue, "charbuilding", fieldValidationMsgData, langValue)

    return fieldValidationMsgData.formatMsg;
}

function validateNumber(numberValue, langIsEnglish) {

    var langValue;

    if (langIsEnglish.toString() == 'true') {
        langValue = "0";
    }
    else {
        langValue = "1";
    }

    var fieldValidationMsgData = new ValidatedControl("", "", "", "");

    CheckValidCharactersWithMsg(numberValue, "NumEmpty", fieldValidationMsgData, langValue)

    return fieldValidationMsgData.formatMsg;
}

// This method is called to perform the data validation of source control text box
//  before actually performing the translate operation
//  convType        : Converstion Type (EN to AR, or AR to EN)
//  srcControlId    : Control Id of source control
//  targetControlId : Control Id of target conotrol
//  language        : 0 = EN, 1 = AR
function Translate_Validating(convType, srcControlId, targetControlId, language) {

    var srcControl = document.getElementById(srcControlId);
    var targetControl = document.getElementById(targetControlId);
    var validationFormat, validationMsgLblSrc, validationMsgLblTarget, retVal = false;

    if (convType == "EN2AR") {
        // Default validation format
        validationFormat = "charsym";
        // Get validation format from attribute
        if (srcControl.attributes["PreTranslateValidationRule"] != undefined) {
            validationFormat = srcControl.attributes["PreTranslateValidationRule"].value;
        }
    }
    else {
        // Default validation format
        validationFormat = "arabicsym";
        // Get validation format from attribute
        if (srcControl.attributes["PreTranslateValidationRule"] != undefined) {
            validationFormat = srcControl.attributes["PreTranslateValidationRule"].value;
        }
    }

    if (srcControl.attributes["ValidationMsgLabel"] != undefined) {
        var validationMsgLblId = srcControl.attributes["ValidationMsgLabel"].value;
        validationMsgLblSrc = document.getElementById(validationMsgLblId);
    }
    if (targetControl.attributes["ValidationMsgLabel"] != undefined) {
        var validationMsgLblId = targetControl.attributes["ValidationMsgLabel"].value;
        validationMsgLblTarget = document.getElementById(validationMsgLblId);
    }

    var isValid = CheckValidCharactersWithMsg(srcControl.value, validationFormat, this, language);
    if (isValid) {

        if (validationMsgLblSrc != undefined) {
            validationMsgLblSrc.innerHTML = "";
        }

        if (validationMsgLblTarget != undefined) {
            validationMsgLblTarget.innerHTML = "";
        }

        markDefaultCtrl(srcControl);
        markDefaultCtrl(targetControl);

        retVal = true;
    }
    else {

        if (validationMsgLblSrc != undefined) {
            validationMsgLblSrc.innerHTML = this.formatMsg;
        }

        markInvalidDataCtrl(srcControl);
    }

    return retVal;
}

// This method is called to perform the translate operation
//  convType        : Converstion Type (EN to AR, or AR to EN)
//  srcControlId    : Control Id of source control
//  targetControlId : Control Id of target conotrol
//  language        : 0 = EN, 1 = AR
function PerformTanslate(convType, srcControlId, targetControlId, language) {

    if (Translate_Validating(convType, srcControlId, targetControlId, language)) {

        var srcControl = document.getElementById(srcControlId);
        var targetControl = document.getElementById(targetControlId);

        translateText(srcControl.value, targetControl.id);
    }
}