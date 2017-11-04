//////////////////////////////////////////////////////////
//////      Title           :   Function Scripts    //////
//////      Scripted By     :   Touseef             //////
//////      Dated           :   07 Jan 2008         //////
//////////////////////////////////////////////////////////


// ***********************************************************************************
// Function to GET RAD WINDOW
// To open rad window

// pickDate
// Event Handler that is invoke when date is select form Date popup control and set in the textbox

// Website to convert arabic letter to corresponding unicode number
// http://www.fileformat.info/info/unicode/char/search.htm

function GedRadWindow() {
    var oWindow = null;
    if (window.radWindow) oWindow = window.radWindow;
    else if (window.frameElement.radWindow) oWindow = window.frameElement.radWindow;
    return oWindow;
}

// ***********************************************************************************


// Function to translate ENGLISH - ARABIC
// Translate English character to Arabic
function translateText(text, objId) {
    try {
        //alert("Trans: "+text);
        var xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;

        xmlDoc.load("VisaManagement/TranslationProxy.aspx?TEXT=" + escape(text));

        if (xmlDoc.readyState == 4) {
            var txtArabic = document.getElementById(objId);
            var tval = xmlDoc.documentElement.childNodes[0].text;
            if (tval != "-1" & tval != "") {
                if (tval.length <= txtArabic.maxLength) {
                    txtArabic.value = tval;
                    MakeValidString(txtArabic);
                }
            }
        }
    }
    catch (exx) {
    }
}
function translateTextCtrl(objId1, objId2) {
    translateText(document.getElementById(objId1).value, objId2);
}
function GenerateSAGEMName(text, objId1, objId2) {
    try {
        //alert("Trans: "+text);
        var xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;

        var firstLineEN = '';
        var secondLineEN = '';
        var firstLineAR = '';
        var secondLineAR = '';

        //for(int i=0; i<4; i++

        xmlDoc.load("VisaManagement/SagemCardNameProcessor.aspx?TEXT=" + escape(text));

        if (xmlDoc.readyState == 4) {
            var txt = xmlDoc.parseError.srcText.split('|');
            var tval1 = txt[0];
            var tval2 = txt[1];
            var tval3 = txt[2];
            var tval4 = txt[3];

            var txtArabic = document.getElementById(objId1);
            var txtEng = document.getElementById(objId2);
            if (tval1 != "-1" & tval1 != "") {
                if (tval1.length > 0) {
                    txtArabic.value = ((tval1 != undefined) ? tval1 : '') + "\n" + ((tval2 != undefined) ? tval2 : '');
                }
            }
            if (tval3 != "-1" & tval3 != "") {
                if (tval3.length > 0) {
                    txtEng.value = ((tval3 != undefined) ? tval3 : '') + "\n" + ((tval4 != undefined) ? tval4 : '');
                }
            }
        }
    }
    catch (exx) {
    }
}

//$(document).ready(function () {
//    if ($('.ddlSponsorType:visible').length == 1 && $('.MultipleSponsorsTable tbody>tr').length > 1) $('.MultipleSponsor').click();
//    $('.chkMultiSelect input').click(function () {
//        var clickItem = $(this); $('.chkMultiSelect input').each(function () { if (clickItem.attr('id') != this.id) $(this).attr('checked', false); });
//        if ($('.chkMultiSelect input:checked').length < 1) $('.btnSponsorSelection').attr('Disabled', 'Disabled'); else $('.btnSponsorSelection').removeAttr('Disabled');
//    });
//});

function UpdateComboText(code, comboType, objId, dpndedCmbIDs) {
    //window.alert("code :"+code+" comboType :"+comboType+" objId : "+objId+" dpndedCmbIDs :"+dpndedCmbIDs);
    var comboCntrl = document.getElementById(objId);
    for (var i = 0; i < comboCntrl.options.length; i++) {
        if (comboCntrl.options[i].value == code) {
            return;
        }
    }
    try {
        var xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load("VisaManagement/UpdateComboOnFly.aspx?CODE=" + escape(code) + "&COMBOTYPE=" + escape(comboType));
        if (xmlDoc.readyState == 4) {
            var code = xmlDoc.documentElement.childNodes[0].text;
            var desc = xmlDoc.documentElement.childNodes[1].text;
            if (code != "-1") {
                var optn = document.createElement("OPTION");
                optn.text = desc;
                optn.value = code;
                comboCntrl.options.add(optn);
                comboCntrl.value = code;
                var strIDs;
                var j = 0;
                var found = false;
                var cmbCntrl;
                if (dpndedCmbIDs != "") {
                    strIDs = dpndedCmbIDs.split(",");
                    while (j < strIDs.length) {
                        if (strIDs[j] == objId) {
                            j = j + 1;
                            continue;
                        }
                        cmbCntrl = document.getElementById(strIDs[j]);
                        if (cmbCntrl.options[j].value == code)
                            found = true;
                        if (!found) {
                            var optn1 = document.createElement("OPTION");
                            optn1.text = desc;

                            optn1.value = code;
                            cmbCntrl.options.add(optn1);
                        }
                        j += 1;
                    }
                }
            }
        }
    }
    catch (exx) {
    }
}

function getId(ctrl, sep) {
    if (ctrl != null) return ctrl.id + sep; else return "";
}

// ***********************************************************************************


// Function to Validate SPECIAL CHARACTERS
// Character ::  *|,\":<>[]{}`\';()&$#%/@~!^\\"

function validateSpecialChar(oSrc, args) {
    if (!args.Value) return false;
    var iChars = "*|,\":<>[]{}`\';()&$#%/@~!^\\";
    for (var i = 0; i < args.Value.length; i++) {
        if ((iChars.indexOf(args.Value.charAt(i)) != -1) || (args.Value.charAt(i) == " ")) {
            args.IsValid = false;
            return;
        }
    }
    return true;
}

// ***********************************************************************************

// Function to Validate COMBO VALUES
// Character ::  -1

function ValidateCombo(src, args) {
    var combo = document.getElementById(src.controltovalidate);
    if (combo.options[combo.selectedIndex].value == -1)
        args.IsValid = false;
    else
        args.IsValid = true;
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


    if ((keycode == 32) && (selected_text != "")) {
        return false;
    }
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13)) {
        return false;
    }
    else return true;
}

function ValidateChar_TelFormated(e) {
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
    else if ( !(keycode >= 48 && keycode <= 57) && keycode!=43 && keycode!=45 && (keycode != 13) ) {
        return false;
    }
    
    return true;
}
// ***********************************************************************************

// ***********************************************************************************

// Function to convert enter to
//function enter_to_tab(e) {

//    if (window.event) {
//        if (window.event.keyCode == 13)
//            window.event.keyCode = 9;
//    }
//    else if (event) {
//        if (event.keyCode == 13)
//            event.keyCode = 9;
//    }
//    else if (e) {
//    if (e.which == 13)
//        e.which = 9;
//    }
//    else
//        return true;
        
//}
// ***********************************************************************************

// Function to Validate Mobile Phone format
// Character ::  0-9, +

function mobile_only(e) {
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
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13) && (keycode != 43)) {
        return false;
    }
    else return true;
}

// ***********************************************************************************

// Function to Validate DATE
// Character ::  0-9, ENTER, /

function Date_Only(e) {
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

    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13) && (keycode != 47)) {
        return false;
    }
    else
        return true;
}
// ***********************************************************************************

// Function to Validate NUMBERS
// Character ::  0-9, "-", ENTER

function FilterNumeric() {
    var re;
    var ch = String.fromCharCode(event.keyCode);
    if (event.keyCode < 32) {
        return;
    }

    if ((event.keyCode <= 57) && (event.keyCode >= 48)) {
        if (!event.shiftKey) {
            return;
        }
    }
    if ((ch == '-') || (ch == '.')) {
        return;
    }
    event.returnValue = false;
}

// ***********************************************************************************



// Function to Validate Arabic Character only
// Character ::
function ArabicOnly_Event(e) {
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
    window.status = keycode;

    //		if(  ( selected_text != "") )
    //		{
    //			return false;
    //		}

    if (!(keycode >= 1536 && keycode <= 1791) && (keycode != 13) && (keycode != 32) && (keycode != 45)) {
        return false;
    }
    else {
        return true;
    }
}
// ***********************************************************************************

// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English Keyboard

function EnglishOnly_Event(e) {
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


    //		if( ( selected_text != "") )
    //		{
    //			return false;
    //		}

    if (!(keycode >= 65 && keycode <= 90) && !(keycode == 8) && !(keycode >= 97 && keycode <= 122) && (keycode != 13) && (keycode != 32) && (keycode != 45)) {

        return false;
    }
    else {
        return true;
    }
}

function EmailOnly_Event(e) {
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
    if (!(keycode >= 65 && keycode <= 90) && !(keycode == 8) && !(keycode >= 97 && keycode <= 122) && (keycode != 13) && (keycode != 32) && (keycode != 45)){

        if ((keycode == 32) && (selected_text != "")) {
            return false;
        }
        if (!(keycode >= 48 && keycode <= 57) && (keycode != 13)) {

            if (!(keycode >= 35 && keycode <= 38) && (keycode != 13)) {

                if (!(keycode == 46 || keycode == 64) && (keycode != 13)) {
                    return false;
                }
            }
        }
    }
    else {
        return true;
    }
}

// ***********************************************************************************
// ***********************************************************************************

// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English Keyboard

function EnglishCustomSymbol_Event(e, sym) {
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

    if (!(keycode >= 65 && keycode <= 90) && !(keycode == 8) && !(keycode >= 97 && keycode <= 122) && (keycode != 13)
            && (keycode != 32) && (sym.indexOf(String.fromCharCode(keycode)) == -1)
            ) {
        return false;
    }
    else {
        return true;
    }
}
// ***********************************************************************************


function ArabicCustomSymbol_Event(e, sym) {
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
    window.status = keycode;

    if (!(keycode >= 1536 && keycode <= 1791) && (keycode != 13) && (keycode != 32) && (sym.indexOf(String.fromCharCode(keycode)) == -1)) {
        return false;
    }
    else {
        return true;
    }
}

// Function to Validate ENGLISH KEYBOARD ONLY For USerName in User Management
// Character ::  English Keyboard

function UserName_Event(e) {
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

    if ((selected_text != "")) {
        return false;
    }

    if (!(keycode >= 65 && keycode <= 90) && !(keycode >= 97 && keycode <= 122) && !(keycode >= 48 && keycode <= 57) && (keycode != 13) && (keycode != 45) && (keycode != 95)) {
        return false;
    }
    else {
        return true;
    }
}
// ***********************************************************************************



// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English/Arabic Keyboard
function BothLang_Event(e) {
    if (EnglishOnly_Event(e) || ArabicOnly_Event(e)) {
        return true;
    }
    else {
        return false;
    }
}
// ***********************************************************************************

// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English/Arabic Keyboard
function LangByCountry_Event(e) {
    if (IsArabicNationality()) {
        return ArabicOnly_Event(e);

    }
    else {
        return EnglishOnly_Event(e);
    }
}
// ***********************************************************************************


function AlphaNumericInBothLanguages(e, sym) {
    var numericValues = '0123456789' + sym;
    if (ArabicCustomSymbol_Event(e, numericValues) || EnglishCustomSymbol_Event(e, numericValues))
        return true;
    else
        return false;
}

function ArabicEnglishOnly(e) {
    if (ArabicOnly_Event(e) || EnglishOnly_Event(e))
        return true;
    else
        return false;
}

function AlphaNumericWithCustomSymbols_Event(e,sym)
{
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (event) keycode = event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (!(keycode >= 65 && keycode <= 90) && !(keycode == 8) && !(keycode >= 97 && keycode <= 122) && (keycode != 13)
            && (keycode != 32) && !(keycode >=48 && keycode<=57) && !(keycode >= 1536 && keycode <= 1791) && (sym.indexOf(String.fromCharCode(keycode)) == -1)
            ) {
        return false;
    }
    else {
        return true;
    }
}


// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English/Arabic Keyboard
function LangByCountryWithCustSym_Event(e, sym, cntrl) {
    var isTrue = false;
    if (cntrl == 'Nationality') {
        isTrue = IsArabicNationality();
    }
    else if (cntrl == 'PermanentCountry') {
        isTrue = IsArabicPermanentCountry();
    }

    if (isTrue) {
        return ArabicCustomSymbol_Event(e, sym);
    }
    else {
        return EnglishCustomSymbol_Event(e, sym);
    }
}

// ***********************************************************************************
// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English/Arabic Keyboard    AlertIfArabicNat();

//    function AlertIfArabicNat(lang)
//    {
//        if( IsArabicNationality() )
//        {
//            if (lang =="0")
//            {
//                alert("You have selected Arabic nationality. Type arabic character in Place of issue, Place of birth and in Mother name field");
//            }
//            else 
//            {
//                alert("لقد اخترت جنسية عربية. ادخل أحرف عربية في حقول: مكان الإصدار، مكان الولادة, و اسم الأم");
//            }                
//        }
//    }

// ***********************************************************************************

// Function to Validate ENGLISH KEYBOARD ONLY
// Character ::  English/Arabic Keyboard
function AlphanumOnly_Event(e) {
    //    if (EnglishOnly_Event(e) || numeric_only(e))
    if (AlphaNumeric(e)) {
        return true;
    }
    else {
        return false;
    }
}

function AlphaNumeric(e) {
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

    if ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || (keycode >= 48 && keycode <= 57) || keycode == 32)
        return true;
    else {
        return false;
    }
}

// ***********************************************************************************

// Function to Validate NUMBERS & HYPHEN
// Character ::  0-9, "-", ENTER

function numeric_hyphen(e) {
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
    if (!(keycode >= 48 && keycode <= 57) && (keycode != 13) && (keycode != 45)) {
        return false;
    }
    else {
        return true;
    }
}


// ***********************************************************************************

// Function to Validate NUMERIC VALUES
// Character ::  0.0 - 9.9 etc

function IsNumeric(sValue) {
    for (i = 0; i < sValue.length; i++) {
        if (window.event.keyCode >= 0x30 && window.event.keyCode <= 0x39)
            ;
        else
            return false;
    }
    return true;
}

// ***********************************************************************************

// Function to Validate BOTH ARABIC & ENGLISH
// Character ::   a-z, A-Z, ا - ي

function BothCharacter() {


    ////
    if (window.event.keyCode >= 65 && window.event.keyCode <= 90)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 97 && window.event.keyCode <= 122)
        window.event.returnValue = true;
    else if (window.event.keyCode == 32 || window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;

    ///
    //    var re; 
    //	var ch=String.fromCharCode(event.keyCode);
    //	
    //	if (event.keyCode<32)
    //	{
    //	    return;
    //	}
    //	
    //	if(((event.keyCode>=65)&&(event.keyCode>=90)) && ((event.keyCode>=97)&&(event.keyCode>=122)) && ((event.keyCode>=1536)&&(event.keyCode>=1791)) )
    //	{
    //		return;
    //	}
    //	
    //	if ((ch=='-') ||(ch=='.'))
    //	{
    //	    return;
    //	} 
    //	
    //	event.returnValue=false;
}


// ***********************************************************************************

// Function to Validate CHARACTERS
// Character ::   a-z, A-Z

//    function CheckEnglishOnly(field)
//    {
//        var sNewVal = "";
//        var sFieldVal = field.value;
//        
//        for(var i = 0; i < sFieldVal.length; i++) {
//            
//            var ch = sFieldVal.charAt(i);
// 
//            var c = ch.charCodeAt(0);
//            
//            if((c < 65 || c > 90) && (c < 97 || c > 122)) {
//                // Discard
//            }
//            else {
//                sNewVal += ch;
//            }
//        }
//        field.value = sNewVal;
//    }


// ***********************************************************************************

// Function to Validate LATIN CHARACTERS
// Character ::   

function IsLatinChars(sValue) {
    for (i = 0; i < sValue.length; i++) {
        if (sValue.charCodeAt(i) >= 0x41 && sValue.charCodeAt(i) <= 0x5A)
            ;
        else if (sValue.charCodeAt(i) >= 0x61 && sValue.charCodeAt(i) <= 0x7A)
            ;
        else if (sValue.charCodeAt(i) == 32 || sValue.charCodeAt(i) == 8)
            ;
        else
            return false;
    }
    return true;
}


// ***********************************************************************************

// Function to Validate ARABIC CHARACTERS, BACKSPACE, SPACE
// Character ::  ا - ي

function OnlyDisplayArabicChars() {
    if (window.event.keyCode >= 1569 && window.event.keyCode <= 1572)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1574 && window.event.keyCode <= 1594)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1601 && window.event.keyCode <= 1610)
        window.event.returnValue = true;
    else if (window.event.keyCode == 32 || window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;
}

function CheckEnglishOnly() {
    if (window.event.keyCode >= 65 && window.event.keyCode <= 90)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 97 && window.event.keyCode <= 122)
        window.event.returnValue = true;
    else if (window.event.keyCode == 32 || window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;
}


// ***********************************************************************************

// Function to Validate ARABIC CHARACTERS, BACKSPACE, SPACE
// Character :: Arabic

function IsArabicChars(sValue) {
    for (i = 0; i < sValue.length; i++) {
        if (sValue.charCodeAt(i) >= 1569 && sValue.charCodeAt(i) <= 1572)
            ;
        else if (sValue.charCodeAt(i) >= 1574 && sValue.charCodeAt(i) <= 1594)
            ;
        else if (sValue.charCodeAt(i) >= 1601 && sValue.charCodeAt(i) <= 1610)
            ;
        else if (sValue.charCodeAt(i) == 32 || sValue.charCodeAt(i) == 8)
            ;
        else
            return false;

    }
    return true;
}


// ***********************************************************************************

// Function to Validate ARABIC CHARACTERS, BACKSPACE, SPACE
// Character ::  Arabic

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
function IsEnglishOnly(value) {
    var sNewVal = "";
    var sFieldVal = value;

    for (var i = 0; i < sFieldVal.length; i++) {

        var ch = sFieldVal.charAt(i);
        var c = ch.charCodeAt(0);

        if (c == 32) {
        }
        else if ((c < 65 || c > 90) && (c < 97 || c > 90)) {
            return false;
        }
    }
    return true;
}


// ***********************************************************************************

// Function to Validate ARABIC CHARACTERS, BACKSPACE, SPACE
// Character ::  Arabic

function CheckArabicOnly(field) {
    var sNewVal = "";
    var sFieldVal = field.value;

    for (var i = 0; i < sFieldVal.length; i++) {

        var ch = sFieldVal.charAt(i); ;
        var c = ch.charCodeAt(0);

        if (c < 1536 || c > 1791) {
            // Discard
        }
        else {
            sNewVal += ch;
        }
    }

    field.value = sNewVal;
}

// ***********************************************************************************

// Function to Validate NUMBERS & BACKSPACE
// Character ::  0-9 & "Backspace"

function OnlyDisplayNumbers() {
    if (window.event.keyCode >= 0x30 && window.event.keyCode <= 0x39)
        window.event.returnValue = true;
    else if (window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;
}



// ***********************************************************************************

// Function to Validate ARABIC LATIC CHARACTERS
// Character ::  Latin Characters

function OnlyDisplayArabicLatinChars() {
    //Latin start
    if (window.event.keyCode >= 0x41 && window.event.keyCode <= 0x5A)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 0x61 && window.event.keyCode <= 0x7A)
        window.event.returnValue = true;
    //Arabic start
    else if (window.event.keyCode >= 1569 && window.event.keyCode <= 1572)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1574 && window.event.keyCode <= 1594)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1601 && window.event.keyCode <= 1610)
        window.event.returnValue = true;
    else if (window.event.keyCode == 32 || window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;
}


// ***********************************************************************************

// Function to Validate DATE
// Character :: Numeric Value for Date

function OnlyDisplayDate() {
    if (window.event.keyCode >= 0x30 && window.event.keyCode < 0x40)
        return;
    else
        if (window.event.keyCode == 0x2F) return;
    else
        window.event.returnValue = 0;
}



// ***********************************************************************************

// Function to Validate ALPHA NUMERIC CHARACTERS
// Character :: a-z, A-Z, 0-9,SPACE, BACKSPACE

function OnlyDisplayAlphaNumeric() {
    //Latin start
    if (window.event.keyCode >= 0x41 && window.event.keyCode <= 0x5A)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 0x61 && window.event.keyCode <= 0x7A)
        window.event.returnValue = true;
    //Arabic start
    else if (window.event.keyCode >= 1569 && window.event.keyCode <= 1572)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1574 && window.event.keyCode <= 1594)
        window.event.returnValue = true;
    else if (window.event.keyCode >= 1601 && window.event.keyCode <= 1610)
        window.event.returnValue = true;

    // Numeric start
    else if (window.event.keyCode >= 0x30 && window.event.keyCode <= 0x39)
        window.event.returnValue = true;
    else if (window.event.keyCode == 32 || window.event.keyCode == 8)
        window.event.returnValue = true;
    else
        window.event.returnValue = false;
}

// ***********************************************************************************
//Function to check whether the fields are empty. If emtpy then change the border color
function markEmptyCtrl(objCtrl) {

    var objTarget = objCtrl;

    if (objCtrl.type == "radio" && objCtrl.parentNode != undefined) {
        if (objCtrl.parentNode.tagName.toLowerCase() == "span") {
            // In case of radio type buttons, hightlight the parent span control
            //  instead of input radio tag only
            objTarget = objCtrl.parentNode;
        }
    }

    objTarget.style.backgroundColor = "#B8CCDC";
    changeDateCombosBgColor(objCtrl, "#B8CCDC");
}

function markDefaultCtrl(objCtrl) {

    var objTarget = objCtrl;

    if (objCtrl.type == "radio" && objCtrl.parentNode != undefined) {
        if (objCtrl.parentNode.tagName.toLowerCase() == "span") {
            // In case of radio type buttons, hightlight the parent span control
            //  instead of input radio tag only
            objTarget = objCtrl.parentNode;
        }
    }
    objTarget.style.backgroundColor = "#FFFFFF";
    changeDateCombosBgColor(objCtrl, "#FFFFFF");
}

function markInvalidDataCtrl(objCtrl) {
    objCtrl.style.backgroundColor = "#FF8769";
    changeDateCombosBgColor(objCtrl, "#FF8769");
}

// ***********************************************************************************
// Code by Touseef / Shaheryar
// ***********************************************************************************
//Function to check mobile no. It will accept starting with 05. 

function valMobile(obj) {
    reMobileNumber = new RegExp(/^[0][5]\d{8}$/);
    return reMobileNumber.test(obj);
}



// ***********************************************************************************
//Function to check telephone no. It will accept starting with 04. 

function valTelephone(obj) {
    reTelephoneNumber = new RegExp(/^[0]\d{8}$/);
    return reTelephoneNumber.test(obj);
}

// ***********************************************************************************
// Code by Touseef / Shaheryar
// ***********************************************************************************
//Function to check full mobile no. It will accept starting with 05. 

function valFullMobile(obj) {
    //reMobileNumber = new RegExp(/^[0][0][9][7][1][5]\d{8}$/);
    reMobileNumber = new RegExp(/^[9][7][1][5]\d{8}$/);
    //alert(obj);
    return reMobileNumber.test(obj);
}



//Function to check full mobile no. It will accept starting with 05. 

function valFullMobileWoutZero(obj) {
    var mobvalue = obj;
    if (mobvalue != null) {
        var singleValue = (mobvalue.substring(0, 1));
        var twoValue = (mobvalue.substring(0, 2));

        if ((twoValue == '00') || (singleValue == "0") || (singleValue == "+")) {
            //return alert("Visitor mobile number cannot start with 0 or 00");
            return false;
        }
    }
}

function handleSectionCheck(obj, divId, resetDiv) {
    var divToHandle = document.getElementById(divId);
    if (obj.checked) {
        divToHandle.style.display = '';
    }
    else {
        divToHandle.style.display = 'none';
        ResetSection(divId);
    }
}

function ResetSection(divId) {
    var divToHandle = document.getElementById(divId);
    var elements = divToHandle.getElementsByTagName('input');
    var selElements = divToHandle.getElementsByTagName('select');

    for (i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
    for (i = 0; i < selElements.length; i++) {
        selElements[i].value = "-1";
    }
}


function Error(sender, args) {

    var suppressErrorStyle = false;
    switch (args.Reason) {
        case RadInputErrorReason.ParseError:
            //suppressErrorStyle = HandleDateParseError(args.InputText.toUpperCase());
            break;
        case RadInputErrorReason.OutOfRange:
            suppressErrorStyle = HandleDateOutOfRange(sender, args.InputText.toUpperCase());
            break;
    }

    return !suppressErrorStyle;
}

function HandleDateOutOfRange(sender, inputText) {
    var radDateInput = sender;
    //alert(radDateInput.ID + " : " +radDateInput.Id);
    if (radDateInput.MinDate < new Date())
        nDate = radDateInput.MaxDate;
    else
        nDate = radDateInput.MinDate;

    radDateInput.SetDate(nDate);
    radDateInput.SelectAllText();
    //radDateInput.Clear();

    return true;
}
function relativeImageUrl(imgName) {
    var loc = window.location.href;
    var imgUrl = '';
    var i = -1;
    if (loc.indexOf("Modules") > -1) {
        i = loc.indexOf("Modules")
        imgUrl = loc.substr(0, i) + "Images/" + imgName;
    }
    return imgUrl;
}
//To remove leading, trailing and double spaces from the given control data...
function MakeValidString(cntrl) {
    var temp = cntrl.value;
    var obj = /^(\s*)([\W\w]*)(\b\s*$)/;
    if (obj.test(temp)) { temp = temp.replace(obj, '$2'); }
    var obj = /  /g;
    while (temp.match(obj)) { temp = temp.replace(obj, " "); }
    temp = temp.replace(/^\s+|\s+$/g, '');
    cntrl.value = cnvrt2title(temp);
}

function TruncateSpaces(cntrl) {
    var string_variable = cntrl.value;
    var intIndexOfMatch = string_variable.indexOf("  ");
    while (intIndexOfMatch != -1) {
        string_variable = string_variable.replace("  ", " ")
        intIndexOfMatch = string_variable.indexOf("  ");
    }
    cntrl.value = string_variable;
}

function cnvrt2title(str) {
    return str.toLowerCase().replace(/\b\w+\b/g, cnvrt);
    function cnvrt() {
        if (arguments[arguments.length - 2] == 0)
            return arguments[0].replace(/^[a-z]/, cnvrt2);
        else if (/^(a|about|after|an|and|at|by|for|from|in|into|nor|of|on|onto|over|the|to|up|with|within)$/.test(arguments[0]))
            return arguments[0];
        else
            return arguments[0].replace(/^[a-z]/, cnvrt2);
    }
    function cnvrt2() {
        return arguments[0].toUpperCase();
    }
}

//*****************************************************************

/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function trim(str) {
    return ltrim(rtrim(str, " "), " ");
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
//********************************************************************

var turnOffYearSpan = false;
var weekStartsOnSunday = false;
var showWeekNumber = true;

var dateFormat = 'dd-MMM-yyyy';// 'dd/mm/yyyy'; /* Format the todayStringFormat as like dateFormat */
var seperator = '/';
var calendarPosition = 1;  /* 0 - By Button , 1- By Text */

var languageCode = 'en'; // Possible values: 	en,ge,no,nl,es,pt-br,fr,ar
// en = english, ge = german, no = norwegian,nl = dutch, es = spanish, pt-br = portuguese, fr = french, da = danish, hu = hungarian(Use UTF-8 doctype for hungarian),ar-Arabic

var calendar_display_time = true;
var week_color = '#FFFFFF';

// Format of current day at the bottom of the calendar
// [todayString] = the value of todayString
// [dayString] = day of week (examle: mon, tue, wed...)
// [UCFdayString] = day of week (examle: Mon, Tue, Wed...) ( First letter in uppercase)
// [day] = Day of month, 1..31
// [monthString] = Name of current month
// [year] = Current year
var todayStringFormat = '[day]/[month]/[year] ';
//relativeImageUrl('calendar/');
var pathToImages = '../images/calendar/'; // Relative to your HTML file

var speedOfSelectBoxSliding = 200; // Milliseconds between changing year and hour when holding mouse over "-" and "+" - lower value = faster
var intervalSelectBox_minutes = 5; // Minute select box - interval between each option (5 = default)

var calendar_offsetTop = 0; 	// Offset - calendar placement - You probably have to modify this value if you're not using a strict doctype
var calendar_offsetLeft = 0; // Offset - calendar placement - You probably have to modify this value if you're not using a strict doctype
var calendarDiv = false;
var calTopBar = false;
var calContentBar = false;
var calBottomBar = false;

var MSIE = false;
var Opera = false;
if (navigator.userAgent.indexOf('MSIE') >= 0 && navigator.userAgent.indexOf('Opera') < 0) MSIE = true;
if (navigator.userAgent.indexOf('Opera') >= 0) Opera = true;


var monthArray;
var monthArrayShort;
var dayArray;
var weekString;
var todayString;

function setImagePathPrefix(prefix) {
    pathToImages = prefix + 'images/calendar/';
}
//Provides the month name in specific language that is used to populate the IDV of popup Date Control
function initLocale() {
    switch (languageCode) {
        case "en": /* English */
            monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            weekString = 'Week';
            todayString = 'Today';
            break;
        case "ge": /* German */
            monthArray = ['Januar', 'Februar', 'Mنrz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
            dayArray = ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'];
            weekString = 'Woche';
            todayString = 'Heute';
            break;
        case "no": /* Norwegian */
            monthArray = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
            dayArray = ['S&oslash;n', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L&oslash;r'];
            weekString = 'Uke';
            todayString = 'Dagen i dag er';
            break;
        case "nl": /* Dutch */
            monthArray = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
            dayArray = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
            weekString = 'Week';
            todayString = 'Vandaag';
            break;
        case "es": /* Spanish */
            monthArray = ['Enero', 'Febrero', 'Marzo', 'April', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            monthArrayShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            dayArray = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
            weekString = 'Semana';
            todayString = 'Hoy es';
            break;
        case "pt-br":  /* Brazilian portuguese (pt-br) */
            monthArray = ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            monthArrayShort = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            dayArray = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S&aacute;b'];
            weekString = 'Sem.';
            todayString = 'Hoje &eacute;';
            break;
        case "fr":      /* French */
            monthArray = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            monthArrayShort = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
            dayArray = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
            weekString = 'Sem';
            todayString = "Aujourd'hui";
            break;
        case "da": /*Danish*/
            monthArray = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];
            monthArrayShort = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
            dayArray = ['s&oslash;n', 'man', 'tirs', 'ons', 'tors', 'fre', 'l&oslash;r'];
            weekString = 'Uge';
            todayString = 'I dag er den';
            break;
        case "hu": /* Hungarian  - Remember to use UTF-8 encoding, i.e. the <meta> tag */
            monthArray = ['Januأ،r', 'Februأ،r', 'Mأ،rcius', 'أ?prilis', 'Mأ،jus', 'Jأ؛nius', 'Jأ؛lius', 'Augusztus', 'Szeptember', 'Oktأ³ber', 'November', 'December'];
            monthArrayShort = ['Jan', 'Feb', 'Mأ،rc', 'أ?pr', 'Mأ،j', 'Jأ؛n', 'Jأ؛l', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];
            dayArray = ['Vas', 'Hأ©', 'Ke', 'Sze', 'Cs', 'Pأ©', 'Szo'];
            weekString = 'Hأ©t';
            todayString = 'Mai nap';
            break;
        case "it": /* Italian*/
            monthArray = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            monthArrayShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lugl', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
            dayArray = ['Dom', 'Lun', ';Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
            weekString = 'Settimana';
            todayString = 'Oggi &egrave; il';
            break;
        case "sv": /* Swedish */
            monthArray = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
            dayArray = ['S&ouml;n', 'M&aring;n', 'Tis', 'Ons', 'Tor', 'Fre', 'L&ouml;r'];
            weekString = 'Vecka';
            todayString = 'Idag &auml;r det den';
            break;
        case "ar": /* Arabic */
            monthArray = ['&#1610;&#1606;&#1575;&#1610;&#1585;',            // Jan
                            '&#1601;&#1576;&#1585;&#1575;&#1610;&#1585;',   // Feb
    					    '&#1605;&#1575;&#1585;&#1587;',                 // Mar
    					    '&#1575;&#1576;&#1585;&#1610;&#1604;',          // Apr
    					    '&#1605;&#1575;&#1610;&#1608;',                 // May
    					    '&#1610;&#1608;&#1606;&#1610;&#1608;',          // Jun
    					    '&#1610;&#1608;&#1604;&#1610;&#1608;',          // Jul
    					    '&#1575;&#1594;&#1587;&#1591;&#1587;',          // Aug
    					    '&#1587;&#1576;&#1578;&#1605;&#1576;&#1585;',   // Sept
    					    '&#1575;&#1603;&#1578;&#1608;&#1576;&#1585;',   // Oct
    					    '&#1606;&#1608;&#1601;&#1605;&#1576;&#1585;',   // Nov
    					    '&#1583;&#1610;&#1587;&#1605;&#1576;&#1585;'];  // Dec
            monthArrayShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            dayArray = ['&#1575;&#1604;&#1575;&#1581;&#1583;', '&#1575;&#1604;&#1571;&#1579;&#1606;&#1610;&#1606;', '&#1575;&#1604;&#1579;&#1604;&#1575;&#1579;&#1575;&#1569;',
						'&#1575;&#1604;&#1575;&#1585;&#1576;&#1593;&#1575;&#1569;', '&#1575;&#1604;&#1582;&#1605;&#1610;&#1587;',
						'&#1575;&#1604;&#1580;&#1605;&#1593;&#1577;', '&#1575;&#1604;&#1587;&#1576;&#1578;'];
            weekString = '&#1571;&#1587;&#1576;&#1608;&#1593;';
            todayString = '&#1575;&#1604;&#1610;&#1608;&#1605;';
            break;
    }
}
initLocale();

if (weekStartsOnSunday) {
    var tempDayName = dayArray[6];
    for (var theIx = 6; theIx > 0; theIx--) {
        dayArray[theIx] = dayArray[theIx - 1];
    }
    dayArray[0] = tempDayName;
}



var daysInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentMonth;
var currentYear;
var currentHour;
var currentMinute;
var calendarContentDiv;
var returnDateTo;
var returnFormat;
var activeSelectBoxMonth;
var activeSelectBoxYear;
var activeSelectBoxHour;
var activeSelectBoxMinute;

var iframeObj = false;
//// fix for EI frame problem on time dropdowns 09/30/2006
var iframeObj2 = false;
function EIS_FIX_EI1(where2fixit) {
    if (!iframeObj2) return;
    iframeObj2.style.display = 'block';
    iframeObj2.style.height = document.getElementById(where2fixit).offsetHeight + 1;
    iframeObj2.style.width = document.getElementById(where2fixit).offsetWidth;
    iframeObj2.style.left = getleftPos_scroll(document.getElementById(where2fixit)) + 1 - calendar_offsetLeft;
    iframeObj2.style.top = getTopPos_scroll(document.getElementById(where2fixit)) - document.getElementById(where2fixit).offsetHeight - calendar_offsetTop;
}

function EIS_Hide_Frame()
{ if (iframeObj2) iframeObj2.style.display = 'none'; }
//// fix for EI frame problem on time dropdowns 09/30/2006
var returnDateToYear;
var returnDateToMonth;
var returnDateToDay;
var returnDateToHour;
var returnDateToMinute;

var inputYear;
var inputMonth;
var inputDay;
var inputHour;
var inputMinute;
var calendarDisplayTime = false;

var selectBoxHighlightColor = '#D60808'; // Highlight color of select boxes
var selectBoxRolloverBgColor = '#a1caea'; // Background color on drop down lists(rollover)

var selectBoxMovementInProgress = false;
var activeSelectBox = false;

function cancelCalendarEvent() {
    return false;
}
function isLeapYear(inputYear) {
    if (inputYear % 400 == 0 || (inputYear % 4 == 0 && inputYear % 100 != 0)) return true;
    return false;

}
var activeSelectBoxMonth = false;
var activeSelectBoxDirection = false;

function highlightMonthYear() {
    if (activeSelectBoxMonth) activeSelectBoxMonth.className = '';
    activeSelectBox = this;


    if (this.className == 'monthYearActive') {
        this.className = '';
    } else {
        this.className = 'monthYearActive';
        activeSelectBoxMonth = this;
    }

    if (this.innerHTML.indexOf('-') >= 0 || this.innerHTML.indexOf('+') >= 0) {
        if (this.className == 'monthYearActive')
            selectBoxMovementInProgress = true;
        else
            selectBoxMovementInProgress = false;
        if (this.innerHTML.indexOf('-') >= 0) activeSelectBoxDirection = -1; else activeSelectBoxDirection = 1;

    } else selectBoxMovementInProgress = false;

}

function showMonthDropDown() {

    if (document.getElementById('monthDropDown').style.display == 'block') {
        document.getElementById('monthDropDown').style.display = 'none';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        EIS_Hide_Frame();
    } else {
        document.getElementById('monthDropDown').style.display = 'block';
        document.getElementById('yearDropDown').style.display = 'none';
        document.getElementById('hourDropDown').style.display = 'none';
        document.getElementById('minuteDropDown').style.display = 'none';
        if (MSIE)
        { EIS_FIX_EI1('monthDropDown') }
        //// fix for EI frame problem on time dropdowns 09/30/2006

    }
}

function showYearDropDown() {
    if (document.getElementById('yearDropDown').style.display == 'block') {
        document.getElementById('yearDropDown').style.display = 'none';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        EIS_Hide_Frame();
    } else {
        document.getElementById('yearDropDown').style.display = 'block';
        document.getElementById('monthDropDown').style.display = 'none';
        document.getElementById('hourDropDown').style.display = 'none';
        document.getElementById('minuteDropDown').style.display = 'none';
        if (MSIE)
        { EIS_FIX_EI1('yearDropDown') }
        //// fix for EI frame problem on time dropdowns 09/30/2006

    }

}
function showHourDropDown() {
    if (document.getElementById('hourDropDown').style.display == 'block') {
        document.getElementById('hourDropDown').style.display = 'none';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        EIS_Hide_Frame();
    } else {
        document.getElementById('hourDropDown').style.display = 'block';
        document.getElementById('monthDropDown').style.display = 'none';
        document.getElementById('yearDropDown').style.display = 'none';
        document.getElementById('minuteDropDown').style.display = 'none';
        if (MSIE)
        { EIS_FIX_EI1('hourDropDown') }
        //// fix for EI frame problem on time dropdowns 09/30/2006
    }

}
function showMinuteDropDown() {
    if (document.getElementById('minuteDropDown').style.display == 'block') {
        document.getElementById('minuteDropDown').style.display = 'none';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        EIS_Hide_Frame();
    } else {
        document.getElementById('minuteDropDown').style.display = 'block';
        document.getElementById('monthDropDown').style.display = 'none';
        document.getElementById('yearDropDown').style.display = 'none';
        document.getElementById('hourDropDown').style.display = 'none';
        if (MSIE)
        { EIS_FIX_EI1('minuteDropDown') }
        //// fix for EI frame problem on time dropdowns 09/30/2006
    }

}

function selectMonth() {
    document.getElementById('calendar_month_txt').innerHTML = this.innerHTML
    currentMonth = this.id.replace(/[^\d]/g, '');

    document.getElementById('monthDropDown').style.display = 'none';
    //// fix for EI frame problem on time dropdowns 09/30/2006
    EIS_Hide_Frame();
    for (var no = 0; no < monthArray.length; no++) {
        document.getElementById('monthDiv_' + no).style.color = '';
    }
    this.style.color = selectBoxHighlightColor;
    activeSelectBoxMonth = this;
    writeCalendarContent();

}

function selectHour() {
    document.getElementById('calendar_hour_txt').innerHTML = this.innerHTML
    currentHour = this.innerHTML.replace(/[^\d]/g, '');
    document.getElementById('hourDropDown').style.display = 'none';
    //// fix for EI frame problem on time dropdowns 09/30/2006
    EIS_Hide_Frame();
    if (activeSelectBoxHour) {
        activeSelectBoxHour.style.color = '';
    }
    activeSelectBoxHour = this;
    this.style.color = selectBoxHighlightColor;
}

function selectMinute() {
    document.getElementById('calendar_minute_txt').innerHTML = this.innerHTML
    currentMinute = this.innerHTML.replace(/[^\d]/g, '');
    document.getElementById('minuteDropDown').style.display = 'none';
    //// fix for EI frame problem on time dropdowns 09/30/2006
    EIS_Hide_Frame();
    if (activeSelectBoxMinute) {
        activeSelectBoxMinute.style.color = '';
    }
    activeSelectBoxMinute = this;
    this.style.color = selectBoxHighlightColor;
}


function selectYear() {
    document.getElementById('calendar_year_txt').innerHTML = this.innerHTML
    currentYear = this.innerHTML.replace(/[^\d]/g, '');
    document.getElementById('yearDropDown').style.display = 'none';
    //// fix for EI frame problem on time dropdowns 09/30/2006
    EIS_Hide_Frame();
    if (activeSelectBoxYear) {
        activeSelectBoxYear.style.color = '';
    }
    activeSelectBoxYear = this;
    this.style.color = selectBoxHighlightColor;
    writeCalendarContent();

}

function switchMonth() {
    if (this.src.indexOf('left') >= 0) {
        currentMonth = currentMonth - 1; ;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear = currentYear - 1;
        }
    } else {
        currentMonth = currentMonth + 1; ;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear = currentYear / 1 + 1;
        }
    }

    writeCalendarContent();


}

function createMonthDiv() {
    var div = document.createElement('DIV');
    div.className = 'monthYearPicker';
    div.id = 'monthPicker';

    for (var no = 0; no < monthArray.length; no++) {
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = monthArray[no];
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = highlightMonthYear;
        subDiv.onclick = selectMonth;
        subDiv.id = 'monthDiv_' + no;
        subDiv.style.width = '95%';
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
        if (currentMonth && currentMonth == no) {
            subDiv.style.color = selectBoxHighlightColor;
            activeSelectBoxMonth = subDiv;
        }
    }
    return div;

}

function changeSelectBoxYear(e, inputObj) {
    if (!inputObj) inputObj = this;
    var yearItems = inputObj.parentNode.getElementsByTagName('DIV');
    if (inputObj.innerHTML.indexOf('-') >= 0) {
        var startYear = yearItems[1].innerHTML / 1 - 1;
        if (activeSelectBoxYear) {
            activeSelectBoxYear.style.color = '';
        }
    } else {
        var startYear = yearItems[1].innerHTML / 1 + 1;
        if (activeSelectBoxYear) {
            activeSelectBoxYear.style.color = '';

        }
    }

    for (var no = 1; no < yearItems.length - 1; no++) {
        yearItems[no].innerHTML = startYear + no - 1;
        yearItems[no].id = 'yearDiv' + (startYear / 1 + no / 1 - 1);

    }
    if (activeSelectBoxYear) {
        activeSelectBoxYear.style.color = '';
        if (document.getElementById('yearDiv' + currentYear)) {
            activeSelectBoxYear = document.getElementById('yearDiv' + currentYear);
            activeSelectBoxYear.style.color = selectBoxHighlightColor; ;
        }
    }
}
function changeSelectBoxHour(e, inputObj) {
    if (!inputObj) inputObj = this;

    var hourItems = inputObj.parentNode.getElementsByTagName('DIV');
    if (inputObj.innerHTML.indexOf('-') >= 0) {
        var startHour = hourItems[1].innerHTML / 1 - 1;
        if (startHour < 0) startHour = 0;
        if (activeSelectBoxHour) {
            activeSelectBoxHour.style.color = '';
        }
    } else {
        var startHour = hourItems[1].innerHTML / 1 + 1;
        if (startHour > 14) startHour = 14;
        if (activeSelectBoxHour) {
            activeSelectBoxHour.style.color = '';

        }
    }
    var prefix = '';
    for (var no = 1; no < hourItems.length - 1; no++) {
        if ((startHour / 1 + no / 1) < 11) prefix = '0'; else prefix = '';
        hourItems[no].innerHTML = prefix + (startHour + no - 1);

        hourItems[no].id = 'hourDiv' + (startHour / 1 + no / 1 - 1);

    }
    if (activeSelectBoxHour) {
        activeSelectBoxHour.style.color = '';
        if (document.getElementById('hourDiv' + currentHour)) {
            activeSelectBoxHour = document.getElementById('hourDiv' + currentHour);
            activeSelectBoxHour.style.color = selectBoxHighlightColor; ;
        }
    }
}

function updateYearDiv() {
    var yearSpan = 5;
    if (turnOffYearSpan) {
        yearSpan = 0;
    }
    var div = document.getElementById('yearDropDown');
    var yearItems = div.getElementsByTagName('DIV');
    for (var no = 1; no < yearItems.length - 1; no++) {
        yearItems[no].innerHTML = currentYear / 1 - yearSpan + no;
        if (currentYear == (currentYear / 1 - yearSpan + no)) {
            yearItems[no].style.color = selectBoxHighlightColor;
            activeSelectBoxYear = yearItems[no];
        } else {
            yearItems[no].style.color = '';
        }
    }
}

function updateMonthDiv() {
    for (no = 0; no < 12; no++) {
        document.getElementById('monthDiv_' + no).style.color = '';
    }
    document.getElementById('monthDiv_' + currentMonth).style.color = selectBoxHighlightColor;
    activeSelectBoxMonth = document.getElementById('monthDiv_' + currentMonth);
}


function updateHourDiv() {
    var div = document.getElementById('hourDropDown');
    var hourItems = div.getElementsByTagName('DIV');

    var addHours = 0;
    if ((currentHour / 1 - 6 + 1) < 0) {
        addHours = (currentHour / 1 - 6 + 1) * -1;
    }
    for (var no = 1; no < hourItems.length - 1; no++) {
        var prefix = '';
        if ((currentHour / 1 - 6 + no + addHours) < 10) prefix = '0';
        hourItems[no].innerHTML = prefix + (currentHour / 1 - 6 + no + addHours);
        if (currentHour == (currentHour / 1 - 6 + no)) {
            hourItems[no].style.color = selectBoxHighlightColor;
            activeSelectBoxHour = hourItems[no];
        } else {
            hourItems[no].style.color = '';
        }
    }
}

function updateMinuteDiv() {
    for (no = 0; no < 60; no += intervalSelectBox_minutes) {
        var prefix = '';
        if (no < 10) prefix = '0';

        document.getElementById('minuteDiv_' + prefix + no).style.color = '';
    }
    if (document.getElementById('minuteDiv_' + currentMinute)) {
        document.getElementById('minuteDiv_' + currentMinute).style.color = selectBoxHighlightColor;
        activeSelectBoxMinute = document.getElementById('minuteDiv_' + currentMinute);
    }
}



function createYearDiv() {

    if (!document.getElementById('yearDropDown')) {
        var div = document.createElement('DIV');
        div.className = 'monthYearPicker';
    } else {
        var div = document.getElementById('yearDropDown');
        var subDivs = div.getElementsByTagName('DIV');
        for (var no = 0; no < subDivs.length; no++) {
            subDivs[no].parentNode.removeChild(subDivs[no]);
        }
    }


    var d = new Date();
    if (currentYear) {
        d.setFullYear(currentYear);
    }

    var startYear = d.getFullYear() / 1 - 5;

    var yearSpan = 10;
    if (!turnOffYearSpan) {
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = '&nbsp;&nbsp;- ';
        subDiv.onclick = changeSelectBoxYear;
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = function() { selectBoxMovementInProgress = false; };
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
    } else {
        startYear = d.getFullYear() / 1 - 0;
        yearSpan = 2;
    }

    for (var no = startYear; no < (startYear + yearSpan); no++) {
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = no;
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = highlightMonthYear;
        subDiv.onclick = selectYear;
        subDiv.id = 'yearDiv' + no;
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
        if (currentYear && currentYear == no) {
            subDiv.style.color = selectBoxHighlightColor;
            activeSelectBoxYear = subDiv;
        }
    }
    if (!turnOffYearSpan) {
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = '&nbsp;&nbsp;+ ';
        subDiv.onclick = changeSelectBoxYear;
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = function() { selectBoxMovementInProgress = false; };
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
    }
    return div;
}

/* This function creates the hour div at the bottom bar */

function slideCalendarSelectBox() {
    if (selectBoxMovementInProgress) {
        if (activeSelectBox.parentNode.id == 'hourDropDown') {
            changeSelectBoxHour(false, activeSelectBox);
        }
        if (activeSelectBox.parentNode.id == 'yearDropDown') {
            changeSelectBoxYear(false, activeSelectBox);
        }

    }
    setTimeout('slideCalendarSelectBox()', speedOfSelectBoxSliding);

}

function createHourDiv() {
    if (!document.getElementById('hourDropDown')) {
        var div = document.createElement('DIV');
        div.className = 'monthYearPicker';
    } else {
        var div = document.getElementById('hourDropDown');
        var subDivs = div.getElementsByTagName('DIV');
        for (var no = 0; no < subDivs.length; no++) {
            subDivs[no].parentNode.removeChild(subDivs[no]);
        }
    }

    if (!currentHour) currentHour = 0;
    var startHour = currentHour / 1;
    if (startHour > 14) startHour = 14;

    var subDiv = document.createElement('DIV');
    subDiv.innerHTML = '&nbsp;&nbsp;- ';
    subDiv.onclick = changeSelectBoxHour;
    subDiv.onmouseover = highlightMonthYear;
    subDiv.onmouseout = function() { selectBoxMovementInProgress = false; };
    subDiv.onselectstart = cancelCalendarEvent;
    div.appendChild(subDiv);

    for (var no = startHour; no < startHour + 10; no++) {
        var prefix = '';
        if (no / 1 < 10) prefix = '0';
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = prefix + no;
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = highlightMonthYear;
        subDiv.onclick = selectHour;
        subDiv.id = 'hourDiv' + no;
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
        if (currentYear && currentYear == no) {
            subDiv.style.color = selectBoxHighlightColor;
            activeSelectBoxYear = subDiv;
        }
    }
    var subDiv = document.createElement('DIV');
    subDiv.innerHTML = '&nbsp;&nbsp;+ ';
    subDiv.onclick = changeSelectBoxHour;
    subDiv.onmouseover = highlightMonthYear;
    subDiv.onmouseout = function() { selectBoxMovementInProgress = false; };
    subDiv.onselectstart = cancelCalendarEvent;
    div.appendChild(subDiv);

    return div;
}
/* This function creates the minute div at the bottom bar */

function createMinuteDiv() {
    if (!document.getElementById('minuteDropDown')) {
        var div = document.createElement('DIV');
        div.className = 'monthYearPicker';
    } else {
        var div = document.getElementById('minuteDropDown');
        var subDivs = div.getElementsByTagName('DIV');
        for (var no = 0; no < subDivs.length; no++) {
            subDivs[no].parentNode.removeChild(subDivs[no]);
        }
    }
    var startMinute = 0;
    var prefix = '';
    for (var no = startMinute; no < 60; no += intervalSelectBox_minutes) {

        if (no < 10) prefix = '0'; else prefix = '';
        var subDiv = document.createElement('DIV');
        subDiv.innerHTML = prefix + no;
        subDiv.onmouseover = highlightMonthYear;
        subDiv.onmouseout = highlightMonthYear;
        subDiv.onclick = selectMinute;
        subDiv.id = 'minuteDiv_' + prefix + no;
        subDiv.onselectstart = cancelCalendarEvent;
        div.appendChild(subDiv);
        if (currentYear && currentYear == no) {
            subDiv.style.color = selectBoxHighlightColor;
            activeSelectBoxYear = subDiv;
        }
    }
    return div;
}

function highlightSelect() {

    if (this.className == 'selectBoxTime') {
        this.className = 'selectBoxTimeOver';
        this.getElementsByTagName('IMG')[0].src = pathToImages + 'down_time_over.gif';
    } else if (this.className == 'selectBoxTimeOver') {
        this.className = 'selectBoxTime';
        this.getElementsByTagName('IMG')[0].src = pathToImages + 'down_time.gif';
    }

    if (this.className == 'selectBox') {
        this.className = 'selectBoxOver';
        this.getElementsByTagName('IMG')[0].src = pathToImages + 'down.png'; //'down_over.png';
    } else if (this.className == 'selectBoxOver') {
        this.className = 'selectBox';
        this.getElementsByTagName('IMG')[0].src = pathToImages + 'down.png';
    }

}

function highlightArrow() {
    if (this.src.indexOf('over') >= 0) {
        if (this.src.indexOf('left') >= 0) this.src = pathToImages + 'left.png';
        if (this.src.indexOf('right') >= 0) this.src = pathToImages + 'right.png';
    } else {
        if (this.src.indexOf('left') >= 0) this.src = pathToImages + 'left.png'; //'left_over.gif';
        if (this.src.indexOf('right') >= 0) this.src = pathToImages + 'right.png'; //'right_over.gif';
    }
}

function highlightClose() {
    if (this.src.indexOf('over') >= 0) {
        this.src = pathToImages + 'close.gif';
    } else {
        this.src = pathToImages + 'close.gif'; //'close_over.gif';
    }

}

function closeCalendar() {

    document.getElementById('yearDropDown').style.display = 'none';
    document.getElementById('monthDropDown').style.display = 'none';
    document.getElementById('hourDropDown').style.display = 'none';
    document.getElementById('minuteDropDown').style.display = 'none';

    calendarDiv.style.display = 'none';
    if (iframeObj) {
        iframeObj.style.display = 'none';
        //// //// fix for EI frame problem on time dropdowns 09/30/2006
        EIS_Hide_Frame();
    }
    if (activeSelectBoxMonth) activeSelectBoxMonth.className = '';
    if (activeSelectBoxYear) activeSelectBoxYear.className = '';


}

function writeTopBar() {

    var topBar = document.createElement('DIV');
    topBar.className = 'topBar';
    topBar.id = 'topBar';
    calTopBar.appendChild(topBar);


    // Left arrow
    var leftDiv = document.createElement('DIV');
    leftDiv.style.marginRight = '1px';
    var img = document.createElement('IMG');
    img.src = pathToImages + 'left.png';
    img.onmouseover = highlightArrow;
    img.onclick = switchMonth;
    img.onmouseout = highlightArrow;
    leftDiv.appendChild(img);
    topBar.appendChild(leftDiv);
    if (Opera) leftDiv.style.width = '16px';

    // Right arrow
    var rightDiv = document.createElement('DIV');
    rightDiv.style.marginRight = '1px';
    var img = document.createElement('IMG');
    img.src = pathToImages + 'right.png';
    img.onclick = switchMonth;
    img.onmouseover = highlightArrow;
    img.onmouseout = highlightArrow;
    rightDiv.appendChild(img);
    if (Opera) rightDiv.style.width = '16px';
    topBar.appendChild(rightDiv);

    var split = document.createElement('DIV');
    split.innerHTML = '&nbsp;'
    topBar.appendChild(split);

    // Month selector
    var monthDiv = document.createElement('DIV');
    monthDiv.id = 'monthSelect';
    monthDiv.onmouseover = highlightSelect;
    monthDiv.onmouseout = highlightSelect;
    monthDiv.onclick = showMonthDropDown;
    var span = document.createElement('SPAN');
    span.innerHTML = monthArray[currentMonth];
    span.id = 'calendar_month_txt';
    monthDiv.appendChild(span);

    var img = document.createElement('IMG');
    img.src = pathToImages + 'down.png';
    img.style.position = 'absolute';
    img.style.right = '0px';
    monthDiv.appendChild(img);
    monthDiv.className = 'selectBox';
    if (Opera) {
        img.style.cssText = 'float:right;position:relative';
        img.style.position = 'relative';
        img.style.styleFloat = 'right';
    }
    topBar.appendChild(monthDiv);

    var monthPicker = createMonthDiv();
    calendarDiv.appendChild(monthPicker);
    monthPicker.style.left = Math.abs(monthDiv.offsetLeft) + 'px'; //getleftPos_scroll(monthDiv) + 'px'; 
    monthPicker.style.top = monthDiv.offsetTop + monthDiv.offsetHeight + 1 + 'px';
    monthPicker.style.width = monthDiv.offsetWidth + 'px';
    monthPicker.id = 'monthDropDown';


    // Year selector
    var yearDiv = document.createElement('DIV');
    yearDiv.onmouseover = highlightSelect;
    yearDiv.onmouseout = highlightSelect;
    yearDiv.onclick = showYearDropDown;
    var span = document.createElement('SPAN');
    span.innerHTML = currentYear;
    span.id = 'calendar_year_txt';
    yearDiv.appendChild(span);
    topBar.appendChild(yearDiv);

    var img = document.createElement('IMG');
    img.src = pathToImages + 'down.png';
    yearDiv.appendChild(img);
    yearDiv.className = 'selectBox';

    if (Opera) {
        yearDiv.style.width = '50px';
        img.style.cssText = 'float:right';
        img.style.position = 'relative';
        img.style.styleFloat = 'right';
    }

    var yearPicker = createYearDiv();
    yearPicker.style.left = Math.abs(yearDiv.offsetLeft) + 'px';
    yearPicker.style.top = monthDiv.offsetTop + monthDiv.offsetHeight + 1 + 'px';
    yearPicker.style.width = yearDiv.offsetWidth + 'px'; //'35px';
    yearPicker.id = 'yearDropDown';
    calendarDiv.appendChild(yearPicker);


    var img = document.createElement('IMG');
    img.src = pathToImages + 'close.gif';
    img.style.styleFloat = 'right';
    img.onmouseover = highlightClose;
    img.onmouseout = highlightClose;
    img.onclick = closeCalendar;
    topBar.appendChild(img);
    if (!document.all) {
        img.style.position = 'absolute';
        img.style.right = '15px';
    }



}

function writeCalendarContent() {
    var calendarContentDivExists = true;
    if (!calendarContentDiv) {
        calendarContentDiv = document.createElement('DIV');
        calContentBar.style.padding = '0px';
        calContentBar.appendChild(calendarContentDiv);
        calendarContentDivExists = false;
    }
    currentMonth = currentMonth / 1;
    var d = new Date();

    d.setFullYear(currentYear);
    d.setDate(1);
    d.setMonth(currentMonth);

    var dayStartOfMonth = d.getDay() + 1;
    if (!weekStartsOnSunday) {
        if (dayStartOfMonth == 0) dayStartOfMonth = 7;
        dayStartOfMonth--;
    }

    document.getElementById('calendar_year_txt').innerHTML = currentYear;
    document.getElementById('calendar_month_txt').innerHTML = monthArray[currentMonth];
    document.getElementById('calendar_hour_txt').innerHTML = currentHour;
    document.getElementById('calendar_minute_txt').innerHTML = currentMinute;

    var existingTable = calendarContentDiv.getElementsByTagName('TABLE');
    if (existingTable.length > 0) {
        calendarContentDiv.removeChild(existingTable[0]);
    }

    var calTable = document.createElement('TABLE');
    calTable.width = '100%';
    calTable.cellSpacing = '0';
    calTable.cellPadding = '0';
    calendarContentDiv.appendChild(calTable);




    var calTBody = document.createElement('TBODY');

    calTable.appendChild(calTBody);

    var row = calTBody.insertRow(-1);
    row.className = 'calendar_week_row';
    if (showWeekNumber) {
        var cell = row.insertCell(-1);
        cell.innerHTML = weekString;
        cell.className = 'clsWeek';
    }

    for (var no = 0; no < dayArray.length; no++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = dayArray[no];
    }

    var row = calTBody.insertRow(-1);

    if (showWeekNumber) {
        var cell = row.insertCell(-1);
        cell.className = 'clsWeek';
        var week = getWeek(currentYear, currentMonth, 1);
        cell.innerHTML = week; 	// Week
    }
    for (var no = 0; no < dayStartOfMonth; no++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = '&nbsp;';
    }

    var colCounter = dayStartOfMonth;
    var daysInMonth = daysInMonthArray[currentMonth];
    if (daysInMonth == 28) {
        if (isLeapYear(currentYear)) daysInMonth = 29;
    }

    for (var no = 1; no <= daysInMonth; no++) {
        d.setDate(no - 1);
        if (colCounter > 0 && colCounter % 7 == 0) {
            var row = calTBody.insertRow(-1);
            if (showWeekNumber) {
                var cell = row.insertCell(-1);
                cell.className = 'clsWeek';
                var week = getWeek(currentYear, currentMonth, no);
                cell.innerHTML = week; 	// Week
            }
        }
        var cell = row.insertCell(-1);
        if (currentYear == inputYear && currentMonth == inputMonth && no == inputDay) {
            cell.className = 'activeDay';
        }
        cell.innerHTML = no;
        cell.onclick = pickDate;
        colCounter++;
    }


    if (!document.all) {
        if (calendarContentDiv.offsetHeight)
            document.getElementById('topBar').style.top = calendarContentDiv.offsetHeight + document.getElementById('timeBar').offsetHeight + document.getElementById('topBar').offsetHeight - 1 + 'px';
        else {
            document.getElementById('topBar').style.top = '';
            document.getElementById('topBar').style.bottom = '0px';
        }

    }

    if (iframeObj) {
        if (!calendarContentDivExists) setTimeout('resizeIframe()', 350); else setTimeout('resizeIframe()', 10);
    }




}

function resizeIframe() {
    iframeObj.style.width = calendarDiv.offsetWidth + 'px';
    iframeObj.style.height = calendarDiv.offsetHeight + 'px';


}

function pickTodaysDate() 
{
    var d = new Date();
    currentMonth = d.getMonth();
    currentYear = d.getFullYear();
    pickDate(false, d.getDate());

}

//Event Handler that is invoke when date is select form Date popup control and set in the textbox
function pickDate(e, inputDay) {
    var month = currentMonth / 1 + 1;
    var monthStr = "";
    var islangEnglish = (languageCode == "en");
    switch(month)
    {
        case 1:
            monthStr = islangEnglish ? "Jan" : new String("\u064A\u0646\u0627\u064A\u0631");
            break;
            
        case 2:
            monthStr = islangEnglish ? "Feb" : new String("\u0641\u0628\u0631\u0627\u064A\u0631");
            break;
            
        case 3:
            monthStr = islangEnglish ? "Mar" : new String("\u0645\u0627\u0631\u0633");
            break;
            
        case 4:
            monthStr = islangEnglish ? "Apr" : new String("\u0627\u0628\u0631\u064A\u0644");;
            break;
            
        case 5:
            monthStr = islangEnglish ? "May" : new String("\u0645\u0627\u064A\u0648");;
            break;
            
        case 6:
            monthStr = islangEnglish ? "Jun" : new String("\u064A\u0648\u0646\u064A\u0648");;
            break;
            
        case 7:
            monthStr = islangEnglish ? "Jul" : new String("\u064A\u0648\u0644\u064A\u0648");;
            break;
            
        case 8:
            monthStr = islangEnglish ? "Aug" :new String("\u0627\u063A\u0633\u0637\u0633");;
            break;
            
        case 9:
            monthStr = islangEnglish ? "Sep" :new String("\u0633\u0628\u062A\u0645\u0628\u0631");;
            break;
            
        case 10:
            monthStr = islangEnglish ? "Oct" : new String("\u0627\u0643\u062A\u0648\u0628\u0631");
            break;
            
        case 11:
            monthStr = islangEnglish ? "Nov" : new String("\u0646\u0648\u0641\u0645\u0628\u0631");
            break;
            
        case 12:
            monthStr = islangEnglish ? "Dec" : new String("\u062F\u064A\u0633\u0645\u0628\u0631");
            break;            
    }
    if (month < 10) month = '0' + month;
    var day;
    if (!inputDay && this) day = this.innerHTML; else day = inputDay;
    if (day / 1 < 10) day = '0' + day;
    if (returnFormat) {
        returnFormat = returnFormat.replace('dd', day);
        returnFormat = returnFormat.replace('mm', month);
        returnFormat = returnFormat.replace('yyyy', currentYear);
        returnFormat = returnFormat.replace('hh', currentHour);
        returnFormat = returnFormat.replace('ii', currentMinute);
        returnFormat = returnFormat.replace('d', day / 1);
        returnFormat = returnFormat.replace('m', month / 1);
        returnFormat = returnFormat.replace('MMM', monthStr);
             
        returnDateTo.value = returnFormat;
        returnDateTo.focus();
        try {
            returnDateTo.onchange();
        } catch (e) {

        }
    } else {
        for (var no = 0; no < returnDateToYear.options.length; no++) {
            if (returnDateToYear.options[no].value == currentYear) {
                returnDateToYear.selectedIndex = no;
                break;
            }
        }
        for (var no = 0; no < returnDateToMonth.options.length; no++) {
            if (returnDateToMonth.options[no].value == parseInt(month)) {
                returnDateToMonth.selectedIndex = no;
                break;
            }
        }
        for (var no = 0; no < returnDateToDay.options.length; no++) {
            if (returnDateToDay.options[no].value == parseInt(day)) {
                returnDateToDay.selectedIndex = no;
                break;
            }
        }
        if (calendarDisplayTime) {
            for (var no = 0; no < returnDateToHour.options.length; no++) {
                if (returnDateToHour.options[no].value == parseInt(currentHour)) {
                    returnDateToHour.selectedIndex = no;
                    break;
                }
            }
            for (var no = 0; no < returnDateToMinute.options.length; no++) {
                if (returnDateToMinute.options[no].value == parseInt(currentMinute)) {
                    returnDateToMinute.selectedIndex = no;
                    break;
                }
            }
        }
    }
    closeCalendar();

}

// This function is from http://www.codeproject.com/csharp/gregorianwknum.asp
// Only changed the month add
function getWeek(year, month, day) {
    if (!weekStartsOnSunday) {
        day = (day / 1);
    } else {
        day = (day / 1) + 1;
    }
    year = year / 1;
    month = month / 1 + 1; //use 1-12
    var a = Math.floor((14 - (month)) / 12);
    var y = year + 4800 - a;
    var m = (month) + (12 * a) - 3;
    var jd = day + Math.floor(((153 * m) + 2) / 5) +
                 (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) +
                 Math.floor(y / 400) - 32045;      // (gregorian calendar)
    var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
    var L = Math.floor(d4 / 1460);
    var d1 = ((d4 - L) % 365) + L;
    NumberOfWeek = Math.floor(d1 / 7) + 1;
    return NumberOfWeek;
}

function writeTimeBar() {
    var timeBar = document.createElement('DIV');
    timeBar.id = 'timeBar';
    timeBar.className = 'timeBar';

    var subDiv = document.createElement('DIV');
    subDiv.innerHTML = 'Time:';
    //timeBar.appendChild(subDiv);

    // Year selector
    var hourDiv = document.createElement('DIV');
    hourDiv.onmouseover = highlightSelect;
    hourDiv.onmouseout = highlightSelect;
    hourDiv.onclick = showHourDropDown;
    hourDiv.style.width = '30px';
    var span = document.createElement('SPAN');
    span.innerHTML = currentHour;
    span.id = 'calendar_hour_txt';
    hourDiv.appendChild(span);
    timeBar.appendChild(hourDiv);

    var img = document.createElement('IMG');
    img.src = pathToImages + 'down_time.gif';
    hourDiv.appendChild(img);
    hourDiv.className = 'selectBoxTime';

    if (Opera) {
        hourDiv.style.width = '30px';
        img.style.cssText = 'float:right';
        img.style.position = 'relative';
        img.style.styleFloat = 'right';
    }

    var hourPicker = createHourDiv();
    hourPicker.style.left = '130px';
    //hourPicker.style.top = monthDiv.offsetTop + monthDiv.offsetHeight + 1 + 'px';
    hourPicker.style.width = '35px';
    hourPicker.id = 'hourDropDown';
    calendarDiv.appendChild(hourPicker);

    // Add Minute picker

    // Year selector
    var minuteDiv = document.createElement('DIV');
    minuteDiv.onmouseover = highlightSelect;
    minuteDiv.onmouseout = highlightSelect;
    minuteDiv.onclick = showMinuteDropDown;
    minuteDiv.style.width = '30px';
    var span = document.createElement('SPAN');
    span.innerHTML = currentMinute;

    span.id = 'calendar_minute_txt';
    minuteDiv.appendChild(span);
    timeBar.appendChild(minuteDiv);

    var img = document.createElement('IMG');
    img.src = pathToImages + 'down_time.gif';
    minuteDiv.appendChild(img);
    minuteDiv.className = 'selectBoxTime';

    if (Opera) {
        minuteDiv.style.width = '30px';
        img.style.cssText = 'float:right';
        img.style.position = 'relative';
        img.style.styleFloat = 'right';
    }

    var minutePicker = createMinuteDiv();
    minutePicker.style.left = '167px';
    //minutePicker.style.top = monthDiv.offsetTop + monthDiv.offsetHeight + 1 + 'px';
    minutePicker.style.width = '35px';
    minutePicker.id = 'minuteDropDown';
    calendarDiv.appendChild(minutePicker);


    return timeBar;

}

function writeBottomBar() {
    var d = new Date();
    var bottomBar = document.createElement('DIV');

    bottomBar.id = 'bottomBar';

    bottomBar.style.cursor = 'pointer';
    bottomBar.className = 'todaysDate';
    // var todayStringFormat = '[todayString] [dayString] [day] [monthString] [year]';	;;

    var subDiv = document.createElement('DIV');
    subDiv.onclick = pickTodaysDate;
    subDiv.id = 'todaysDateString';
    subDiv.style.width = (calendarDiv.offsetWidth - 95) + 'px';
    var day = d.getDay();
    if (!weekStartsOnSunday) {
        if (day == 0) day = 7;
        day--;
    }
    var curMonth = d.getMonth() + 1;
    if (curMonth <= 9)
        curMonth = new String("0" + curMonth);
    var bottomString = todayString + " : " + todayStringFormat;
    bottomString = bottomString.replace('[monthString]', monthArrayShort[d.getMonth()]);
    bottomString = bottomString.replace('[day]', d.getDate());
    bottomString = bottomString.replace('[year]', d.getFullYear());
    bottomString = bottomString.replace('[dayString]', dayArray[day].toLowerCase());
    bottomString = bottomString.replace('[UCFdayString]', dayArray[day]);
    bottomString = bottomString.replace('[todayString]', todayString);
    bottomString = bottomString.replace('[month]', curMonth);

    subDiv.innerHTML = todayString + ': ' + d.getDate() + '. ' + monthArrayShort[d.getMonth()] + ', ' + d.getFullYear();
    subDiv.innerHTML = bottomString;
    bottomBar.appendChild(subDiv);

    var timeDiv = writeTimeBar();
    bottomBar.appendChild(timeDiv);
    calBottomBar.style.verticalAlign = 'top';
    calBottomBar.appendChild(bottomBar);



}
function getTopPos(inputObj) {

    var returnValue = inputObj.offsetTop + inputObj.offsetHeight;
    while ((inputObj = inputObj.offsetParent) != null) {
        returnValue += inputObj.offsetTop - inputObj.scrollTop;
    }
    return returnValue + calendar_offsetTop;
}

function getleftPos(inputObj) {
    var returnValue = inputObj.offsetLeft;
    while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetLeft - inputObj.scrollLeft;
    return returnValue + calendar_offsetLeft;
}
function getTopPos_scroll(inputObj) {

    var returnValue = inputObj.offsetTop + inputObj.offsetHeight;
    while ((inputObj = inputObj.offsetParent) != null) {
        returnValue += inputObj.offsetTop;
    }
    return returnValue + calendar_offsetTop;
}
function getleftPos_scroll(inputObj) {
    var returnValue = inputObj.offsetLeft;
    while ((inputObj = inputObj.offsetParent) != null) {
        returnValue += inputObj.offsetLeft;
    }
    return returnValue + calendar_offsetLeft;
}

function positionCalendar(inputObj) {
    var leftAdj = 0;
    calendarDiv.style.display = 'block';
    if (languageCode == 'ar')
        leftAdj = inputObj.offsetWidth - calendarDiv.offsetWidth;
    calendarDiv.style.left = (getleftPos(inputObj) + leftAdj) + 'px';
    calendarDiv.style.top = getTopPos_scroll(inputObj) + 'px';
    if (iframeObj) {
        iframeObj.style.left = calendarDiv.style.left;
        iframeObj.style.top = calendarDiv.style.top;
        //// fix for EI frame problem on time dropdowns 09/30/2006
        iframeObj2.style.left = calendarDiv.style.left;
        iframeObj2.style.top = calendarDiv.style.top;
    }
}

function initCalendar() {
    if (MSIE) {
        iframeObj = document.createElement('IFRAME');
        iframeObj.style.filter = 'alpha(opacity=0)';
        iframeObj.style.position = 'absolute';
        iframeObj.border = '0px';
        iframeObj.style.border = '0px';
        iframeObj.style.backgroundColor = '#FF0000';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        iframeObj2 = document.createElement('IFRAME');
        iframeObj2.style.position = 'absolute';
        iframeObj2.border = '0px';
        iframeObj2.style.border = '0px';
        iframeObj2.style.height = '1px';
        iframeObj2.style.width = '1px';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        // Added fixed for HTTPS
        iframeObj2.src = 'blank.html';
        iframeObj.src = 'blank.html';
        document.body.appendChild(iframeObj2);  // gfb move this down AFTER the .src is set
        document.body.appendChild(iframeObj);
    }

    calendarDiv = document.createElement('DIV');
    calendarDiv.id = 'calendarDiv';
    calendarDiv.style.zIndex = 1000;
    slideCalendarSelectBox();

    document.body.appendChild(calendarDiv);
    var table = document.createElement('TABLE');
    table.cellPadding = '0px';
    table.cellSpacing = '0px';
    table.style.width = '100%';
    //table.border = '1px';
    var row1 = table.insertRow(0);
    var cell11 = row1.insertCell(0);
    cell11.innerHTML = '&nbsp;';
    cell11.className = 'clsTopLeft';
    calTopBar = row1.insertCell(1);
    calTopBar.className = 'clsTop';
    var cell13 = row1.insertCell(2);
    cell13.innerHTML = '&nbsp;';
    cell13.className = 'clsTopRight';

    var row2 = table.insertRow(1);
    calContentBar = row2.insertCell(0);
    calContentBar.colSpan = '2';
    var cell23 = row2.insertCell(1);
    cell23.innerHTML = '&nbsp;';
    cell23.className = 'clsRight';


    var row3 = table.insertRow(2);
    var cell31 = row3.insertCell(0);
    cell31.innerHTML = '&nbsp;';
    cell31.className = 'clsBottomLeft';
    calBottomBar = row3.insertCell(1);
    calBottomBar.className = 'clsBottom';
    //calBottomBar.style.border = '1px solid red';
    var cell33 = row3.insertCell(2);
    cell33.innerHTML = '&nbsp;';
    cell33.className = 'clsBottomRight';

    calendarDiv.appendChild(table);




    writeBottomBar();
    writeTopBar();



    if (!currentYear) {
        var d = new Date();
        currentMonth = d.getMonth();
        currentYear = d.getFullYear();
    }
    writeCalendarContent();



}

function setTimeProperties() {
    if (!calendarDisplayTime) {
        document.getElementById('timeBar').style.display = 'none';
        document.getElementById('timeBar').style.visibility = 'hidden';
        document.getElementById('todaysDateString').style.width = '100%';


    } else {
        document.getElementById('timeBar').style.display = 'block';
        document.getElementById('timeBar').style.visibility = 'visible';
        document.getElementById('hourDropDown').style.top = document.getElementById('calendar_minute_txt').parentNode.offsetHeight + calendarContentDiv.offsetHeight + document.getElementById('topBar').offsetHeight + 'px';
        document.getElementById('minuteDropDown').style.top = document.getElementById('calendar_minute_txt').parentNode.offsetHeight + calendarContentDiv.offsetHeight + document.getElementById('topBar').offsetHeight + 'px';
        document.getElementById('minuteDropDown').style.right = '50px';
        document.getElementById('hourDropDown').style.right = '50px';
        document.getElementById('todaysDateString').style.width = '115px';
    }
}

function calendarSortItems(a, b) {
    return a / 1 - b / 1;
}

//This method is calling when the dates are compared during validation of the page
function getMonth(a)
{
 switch(a)
 {
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
    case '\u0627\u063A\u0633\u0637\u0633':
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
    case '\u0627\u0643\u062A\u0648\u0628\u0631':
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

function getMonthStr(a,lang)
{
if (lang == "en-US")
{
 switch(a)
 {
    case 1:
    return 'Jan';
    
    case 2:
    return 'Feb';
    
    case 3:
    return 'Mar';
    
    case 4:
    return 'Apr';
    
    case 5:
    return 'May';
    
    case 6:
    return 'Jun';
    
    case 7:
    return 'Jul';
    
    case 8:
    return 'Aug';
    
    case 9:
    return 'Sep';
    
    case 10:
    return 'Oct';
    
    case 11:
    return 'Nov';
    
    case 12:
    return 'Dec';
        
 }
 }
 else
 {
  switch(a)
 {
    case 1:
    return '\u064A\u0646\u0627\u064A\u0631';
        
    case 2:
    return '\u0641\u0628\u0631\u0627\u064A\u0631';

    case 3:
    return '\u0645\u0627\u0631\u0633';

    case 4:
    return '\u0627\u0628\u0631\u064A\u0644';

    case 5:
    return '\u0645\u0627\u064A\u0648';

    case 6:
    return '\u064A\u0648\u0646\u064A\u0648';

    case 7:
    return '\u064A\u0648\u0644\u064A\u0648';

    case 8:
    return '\u0627\u063A\u0633\u0637\u0633';

    case 9:
    return '\u0633\u0628\u062A\u0645\u0628\u0631';

    case 10:
    return '\u0627\u0643\u062A\u0648\u0628\u0631';

    case 11:
    return '\u0646\u0648\u0641\u0645\u0628\u0631';
        
    case 12:
    return '\u062F\u064A\u0633\u0645\u0628\u0631';
 }
 }
 
 return a;
}


function displayCalendar(inputField, format, buttonObj, displayTime, timeInput) {
    if (displayTime) calendarDisplayTime = true; else calendarDisplayTime = false;
    //if (!isValidFormat(inputField.value)) inputField.value = '';
//    if (inputField.value.length > 0) {
//        if (!format.match(/^[0-9a-zA-Z]*?$/gi)) {
//            var items = inputField.value.split(/[^0-9a-zA-Z]/gi);
//            var positionArray = new Array();
//            positionArray['m'] = format.indexOf('mm');
//            if (positionArray['m'] == -1) positionArray['m'] = format.indexOf('m');
//            if (positionArray['m'] == -1) positionArray['m'] = format.indexOf('MMM');
//            positionArray['d'] = format.indexOf('dd');
//            if (positionArray['d'] == -1) positionArray['d'] = format.indexOf('d');
//            positionArray['y'] = format.indexOf('yyyy');
//            positionArray['h'] = format.indexOf('hh');
//            positionArray['i'] = format.indexOf('ii');

//            var positionArrayNumeric = Array();
//            positionArrayNumeric[0] = positionArray['m'];
//            positionArrayNumeric[1] = positionArray['d'];
//            positionArrayNumeric[2] = positionArray['y'];
//            positionArrayNumeric[3] = positionArray['h'];
//            positionArrayNumeric[4] = positionArray['i'];

//            positionArrayNumeric = positionArrayNumeric.sort(calendarSortItems);
//            var itemIndex = -1;
//            currentHour = '00';
//            currentMinute = '00';
//            for (var no = 0; no < positionArrayNumeric.length; no++) {
//                if (positionArrayNumeric[no] == -1) continue;
//                itemIndex++;
//                if (positionArrayNumeric[no] == positionArray['m']) {
//                    currentMonth = (IsNumeric(items[itemIndex])?  items[itemIndex]: getMonth(items[itemIndex])) - 1;
//                    continue;
//                }
//                if (positionArrayNumeric[no] == positionArray['y']) {
//                    currentYear = items[itemIndex];
//                    continue;
//                }
//                if (positionArrayNumeric[no] == positionArray['d']) {
//                    tmpDay = items[itemIndex];
//                    continue;
//                }
//                if (positionArrayNumeric[no] == positionArray['h']) {
//                    currentHour = items[itemIndex];
//                    continue;
//                }
//                if (positionArrayNumeric[no] == positionArray['i']) {
//                    currentMinute = items[itemIndex];
//                    continue;
//                }
//            }

//            currentMonth = currentMonth / 1;
//            tmpDay = tmpDay / 1;
//        } else {
//            var monthPos = format.indexOf('mm');
//            currentMonth = inputField.value.substr(monthPos, 2) / 1 - 1;
//            var yearPos = format.indexOf('yyyy');
//            currentYear = inputField.value.substr(yearPos, 4);
//            var dayPos = format.indexOf('dd');
//            tmpDay = inputField.value.substr(dayPos, 2);

//            var hourPos = format.indexOf('hh');
//            if (hourPos >= 0) {
//                tmpHour = inputField.value.substr(hourPos, 2);
//                currentHour = tmpHour;
//            } else {
//                currentHour = '00';
//            }
//            var minutePos = format.indexOf('ii');
//            if (minutePos >= 0) {
//                tmpMinute = inputField.value.substr(minutePos, 2);
//                currentMinute = tmpMinute;
//            } else {
//                currentMinute = '00';
//            }
//        }
//    } else {
        var d = new Date();
        currentMonth = d.getMonth();
        currentYear = d.getFullYear();
        currentHour = '08';
        currentMinute = '00';
        tmpDay = d.getDate();
//    }

    inputYear = currentYear;
    inputMonth = currentMonth;
    inputDay = tmpDay / 1;


    if (!calendarDiv) {
        initCalendar();
    } else {
        if (calendarDiv.style.display == 'block') {
            closeCalendar();
            return false;
        }
        writeCalendarContent();
    }



    returnFormat = format;
    returnDateTo = inputField;
    if (calendarPosition == 0)
        positionCalendar(buttonObj);
    else
        positionCalendar(inputField);
    calendarDiv.style.visibility = 'visible';
    calendarDiv.style.display = 'block';
    if (iframeObj) {
        iframeObj.style.display = '';
        iframeObj.style.height = '140px';
        iframeObj.style.width = '195px';
        iframeObj2.style.display = '';
        iframeObj2.style.height = '140px';
        iframeObj2.style.width = '195px';
    }

    setTimeProperties();
    updateYearDiv();
    updateMonthDiv();
    updateMinuteDiv();
    updateHourDiv();
    
}

function displayCalendarSelectBox(yearInput, monthInput, dayInput, hourInput, minuteInput, buttonObj) {
    if (!hourInput) calendarDisplayTime = false; else calendarDisplayTime = true;

    currentMonth = monthInput.options[monthInput.selectedIndex].value / 1 - 1;
    currentYear = yearInput.options[yearInput.selectedIndex].value;
    if (hourInput) {
        currentHour = hourInput.options[hourInput.selectedIndex].value;
        inputHour = currentHour / 1;
    }
    if (minuteInput) {
        currentMinute = minuteInput.options[minuteInput.selectedIndex].value;
        inputMinute = currentMinute / 1;
    }

    inputYear = yearInput.options[yearInput.selectedIndex].value;
    inputMonth = monthInput.options[monthInput.selectedIndex].value / 1 - 1;
    inputDay = dayInput.options[dayInput.selectedIndex].value / 1;

    if (!calendarDiv) {
        initCalendar();
    } else {
        writeCalendarContent();
    }



    returnDateToYear = yearInput;
    returnDateToMonth = monthInput;
    returnDateToDay = dayInput;
    returnDateToHour = hourInput;
    returnDateToMinute = minuteInput;




    returnFormat = false;
    returnDateTo = false;
    positionCalendar(buttonObj);
    calendarDiv.style.visibility = 'visible';
    calendarDiv.style.display = 'block';
    if (iframeObj) {
        iframeObj.style.display = '';
        iframeObj.style.height = calendarDiv.offsetHeight + 'px';
        iframeObj.style.width = calendarDiv.offsetWidth + 'px';
        //// fix for EI frame problem on time dropdowns 09/30/2006
        iframeObj2.style.display = '';
        iframeObj2.style.height = calendarDiv.offsetHeight + 'px';
        iframeObj2.style.width = calendarDiv.offsetWidth + 'px'
    }
    setTimeProperties();
    updateYearDiv();
    updateMonthDiv();
    updateHourDiv();
    updateMinuteDiv();

}

function isValidFormat(input) {
    var tokens = input.split('/');
    var months_31 = new Array();
    months_31[0] = 1;
    months_31[1] = 3;
    months_31[2] = 5;
    months_31[3] = 7;
    months_31[4] = 8;
    months_31[5] = 10;
    months_31[6] = 12;
    var days = 30;

    if (tokens.length != 3 || isNaN(tokens[0]) || isNaN(tokens[1]) || isNaN(tokens[2]))
        return false;
    for (var i = 0; i < months_31.length; i++) {
        if (months_31[i] == tokens[1]) days = 31;
    }
    if (((tokens[2] % 400 == 0) || (tokens[2] % 4 == 0 && tokens[2] % 100 != 0)) && tokens[1] == 2)
        days = 29;
    else if (tokens[1] == 2)
        days = 28;

    if (tokens[0] > days || tokens[0] <= 0 || tokens[1] > 12 || tokens[1] <= 0 || tokens[2] > 2100 || tokens[2] < 1900)
        return false;

    return true;
}

function showCalendar() {
    var obj = document.getElementById(arguments[0]);
    if (obj.id == "ctl00_ContentPlaceHolder1_dtFromDate" || obj.id == "ctl00_ContentPlaceHolder1_dtToDate")
        SetImagesPath(relativeImageUrl("calendar/"));

    if (arguments.length > 2)
        setLanguageCode(arguments[2]);
    else {
        var htmls = document.getElementsByTagName("html");
        if (htmls.length != 0 && htmls[0].lang != null && htmls[0].lang != undefined && htmls[0].lang.length == 2) {
            setLanguageCode(htmls[0].lang);
        } else if (htmls.length != 0 && htmls[0].dir.toLowerCase() == 'rtl') {
            setLanguageCode('ar');
        }
    }
    displayCalendar(obj, dateFormat, arguments[1]);
}

function setLanguageCode(code) {
    languageCode = code;
    initLocale();
}
function setLocale(code) {
    setLanguageCode(code);
}
function ShowScriptCalendar(txtCalendarId, imgId) {
    if (document.getElementById(txtCalendarId).disabled == 'disabled' 
        || document.getElementById(txtCalendarId).disabled == true)
        return;
    showCalendar(txtCalendarId, imgId);
}
function SetImagesPath(strPath) {
    pathToImages = strPath;
}


function makeValidDate(e, lang) {
    var dateReg = new RegExp(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/);
    var data = document.getElementById(e).value;
    if (dateReg.test(data))
    {
        var tokens = data.split("-");
        var day = tokens[0];
        var month = tokens[1];
        var year = tokens[2];
        var imonth = parseInt(month,10);
        document.getElementById(e).value = day + '-' + getMonthStr(imonth, lang) + '-' + year;
        return;
    }
    

    // Alif with Hamza is not a valid date, and gives error when .Net API parses it on server side.
    // Replace it with plain Alif (without Hamza)

    if (data.indexOf("أبريل") >= 0) {
        document.getElementById(e).value = data.replace("أبريل", "ابريل");
    }
    else if (data.indexOf("أغسطس") >= 0) {
        document.getElementById(e).value = data.replace("أغسطس", "اغسطس");
    }
    else if (data.indexOf("ٲكتوبر") >= 0) {
        document.getElementById(e).value = data.replace("ٲكتوبر", "اكتوبر");
    }
}

function makeValidDateAcc(e, lang) {
    var dateReg = new RegExp(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/);
    var data = e.value;

    if (data.indexOf("أبريل") >= 0) {
        e.value = data.replace("أبريل", "ابريل");
        return;
    }
    else if (data.indexOf("أغسطس") >= 0) {
        e.value = data.replace("أغسطس", "اغسطس");
        return;
    }
    else if (data.indexOf("أكتوبر") >= 0) {
        e.value = data.replace("أكتوبر", "اكتوبر");
        return;
    }

    if (dateReg.test(data))
    {
        var tokens = data.split("-");
        var day = tokens[0];
        var month = tokens[1];
        var year = tokens[2];
        var imonth = parseInt(month,10);
        document.getElementById(e).value = day + '-' + getMonthStr(imonth, lang) + '-' + year;
        return;
    }
}


function makeValidDateAccompany(ctrlDateVal, lang) {
    var current_date = new Date();
    var ctrlDateValID = ctrlDateVal.id;
    var ctrlDateValValue = new Date();
    ctrlDateValValue = ctrlDateVal.value;

    if (ctrlDateValValue.indexOf("أبريل") >= 0) {
        ctrlDateValValue.replace("أبريل", "ابريل");
        document.getElementById(ctrlDateValID).value = ctrlDateValValue;
    }
    else if (ctrlDateValValue.indexOf("ٲغسطس") >= 0) {
        ctrlDateValValue.replace("أغسطس", "اغسطس");
        document.getElementById(ctrlDateValID).value = ctrlDateValValue;

    }
    else if (ctrlDateValValue.indexOf("ٲكتوبر") >= 0) {
        ctrlDateValValue.replace("ٲكتوبر", "اكتوبر");
        document.getElementById(ctrlDateValID).value = ctrlDateValValue;
    }
}

String.prototype.toProperCase = function() {

    //return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

    return this.toLowerCase().replace(/^(.)|\s(.)/g,
      function($1) { return $1.toUpperCase(); });
}


//===========================================================================// Provides a Dictionary object for client-side java scripts//===========================================================================
function Lookup(key) 
{  
    return(this[key]);
}

function Delete() 
{  
    for (c=0; c < Delete.arguments.length; c++)   
    {    
        this[Delete.arguments[c]] = null;  
    }  
    
    // Adjust the keys (not terribly efficient)  
    var keys = new Array();
    
    for (var i=0; i<this.Keys.length; i++)  
    {    
        if(this[this.Keys[i]] != null)      
            keys[keys.length] = this.Keys[i];  
    }  
    
    this.Keys = keys;
}
    
function Add() 
{  
    for (c=0; c < Add.arguments.length; c+=2)   
    {    
        // Add the property    
        this[Add.arguments[c]] = Add.arguments[c+1];
        // And add it to the keys array
        this.Keys[this.Keys.length] = Add.arguments[c];
    }
}

function Dictionary() {
    this.Add = Add;
    this.Lookup = Lookup;
    this.Delete = Delete;
    this.Keys = new Array();
}