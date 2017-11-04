

var fawriCalendarApi = (function ($,arabicMonths) {

    var today = new Date();
    var fiftyYearsFromNow = Math.max( today.getFullYear() + 50,2050);
    var arabic = 0;

    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function getMonth(a) {
        switch (a) {
            case 'Jan':
            case 'JAN':
            case 'jan':
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


    function convertToDate(objDate) {
        var dateFilter1 = /^(0[1-9]|[12][0-9]|3[01])[-](JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[-](19|[2-9][0-9])\d\d$/;
        var dateFilter2 = /^(0[1-9]|[12][0-9]|3[01])[-](يناير|فبراير|مارس|ابريل|مايو|يونيو|يوليو|ٲغسطس|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|ٲكتوبر|نوفمبر|ديسمبر)[-](19|[2-9][0-9])\d\d$/;
        var obj1;
        var obj;
        var dteDate;
        if (dateFilter1.test(objDate)) {
            obj1 = objDate.split("-");
            obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), getMonth(obj1[1]));
            dteDate = new Date(obj[0], obj[2] - 1, obj[1]);
            return dteDate;
        }
        else if (dateFilter2.test(objDate)) {
            obj1 = objDate.split("-");
            obj = new Array(parseInt(obj1[2], 10), parseInt(obj1[0], 10), getMonth(obj1[1]));
            dteDate = new Date(obj[0], obj[2] - 1, obj[1]);
            return dteDate;
        }
    }

    var englishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //var arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
//    var arabicMonths = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];


    function setText(day, month, year, input) {
        var mVal = parseInt(month.val() || 0);

        var mValStr = 0;
        if (mVal) {
            mValStr = arabic ? arabicMonths[mVal - 1] : englishMonths[mVal - 1];
        }
        var yVal = year.val() ;
        var dVal = day.val() ;
        if (mVal == 0 || yVal == '' || dVal == '')
            input.val('');
        else
        input.val( pad(dVal,2) + "-" + mValStr + "-" + pad(yVal,4));
    }

    function setCombos(day, month, year, input) {
        var date = convertToDate(input.val());
        if (date) {
            day.val(date.getDate());
            month.val(date.getMonth() + 1);
            year.val(date.getFullYear());
        }
    }
    function calculateDays(day, month, year) {
        var mVal = month.val();
        var yVal = year.val();
        var dVal = day.val();

        day.find('option').remove();
        day.append('<option value="">' + (arabic ? 'DD' : 'DD') + '</option>');
        var maxVal = 31;
        for (var i = 1; i <= 31; i++) {
            if (mVal == 2) {
                maxVal = (yVal % 4 == 0) ? 29 : 28;
            } else if (mVal == 4 || mVal == 6 || mVal == 9 || mVal == 11) {
                maxVal = 30;
            }

            if (i > maxVal)
                break;
            day.append('<option value="' + i + '" ' + (dVal == i ? 'selected' : '') + '>' + pad(i, 2) + '</option>');
        }
    }

    function createCalendar() {

        var calendars = $('.fawri-calendar');
        calendars.each(function () {
            var input = $(this);
            
            var html = "<div class='row fawri-calendar-select'>"+
                "<div class='col-xs-4'>"+
                    "<select class='form-control fawri-calendar-day fawri-calendar-combo'/>" +
                "</div>"+
                "<div class='col-xs-4'>"+
                    "<select class='form-control  fawri-calendar-month fawri-calendar-combo' />" +
                "</div>"+
                "<div class='col-xs-4'>" +
                    "<input type='number' class='form-control  fawri-calendar-year fawri-calendar-combo' min='1900' max='"+(today.getFullYear()+50)+"' placeholder='"+(arabic ? 'YYYY' : 'YYYY')+"' />" +
                "</div>"+
                "</div>";
            var parent = $(this).parent();

            if (parent.hasClass("fawri-calendar-div"))
                return;

            parent.addClass("fawri-calendar-div");

            var mainDiv = parent.parent();
            mainDiv.prepend(html);

            var month = mainDiv.find('.fawri-calendar-month'), year = mainDiv.find('.fawri-calendar-year'), day = mainDiv.find('.fawri-calendar-day');


            month.each(function () {
                $(this).append('<option value="" selected>' + (arabic ? 'MMM' : 'MMM') + '</option>');
                for (var i = 1; i <= 12; i++) {
                    $(this).append('<option value="' + i + '">' + (arabic?arabicMonths[i-1]:englishMonths[i-1]) + '</option>');
                }
            });
            month.change(function () {
                calculateDays(day, month, year);
                setText(day, month, year, input);
            });

            year.change(function () {
                var val = $(this).val() || '';
                if (val < 1900 || val > fiftyYearsFromNow || val.length != 4) {
                    $(this).val('');
                }

                calculateDays(day, month, year);
                setText(day, month, year, input);
            });
            calculateDays(day, month, year);

            day.change(function () {
                setText(day, month, year, input);
            });
            setCombos(day,month,year,input);
            input.change(function () {
                setCombos(day, month, year, input);
            });

        });
    }

    $(document).ready(function () {
        arabic =parseInt( IsArabic());
        createCalendar();
    });

    return{
        createCalendar: createCalendar
    };


})(jQuery, typeof arabicMonths !== 'undefined' ? arabicMonths :
['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر']);
//['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر']);