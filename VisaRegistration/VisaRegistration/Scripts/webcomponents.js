var EIDAWebComponentName = "EIDAWebComponent";
var EIDAWebComponent = null;
var RemoteSM_Address = "http://localhost:8080/RemoteSecureMessagingService/JsonSMServlet";
var publicData;
function ReadPublicData(sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation)
{
	try
	{
		//PublicDataWebComponent = document.getElementById(PublicDataWebComponentName);
		if(EIDAWebComponent == null)
		{		   
		    alert("The Webcomponent is not initialized.");		 
			return;
		}
	
		var Ret = EIDAWebComponent.ReadPublicData(sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation);
		return Ret;
	}
	catch(e)
	{
	    alert('Please Enable Java Plugin in browser.'); return;
		//return "An exception occured when reading public data."+e;
	}
}

function ReadPublicDataEx(sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation,
		sReadV2Fields, sReadSignatureImage, sReadAddress)
{
	//try
	//{
		//PublicDataWebComponent = document.getElementById(PublicDataWebComponentName);
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return;
		}
		
		
		//var Ret = EIDAWebComponent.ReadPublicData(sRefresh, "false", "true", "true", "false");
		var Ret = EIDAWebComponent.ReadPublicDataEx(sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation,
				sReadV2Fields, sReadSignatureImage, sReadAddress);
				
		return Ret;
	//}
	//catch(e)
	//{
	//	return "An exception occured when reading public data."+e;
	//}
}

function ReadFamilyBookData(sReadAddress)
{
	//try
	//{
		//PublicDataWebComponent = document.getElementById(PublicDataWebComponentName);
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized. read family book data");
			return;
		}
		
		
		//var Ret = EIDAWebComponent.ReadPublicData(sRefresh, "false", "true", "true", "false");
		var Ret = EIDAWebComponent.ReadFamilyBookData(sReadAddress);
				
		return Ret;
	//}
	//catch(e)
	//{
	//	return "An exception occured when reading public data."+e;
	//}
}
function ReadPublicDataContactlessWithMRZData(MRZData, sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation, sReadV2Fields, sReadSignatureImage, sReadAddress) {
    if (EIDAWebComponent == null) {
        alert("The Webcomponent is not initialized.");
        return;

    }

    var Ret = EIDAWebComponent.ReadPublicDataContactlessWithMRZData(MRZData, sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation, sReadV2Fields, sReadSignatureImage, sReadAddress);

    return Ret;
}

function ReadPublicDataContactless(CardNumber, DateOfBirth, ExpiryDate, sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation, sReadV2Fields, sReadSignatureImage, sReadAddress) {
    if (EIDAWebComponent == null) {
        alert("The Webcomponent is not initialized.");
        return;
    }

    var Ret = EIDAWebComponent.ReadPublicDataContactless(CardNumber, DateOfBirth, ExpiryDate, sRefresh, sReadPhotography, sReadNonModifiableData, sReadModifiableData, sSignatureValidation, sReadV2Fields, sReadSignatureImage, sReadAddress);

    return Ret;
}


function GetCardSerialNumber(){return EIDAWebComponent.GetCardSerialNumber();}

function GetArabicFullName()
{
	var value = EIDAWebComponent.GetArabicFullName();
	return RemoveCommas(value);
}

///////////////////////
function GetCardSerialNumber(){return EIDAWebComponent.GetCardSerialNumber();}

function GetPhotography_DataSigned(){return EIDAWebComponent.GetPhotography_DataSigned();}
function GetCardHolderData_SF3_DataSigned(){return EIDAWebComponent.GetCardHolderData_SF3_DataSigned();}
function GetCardHolderData_SF5_DataSigned(){return EIDAWebComponent.GetCardHolderData_SF5_DataSigned();}

// Signature used for data validation
function GetPhotography_Signature(){return EIDAWebComponent.GetPhotography_Signature();}
function GetCardHolderData_SF3_Signature(){return EIDAWebComponent.GetCardHolderData_SF3_Signature();}
function GetCardHolderData_SF5_Signature(){return EIDAWebComponent.GetCardHolderData_SF5_Signature();}

// Attributes of the SF 1
function GetIDNumber(){return EIDAWebComponent.GetIDNumber();}
function GetCardNumber(){return EIDAWebComponent.GetCardNumber();}

// Attributes of the SF 2
function GetPhotography(){return EIDAWebComponent.GetPhotography();}

// Attributes of the SF 3
function GetIDType(){return EIDAWebComponent.GetIDType();}
function GetIssueDate(){return EIDAWebComponent.GetIssueDate();}
function GetExpiryDate(){return EIDAWebComponent.GetExpiryDate();}
function GetArabicTitle(){return EIDAWebComponent.GetArabicTitle();}
function GetArabicFullName()
{
	var value = EIDAWebComponent.GetArabicFullName();
	return RemoveCommas(value);
}
function GetTitle(){return EIDAWebComponent.GetTitle();}

function RemoveCommas(value)
{
	if(value==",,")
		return "";

	var fns = value.split(",");

	value = "";
	for(j=0; j<fns.length; j++)
	{
		if(fns[j]=="")
			continue;

		if(value!="")
			value = value + " ";

		value = value + fns[j];
	}

	return value;
}

function GetFullName()
{
	var fullname = EIDAWebComponent.GetFullName();

	return RemoveCommas(fullname);
}

function GetSex()
{

	var sex = EIDAWebComponent.GetSex();
	if(sex == 'M')
		return "Male";
	if(sex == 'F')
		return "Female";
	if(sex == 'X')
		return "Unknown";
}
function GetArabicNationality(){return EIDAWebComponent.GetArabicNationality();}
function GetNationality(){return EIDAWebComponent.GetNationality();}
function GetDateOfBirth(){return EIDAWebComponent.GetDateOfBirth();}
function GetArabicMotherFirstName()
{
	var value = EIDAWebComponent.GetArabicMotherFirstName();
	return RemoveCommas(value);
}

function GetMotherFirstName(){return EIDAWebComponent.GetMotherFirstName();}

// Attributes of the SF 5
function GetOccupation()
{
	var occupation = EIDAWebComponent.GetOccupation();
	return GetOccupationDisplayName(parseInt(occupation));
}
function GetMaritalStatus()
{
	var MaritalStatuses = new Array("", "Single", "Married", "Divorced", "Widowed");
	var maritalStatus = EIDAWebComponent.GetMaritalStatus();

	return MaritalStatuses[parseInt(maritalStatus)];
}
function GetFamilyID(){return EIDAWebComponent.GetFamilyID();}
function GetHusbandIDN(){return EIDAWebComponent.GetHusbandIDN();}
function GetSponsorType()
{
	var SponsorTypes = new Array("Parent", "Spoose", "", "", "Sheikh", "UAE Citizen", "Resident", "GCC Sponsor", "Diplomatic", "Company", "Federal Government", "Local Government", "Assimilated Government", "Heritance", "", "", "", "", "Other Sponsor type");
	var sponsorType = EIDAWebComponent.GetSponsorType();
	return SponsorTypes[parseInt(sponsorType)+3];

}
function GetSponsorNumber()
{
	return EIDAWebComponent.GetSponsorNumber();
}
function GetSponsorName(){return EIDAWebComponent.GetSponsorName();}
function GetResidencyType()
{
	var ResidencyTypes = new Array("", "", "Work", "Resident", "Diplomatic", "", "", "Service");
	var residencyType = EIDAWebComponent.GetResidencyType();
	return ResidencyTypes[parseInt(residencyType)];
}
function GetResidencyNumber(){return EIDAWebComponent.GetResidencyNumber();}
function GetResidencyExpiryDate(){return EIDAWebComponent.GetResidencyExpiryDate();}

// Attributes of the SF 6
function GetMOIRootCertificate(){return EIDAWebComponent.GetMOIRootCertificate();}
//////////////////////


function GetOccupationCode() { return EIDAWebComponent.GetOccupationCode(); }

function GetOccupationEnglish()
{
	return EIDAWebComponent.GetOccupationEnglish();
}

function GetOccupationArabic()
{
	return EIDAWebComponent.GetOccupationArabic();
}

function GetOccupationField()
{
	return EIDAWebComponent.GetOccupationField();
}

function GetPlaceOfBirth()
{
	return EIDAWebComponent.GetPlaceOfBirth();
}

function GetPlaceOfBirth_Ar()
{
	return EIDAWebComponent.GetPlaceOfBirth_Ar();
}

function GetOccupationType()
{
	return EIDAWebComponent.GetOccupationType();
}

function GetOccupationType_Ar()
{
	return EIDAWebComponent.GetOccupationType_Ar();
}

function GetCompanyName()
{
	return EIDAWebComponent.GetCompanyName();
}

function GetCompanyName_Ar()
{
	return EIDAWebComponent.GetCompanyName_Ar();
}

function GetPassportNumber()
{
	return EIDAWebComponent.GetPassportNumber();
}

function GetPassportType()
{
	return EIDAWebComponent.GetPassportType();
}

function GetPassportIssueDate()
{
	return EIDAWebComponent.GetPassportIssueDate();
}

function GetPassportExpiryDate()
{
	return EIDAWebComponent.GetPassportExpiryDate();
}

function GetPassportCountry()
{
	return EIDAWebComponent.GetPassportCountry();
}

function GetPassportCountryDesc()
{
	return EIDAWebComponent.GetPassportCountryDesc();
}

function GetPassportCountryDesc_Ar()
{
	return EIDAWebComponent.GetPassportCountryDesc_Ar();
}

function GetSponsorUnifiedNumber()
{
	return EIDAWebComponent.GetSponsorUnifiedNumber();
}

function GetMotherFullName()
{
	return EIDAWebComponent.GetMotherFullName();
}

function GetMotherFullName_Ar()
{
	return EIDAWebComponent.GetMotherFullName_Ar();
}

function GetDegreeDesc()
{
	return EIDAWebComponent.GetDegreeDesc();
}

function GetDegreeDesc_Ar()
{
	return EIDAWebComponent.GetDegreeDesc_Ar();
}

function GetFieldOfStudy_Code()
{
	return EIDAWebComponent.GetFieldOfStudy_Code()
}

function GetFieldOfStudy()
{
	return EIDAWebComponent.GetFieldOfStudy();
}

function GetFieldOfStudy_Ar()
{
	return EIDAWebComponent.GetFieldOfStudy_Ar()
}

function GetPlaceOfStudy()
{
	return EIDAWebComponent.GetPlaceOfStudy()
}

function GetPlaceOfStudy_Ar()
{
	return EIDAWebComponent.GetPlaceOfStudy_Ar();
}

function GetGraduationDate()
{
	return EIDAWebComponent.GetGraduationDate();
}

function GetQualificationLevel()
{
	return EIDAWebComponent.GetQualificationLevel();
}

function GetQualificationLevelDesc()
{
	return EIDAWebComponent.GetQualificationLevelDesc();
}

function GetQualificationLevelDesc_Ar()
{
	return EIDAWebComponent.GetQualificationLevelDesc_Ar()
}

function GetHolderSignatureImage()
{
	return EIDAWebComponent.GetHolderSignatureImage();
}

function GetHomeAddress_EmirateDesc()
{
	return EIDAWebComponent.GetHomeAddress_EmirateDesc();
}

function GetHomeAddress_EmirateDesc_Ar()
{
	return EIDAWebComponent.GetHomeAddress_EmirateDesc_Ar();
}

function GetHomeAddress_CityDesc()
{
	return EIDAWebComponent.GetHomeAddress_CityDesc();
}

function GetHomeAddress_CityDesc_Ar()
{
	return EIDAWebComponent.GetHomeAddress_CityDesc_Ar();
}

function GetHomeAddress_Street()
{
	return EIDAWebComponent.GetHomeAddress_Street();
}

function GetHomeAddress_Street_Ar()
{
	return EIDAWebComponent.GetHomeAddress_Street_Ar();
}

function GetHomeAddress_AreaDesc()
{
	return EIDAWebComponent.GetHomeAddress_AreaDesc();
}

function GetHomeAddress_AreaDesc_Ar()
{
	return EIDAWebComponent.GetHomeAddress_AreaDesc_Ar();
}

function GetHomeAddress_Building()
{
	return EIDAWebComponent.GetHomeAddress_Building();
}

function GetHomeAddress_Building_Ar()
{
	return EIDAWebComponent.GetHomeAddress_Building_Ar();
}

function GetHomeAddress_MobilePhoneNumber()
{
	return EIDAWebComponent.GetHomeAddress_MobilePhoneNumber();
}

function GetHomeAddress_ResidentPhoneNumber()
{
	return EIDAWebComponent.GetHomeAddress_ResidentPhoneNumber();
}

function GetHomeAddress_Email()
{
	return EIDAWebComponent.GetHomeAddress_Email();
}

function GetHomeAddress_AddressTypeCode()
{
	return EIDAWebComponent.GetHomeAddress_AddressTypeCode();
}

function GetHomeAddress_LocationCode()
{
	return EIDAWebComponent.GetHomeAddress_LocationCode();
}

function GetHomeAddress_EmirateCode()
{
	return EIDAWebComponent.GetHomeAddress_EmirateCode();
}

function GetHomeAddress_CityCode()
{
	return EIDAWebComponent.GetHomeAddress_CityCode();
}

function GetHomeAddress_POBox()
{
	return EIDAWebComponent.GetHomeAddress_POBox();
}

function GetHomeAddress_AreaCode()
{
	return EIDAWebComponent.GetHomeAddress_AreaCode();
}

function GetHomeAddress_FlatNumber()
{
	return EIDAWebComponent.GetHomeAddress_FlatNumber();
}

function GetWorkAddress_EmirateDesc()
{
	return EIDAWebComponent.GetWorkAddress_EmirateDesc();
}

function GetWorkAddress_EmirateDesc_Ar()
{
	return EIDAWebComponent.GetWorkAddress_EmirateDesc_Ar();
}

function GetWorkAddress_CityDesc()
{
	return EIDAWebComponent.GetWorkAddress_CityDesc();
}

function GetWorkAddress_CityDesc_Ar()
{
	return EIDAWebComponent.GetWorkAddress_CityDesc_Ar();
}

function GetWorkAddress_Street()
{
	return EIDAWebComponent.GetWorkAddress_Street();
}

function GetWorkAddress_Street_Ar()
{
	return EIDAWebComponent.GetWorkAddress_Street_Ar();
}

function GetWorkAddress_AreaDesc()
{
	return EIDAWebComponent.GetWorkAddress_AreaDesc();
}

function GetWorkAddress_AreaDesc_Ar()
{
	return EIDAWebComponent.GetWorkAddress_AreaDesc_Ar();
}

function GetWorkAddress_Building()
{
	return EIDAWebComponent.GetWorkAddress_Building();
}

function GetWorkAddress_Building_Ar()
{
	return EIDAWebComponent.GetWorkAddress_Building_Ar();
}

function GetWorkAddress_MobilePhoneNumber()
{
	return EIDAWebComponent.GetWorkAddress_MobilePhoneNumber();
}

function GetWorkAddress_LandPhoneNumber()
{
	return EIDAWebComponent.GetWorkAddress_LandPhoneNumber();
}

function GetWorkAddress_Email()
{
	return EIDAWebComponent.GetWorkAddress_Email();
}

function GetWorkAddress_AddressTypeCode()
{
	return EIDAWebComponent.GetWorkAddress_AddressTypeCode();
}

function GetWorkAddress_LocationCode()
{
	return EIDAWebComponent.GetWorkAddress_LocationCode();
}

function GetWorkAddress_EmirateCode()
{
	return EIDAWebComponent.GetWorkAddress_EmirateCode();
}

function GetWorkAddress_CityCode()
{
	return EIDAWebComponent.GetWorkAddress_CityCode();
}

function GetWorkAddress_POBox()
{
	return EIDAWebComponent.GetWorkAddress_POBox();
}

function GetWorkAddress_AreaCode()
{
	return EIDAWebComponent.GetWorkAddress_AreaCode();
}

function GetWorkAddress_CompanyName()
{
	return EIDAWebComponent.GetWorkAddress_CompanyName();
}

function GetWorkAddress_CompanyName_Ar()
{
	return EIDAWebComponent.GetWorkAddress_CompanyName_Ar();
}


// FamilyBook getters

function GetFamilyHead_IDN() 
{ return EIDAWebComponent.GetFamilyHead_IDN(); }

function GetFamilyHead_FamilyID() 
{ return EIDAWebComponent.GetFamilyHead_FamilyID(); }

function GetFamilyHead_EmirateName() 
{ return EIDAWebComponent.GetFamilyHead_EmirateName(); }

function GetFamilyHead_EmirateName_Ar() 
{ return EIDAWebComponent.GetFamilyHead_EmirateName_Ar(); }

function GetFamilyHead_FirstName()
{ return EIDAWebComponent.GetFamilyHead_FirstName(); }

function GetFamilyHead_FirstName_Ar() 
{ return EIDAWebComponent.GetFamilyHead_FirstName_Ar(); }

function GetFamilyHead_FatherName()
{ return EIDAWebComponent.GetFamilyHead_FatherName(); }

function GetFamilyHead_FatherName_Ar()
{ return EIDAWebComponent.GetFamilyHead_FatherName_Ar(); }

function GetFamilyHead_GrandFatherName()
{ return EIDAWebComponent.GetFamilyHead_GrandFatherName(); }

function GetFamilyHead_GrandFatherName_Ar()
{ return EIDAWebComponent.GetFamilyHead_GrandFatherName_Ar(); }

function GetFamilyHead_Tribe()
{ return EIDAWebComponent.GetFamilyHead_Tribe(); }

function GetFamilyHead_Tribe_Ar()
{ return EIDAWebComponent.GetFamilyHead_Tribe_Ar(); }

function GetFamilyHead_Clan()
{ return EIDAWebComponent.GetFamilyHead_Clan(); }

function GetFamilyHead_Clan_Ar()
{ return EIDAWebComponent.GetFamilyHead_Clan_Ar(); }

function GetFamilyHead_NationalityCode()
{ return EIDAWebComponent.GetFamilyHead_NationalityCode(); }

function GetFamilyHead_Nationality()
{ return EIDAWebComponent.GetFamilyHead_Nationality(); }

function GetFamilyHead_Nationality_Ar()
{ return EIDAWebComponent.GetFamilyHead_Nationality_Ar(); }

function GetFamilyHead_Sex()
{ return EIDAWebComponent.GetFamilyHead_Sex(); }

function GetFamilyHead_DateOfBirth()
{ return EIDAWebComponent.GetFamilyHead_DateOfBirth(); }

function GetFamilyHead_PlaceOfBirth()
{ return EIDAWebComponent.GetFamilyHead_PlaceOfBirth(); }

function GetFamilyHead_PlaceOfBirth_Ar()
{ return EIDAWebComponent.GetFamilyHead_PlaceOfBirth_Ar(); }

function GetFamilyHead_MotherFullName()
{ return EIDAWebComponent.GetFamilyHead_MotherFullName(); }

function GetFamilyHead_MotherFullName_Ar()
{ return EIDAWebComponent.GetFamilyHead_MotherFullName_Ar(); }


function GetWife_IDN(wifeIndex)
{
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_IDN(wifeIndex); 
}


function GetWife_FullName(wifeIndex)
{ 
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_FullName(wifeIndex); }

function GetWife_FullName_Ar(wifeIndex)
{ 
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_FullName_Ar(wifeIndex); }

function GetWife_NationalityCode(wifeIndex)
{ 
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_NationalityCode(wifeIndex); }

function GetWife_Nationality(wifeIndex)
{ 
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_Nationality(wifeIndex); }

function GetWife_Nationality_Ar(wifeIndex)
{ 
	if(wifeIndex == undefined)
		wifeIndex = 0;
	return EIDAWebComponent.GetWife_Nationality_Ar(wifeIndex); }

function GetChild_IDN(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_IDN(childIndex); }

function GetChild_FirstName(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_FirstName(childIndex); }

function GetChild_FirstName_Ar(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_FirstName_Ar(childIndex); }

function GetChild_Sex(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_Sex(childIndex); }

function GetChild_DateOfBirth(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_DateOfBirth(childIndex); }

function GetChild_PlaceOfBirth(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_PlaceOfBirth(childIndex); }

function GetChild_PlaceOfBirth_Ar(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_PlaceOfBirth_Ar(childIndex); }

function GetChild_MotherIDN(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_MotherIDN(childIndex); }

function GetChild_MotherFullName(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_MotherFullName(childIndex); }

function GetChild_MotherFullName_Ar(childIndex)
{ 
	if(childIndex == undefined)
		childIndex = 0;
	return EIDAWebComponent.GetChild_MotherFullName_Ar(childIndex); }


function StrEndsWithLabel(str)
{
	if(str==null || str==undefined)
	return false;

	return (str.match("_PDLabel$")=="_PDLabel");
}

function GetFunctionName(str)
{
	if(str==null || str==undefined)
	return "undefined";

	return "Get"+str.substring(0, str.length - "_PDLabel".length);
}

function Initialize() 
{
	try
	{
		EIDAWebComponent = document.getElementById(EIDAWebComponentName);
		
		var Ret = EIDAWebComponent.Initialize();

		console.log(Ret);
		if(Ret.startsWith("-"))
		{		   
			ProcessError(Ret);
			return "error";
		}
		else if(Ret != "")
		{
			alert(Ret);
		}
		else // no errors
		{
		    
		}
		
		return Ret;

	}
	catch(e)
	{
		return "Webcomponent Initialization Failed, Details: "+e;
	}
}

function Disconnect() 
{
	try
	{
	
		EIDAWebComponent = document.getElementById(EIDAWebComponentName);
		
		var Ret = EIDAWebComponent.Disconnect();
		//EIDAWebComponent = null;

		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			return "";
		}
		else if(Ret != "")
		{
			alert(Ret);
		}
		else // no errors
		{
		//	disableButtons(false);
		}
		
		return Ret;
	}
	catch(e)
	{
		return "Disconnect Failed, Details: "+e;
	}
}

function InitializeContactless() 
{
	try
	{
	
		EIDAWebComponent = document.getElementById(EIDAWebComponentName);
		
		var Ret = EIDAWebComponent.InitializeContactless();

		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			return "";
		}
		else if(Ret != "")
		{
			alert(Ret);
		}
		else // no errors
		{
			//disableButtons(false);
		}
		
		return Ret;
	}
	catch(e)
	{
		return "Webcomponent Initialization Failed, Details: "+e;
	}
}

function CheckCardGenuine()
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return;
		}
		
		//disableButtons(true, "Check Card Genuine ...");
		var Ret = EIDAWebComponent.CheckCardGenuine(RemoteSM_Address);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
			alert(Ret);
		}
		else
		{
			alert("The Card is genuine");
		}
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Check Card Genuine Failed, Details: "+e;
	}
}

function CheckCardGenuineEx()
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return;
		}
		
		//disableButtons(true, "Check Card Genuine (Ex)...");
		var Ret = EIDAWebComponent.CheckCardGenuineEx(RemoteSM_Address);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
			alert(Ret);
		}
		else
		{
			alert("The Card is genuine");
		}
	//	disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Check Card Genuine Failed, Details: "+e;
	}
}

function ResetPIN(PIN)
{
   //disableButtons(true, "PIN Reset  ...");
   try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "PIN Reset  ...");
		var Ret = EIDAWebComponent.PKIResetPIN(RemoteSM_Address,PIN);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
			alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "PIN Reset Failed ,Details: "+e;
	}
}

function ChangePIN (oldPIN,newPIN)
{
	//disableButtons(true, "PIN Change  ...");
   try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "PIN Change  ...");
		var Ret = EIDAWebComponent.PKIChangePIN(oldPIN, newPIN);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
			alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "PIN Change Failed ,Details: "+e;
	}
}

function DisplayPhotography()
{
	if(EIDAWebComponent == null)
	{
		alert("The Webcomponent is not initialized.");
		return;
	}

	try
	{
	//	disableButtons(true, "Reading Photography ...");
		
		var Ret = EIDAWebComponent.ReadPublicData("true", "true", "false", "false", "false");
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			flag = true;
		}
		else
		if(Ret != "")
		{
			alert(Ret);
		}
		
		//disableButtons(false);
		
	}
	catch(e)
	{
		alert("Can not load photography");
	}
	
}

function DisplayPublicData()
{
	if(EIDAWebComponent == null)
	{
		//alert("The Webcomponent is not initialized. display public data");
	   // return;
	}
    
	var flag = false;

	
	var Ret = ReadPublicData("true", "false", "true", "true", "false");	
	if(Ret.startsWith("-"))
	{
		ProcessError(Ret);
		flag = true;
	}
	else
	if(Ret != "")
	{
		alert(Ret);
	}

	if(flag)
	{
		return;
	}

	// public data fields array
	var items = ['IDType_PDLabel', 'IDNumber_PDLabel', 'CardNumber_PDLabel', 'IssueDate_PDLabel', 'ExpiryDate_PDLabel', 'Sex_PDLabel', 'DateOfBirth_PDLabel', 'ArabicFullName_PDLabel', 'FullName_PDLabel', 'Nationality_PDLabel', 'ArabicNationality_PDLabel', 'SponsorType_PDLabel', 'SponsorName_PDLabel', 'SponsorNumber_PDLabel', 'ResidencyType_PDLabel', 'ResidencyNumber_PDLabel', 'ResidencyExpiryDate_PDLabel', 'Occupation_PDLabel'];

    // JSON object text
	publicData = '{ "publicData" : [ {';
	for (i = 0; i < items.length; i++) {
	    if (StrEndsWithLabel(items[i])) {
	        try {
	            var v = eval(GetFunctionName(items[i]) + "()");
	            if (v == null || v == undefined || v.length == 0)
	                v = "--";

	            publicData += '"' + items[i] + '":"' + v + '",';
	            items[i].innerHTML = "<b>" + v + "</b>";
	        }
	        catch (e) {
	            alert(e);
	      
	        }
	    }
	}
	publicData += '"end":"end" } ] }';

    //Convert to JSON Object
	//objJson = JSON.stringify(publicData);

    //Convert to DOM Object
	objDom = JSON.parse(publicData);
	return objDom;
	
}

function DisplayPublicDataEx()
{
	if(EIDAWebComponent == null)
	{
		alert("The Webcomponent is not initialized.");
		return;
	}

	var flag = false;
	//disableButtons(true, "Reading Public Data ...");
	
	var Ret = ReadPublicDataEx("true", "false", "true", "true", "false", "true", "true", "true");
	if(Ret.startsWith("-"))
	{
		ProcessError(Ret);
		flag = true;
	}
	else
	if(Ret != "")
	{
		alert(Ret);
	}
	
	//disableButtons(false);

	if(flag)
	{
		return;
	}

	try {
	//	display holder signature image
	var imgSignature = document.getElementById("imgHolderSignature");
	var imageBase64 = GetHolderSignatureImage();
	//alert(imageBase64);
	
	if(imageBase64.length > 0) {
		imgSignature.src = "data:image/tiff;base64," + imageBase64;
		imgSignature.style.display = 'block';
	}
	} catch(e) {alert(e);}
	
    // displaying public data
	var items = ['IDType_PDLabel', 'IDNumber_PDLabel', 'CardNumber_PDLabel', 'IssueDate_PDLabel', 'ExpiryDate_PDLabel', 'Sex_PDLabel', 'DateOfBirth_PDLabel', 'ArabicFullName_PDLabel', 'FullName_PDLabel', 'Nationality_PDLabel', 'ArabicNationality_PDLabel', 'SponsorType_PDLabel', 'SponsorName_PDLabel', 'SponsorNumber_PDLabel', 'ResidencyType_PDLabel', 'ResidencyNumber_PDLabel', 'ResidencyExpiryDate_PDLabel', 'Occupation_PDLabel'];
	publicData = '{ "publicData" : [ {';
	for (i = 0; i < items.length; i++) {
	    if (StrEndsWithLabel(items[i])) {
	        try {
	            var v = eval(GetFunctionName(items[i]) + "()");
	            if (v == null || v == undefined || v.length == 0)
	                v = "--";

	            publicData += '"' + items[i] + '":"' + v + '",';
	            items[i].innerHTML = "<b>" + v + "</b>";
	        }
	        catch (e) {
	            alert(e);
	           
	        }
	    }
	}
	publicData += '"end":"end" } ] }';

    //Convert to JSON Object
    //objJson = JSON.stringify(publicData);

    //Convert to DOM Object
	objDom = JSON.parse(publicData);
	return objDom;
}

function DisplayFamilyBookData()
{
	if(EIDAWebComponent == null)
	{
		alert("The Webcomponent is not initialized.");
		return;
	}

	var flag = false;
	//disableButtons(true, "Reading FamilyBook Data ...");
	
	var Ret = ReadFamilyBookData(RemoteSM_Address);	
	if(Ret.startsWith("-"))
	{
		ProcessError(Ret);
		flag = true;
	}
	else
	if(Ret != "")
	{
		alert(Ret);
	}
	
	//disableButtons(false);

	if(flag)
	{
		return;
	}

	// displaying public data
	var items = document.getElementsByTagName("span");
	
	for(i=0; i<20; i++)
	{
		if(StrEndsWithLabel(items[i].getAttribute("id")) && items[i].getAttribute("id").startsWith("FamilyHead"))
		{
			try
			{
				var v = eval(GetFunctionName(items[i].getAttribute("id")) + "()");
				if(v == null || v == undefined || v.length == 0)
					v = "--";

				items[i].innerHTML = "<b>"+v+"</b>";
			}
			catch(e)
			{
				alert(e);
				items[i].innerHTML = "<b>--</b>";
			}
		}
	}
	
	DisplayChildData(0);
	DisplayWifeData(0);
	
}

function DisplayChildData(index)
{
	var items = document.getElementsByTagName("span");

	for(i=0; i<items.length; i++)
	{
		if(StrEndsWithLabel(items[i].getAttribute("id")) && items[i].getAttribute("id").startsWith("Child"))
		{
			try
			{
				var v = eval(GetFunctionName(items[i].getAttribute("id")) + "("+ index +")");
				if(v == null || v == undefined || v.length == 0)
					v = "--";

				items[i].innerHTML = "<b>"+v+"</b>";
			}
			catch(e)
			{
				alert(e);
				items[i].innerHTML = "<b>--</b>";
			}
		}
	}
}

function DisplayWifeData(index)
{
	var items = document.getElementsByTagName("span");

	for(i=0; i<items.length; i++)
	{
		if(StrEndsWithLabel(items[i].getAttribute("id")) && items[i].getAttribute("id").startsWith("Wife"))
		{
			try
			{
				var v = eval(GetFunctionName(items[i].getAttribute("id")) + "("+ index +")");
				if(v == null || v == undefined || v.length == 0)
					v = "--";

				items[i].innerHTML = "<b>"+v+"</b>";
			}
			catch(e)
			{
				alert(e);
				items[i].innerHTML = "<b>--</b>";
			}
		}
	}
}


function DisplayPublicDataContactlessWithMRZData(MRZData) {
    if (EIDAWebComponent == null) {
        alert("The Webcomponent is not initialized.");
        return;
    }

    var flag = false;
   // disableButtons(true, "Reading Public Data ...");

    var Ret = ReadPublicDataContactlessWithMRZData(MRZData, "true", "true", "true", "true", "true", "true", "true", "true");
    if (Ret.startsWith("-")) {
        ProcessError(Ret);
        flag = true;
    }
    else
        if (Ret != "") {
        alert(Ret);
    }

    //disableButtons(false);

    if (flag) {
        return;
    }
    
    try {
    	//	display holder signature image
    	var imgSignature = document.getElementById("imgHolderSignature");
    	var imageBase64 = GetHolderSignatureImage();
    	//alert(imageBase64);
    	
    	if(imageBase64.length > 0) {
    		imgSignature.src = "data:image/tiff;base64," + imageBase64;
    		imgSignature.style.display = 'block';
    	}
    	} catch(e) {alert(e);}

    // displaying public data
    var items = document.getElementsByTagName("span");

    for (i = 0; i < items.length; i++) {
        if (StrEndsWithLabel(items[i].getAttribute("id"))) {
            try {
                var v = eval(GetFunctionName(items[i].getAttribute("id")) + "()");
                if (v == null || v == undefined || v.length == 0)
                    v = "--";

                items[i].innerHTML = "<b>" + v + "</b>";
            }
            catch (e) {
                alert(e);
                items[i].innerHTML = "<b>--</b>";
            }
        }
    }

}

function DisplayPublicDataContactless(CardNumber, DateOfBirth, ExpiryDate) {
    if (EIDAWebComponent == null) {
        alert("The Webcomponent is not initialized.");
        return;
    }

    var flag = false;
  //  disableButtons(true, "Reading Public Data ...");

    var Ret = ReadPublicDataContactless(CardNumber, DateOfBirth, ExpiryDate, "true", "true", "true", "true", "true", "true", "true", "true");
    if (Ret.startsWith("-")) {
        ProcessError(Ret);
        flag = true;
    }
    else
        if (Ret != "") {
        alert(Ret);
    }

    //disableButtons(false);

    if (flag) {
        return;
    }
    
    try {
    	//	display holder signature image
    	var imgSignature = document.getElementById("imgHolderSignature");
    	var imageBase64 = GetHolderSignatureImage();
    	//alert(imageBase64);
    	
    	if(imageBase64.length > 0) {
    		imgSignature.src = "data:image/tiff;base64," + imageBase64;
    		imgSignature.style.display = 'block';
    	}
    	} catch(e) {alert(e);}

    // displaying public data
    var items = document.getElementsByTagName("span");

    for (i = 0; i < items.length; i++) {
        if (StrEndsWithLabel(items[i].getAttribute("id"))) {
            try {
                var v = eval(GetFunctionName(items[i].getAttribute("id")) + "()");
                if (v == null || v == undefined || v.length == 0)
                    v = "--";

                items[i].innerHTML = "<b>" + v + "</b>";
            }
            catch (e) {
                alert(e);
                items[i].innerHTML = "<b>--</b>";
            }
        }
    }

}




//function disableButtons(flag, msg)
//{
//	try 
//	{		
//		document.getElementById("btnInitialize").disabled = flag;
//		document.getElementById("btnReadPublicData").disabled = flag;
//		document.getElementById("btnReadPublicDataEx").disabled = flag;
//		document.getElementById("btnCheckCardGenuine").disabled = flag;
//		document.getElementById("btnCheckCardGenuineEx").disabled = flag;
//		document.getElementById("btnReadPhotography").disabled = flag;
//		document.getElementById("btnBiometricVerification").disabled = flag;
//	}
//	catch(e) 
//	{
		
//	}
		
//	try 
//	{
//		document.getElementById("btnExportSignCertificate").disabled = flag;
//		document.getElementById("btnExportAuthCertificate").disabled = flag;
//		document.getElementById("btnSignData").disabled = flag;
//		document.getElementById("btnSignDataCSP").disabled = flag;
//		document.getElementById("btnResetPIN").disabled=flag;
//		document.getElementById("btnChangePIN").disabled=flag;
//	}
//	catch(e)
//	{
		
//	}
	
//	try {
//		document.getElementById("btnReadFB").disabled = flag;
//	}
//	catch(e) {
		
//	}
	
	
//	if(flag == true)
//	{
//		document.getElementById("loading_data").innerHTML = msg;
//		document.getElementById("loading_data").style.visibility = "visible";
		
//	}
//	else
//	{
//		document.getElementById("loading_data").style.visibility = "hidden";
//	}
	
		
//}

function MatchOffCard()
{
try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return;
		}
		
		//disableButtons(true, "Biometric Verification ...");
		
		var firstIndex = EIDAWebComponent.GetFirstFingerIndex();
		var secondIndex = EIDAWebComponent.GetSecondFingerIndex();
		var firstFinger = GetFingerIndexDisplayName(firstIndex);
		var secondFinger = GetFingerIndexDisplayName(secondIndex);
		
		var Time_Out=10;
		var alertMessage = "Please place on of the following fingers on the sensor \n" + firstFinger + "\n" + secondFinger;
		//for(var i=0;i<NumOfBits;i++){
		//	fingerIndex = PublicDataWebComponent.GetFingerIndex(i+1);
		//	if(i!= 0)
		//		alertMessage += " or your ";
		//	alertMessage += GetFingerIndexDisplayName(fingerIndex)+" finger";
		//}
		alertMessage += "\n to capture your fingerprint.";
		alert (alertMessage);
		
		var image = EIDAWebComponent.CaptureImage(0, firstIndex, Time_Out);
		if(image.startsWith("-"))
		{
			ProcessError(image);
			//disableButtons(false);
			return;
		}
		
		var template = EIDAWebComponent.ConvertImage(image, EIDAWebComponent.GetImageWidth(), EIDAWebComponent.GetImageHeight());
		if(template.startsWith("-"))
		{
			ProcessError(template);
		//	disableButtons(false);
			return;
		}
		
     	var Ret = EIDAWebComponent.MatchOffCard(RemoteSM_Address, firstIndex, template);
		
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else if(Ret != "")
		{
			alert(Ret);
		}
		else
		{
			alert("Biometric verification successful");
		}
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Biometric verification failed ,Details  " + e;
	}

}


//function SignDataCSP(Data) 
//{
//	alert("Signing with SIGN key does not allow PIN caching");
//}

//function AuthenticateCSP(Data) 
function AuthenticatePinCached(Data)
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "Signing Data with the CSP (Auth KeyPair) ...");
		var Ret = EIDAWebComponent.AuthenticateWithPinCached(Data);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
		//	alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Signing Data with the CSP (Auth KeyPair) Failed, Details: "+e;
	}
}


function SignData(PIN, Data) 
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
	//	disableButtons(true, "Signing Data without PIN caching (Sign KeyPair) ...");
		var Ret = EIDAWebComponent.SignData(PIN, Data);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
		//	alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Signing Data without PIN caching (Sign KeyPair) Failed, Details: "+e;
	}
}

function BioAuthenticate() 
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "Performing Biometric Authentication ...");
		var Ret = EIDAWebComponent.BioAuthenticate(RemoteSM_Address);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			return null;
		}
		else
		if(Ret != "")
		{
			//	alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return null;
	}
}

function Authenticate(PIN, Data) 
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
	//	disableButtons(true, "Signing Data without PIN caching (Auth KeyPair) ...");
		var Ret = EIDAWebComponent.Authenticate(PIN, Data);
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
		//	alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Signing Data without PIN caching (Auth KeyPair) Failed, Details: "+e;
	}
}


function ExportSignCertificate() 
{

	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
	//	disableButtons(true, "Export Signing Certificate ...");
		var Ret = EIDAWebComponent.ReadSignCertificate();
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
		//	alert(Ret);
		}

//		disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Export Signing Certificate Failed, Details: "+e;
	}
}

function ExportAuthCertificate() 
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "Export Auth Certificate ...");
		var Ret = EIDAWebComponent.ReadAuthCertificate();
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			//return "";
		}
		else
		if(Ret != "")
		{
		//	alert(Ret);
		}
		
		//disableButtons(false);
		return Ret;
	}
	catch(e)
	{
		return "Export Auth Certificate Failed, Details: "+e;
	}
}


function VGAuthenticate(PIN, JSCallBackFunctionName) 
{
	try
	{
		if(EIDAWebComponent == null)
		{
			alert("The Webcomponent is not initialized.");
			return "";
		}
		
		//disableButtons(true, "Authentication in progress ...");
		EIDAWebComponent.setVGAddress(RemoteSM_Address);
		var Ret = EIDAWebComponent.VGAuthenticate(PIN, JSCallBackFunctionName);
		//alert(Ret);
		document.getElementById("txtResponse").value = Ret;
		if(Ret.startsWith("-"))
		{
			ProcessError(Ret);
			return "";
		}
		else 
		if(Ret != "")
		{
			window.location = "Success.html";
		}
		
		window.location = "Failed.html";
		
	//	disableButtons(false);
		//return Ret;
	}
	catch(e)
	{
		return "";//"VG Authenticate Failed, Details: "+e;
	}
}



/*--------------------------Errors Code ---------------------------------*/

String.prototype.startsWith = function (str) {
    return (this.match("^" + str) == str);
}

var NO_ERRORS = 0;

var E_SELECT_ID_APPLICATION = -1;
var E_SELECT_CM_APPLICATION = -2;
var E_SELECT_MOC_APPLICATION = -3;
var E_GET_CARD_SERIAL_NUMBER = -4;
var E_GET_CHIP_SERIAL_NUMBER = -5;
var E_GET_ISSUER_SERIAL_NUMBER = -6;
var E_GET_ISSUER_REFERENCE_NUMBER = -7;
var E_GET_CPLC0101 = -8;
var E_GET_CPLC9F7F = -9;
var E_MOC_GET_MAX_FAILED_MATCH = -10;
var E_MOC_GET_SERIAL_NUMBER = -11;
var E_MOC_GET_APPLET_STATE = -12;
var E_MOC_GET_ALGORITHM_VER = -13;
var E_SM_GET_CHALLENGE = -14;
var E_SM_GET_CIPHERED_PIN = -15;
var E_SELECT_FILEKEY = -17;
var E_SET_USER_AUTH_SE = -18;

var E_SM_CARD_NOT_GENUINE = -19;

var E_PUBLIC_DATA_PUBLIC_KEY = -22;
var E_PUBLIC_DATA_VERIFY_PHOTO = -23;
var E_PUBLIC_DATA_VERIFY_SF3 = -24;
var E_PUBLIC_DATA_VERIFY_SF5 = -25;

var E_MOC_GET_CHALLENGE = -26;
var E_SM_MOC_MUTUAL_AUTHENTICATION = -27;
var E_MOC_MUTUAL_AUTHENTICATION = -28;



var E_MOC_APPLICATION_BLOCKED = -29;
var E_MOC_MUTUAL_AUTHENTICATION_UNKNOWN = -30;
var E_MOC_SESSION_KEYS = -32;

var E_MOC_MATCH_UNKNOWN = -33;
var E_MOC_MATCH_GENERAL = -34;
var E_MOC_MATCH_GENERAL_UNKNOWN = -35;
var E_MOC_GET_BIT_GROUP = -36;
var E_MOC_MATCH_BAD_TEMPLATE = -37;
var E_MOC_MATCH_SEC_STATUS_NOT_SATISFIED = -38;

var E_ID_APPLICATION_VERIFY_CIPHERED_PIN = -39;
var E_ID_APPLICATION_BLOCKED = -40;
var E_ID_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN = -41;

var E_ID_GET_FINGERPRINTS = -42;

var E_PKI_SIGN_GENERAL = -43;

var E_PKI_SIGN_PIN_INCORRECT = -44;
var E_PKI_SIGN_PIN_BLOCKED = -45;
var E_PKI_SIGN_SIGNATURE_SIZE_ZERO = -46;

var E_PKI_EXPORT_CERTIFICATE = -47;
var E_PKI_CERTIFICATE_SIZE_ZERO = -48;
var E_PKI_CSP_SIGNING_INIT = -49;
var E_PKI_CSP_SIGNING = -50;
var E_PKI_PIN_LENGTH_INCORRECT = -51;
var E_ID_READ_IDN_CN = -52;
var E_ID_READ_PHOTOGRAPHY = -53;
var E_ID_READ_EF_CardHolderData_SF3 = -54;
var E_ID_READ_EF_CardHolderData_SF5 = -55;
var E_ID_READ_EF_RootCertificate = -56;
var E_PKI_SESSION_KEYS = -57;
var E_PKI_ENCODE_PIN = -58;
var E_PKI_PIN_VERIFY_GENERAL = -59;

var E_BIOMETRICS_CONVERSION = -60;
var E_BIOMETRICS_OFFCARD_MATCHING = -61;
var E_BIOMETRICS_NO_DEVICE = -62;
var E_BIOMETRICS_CAPTURE_CONVERT = -63;
var E_BIOMETRICS_NO_TEMPLATES = -64;
var E_BIOMETRICS_CAPTURE = -65;
var E_BIOMETRICS_SDK_BAD_LICENSE = -66;
var E_BIOMETRICS_SDK_INIT = -67;
var E_BIOMETRICS_CC_TEMPLATE_TO_ISO = -68;
var E_BIOMETRICS_WRONG_FINGER_INDEX = -69;

var E_PKI_INVALID_PIN = -70;
var E_PKI_INVALID_CARD_VERSION = -71;
var E_PKI_CONSTRUCT_PKI_APDU = -72;
var E_PKI_SET_SIGN_KEY_INDEX = -73;
var E_PKI_ERROR_READ_SIGNATURE = -74;

var E_CHECK_CRYCKS_FAILED = -75;
var E_GET_CRYCKS_FAILED = -76;
var E_DECRYPT_PROTECTED_DATA = -77;

var E_PKI_PIN_VERIFY_SEC_STATUS_NOT_SATISFIED = -80;
var E_PKI_PIN_BLOCKED = -81;
var E_PKI_ADMIN_PIN_BLOCKED = -83;
var E_PKI_PIN_BAD_REFERENCE = -82;
var E_PKI_ADMIN_PIN = -84;
var E_SELECT_PKI_APPLICATION = -85;
var E_PKI_GET_SERIAL_NUMBER = -86;
var E_PKI_GET_CHALLENGE = -87;
var E_SM_PKI_MUTUAL_AUTHENTICATION = -88;
var E_PKI_MUTUAL_AUTHENTICATION = -89;
var E_PKI_APPLICATION_BLOCKED = -90;
var E_PKI_MUTUAL_AUTHENTICATION_UNKNOWN = -91;
var E_PKI_PIN_UNBLOCK_GENERAL = -92;

var E_PKI_PIN_CHANGE_GENERAL = -93;

var E_NULL_ARGUMENT = -100;
var E_INVALID_ARGUMENT_VALUE = -101;
var E_NOT_SUPPORTED_IMPLEMENTATION = -102;
var E_TOOLKIT_NOT_FOUND = -103;

var E_CLASS_NOT_FOUND = -201;
var E_FIELD_NOT_FOUND = -202;

var E_NO_CONFIGURATION_FILE = -203;

var E_UNKNOWN_CARD = -256;
var E_WRONG_MAC = -257;
var E_SELECT_FAMILY_BOOK_APPLICATION = -258;
var E_ID_READ_WIFE_DATA = -259;
var E_ID_READ_FAMILYHEAD_DATA = -260;
var E_ID_READ_CHILD_DATA = -261;
var E_ID_READ_WORK_ADDRESS_DATA = -262;
var E_ID_READ_HOME_ADDRESS_DATA = -263;
var E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN = -264;
var E_FAMILY_BOOK_APPLICATION_BLOCKED = -265;
var E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN = -266;
var E_SM_NOT_INITIALIZED = -300;

var E_SAM_NO_PCSC_READERS = -311;
var E_SAM_INVALID_CONNECTION = -312;
var E_SAM_SELECT_APPLICATION = -313;
var E_SAM_VERIFY_PIN = -314;
var E_SAM_READ_REF_IDS = -315;
var E_SAM_READ_REF_ID_INFO = -316;
var E_SAM_GET_ATR = -317;
var E_SAM_PIN_NULL_OR_INCORRECT = -318;
var E_SAM_ATRS_NULL = -319;


var E_WRONG_PIN_0 = -352;
var E_WRONG_PIN_1 = -353;
var E_WRONG_PIN_2 = -354;
var E_WRONG_PIN_3 = -355;
var E_WRONG_PIN_4 = -356;

var E_MPCOS_AUTH_KEY_NOT_FOUND_ON_SAM = -357;
var E_GENERATE_DIVERSIFIED_ADMIN_PIN_PKI = -358;
var E_MAXIMUM_NUMBER_OF_OPEN_CONTEXTS_REACHED = -359;
var E_V2Data_NOT_AVAILABLE_IN_V1 = -360;


var E_HSM_UNABLE_TO_LOAD_CRYPTOKI = -400;
var E_HSM_UNABLE_TO_INITIALIZE_CRYPTOKI = -401;
var E_HSM_GET_SLOT_FAILED = -403;
var E_HSM_OPEN_SESSION_FAILED = -404;
var E_HSM_LOGIN_FAILED = -405;
var E_HSM_KEY_NOT_FOUND = -406;
var E_HSM_INCRYPT_INIT_FAILED = -407;
var E_HSM_INCRYPT_FAILED = -408;
var E_HSM_LOGOUT_FAILED = -409;

var E_ESTABLISH_CONTEXT = -1000;
var E_NO_PCSC_READERS = -1001;
var E_UNKNOWN_ERROR = -1002;
var E_REMOTE_SM_ADDRESS_EMPTY = -1003;
var E_BIOMETRICS_OFFCARD_MATCHING_FAILED_LOW_SCORE = -1004;
var E_NO_CARDS_PRESENT = -1005;
var E_WEB_COMPONENT_NOT_INITIALIZED = -1006;
var E_ERROR_RETRIEVING_PUBLIC_DATA = -1007;

var E_SERVER_ERROR = -1010;
var E_CARD_EXCEPTION = -1011;
var E_GET_CARD_CRYPTOGRAM = -1012;
var E_GET_FINGERPRINT_BINARY_DATA = -1013;
var E_ENCODE_PIN = -1014;
var E_CRYCKS_EXCEPTION = -1015;
var E_GET_ATR = -1016;
var E_SM_GET_RESET_COMMAND = -1017;

var E_REMOTE_SM_INTERNAL_SERVER_ERROR = -500;
var E_REMOTE_SM_TRANSACTION_NOT_FOUND = -501;
var E_REMOTE_SM_TRANSACTION_TYPE_NOT_SET = -502;
var E_REMOTE_SM_FINGERPRINTS_NULL = -503;
var E_REMOTE_SM_IMAGE_PARAMS_INCORRECT = -504;
var E_REMOTE_SM_IMAGE_HEIGHT_INCORRECT = -505;
var E_REMOTE_SM_IMAGE_WIDTH_INCORRECT = -506;
var E_REMOTE_SM_MATCH_FAILED = -507;
var E_REMOTE_SM_INVALID_FINGERPRINT_SIGNATURE = -508;
var E_REMOTE_SM_CARD_CSN_NOT_FOUND = -509;
var E_REMOTE_SM_NATIONAL_ID_OR_CN_ERROR = -510;
var E_REMOTE_SM_LOW_MATCH_SCORE = -511;
var E_REMOTE_SM_CANNOT_BUILD_SIGNED_RESP = -512;
var E_REMOTE_SM_MODULE_NOT_AVAILABLE = -513;
var E_REMOTE_SM_CHALLENGE_NULL = -514;
var E_REMOTE_SM_PARAMS_NULL = -515;
var E_REMOTE_SM_GENERATE_CIPHERED_PIN_FAILED = -516;
var E_REMOTE_SM_CARD_STATUS_FAILED = -517;
var E_REMOTE_SM_CARD_NOT_GENUINE = -518;
var E_REMOTE_SM_CERTIFICATE_INVALID = -519;
var E_REMOTE_SM_CERTIFICATE_NOT_YET_VALID = -520;
var E_REMOTE_SM_CERTIFICATE_EXPIRED = -521;
var E_REMOTE_SM_CERTIFICATE_STATUS_REVOKED = -522;
var E_REMOTE_SM_CERTIFICATE_STATUS_UNKNOWN = -523;
var E_REMOTE_SM_SIGNATURE_INVALID = -524;
var E_REMOTE_SM_MOC_GENERATE_SESSION_KEYS_FAILED = -525;
var E_REMOTE_SM_MOC_MUTUAL_AUTH_FAILED = -526;
var E_REMOTE_SM_MOC_BUILD_SMCOMMAND_FAILED = -527;
var E_REMOTE_SM_TRANSACTION_ALREADY_FINALIZED = -528;
var E_REMOTE_SM_PKI_GENERATE_SESSION_KEYS_FAILED = -529;
var E_REMOTE_SM_PKI_MUTUAL_AUTH_FAILED = -530;
var E_REMOTE_SM_DECRYPT_KEY_ERROR = -531;
var E_REMOTE_SM_DECRYPT_DATA_ERROR = -532;
var E_REMOTE_SM_PKI_BUILD_SM_COMMAND_FAILED = -533;
var E_REMOTE_SM_USER_NOT_AUTHENTICATED = -534;
var E_REMOTE_SM_PKI_BUILD_RESET_COMMAND_FAILED = -535;
var E_REMOTE_SM_TRANSACTION_NOT_PART_OF_SERVICE = -536;
var E_REMOTE_SM_SERVICE_NOT_REGISTERED_TO_SERVICEPROVIDER = -537;
var E_REMOTE_SM_SERVICEPROVIDER_NOT_FOUND = -538;
var E_REMOTE_SM_NO_SERVICE_ID = -539;
var E_REMOTE_SM_NO_ACTION = -540;
var E_SM_PASSWORD_IS_EMPTY = -541;
var E_SM_OPENCONTEXT = -542;
var E_SM_CLOSECONTEXT = -543;

var E_SM_GETREFIDINFO = -544;
var E_SM_GETREFIDS = -545;
var E_SM_VERIFYPIN = -546;
var E_SM_SELECTAPP = -547;
var E_INVALID_MRZData = -267;
var E_BAC = -268;

var ErrorMessages = new Array();


ErrorMessages[NO_ERRORS] = "NO_ERRORS_EXCEPTION_EXCEPTION";

ErrorMessages[E_SELECT_ID_APPLICATION] = "E_SELECT_ID_APPLICATION_EXCEPTION_EXCEPTION";
ErrorMessages[E_SELECT_CM_APPLICATION] = "E_SELECT_CM_APPLICATION_EXCEPTION_EXCEPTION";
ErrorMessages[E_SELECT_MOC_APPLICATION] = "E_SELECT_MOC_APPLICATION_EXCEPTION";
ErrorMessages[E_GET_CARD_SERIAL_NUMBER] = "E_GET_CARD_SERIAL_NUMBER_EXCEPTION";
ErrorMessages[E_GET_CHIP_SERIAL_NUMBER] = "E_GET_CHIP_SERIAL_NUMBER_EXCEPTION";
ErrorMessages[E_GET_ISSUER_SERIAL_NUMBER] = "E_GET_ISSUER_SERIAL_NUMBER_EXCEPTION";
ErrorMessages[E_GET_ISSUER_REFERENCE_NUMBER] = "E_GET_ISSUER_REFERENCE_NUMBER_EXCEPTION";
ErrorMessages[E_GET_CPLC0101] = "E_GET_CPLC0101_EXCEPTION";
ErrorMessages[E_GET_CPLC9F7F] = "E_GET_CPLC9F7F_EXCEPTION";
ErrorMessages[E_MOC_GET_MAX_FAILED_MATCH] = "E_MOC_GET_MAX_FAILED_MATCH_EXCEPTION";
ErrorMessages[E_MOC_GET_SERIAL_NUMBER] = "E_MOC_GET_SERIAL_NUMBER_EXCEPTION";
ErrorMessages[E_MOC_GET_APPLET_STATE] = "E_MOC_GET_APPLET_STATE_EXCEPTION";
ErrorMessages[E_MOC_GET_ALGORITHM_VER] = "E_MOC_GET_ALGORITHM_VER_EXCEPTION";
ErrorMessages[E_SM_GET_CHALLENGE] = "E_SM_GET_CHALLENGE_EXCEPTION";
ErrorMessages[E_SM_GET_CIPHERED_PIN] = "E_SM_GET_CIPHERED_PIN_EXCEPTION";
ErrorMessages[E_SELECT_FILEKEY] = "E_SELECT_FILEKEY_EXCEPTION";
ErrorMessages[E_SET_USER_AUTH_SE] = "E_SET_USER_AUTH_SE_EXCEPTION";

ErrorMessages[E_SM_CARD_NOT_GENUINE] = "E_SM_CARD_NOT_GENUINE_EXCEPTION";

ErrorMessages[E_PUBLIC_DATA_PUBLIC_KEY] = "E_PUBLIC_DATA_PUBLIC_KEY_EXCEPTION";
ErrorMessages[E_PUBLIC_DATA_VERIFY_PHOTO] = "E_PUBLIC_DATA_VERIFY_PHOTO_EXCEPTION";
ErrorMessages[E_PUBLIC_DATA_VERIFY_SF3] = "E_PUBLIC_DATA_VERIFY_SF3_EXCEPTION";
ErrorMessages[E_PUBLIC_DATA_VERIFY_SF5] = "E_PUBLIC_DATA_VERIFY_SF5_EXCEPTION";

ErrorMessages[E_MOC_GET_CHALLENGE] = "E_MOC_GET_CHALLENGE_EXCEPTION";
ErrorMessages[E_SM_MOC_MUTUAL_AUTHENTICATION] = "E_SM_MOC_MUTUAL_AUTHENTICATION_EXCEPTION";
ErrorMessages[E_MOC_MUTUAL_AUTHENTICATION] = "E_MOC_MUTUAL_AUTHENTICATION_EXCEPTION";



ErrorMessages[E_MOC_APPLICATION_BLOCKED] = "E_MOC_APPLICATION_BLOCKED_EXCEPTION";
ErrorMessages[E_MOC_MUTUAL_AUTHENTICATION_UNKNOWN] = "E_MOC_MUTUAL_AUTHENTICATION_UNKNOWN_EXCEPTION";
ErrorMessages[E_MOC_SESSION_KEYS] = "E_MOC_SESSION_KEYS_EXCEPTION";

ErrorMessages[E_MOC_MATCH_UNKNOWN] = "E_MOC_MATCH_UNKNOWN_EXCEPTION";
ErrorMessages[E_MOC_MATCH_GENERAL] = "E_MOC_MATCH_GENERAL_EXCEPTION";
ErrorMessages[E_MOC_MATCH_GENERAL_UNKNOWN] = "E_MOC_MATCH_GENERAL_UNKNOWN_EXCEPTION";
ErrorMessages[E_MOC_GET_BIT_GROUP] = "E_MOC_GET_BIT_GROUP_EXCEPTION";
ErrorMessages[E_MOC_MATCH_BAD_TEMPLATE] = "E_MOC_MATCH_BAD_TEMPLATE_EXCEPTION";
ErrorMessages[E_MOC_MATCH_SEC_STATUS_NOT_SATISFIED] = "E_MOC_MATCH_SEC_STATUS_NOT_SATISFIED_EXCEPTION";

ErrorMessages[E_ID_APPLICATION_VERIFY_CIPHERED_PIN] = "E_ID_APPLICATION_VERIFY_CIPHERED_PIN_EXCEPTION";
ErrorMessages[E_ID_APPLICATION_BLOCKED] = "Card is blocked";
ErrorMessages[E_ID_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN] = "E_ID_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN_EXCEPTION";

ErrorMessages[E_ID_GET_FINGERPRINTS] = "E_ID_GET_FINGERPRINTS_EXCEPTION";

ErrorMessages[E_PKI_SIGN_GENERAL] = "E_PKI_SIGN_GENERAL_EXCEPTION";

ErrorMessages[E_PKI_SIGN_PIN_INCORRECT] = "E_PKI_SIGN_PIN_INCORRECT_EXCEPTION";
ErrorMessages[E_PKI_SIGN_PIN_BLOCKED] = "E_PKI_SIGN_PIN_BLOCKED_EXCEPTION";
ErrorMessages[E_PKI_SIGN_SIGNATURE_SIZE_ZERO] = "E_PKI_SIGN_SIGNATURE_SIZE_ZERO_EXCEPTION";

ErrorMessages[E_PKI_EXPORT_CERTIFICATE] = "E_PKI_EXPORT_CERTIFICATE_EXCEPTION";
ErrorMessages[E_PKI_CERTIFICATE_SIZE_ZERO] = "E_PKI_CERTIFICATE_SIZE_ZERO_EXCEPTION";
ErrorMessages[E_PKI_CSP_SIGNING_INIT] = "E_PKI_CSP_SIGNING_INIT_EXCEPTION";
ErrorMessages[E_PKI_CSP_SIGNING] = "E_PKI_CSP_SIGNING_EXCEPTION";
ErrorMessages[E_PKI_PIN_LENGTH_INCORRECT] = "E_PKI_PIN_LENGTH_INCORRECT_EXCEPTION";
ErrorMessages[E_ID_READ_IDN_CN] = "E_ID_READ_IDN_CN_EXCEPTION";
ErrorMessages[E_ID_READ_PHOTOGRAPHY] = "E_ID_READ_PHOTOGRAPHY_EXCEPTION";
ErrorMessages[E_ID_READ_EF_CardHolderData_SF3] = "E_ID_READ_EF_CardHolderData_SF3_EXCEPTION";
ErrorMessages[E_ID_READ_EF_CardHolderData_SF5] = "E_ID_READ_EF_CardHolderData_SF5_EXCEPTION";
ErrorMessages[E_ID_READ_EF_RootCertificate] = "E_ID_READ_EF_RootCertificate_EXCEPTION";
ErrorMessages[E_PKI_SESSION_KEYS] = "E_PKI_SESSION_KEYS_EXCEPTION";
ErrorMessages[E_PKI_ENCODE_PIN] = "E_PKI_ENCODE_PIN_EXCEPTION";
ErrorMessages[E_PKI_PIN_VERIFY_GENERAL] = "E_PKI_PIN_VERIFY_GENERAL_EXCEPTION";

ErrorMessages[E_BIOMETRICS_CONVERSION] = "E_BIOMETRICS_CONVERSION_EXCEPTION";
ErrorMessages[E_BIOMETRICS_OFFCARD_MATCHING] = "E_BIOMETRICS_OFFCARD_MATCHING_EXCEPTION";
ErrorMessages[E_BIOMETRICS_NO_DEVICE] = "Fingerprint sensor was not found.";
ErrorMessages[E_BIOMETRICS_CAPTURE_CONVERT] = "E_BIOMETRICS_CAPTURE_CONVERT_EXCEPTION";
ErrorMessages[E_BIOMETRICS_NO_TEMPLATES] = "E_BIOMETRICS_NO_TEMPLATES_EXCEPTION";
ErrorMessages[E_BIOMETRICS_CAPTURE] = "E_BIOMETRICS_CAPTURE_EXCEPTION";
ErrorMessages[E_BIOMETRICS_SDK_BAD_LICENSE] = "E_BIOMETRICS_SDK_BAD_LICENSE_EXCEPTION";
ErrorMessages[E_BIOMETRICS_SDK_INIT] = "E_BIOMETRICS_SDK_INIT_EXCEPTION";
ErrorMessages[E_BIOMETRICS_CC_TEMPLATE_TO_ISO] = "E_BIOMETRICS_CC_TEMPLATE_TO_ISO_EXCEPTION";
ErrorMessages[E_BIOMETRICS_WRONG_FINGER_INDEX] = "E_BIOMETRICS_WRONG_FINGER_INDEX_EXCEPTION";

ErrorMessages[E_PKI_INVALID_PIN] = "E_PKI_INVALID_PIN_EXCEPTION";
ErrorMessages[E_PKI_INVALID_CARD_VERSION] = "E_PKI_INVALID_CARD_VERSION_EXCEPTION";
ErrorMessages[E_PKI_CONSTRUCT_PKI_APDU] = "E_PKI_CONSTRUCT_PKI_APDU_EXCEPTION";
ErrorMessages[E_PKI_SET_SIGN_KEY_INDEX] = "E_PKI_SET_SIGN_KEY_INDEX_EXCEPTION";
ErrorMessages[E_PKI_ERROR_READ_SIGNATURE] = "E_PKI_ERROR_READ_SIGNATURE_EXCEPTION";

ErrorMessages[E_CHECK_CRYCKS_FAILED] = "E_CHECK_CRYCKS_FAILED_EXCEPTION";
ErrorMessages[E_GET_CRYCKS_FAILED] = "E_GET_CRYCKS_FAILED_EXCEPTION";
ErrorMessages[E_DECRYPT_PROTECTED_DATA] = "E_DECRYPT_PROTECTED_DATA_EXCEPTION";

ErrorMessages[E_PKI_PIN_VERIFY_SEC_STATUS_NOT_SATISFIED] = "E_PKI_PIN_VERIFY_SEC_STATUS_NOT_SATISFIED_EXCEPTION";
ErrorMessages[E_PKI_PIN_BLOCKED] = "E_PKI_PIN_BLOCKED_EXCEPTION";
ErrorMessages[E_PKI_ADMIN_PIN_BLOCKED] = "E_PKI_ADMIN_PIN_BLOCKED_EXCEPTION";
ErrorMessages[E_PKI_PIN_BAD_REFERENCE] = "E_PKI_PIN_BAD_REFERENCE_EXCEPTION";
ErrorMessages[E_PKI_ADMIN_PIN] = "E_PKI_ADMIN_PIN_EXCEPTION";
ErrorMessages[E_SELECT_PKI_APPLICATION] = "E_SELECT_PKI_APPLICATION_EXCEPTION";
ErrorMessages[E_PKI_GET_SERIAL_NUMBER] = "E_PKI_GET_SERIAL_NUMBER_EXCEPTION";
ErrorMessages[E_PKI_GET_CHALLENGE] = "E_PKI_GET_CHALLENGE_EXCEPTION";
ErrorMessages[E_SM_PKI_MUTUAL_AUTHENTICATION] = "E_SM_PKI_MUTUAL_AUTHENTICATION_EXCEPTION";
ErrorMessages[E_PKI_MUTUAL_AUTHENTICATION] = "E_PKI_MUTUAL_AUTHENTICATION_EXCEPTION";
ErrorMessages[E_PKI_APPLICATION_BLOCKED] = "E_PKI_APPLICATION_BLOCKED_EXCEPTION";
ErrorMessages[E_PKI_MUTUAL_AUTHENTICATION_UNKNOWN] = "E_PKI_MUTUAL_AUTHENTICATION_UNKNOWN_EXCEPTION";
ErrorMessages[E_PKI_PIN_UNBLOCK_GENERAL] = "E_PKI_PIN_UNBLOCK_GENERAL_EXCEPTION";

ErrorMessages[E_PKI_PIN_CHANGE_GENERAL] = "E_PKI_PIN_CHANGE_GENERAL_EXCEPTION";

ErrorMessages[E_NULL_ARGUMENT] = "E_NULL_ARGUMENT_EXCEPTION";
ErrorMessages[E_INVALID_ARGUMENT_VALUE] = "E_INVALID_ARGUMENT_VALUE_EXCEPTION";
ErrorMessages[E_NOT_SUPPORTED_IMPLEMENTATION] = "E_NOT_SUPPORTED_IMPLEMENTATION_EXCEPTION";
ErrorMessages[E_TOOLKIT_NOT_FOUND] = "Toolkit not found, or not properly installed";


ErrorMessages[E_CLASS_NOT_FOUND] = "E_CLASS_NOT_FOUND_EXCEPTION";
ErrorMessages[E_FIELD_NOT_FOUND] = "E_FIELD_NOT_FOUND_EXCEPTION";

ErrorMessages[E_NO_CONFIGURATION_FILE] = "E_NO_CONFIGURATION_FILE";

ErrorMessages[E_UNKNOWN_CARD] = "E_UNKNOWN_CARD";
ErrorMessages[E_WRONG_MAC] = "E_WRONG_MAC";
ErrorMessages[E_SELECT_FAMILY_BOOK_APPLICATION] = "E_SELECT_FAMILY_BOOK_APPLICATION";
ErrorMessages[E_ID_READ_WIFE_DATA] = "E_ID_READ_WIFE_DATA";
ErrorMessages[E_ID_READ_FAMILYHEAD_DATA] = "E_ID_READ_FAMILYHEAD_DATA";
ErrorMessages[E_ID_READ_CHILD_DATA] = "E_ID_READ_CHILD_DATA";
ErrorMessages[E_ID_READ_WORK_ADDRESS_DATA] = "E_ID_READ_WORK_ADDRESS_DATA";
ErrorMessages[E_ID_READ_HOME_ADDRESS_DATA] = "E_ID_READ_HOME_ADDRESS_DATA";

ErrorMessages[E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN] = "E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN";
ErrorMessages[E_FAMILY_BOOK_APPLICATION_BLOCKED] = "E_FAMILY_BOOK_APPLICATION_BLOCKED";
ErrorMessages[E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN] = "E_FAMILY_BOOK_APPLICATION_VERIFY_CIPHERED_PIN_UNKNOWN";


ErrorMessages[E_SM_NOT_INITIALIZED] = "E_SM_NOT_INITIALIZED_EXCEPTION";

ErrorMessages[E_SAM_NO_PCSC_READERS] = "E_SAM_NO_PCSC_READERS_EXCEPTION";
ErrorMessages[E_SAM_INVALID_CONNECTION] = "E_SAM_INVALID_CONNECTION_EXCEPTION";
ErrorMessages[E_SAM_SELECT_APPLICATION] = "E_SAM_SELECT_APPLICATION_EXCEPTION";
ErrorMessages[E_SAM_VERIFY_PIN] = "E_SAM_VERIFY_PIN_EXCEPTION";
ErrorMessages[E_SAM_READ_REF_IDS] = "E_SAM_READ_REF_IDS_EXCEPTION";
ErrorMessages[E_SAM_READ_REF_ID_INFO] = "E_SAM_READ_REF_ID_INFO_EXCEPTION";
ErrorMessages[E_SAM_GET_ATR] = "E_SAM_GET_ATR_EXCEPTION";
ErrorMessages[E_SAM_PIN_NULL_OR_INCORRECT] = "E_SAM_PIN_NULL_OR_INCORRECT_EXCEPTION";
ErrorMessages[E_SAM_ATRS_NULL] = "E_SAM_ATRS_NULL_EXCEPTION";


ErrorMessages[E_WRONG_PIN_0] = "Wrong PIN, last trial";
ErrorMessages[E_WRONG_PIN_1] = "Wrong PIN, 1 trial remaining";
ErrorMessages[E_WRONG_PIN_2] = "Wrong PIN, 2 trials remaining";
ErrorMessages[E_WRONG_PIN_3] = "Wrong PIN, 3 trials remaining";
ErrorMessages[E_WRONG_PIN_4] = "Wrong PIN, 4 trials remaining";

ErrorMessages[E_MPCOS_AUTH_KEY_NOT_FOUND_ON_SAM] = "E_MPCOS_AUTH_KEY_NOT_FOUND_ON_SAM";
ErrorMessages[E_GENERATE_DIVERSIFIED_ADMIN_PIN_PKI] = "E_GENERATE_DIVERSIFIED_ADMIN_PIN_PKI";
ErrorMessages[E_MAXIMUM_NUMBER_OF_OPEN_CONTEXTS_REACHED] = "E_MAXIMUM_NUMBER_OF_OPEN_CONTEXTS_REACHED";
ErrorMessages[E_V2Data_NOT_AVAILABLE_IN_V1] = "E_V2Data_NOT_AVAILABLE_IN_V1";


ErrorMessages[E_HSM_UNABLE_TO_LOAD_CRYPTOKI] = "E_HSM_UNABLE_TO_LOAD_CRYPTOKI_EXCEPTION";
ErrorMessages[E_HSM_UNABLE_TO_INITIALIZE_CRYPTOKI] = "E_HSM_UNABLE_TO_INITIALIZE_CRYPTOKI_EXCEPTION";
ErrorMessages[E_HSM_GET_SLOT_FAILED] = "E_HSM_GET_SLOT_FAILED_EXCEPTION";
ErrorMessages[E_HSM_OPEN_SESSION_FAILED] = "E_HSM_OPEN_SESSION_FAILED_EXCEPTION";
ErrorMessages[E_HSM_LOGIN_FAILED] = "E_HSM_LOGIN_FAILED_EXCEPTION";
ErrorMessages[E_HSM_KEY_NOT_FOUND] = "E_HSM_KEY_NOT_FOUND_EXCEPTION";
ErrorMessages[E_HSM_INCRYPT_INIT_FAILED] = "E_HSM_INCRYPT_INIT_FAILED_EXCEPTION";
ErrorMessages[E_HSM_INCRYPT_FAILED] = "E_HSM_INCRYPT_FAILED_EXCEPTION";
ErrorMessages[E_HSM_LOGOUT_FAILED] = "E_HSM_LOGOUT_FAILED_EXCEPTION";


ErrorMessages[E_UNKNOWN_ERROR] = "E_UNKNOWN_ERROR_EXCEPTION";
ErrorMessages[E_ESTABLISH_CONTEXT] = "Error establishing PCSC context. Please make sure PC/SC card reader is connected";
ErrorMessages[E_NO_PCSC_READERS] = "No PC/SC card readers found.";
ErrorMessages[E_NO_CARDS_PRESENT] = "Please insert a valid EIDA ID card.";
ErrorMessages[E_WEB_COMPONENT_NOT_INITIALIZED] = "Web component is not initialized";
ErrorMessages[E_ERROR_RETRIEVING_PUBLIC_DATA] = "Can not retrieve public data";

ErrorMessages[E_REMOTE_SM_ADDRESS_EMPTY] = "E_REMOTE_SM_ADDRESS_EMPTY_EXCEPTION";
ErrorMessages[E_BIOMETRICS_OFFCARD_MATCHING_FAILED_LOW_SCORE] = "Low match score: your fingerprint doesn't match";


ErrorMessages[E_SERVER_ERROR] = "E_SERVER_ERROR_EXCEPTION";
ErrorMessages[E_CARD_EXCEPTION] = "E_CARD_EXCEPTION_EXCEPTION";
ErrorMessages[E_GET_CARD_CRYPTOGRAM] = "E_GET_CARD_CRYPTOGRAM_EXCEPTION";
ErrorMessages[E_GET_FINGERPRINT_BINARY_DATA] = "E_GET_FINGERPRINT_BINARY_DATA_EXCEPTION";
ErrorMessages[E_ENCODE_PIN] = "E_ENCODE_PIN_EXCEPTION";
ErrorMessages[E_CRYCKS_EXCEPTION] = "E_CRYCKS_EXCEPTION_EXCEPTION";
ErrorMessages[E_GET_ATR] = "E_GET_ATR_EXCEPTION";
ErrorMessages[E_SM_GET_RESET_COMMAND] = "E_SM_GET_RESET_COMMAND_EXCEPTION";

ErrorMessages[E_REMOTE_SM_INTERNAL_SERVER_ERROR] = "E_REMOTE_SM_INTERNAL_SERVER_ERROR";
ErrorMessages[E_REMOTE_SM_TRANSACTION_NOT_FOUND] = "E_REMOTE_SM_TRANSACTION_NOT_FOUND";
ErrorMessages[E_REMOTE_SM_TRANSACTION_TYPE_NOT_SET] = "E_REMOTE_SM_TRANSACTION_TYPE_NOT_SET";
ErrorMessages[E_REMOTE_SM_FINGERPRINTS_NULL] = "E_REMOTE_SM_FINGERPRINTS_NULL";
ErrorMessages[E_REMOTE_SM_IMAGE_PARAMS_INCORRECT] = "E_REMOTE_SM_IMAGE_PARAMS_INCORRECT";
ErrorMessages[E_REMOTE_SM_IMAGE_HEIGHT_INCORRECT] = "E_REMOTE_SM_IMAGE_HEIGHT_INCORRECT";
ErrorMessages[E_REMOTE_SM_IMAGE_WIDTH_INCORRECT] = "E_REMOTE_SM_IMAGE_WIDTH_INCORRECT";
ErrorMessages[E_REMOTE_SM_MATCH_FAILED] = "E_REMOTE_SM_MATCH_FAILED";
ErrorMessages[E_REMOTE_SM_INVALID_FINGERPRINT_SIGNATURE] = "E_REMOTE_SM_INVALID_FINGERPRINT_SIGNATURE";
ErrorMessages[E_REMOTE_SM_CARD_CSN_NOT_FOUND] = "E_REMOTE_SM_CARD_CSN_NOT_FOUND";
ErrorMessages[E_REMOTE_SM_NATIONAL_ID_OR_CN_ERROR] = "E_REMOTE_SM_NATIONAL_ID_OR_CN_ERROR";
ErrorMessages[E_REMOTE_SM_LOW_MATCH_SCORE] = "E_REMOTE_SM_LOW_MATCH_SCORE";
ErrorMessages[E_REMOTE_SM_CANNOT_BUILD_SIGNED_RESP] = "E_REMOTE_SM_CANNOT_BUILD_SIGNED_RESP";
ErrorMessages[E_REMOTE_SM_MODULE_NOT_AVAILABLE] = "E_REMOTE_SM_MODULE_NOT_AVAILABLE";
ErrorMessages[E_REMOTE_SM_CHALLENGE_NULL] = "E_REMOTE_SM_CHALLENGE_NULL";
ErrorMessages[E_REMOTE_SM_PARAMS_NULL] = "E_REMOTE_SM_PARAMS_NULL";
ErrorMessages[E_REMOTE_SM_GENERATE_CIPHERED_PIN_FAILED] = "E_REMOTE_SM_GENERATE_CIPHERED_PIN_FAILED";
ErrorMessages[E_REMOTE_SM_CARD_STATUS_FAILED] = "E_REMOTE_SM_CARD_STATUS_FAILED";
ErrorMessages[E_REMOTE_SM_CARD_NOT_GENUINE] = "E_REMOTE_SM_CARD_NOT_GENUINE";
ErrorMessages[E_REMOTE_SM_CERTIFICATE_INVALID] = "E_REMOTE_SM_CERTIFICATE_INVALID";
ErrorMessages[E_REMOTE_SM_CERTIFICATE_NOT_YET_VALID] = "E_REMOTE_SM_CERTIFICATE_NOT_YET_VALID";
ErrorMessages[E_REMOTE_SM_CERTIFICATE_EXPIRED] = "E_REMOTE_SM_CERTIFICATE_EXPIRED";
ErrorMessages[E_REMOTE_SM_CERTIFICATE_STATUS_REVOKED] = "E_REMOTE_SM_CERTIFICATE_STATUS_REVOKED";
ErrorMessages[E_REMOTE_SM_CERTIFICATE_STATUS_UNKNOWN] = "E_REMOTE_SM_CERTIFICATE_STATUS_UNKNOWN";
ErrorMessages[E_REMOTE_SM_SIGNATURE_INVALID] = "Invalid Signature";
ErrorMessages[E_REMOTE_SM_MOC_GENERATE_SESSION_KEYS_FAILED] = "E_REMOTE_SM_MOC_GENERATE_SESSION_KEYS_FAILED";
ErrorMessages[E_REMOTE_SM_MOC_MUTUAL_AUTH_FAILED] = "E_REMOTE_SM_MOC_MUTUAL_AUTH_FAILED";
ErrorMessages[E_REMOTE_SM_MOC_BUILD_SMCOMMAND_FAILED] = "E_REMOTE_SM_MOC_BUILD_SMCOMMAND_FAILED";
ErrorMessages[E_REMOTE_SM_TRANSACTION_ALREADY_FINALIZED] = "E_REMOTE_SM_TRANSACTION_ALREADY_FINALIZED";
ErrorMessages[E_REMOTE_SM_PKI_GENERATE_SESSION_KEYS_FAILED] = "E_REMOTE_SM_PKI_GENERATE_SESSION_KEYS_FAILED";
ErrorMessages[E_REMOTE_SM_PKI_MUTUAL_AUTH_FAILED] = "E_REMOTE_SM_PKI_MUTUAL_AUTH_FAILED";
ErrorMessages[E_REMOTE_SM_DECRYPT_KEY_ERROR] = "E_REMOTE_SM_DECRYPT_KEY_ERROR";
ErrorMessages[E_REMOTE_SM_DECRYPT_DATA_ERROR] = "E_REMOTE_SM_DECRYPT_DATA_ERROR";
ErrorMessages[E_REMOTE_SM_PKI_BUILD_SM_COMMAND_FAILED] = "E_REMOTE_SM_PKI_BUILD_SM_COMMAND_FAILED";
ErrorMessages[E_REMOTE_SM_USER_NOT_AUTHENTICATED] = "E_REMOTE_SM_USER_NOT_AUTHENTICATED";
ErrorMessages[E_REMOTE_SM_PKI_BUILD_RESET_COMMAND_FAILED] = "E_REMOTE_SM_PKI_BUILD_RESET_COMMAND_FAILED";
ErrorMessages[E_REMOTE_SM_TRANSACTION_NOT_PART_OF_SERVICE] = "E_REMOTE_SM_TRANSACTION_NOT_PART_OF_SERVICE";
ErrorMessages[E_REMOTE_SM_SERVICE_NOT_REGISTERED_TO_SERVICEPROVIDER] = "E_REMOTE_SM_SERVICE_NOT_REGISTERED_TO_SERVICEPROVIDER";
ErrorMessages[E_REMOTE_SM_SERVICEPROVIDER_NOT_FOUND] = "E_REMOTE_SM_SERVICEPROVIDER_NOT_FOUND";
ErrorMessages[E_REMOTE_SM_NO_SERVICE_ID] = "E_REMOTE_SM_NO_SERVICE_ID";
ErrorMessages[E_REMOTE_SM_NO_ACTION] = "E_REMOTE_SM_NO_ACTION";


ErrorMessages[E_SM_PASSWORD_IS_EMPTY] = "E_REMOTE_SM_NO_ACTION";
ErrorMessages[E_SM_OPENCONTEXT] = "E_SM_OPENCONTEXT";
ErrorMessages[E_SM_CLOSECONTEXT] = "E_SM_CLOSECONTEXT";

ErrorMessages[E_SM_GETREFIDINFO] = "E_SM_CLOSECONTEXT";
ErrorMessages[E_SM_GETREFIDS] = "E_SM_GETREFIDS";
ErrorMessages[E_SM_VERIFYPIN] = "E_SM_VERIFYPIN";
ErrorMessages[E_SM_SELECTAPP] = "E_SM_SELECTAPP";
ErrorMessages[E_INVALID_MRZData] = "E_INVALID_MRZData";
ErrorMessages[E_BAC] = "E_BAC";


function GetErrorMessage(Code) {
    errorMessage = ErrorMessages[parseInt(Code)];
    if (errorMessage == undefined)
        errorMessage = "Error : " + Code;

    return errorMessage;
}

function ProcessError(Ret) {
    // process the error code here to get the message to display
    // for now just display the error code
    //document.getElementById("messagesDiv").innerText = GetErrorMessage(Ret);
    alert(GetErrorMessage(Ret));

}


/*--------------------------Errors Code End ---------------------------------*/



/* -------------------------- fingers Code ---------------------------------*/

var FingerName = new Array();
FingerName[0x05] = "Right Thumb";
FingerName[0x09] = "Right Index";
FingerName[0x0D] = "Right Middle";
FingerName[0x11] = "Right Ring";
FingerName[0x15] = "Right Little";

FingerName[0x06] = "Left Thumb";
FingerName[0x0A] = "Left Index";
FingerName[0x0E] = "Left Middle";
FingerName[0x12] = "Left Ring";
FingerName[0x16] = "Left Little";

function GetFingerIndexDisplayName(fingerIndex) {
    return FingerName[fingerIndex];
}

/* -------------------------- fingers Code End ---------------------------------*/



/*--------------------------------occupation Code --------------------------------*/

var k = 0;
var Occupations = new Array();
Occupations[k++] = "|0|Armed forces";
Occupations[k++] = "|1|Legislators, senior officials and managers";
Occupations[k++] = "|2|Professionals";
Occupations[k++] = "|3|Technicians and associate professionals";
Occupations[k++] = "|4|Clerks";
Occupations[k++] = "|5|Service workers and shop and market sales workers";
Occupations[k++] = "|6|Skilled agricultural and fishery workers";
Occupations[k++] = "|7|Craft and related trades workers";
Occupations[k++] = "|8|Plant and machine operators and assemblers";
Occupations[k++] = "|9|Elementary occupations";
Occupations[k++] = "|10|House Wife";
Occupations[k++] = "|11|Student";
Occupations[k++] = "|96|Unknown occupation";
Occupations[k++] = "|97|Retired";
Occupations[k++] = "|98|-";
Occupations[k++] = "|99|Unemployed";
Occupations[k++] = "|1110|Legislators";
Occupations[k++] = "|1120|Senior government officials";
Occupations[k++] = "|1130|Traditional chiefs and heads of villages";
Occupations[k++] = "|1141|Senior officials of political-party organizations";
Occupations[k++] = "|1142|Senior officials of employers, workers and other economic-interest organizations";
Occupations[k++] = "|1143|Senior officials of humanitarian and other special-interest organisations";
Occupations[k++] = "|1210|Directors and chief executives";
Occupations[k++] = "|1221|Production and operations department managers (agr., hunting, forestry & fish.)";
Occupations[k++] = "|1222|Production and operations department managers in manufacturing";
Occupations[k++] = "|1223|Production and operations department managers in construction";
Occupations[k++] = "|1224|Production and operations department managers in wholesale and retail trade";
Occupations[k++] = "|1225|Production and operations department managers in restaurants and hotels";
Occupations[k++] = "|1226|Production & operations department managers (transport, storage & communication)";
Occupations[k++] = "|1227|Production and operations department managers in business services";
Occupations[k++] = "|1228|Production & operations department managers (personal care, cleaning & services)";
Occupations[k++] = "|1229|Production and operations department managers not elsewhere classified";
Occupations[k++] = "|1231|Finance and administration department managers";
Occupations[k++] = "|1232|Personnel and industrial relations department managers";
Occupations[k++] = "|1233|Sales and marketing department managers";
Occupations[k++] = "|1234|Advertising and public relations department managers";
Occupations[k++] = "|1235|Supply and distribution department managers";
Occupations[k++] = "|1236|Computing services department managers";
Occupations[k++] = "|1237|Research and development department managers";
Occupations[k++] = "|1238|Statistics, Economics & Planning Department Managers";
Occupations[k++] = "|1239|Other department managers not elsewhere classified";
Occupations[k++] = "|1311|General managers in agriculture, hunting, forestry/ and fishing";
Occupations[k++] = "|1312|General managers in manufacturing";
Occupations[k++] = "|1313|General managers in construction";
Occupations[k++] = "|1314|General managers in wholesale and retail trade";
Occupations[k++] = "|1315|General managers of restaurants and hotels";
Occupations[k++] = "|1316|General managers in transport, storage and communications";
Occupations[k++] = "|1317|General managers of business services";
Occupations[k++] = "|1318|General managers in personal care, cleaning and related services";
Occupations[k++] = "|1319|General managers not elsewhere classified";
Occupations[k++] = "|2111|Physicists and astronomers";
Occupations[k++] = "|2112|Meteorologists";
Occupations[k++] = "|2113|Chemists";
Occupations[k++] = "|2114|Geologists and geophysicists";
Occupations[k++] = "|2121|Mathematicians and related professionals";
Occupations[k++] = "|2122|Statisticians";
Occupations[k++] = "|2131|Computer systems designers and analysts";
Occupations[k++] = "|2132|Computer programmers";
Occupations[k++] = "|2139|Computing professionals not elsewhere classified";
Occupations[k++] = "|2141|Architects, town and traffic planners";
Occupations[k++] = "|2142|Civil engineers";
Occupations[k++] = "|2143|Electrical engineers";
Occupations[k++] = "|2144|Electronics and telecommunications engineers";
Occupations[k++] = "|2145|Mechanical engineers";
Occupations[k++] = "|2146|Chemical engineers";
Occupations[k++] = "|2147|Mining engineers, metallurgists and related professionals";
Occupations[k++] = "|2148|Cartographers and surveyors";
Occupations[k++] = "|2149|Architects, engineers and related professionals not elsewhere classified";
Occupations[k++] = "|2211|Biologists, botanists, zoologists and related professionals";
Occupations[k++] = "|2212|Pharmacologists, pathologists and related professionals";
Occupations[k++] = "|2213|Agronomists and related professionals";
Occupations[k++] = "|2221|Medical doctors";
Occupations[k++] = "|2222|Dentists";
Occupations[k++] = "|2223|Veterinarians";
Occupations[k++] = "|2224|Pharmacists";
Occupations[k++] = "|2229|Health professionals (except nursing) not elsewhere classified";
Occupations[k++] = "|2230|Nursing and midwifery professionals";
Occupations[k++] = "|2310|College, university and higher education teaching professionals";
Occupations[k++] = "|2320|Secondary education teaching professionals";
Occupations[k++] = "|2331|Primary education teaching professionals";
Occupations[k++] = "|2332|Pre-primary education teaching professionals";
Occupations[k++] = "|2340|Special education teaching professionals";
Occupations[k++] = "|2351|Education methods specialists";
Occupations[k++] = "|2352|School inspectors";
Occupations[k++] = "|2353|Other teaching professionals not elsewhere classified";
Occupations[k++] = "|2411|Accountants";
Occupations[k++] = "|2412|Personnel and careers professionals";
Occupations[k++] = "|2413|Business professionals not elsewhere classified";
Occupations[k++] = "|2421|Lawyers";
Occupations[k++] = "|2422|Judges";
Occupations[k++] = "|2423|Legal professionals not elsewhere classified";
Occupations[k++] = "|2431|Archivists and curators";
Occupations[k++] = "|2432|Librarians and related information professionals";
Occupations[k++] = "|2441|Economists";
Occupations[k++] = "|2442|Sociologists, anthropologists and related professionals";
Occupations[k++] = "|2443|Philosophers, historians and political scientists";
Occupations[k++] = "|2444|Philologists, translators and interpreters";
Occupations[k++] = "|2445|Psychologists";
Occupations[k++] = "|2446|Social work professionals";
Occupations[k++] = "|2451|Authors, journalists and other writers";
Occupations[k++] = "|2452|Sculptors, painters and related artists";
Occupations[k++] = "|2453|Composers, musicians and singers";
Occupations[k++] = "|2454|Choreographers and dancers";
Occupations[k++] = "|2455|Film, stage and related actors and directors";
Occupations[k++] = "|2460|Religious professionals";
Occupations[k++] = "|3111|Chemical and physical science technicians";
Occupations[k++] = "|3112|Civil engineering technicians";
Occupations[k++] = "|3113|Electrical engineering technicians";
Occupations[k++] = "|3114|Electronics and telecommunications engineering technicians";
Occupations[k++] = "|3115|Mechanical engineering technicians";
Occupations[k++] = "|3116|Chemical engineering technicians";
Occupations[k++] = "|3117|Mining and metallurgical technicians";
Occupations[k++] = "|3118|Draughtspersons";
Occupations[k++] = "|3119|Physical and engineering science technicians not elsewhere classified";
Occupations[k++] = "|3121|Computer assistants";
Occupations[k++] = "|3122|Computer equipment operators";
Occupations[k++] = "|3123|Industrial robot controllers";
Occupations[k++] = "|3131|Photographers and image and sound recording equipment operators";
Occupations[k++] = "|3132|Broadcasting and telecommunications equipment operators";
Occupations[k++] = "|3133|Medical equipment operators";
Occupations[k++] = "|3139|Optical and electronic equipment operators not elsewhere classified";
Occupations[k++] = "|3141|Ships' engineers";
Occupations[k++] = "|3142|Ships' deck officers and pilots";
Occupations[k++] = "|3143|Aircraft pilots and related associate professionals";
Occupations[k++] = "|3144|Air traffic controllers";
Occupations[k++] = "|3145|Air traffic safety technicians";
Occupations[k++] = "|3151|Building and fire inspectors";
Occupations[k++] = "|3152|Safety, health and quality inspectors";
Occupations[k++] = "|3211|Life science technicians";
Occupations[k++] = "|3212|Agronomy and forestry technicians";
Occupations[k++] = "|3213|Farming and forestry advisers";
Occupations[k++] = "|3221|Medical assistants";
Occupations[k++] = "|3222|Sanitarians";
Occupations[k++] = "|3223|Dieticians and nutritionists";
Occupations[k++] = "|3224|Optometrists and opticians";
Occupations[k++] = "|3225|Dental assistants";
Occupations[k++] = "|3226|Physiotherapists and related associate professionals";
Occupations[k++] = "|3227|Veterinary assistants";
Occupations[k++] = "|3228|Pharmaceutical assistants";
Occupations[k++] = "|3229|Modern health associate professionals (except nursing) not elsewhere classified";
Occupations[k++] = "|3231|Nursing associate professionals";
Occupations[k++] = "|3232|Midwifery associate professionals";
Occupations[k++] = "|3241|Traditional medicine practitioners";
Occupations[k++] = "|3242|Faith healers";
Occupations[k++] = "|3310|Primary education teaching associate professionals";
Occupations[k++] = "|3320|Pre-primary education teaching associate professionals";
Occupations[k++] = "|3330|Special education teaching associate professionals";
Occupations[k++] = "|3340|Other teaching associate professionals";
Occupations[k++] = "|3411|Securities and finance dealers and brokers";
Occupations[k++] = "|3412|Insurance representatives";
Occupations[k++] = "|3413|Estate agents";
Occupations[k++] = "|3414|Travel consultants and organisers";
Occupations[k++] = "|3415|Technical and commercial sales representatives";
Occupations[k++] = "|3416|Buyers";
Occupations[k++] = "|3417|Appraisers, valuers and auctioneers";
Occupations[k++] = "|3419|Finance and sales associate professionals not elsewhere classified";
Occupations[k++] = "|3421|Trade brokers";
Occupations[k++] = "|3422|Clearing and forwarding agents";
Occupations[k++] = "|3423|Employment agents and labour contractors";
Occupations[k++] = "|3424|Business services agents and trade brokers not elsewhere classified";
Occupations[k++] = "|3431|Administrative secretaries and related associate professionals";
Occupations[k++] = "|3432|Legal and related business associate professionals";
Occupations[k++] = "|3433|Bookkeepers";
Occupations[k++] = "|3434|Statistical, mathematical and related associate professionals";
Occupations[k++] = "|3435|Administrative associate professionals not elsewhere classified";
Occupations[k++] = "|3441|Customs and border inspectors";
Occupations[k++] = "|3442|Government tax and excise officials";
Occupations[k++] = "|3443|Government social benefits officials";
Occupations[k++] = "|3444|Government licensing officials";
Occupations[k++] = "|3445|Police inspectors and detectives";
Occupations[k++] = "|3449|Customs, tax and related government associate professionals";
Occupations[k++] = "|3451|Social work associate professionals";
Occupations[k++] = "|3461|Decorators and commercial designers";
Occupations[k++] = "|3462|Radio, television and other announcers";
Occupations[k++] = "|3463|Street, night-club and related musicians, singers and dancers";
Occupations[k++] = "|3464|Clowns, magicians, acrobats and related associate professionals";
Occupations[k++] = "|3465|Athletes, sportspersons and related associate professionals";
Occupations[k++] = "|3470|Religious associate professionals";
Occupations[k++] = "|4111|Stenographers and typists";
Occupations[k++] = "|4112|Word-processor and related operators";
Occupations[k++] = "|4113|Data entry operators";
Occupations[k++] = "|4114|Calculating-machine operators";
Occupations[k++] = "|4115|Secretaries";
Occupations[k++] = "|4121|Accounting and bookkeeping clerks";
Occupations[k++] = "|4122|Statistical and finance clerks";
Occupations[k++] = "|4131|Stock clerks";
Occupations[k++] = "|4132|Production clerks";
Occupations[k++] = "|4133|Transport clerks";
Occupations[k++] = "|4141|Library and filing clerks";
Occupations[k++] = "|4142|Mail carriers and sorting clerks";
Occupations[k++] = "|4143|Coding, proof-reading and related clerks";
Occupations[k++] = "|4144|Scribes and related workers";
Occupations[k++] = "|4190|Other office clerks";
Occupations[k++] = "|4211|Cashiers and ticket clerks";
Occupations[k++] = "|4212|Tellers and other counter clerks";
Occupations[k++] = "|4213|Bookmakers and croupiers";
Occupations[k++] = "|4214|Pawnbrokers and money-lenders";
Occupations[k++] = "|4215|Debt-collectors and related workers";
Occupations[k++] = "|4221|Travel agency and related clerks";
Occupations[k++] = "|4222|Receptionists and information clerks";
Occupations[k++] = "|4223|Telephone switchboard operators";
Occupations[k++] = "|5111|Travel attendants and travel stewards";
Occupations[k++] = "|5112|Transport conductors";
Occupations[k++] = "|5113|Travel guides";
Occupations[k++] = "|5121|Housekeepers and related workers";
Occupations[k++] = "|5122|Cooks";
Occupations[k++] = "|5123|Waiters, waitresses and bartenders";
Occupations[k++] = "|5131|Child-care workers";
Occupations[k++] = "|5132|Institution-based personal care workers";
Occupations[k++] = "|5133|Home-based personal care workers";
Occupations[k++] = "|5134|Personal care and related workers not elsewhere classified";
Occupations[k++] = "|5141|Hairdressers, barbers, beauticians and related workers";
Occupations[k++] = "|5142|Companions and valets";
Occupations[k++] = "|5143|Undertakers and embalmers";
Occupations[k++] = "|5144|Other personal services workers not elsewhere classified";
Occupations[k++] = "|5151|Astrologers and related workers";
Occupations[k++] = "|5152|Fortune-tellers, palmists and related workers";
Occupations[k++] = "|5161|Fire-fighters";
Occupations[k++] = "|5162|Police officers";
Occupations[k++] = "|5163|Prison guards";
Occupations[k++] = "|5164|Protective services workers not elsewhere classified";
Occupations[k++] = "|5210|Fashion and other models";
Occupations[k++] = "|5220|Shop salespersons and demonstrators";
Occupations[k++] = "|5230|Stall and market salespersons";
Occupations[k++] = "|6111|Field crop and vegetable growers";
Occupations[k++] = "|6112|Tree and shrub crop growers";
Occupations[k++] = "|6113|Gardeners, horticultural and nursery growers";
Occupations[k++] = "|6114|Mixed-crop growers";
Occupations[k++] = "|6121|Dairy and livestock producers";
Occupations[k++] = "|6122|Poultry producers";
Occupations[k++] = "|6123|Apiarists and sericulturists";
Occupations[k++] = "|6124|Mixed-animal producers";
Occupations[k++] = "|6129|Market-oriented animal producers and related workers not elsewhere classified";
Occupations[k++] = "|6130|Market-oriented crop and animal producers";
Occupations[k++] = "|6141|Forestry workers and loggers";
Occupations[k++] = "|6142|Charcoal burners and related workers";
Occupations[k++] = "|6151|Aquatic-life cultivation workers";
Occupations[k++] = "|6152|Inland and coastal waters fishery workers";
Occupations[k++] = "|6153|Deep-sea fishery workers";
Occupations[k++] = "|6154|Hunters and trappers";
Occupations[k++] = "|6210|Subsistence agricultural and fishery workers";
Occupations[k++] = "|7111|Miners and quarry workers";
Occupations[k++] = "|7112|Shotfirers and blasters";
Occupations[k++] = "|7113|Stone splitters, cutters and carvers";
Occupations[k++] = "|7121|Builders, traditional materials";
Occupations[k++] = "|7122|Bricklayers and stonemasons";
Occupations[k++] = "|7123|Concrete placers, concrete finishers and related workers";
Occupations[k++] = "|7124|Carpenters and joiners";
Occupations[k++] = "|7125|Building frame and related trades workers not elsewhere classified";
Occupations[k++] = "|7131|Roofers";
Occupations[k++] = "|7132|Floor layers and tile setters";
Occupations[k++] = "|7133|Plasterers";
Occupations[k++] = "|7134|Insulation workers";
Occupations[k++] = "|7135|Glaziers";
Occupations[k++] = "|7136|Building and related electricians";
Occupations[k++] = "|7137|Plumbers and pipe fitters";
Occupations[k++] = "|7141|Painters and related workers";
Occupations[k++] = "|7142|Varnishers and related painters";
Occupations[k++] = "|7143|Tiles & Wooden Plats fitters";
Occupations[k++] = "|7144|Building structure cleaners";
Occupations[k++] = "|7211|Metal moulders and coremakers";
Occupations[k++] = "|7212|Welders and flamecutters";
Occupations[k++] = "|7213|Sheet metal workers";
Occupations[k++] = "|7214|Structural-metal preparers and erectors";
Occupations[k++] = "|7215|Riggers and cable splicers";
Occupations[k++] = "|7216|Underwater workers";
Occupations[k++] = "|7221|Blacksmiths, hammer-smiths and forging-press workers";
Occupations[k++] = "|7222|Tool-makers and related workers";
Occupations[k++] = "|7223|Machine-tool setters and setter-operators";
Occupations[k++] = "|7224|Metal wheel-grinders, polishers and tool sharpeners";
Occupations[k++] = "|7231|Motor vehicle mechanics and fitters";
Occupations[k++] = "|7232|Aircraft engine mechanics and fitters";
Occupations[k++] = "|7239|Agricultural- or industrial-machinery mechanics and fitters";
Occupations[k++] = "|7241|Electrical mechanics and fitters";
Occupations[k++] = "|7242|Electronics fitters";
Occupations[k++] = "|7243|Electronics mechanics and servicers";
Occupations[k++] = "|7244|Telegraph and telephone installers and servicers";
Occupations[k++] = "|7245|Electrical line installers, repairers and cable jointers";
Occupations[k++] = "|7311|Precision-instrument makers and repairers";
Occupations[k++] = "|7312|Musical instrument makers and tuners";
Occupations[k++] = "|7313|Jewellery and precious-metal workers";
Occupations[k++] = "|7321|Abrasive wheel formers, potters and related workers";
Occupations[k++] = "|7322|Glass makers, cutters, grinders and finishers";
Occupations[k++] = "|7323|Glass engravers and etchers";
Occupations[k++] = "|7324|Glass, ceramics and related decorative painters";
Occupations[k++] = "|7331|Handicraft workers in wood and related materials";
Occupations[k++] = "|7332|Handicraft workers in textile, leather and related materials";
Occupations[k++] = "|7341|Compositors, typesetters and related workers";
Occupations[k++] = "|7342|Stereotypers and electrotypers";
Occupations[k++] = "|7343|Printing engravers and etchers";
Occupations[k++] = "|7344|Photographic and related workers";
Occupations[k++] = "|7345|Bookbinders and related workers";
Occupations[k++] = "|7346|Silk-screen, block and textile printers";
Occupations[k++] = "|7411|Butchers, fishmongers and related food preparers";
Occupations[k++] = "|7412|Bakers, pastry-cooks and confectionery makers";
Occupations[k++] = "|7413|Dairy-products makers";
Occupations[k++] = "|7414|Fruit, vegetable and related preservers";
Occupations[k++] = "|7415|Food and beverage tasters and graders";
Occupations[k++] = "|7416|Tobacco preparers and tobacco products makers";
Occupations[k++] = "|7421|Wood treaters";
Occupations[k++] = "|7422|Cabinet makers and related workers";
Occupations[k++] = "|7423|Woodworking machine setters and setter-operators";
Occupations[k++] = "|7424|Basketry weavers, brush makers and related workers";
Occupations[k++] = "|7431|Fibre preparers";
Occupations[k++] = "|7432|Weavers, knitters and related workers";
Occupations[k++] = "|7433|Tailors, dressmakers and hatters";
Occupations[k++] = "|7434|Furriers and related workers";
Occupations[k++] = "|7435|Textile, leather and related pattern-makers and cutters";
Occupations[k++] = "|7436|Sewers, embroiderers and related workers";
Occupations[k++] = "|7437|Upholsterers and related workers";
Occupations[k++] = "|7439|Textile and dress-make workers";
Occupations[k++] = "|7441|Pelt dressers, tanners and fellmongers";
Occupations[k++] = "|7442|Shoe-makers and related workers";
Occupations[k++] = "|8111|Mining-plant operators";
Occupations[k++] = "|8112|Mineral-ore- and stone-processing-plant operators";
Occupations[k++] = "|8113|Well drillers and borers and related workers";
Occupations[k++] = "|8121|Ore and metal furnace operators";
Occupations[k++] = "|8122|Metal melters, casters and rolling-mill operators";
Occupations[k++] = "|8123|Metal-heat-treating-plant operators";
Occupations[k++] = "|8124|Metal drawers and extruders";
Occupations[k++] = "|8131|Glass and ceramics kiln and related machine operators";
Occupations[k++] = "|8132|Glass, ceramics and related plant operators";
Occupations[k++] = "|8141|Wood-processing-plant operators";
Occupations[k++] = "|8142|Paper-pulp plant operators";
Occupations[k++] = "|8143|Papermaking-plant operators";
Occupations[k++] = "|8151|Crushing-, grinding- and chemical-mixing-machinery operators";
Occupations[k++] = "|8152|Chemical-heat-treating-plant operators";
Occupations[k++] = "|8153|Chemical-filtering- and separating-equipment operators";
Occupations[k++] = "|8154|Chemical-still and reactor operators (except petroleum and natural gas)";
Occupations[k++] = "|8155|Petroleum- and natural-gas-refining-plant operators";
Occupations[k++] = "|8159|Chemical-processing-plant operators not elsewhere classified";
Occupations[k++] = "|8161|Power-production plant operators";
Occupations[k++] = "|8162|Steam-engine and boiler operators";
Occupations[k++] = "|8163|Incinerator, water-treatment and related plant operators";
Occupations[k++] = "|8171|Automated-assembly-line operators";
Occupations[k++] = "|8172|Industrial-robot operators";
Occupations[k++] = "|8211|Machine-tool operators";
Occupations[k++] = "|8212|Cement and other mineral products machine operators";
Occupations[k++] = "|8221|Pharmaceutical- and toiletry-products machine operators";
Occupations[k++] = "|8222|Ammunition- and explosive-products machine operators";
Occupations[k++] = "|8223|Metal finishing-, plating- and coating-machine operators";
Occupations[k++] = "|8224|Photographic-products machine operators";
Occupations[k++] = "|8229|Chemical-products machine operators not elsewhere classified";
Occupations[k++] = "|8231|Rubber-products machine operators";
Occupations[k++] = "|8232|Plastic-products machine operators";
Occupations[k++] = "|8241|Wood-products machine operators";
Occupations[k++] = "|8251|Printing-machine operators";
Occupations[k++] = "|8252|Bookbinding-machine operators";
Occupations[k++] = "|8253|Paper-products machine operators";
Occupations[k++] = "|8261|Fibre-preparing-, spinning- and winding-machine operators";
Occupations[k++] = "|8262|Weaving- and knitting-machine operators";
Occupations[k++] = "|8263|Sewing-machine operators";
Occupations[k++] = "|8264|Bleaching-, dyeing- and cleaning-machine operators";
Occupations[k++] = "|8265|Fur- and leather-preparing-machine operators";
Occupations[k++] = "|8266|Shoemaking- and related machine operators";
Occupations[k++] = "|8269|Textile-, fur- and leather-products machine operators not elsewhere classified";
Occupations[k++] = "|8271|Meat- and fish-processing-machine operators";
Occupations[k++] = "|8272|Dairy-products machine operators";
Occupations[k++] = "|8273|Grain- and spice-milling-machine operators";
Occupations[k++] = "|8274|Baked-goods, cereal and chocolate-products machine operators";
Occupations[k++] = "|8275|Fruit-, vegetable- and nut-processing-machine operators";
Occupations[k++] = "|8276|Sugar production machine operators";
Occupations[k++] = "|8277|Tea-, coffee-, and cocoa-processing-machine operators";
Occupations[k++] = "|8278|Brewers, wine and other beverage machine operators";
Occupations[k++] = "|8279|Tobacco production machine operators";
Occupations[k++] = "|8281|Mechanical-machinery assemblers";
Occupations[k++] = "|8282|Electrical-equipment assemblers";
Occupations[k++] = "|8283|Electronic-equipment assemblers";
Occupations[k++] = "|8284|Metal-, rubber- and plastic-products assemblers";
Occupations[k++] = "|8285|Wood and related products assemblers";
Occupations[k++] = "|8286|Paperboard, textile and related products assemblers";
Occupations[k++] = "|8290|Other machine operators and assemblers";
Occupations[k++] = "|8311|Locomotive-engine drivers";
Occupations[k++] = "|8312|Railway brakers, signallers and shunters";
Occupations[k++] = "|8321|Motor-cycle drivers";
Occupations[k++] = "|8322|Car, taxi and van drivers";
Occupations[k++] = "|8323|Bus and tram drivers";
Occupations[k++] = "|8324|Heavy-truck and lorry drivers";
Occupations[k++] = "|8331|Motorised farm and forestry plant operators";
Occupations[k++] = "|8332|Earth-moving- and related plant operators";
Occupations[k++] = "|8333|Crane, hoist and related plant operators";
Occupations[k++] = "|8334|Lifting-truck operators";
Occupations[k++] = "|8340|Ships' deck crews and related workers";
Occupations[k++] = "|9111|Street food vendors";
Occupations[k++] = "|9112|Street vendors, non-food products";
Occupations[k++] = "|9113|Door-to-door and telephone salespersons";
Occupations[k++] = "|9121|Shoe cleaning and other street services elementary occupations";
Occupations[k++] = "|9131|Domestic helpers and cleaners";
Occupations[k++] = "|9132|Helpers and cleaners in offices, hotels and other establishments";
Occupations[k++] = "|9133|Hand-launderers and pressers";
Occupations[k++] = "|9141|Building caretakers";
Occupations[k++] = "|9142|Vehicle, window and related cleaners";
Occupations[k++] = "|9151|Messengers, package and luggage porters and deliverers";
Occupations[k++] = "|9152|Doorkeepers, watchpersons and related workers";
Occupations[k++] = "|9153|Vending-machine money collectors, meter readers and related workers";
Occupations[k++] = "|9161|Garbage collectors";
Occupations[k++] = "|9162|Sweepers and related labourers";
Occupations[k++] = "|9211|Farm-hands and labourers";
Occupations[k++] = "|9212|Forestry labourers";
Occupations[k++] = "|9213|Fishery, hunting and trapping labourers";
Occupations[k++] = "|9311|Mining and quarrying labourers";
Occupations[k++] = "|9312|Construction and maintenance labourers: roads, dams and similar constructions";
Occupations[k++] = "|9313|Building construction labourers";
Occupations[k++] = "|9321|Assembling labourers";
Occupations[k++] = "|9322|Hand packers and other manufacturing labourers";
Occupations[k++] = "|9331|Hand or pedal vehicle drivers";
Occupations[k++] = "|9332|Drivers of animal-drawn vehicles and machinery";
Occupations[k++] = "|9333|Freight handlers";


function GetOccupationDisplayName(occup) {
    occup2 = "|" + occup + "|";

    for (kk = 0; kk < 408; kk++) {
        if (Occupations[kk].indexOf(occup2) == 0)
            return Occupations[kk].substring(occup2.length);
    }

    if (isNaN(occup))
        return "--";

    return occup;
}

/*--------------------------------occupation Code End --------------------------------*/