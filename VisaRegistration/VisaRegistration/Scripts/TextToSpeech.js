const
PageNames = {
    login: 'login',
    serviceSelection: 'serviceselection',
    appSummary: 'appsummary',
    home: 'home',
    dashboardApplicationGen: 'dashboardapplicationgen',
    manageAppl: 'manageappl',
    batchupload: 'batchupload',
    batchpayment: 'batchpayment',
    paymentcompletion: 'paymentcompletion',
    serviceindex: 'serviceindex',
    visainquiry: 'visainquiry',
    faq: 'faq',
    sitemap: 'sitemap',
    userprofile: 'userprofile',
    newUser: 'newuser',
    manageUsers: 'manageusers'

};
 

function InitializeTTS(enabled, serverUrl, customerId, voiceEn, voiceAr)
{
  //  console.log('TTS Initialized');
  //  console.log(enabled + ',' + serverUrl + ',' + customerId + ',' + voiceEn + ',' + voiceAr);
 

    if (enabled.toLowerCase() != 'true') {
        $('#liTTS').css('visibility', 'hidden');
        return;
    }

   var url = location.href;



    //alert(url);
    var encodedUrl = encodeURIComponent(url);
 //   console.log(encodedUrl);

    var langArabic = $('#hdnIsLanguageArabic').val();

 //   console.log(langArabic);
   // console.log(1);

    //Page Contents - Start
    var cssClasses = '';
   // console.log(2);
    if (url.toLowerCase().indexOf(PageNames.login) > -1) {
        PrependPageHeaderText(langArabic, PageNames.login);
        cssClasses = 'ttspagehead,publicMessage,loginContainer,loginRightPanel';
    }
    else if (url.toLowerCase().indexOf(PageNames.serviceSelection) > -1)
    {
   //     console.log(3);

        PrependPageHeaderText(langArabic, PageNames.serviceSelection);
        cssClasses = 'ttspagehead,service-selection';
    }
    else if (url.toLowerCase().indexOf(PageNames.home) > -1)
    {
        PrependPageHeaderText(langArabic, PageNames.home);
        cssClasses = 'ttspagehead,ttsdesc,publicMessage,lbldefault,ratingCloseDiv';
    }
    else if (url.toLowerCase().indexOf(PageNames.manageAppl) > -1)
    {
        PrependPageHeaderText(langArabic, PageNames.manageAppl);
        cssClasses = 'ttspagehead,custom-msg-margin,ManageAppl,ManageApplRight';
    }
    else if (url.toLowerCase().indexOf(PageNames.dashboardApplicationGen) > -1)
    {
        PrependPageHeaderText(langArabic, PageNames.dashboardApplicationGen);
        cssClasses = 'ttspagehead,ttsdesc,mainheading,control-label';
    }
    else if (url.toLowerCase().indexOf(PageNames.appSummary) > -1)
    {
        PrependPageHeaderText(langArabic, PageNames.appSummary);
        cssClasses = 'ttspagehead,wrap-table';
    }
    else if (url.toLowerCase().indexOf(PageNames.batchupload) > -1)
    {
        PrependPageHeaderText(langArabic, PageNames.batchupload);
        cssClasses = 'ttspagehead,ttsdesc,RedColor,custom-msg-margin,BoldRedColor';
    }
    else if (url.toLowerCase().indexOf(PageNames.batchpayment) > -1) {
        PrependPageHeaderText(langArabic,PageNames.batchpayment);
        cssClasses = 'ttspagehead,ttsdesc,custom-msg-margin,CheckConfirmFromGroupControl';
    }
    else if (url.toLowerCase().indexOf(PageNames.paymentcompletion) > -1) {

       // console.log(9);

        PrependPageHeaderText(langArabic, PageNames.paymentcompletion);
        cssClasses = 'ttspagehead';
    }
    else if (url.toLowerCase().indexOf(PageNames.serviceindex) > -1) {
       // console.log(8);

        PrependPageHeaderText(langArabic, PageNames.serviceindex);
        cssClasses = 'ttspagehead,col-xs-9,col-sm-10';
    }

    else if (url.toLowerCase().indexOf(PageNames.visainquiry) > -1) {

        PrependPageHeaderText(langArabic, PageNames.visainquiry);
        cssClasses = 'ttspagehead,stdLabel2';
    }
    else if (url.toLowerCase().indexOf(PageNames.faq) > -1) {
       // console.log(7);
        PrependPageHeaderText(langArabic, PageNames.faq);
        cssClasses = 'ttspagehead,service';
    }

    else if (url.toLowerCase().indexOf(PageNames.sitemap) > -1) {
       // console.log(6);

        PrependPageHeaderText(langArabic, PageNames.sitemap);
        cssClasses = 'ttspagehead,sitemap';
    }

    else if (url.toLowerCase().indexOf(PageNames.userprofile) > -1) {
      //  console.log(4);

        PrependPageHeaderText('false', PageNames.userprofile);
        cssClasses = 'DivMainMenu';
    }
    else if (url.toLowerCase().indexOf(PageNames.newUser) > -1) {

        PrependPageHeaderText(langArabic, PageNames.newUser);
        cssClasses = 'ttspagehead,ttspageheadtext';
    }
    else if (url.toLowerCase().indexOf(PageNames.manageUsers) > -1) {

        PrependPageHeaderText(langArabic, PageNames.manageUsers);
        cssClasses = 'ttspagehead,col-xs-9';
    }
     
    if (langArabic.toLowerCase() == "false" || typeof (langArabic) == 'undefined') 

        $('#readspeaker_button1 a').prop('href', serverUrl + '?customerid=' + customerId + '&lang=en_us&amp;voice=' + voiceEn + '&readclass=' + cssClasses + '&url=' + encodedUrl);

    else 
        $('#readspeaker_button1 a').prop('href', serverUrl + '?customerid=' + customerId + '&lang=ar_ar&amp;voice=' + voiceAr + '&readclass=' + cssClasses + '&url=' + encodedUrl);

}


function PrependPageHeaderText(isLangArabic,pageName) {

    var text = '';

    //alert(pageName);

    switch (pageName) {

        case PageNames.login:
            if (isLangArabic.toLowerCase() == 'false')
                text = "Welcome to fawri. This is login page.";
            else
                text = "أهلا بك في فورى، هذة صفحة تسجيل الدخول";
            break;
        case PageNames.serviceSelection:
            if (isLangArabic.toLowerCase() == 'false')
                text = "Service Selection page.";
            else
                text = "صفحة أختيار الخدمة";
            break;
        case PageNames.appSummary:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is application Summary page.";
            else
                text = "هذة هي صفحة ملخص الطلب";
            break;
        case PageNames.home:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is home page.";
            else
                text = "هذة هي الصفحة الرئيسية";
            break;
        case PageNames.dashboardApplicationGen:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is application form page.";
            else
                text = "هذة هي صفحة استمارة الطلب";
            break;
        case PageNames.batchupload:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is batch upload page.";
            else
                text = "";
            break;

        case PageNames.batchpayment:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is batch payment page.";
            else
                text = "";
            break;

        case PageNames.paymentcompletion:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is payment completion page";
            else
                text = "";
            break;
        case PageNames.serviceindex:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is service index page";
            else
                text = "";
            break;

        case PageNames.visainquiry:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is service Visainquiry page";
            else
                text = "";
            break;

        case PageNames.faq:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is FAQ page";
            else
                text = "";

            break;
        case PageNames.sitemap:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is FAQ page";
            else
                text = "";
            break;

        case PageNames.newUser:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is Create User page";
            else
                text = "هذه الصفحة وإنشاء مستخدم";
            break;
        case PageNames.manageUsers:
            if (isLangArabic.toLowerCase() == 'false')
                text = "This is Manage Users page";
            else
                text = "هذه الصفحة هي لإدارة المستخدم";
            break;

        default: break;

    }

    $('body').prepend("<div class='ttspagehead' style='visibility:hidden;position:absolute'>"+text+"</div>");

}


