using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisaRegistration.Models;

namespace VisaRegistration.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext content = new ApplicationDbContext();
        private Reg_Entities db = new Reg_Entities();
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult SearchData()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ProcessSearchData()
        {
            var visa1 = Request.Form["input_visa_1"];
            var visa2 = Request.Form["input_visa_2"];
            var visa3 = Request.Form["input_visa_3"];
            var visa4 = Request.Form["input_visa_4"];
            var name = Request.Form["fullname"];
            int gender = 0, dob_dd = 0, dob_mmm = 0, dob_yyyy = 0, nationality = 0;
            var exception = false;
            var exceptionMessage = "";
            try
            {
                gender = Convert.ToInt32(Request.Form["input_gender"]);
                dob_dd = Convert.ToInt32(Request.Form["select_dd"]);
                dob_mmm = Convert.ToInt32(Request.Form["select_mmm"]);
                dob_yyyy = Convert.ToInt32(Request.Form["select_yyyy"]);
                nationality = Convert.ToInt32(Request.Form["select_nationality"]);
            }
            catch
            {
                exception = true;
                exceptionMessage = "Gender, date of birth and/or nationality was not specified.";
            }

            if (string.IsNullOrEmpty(visa1))
            {
                exception = true;
                exceptionMessage = "Visa number entered is invalid.";
            }

            if (string.IsNullOrEmpty(visa2))
            {
                exception = true;
                exceptionMessage = "Visa number entered is invalid.";
            }

            if (string.IsNullOrEmpty(visa3))
            {
                exception = true;
                exceptionMessage = "Visa number entered is invalid.";
            }

            if (string.IsNullOrEmpty(visa4))
            {
                exception = true;
                exceptionMessage = "Visa number entered is invalid.";
            }

            if (string.IsNullOrEmpty(name))
            {
                exception = true;
                exceptionMessage = "Name was not entered.";
            }

            DateTime dateOfBirth = DateTime.Now;
            try
            {
                dateOfBirth = new DateTime(dob_yyyy, dob_mmm, dob_dd);
            }
            catch
            {
                exception = true;
                exceptionMessage = "Date of birth was invalid.";
            }

            bool valid = true;

            try
            {
                var inDb = db.registrations
                .Where(reg => reg.VisaNum1.Equals(visa1, StringComparison.OrdinalIgnoreCase)
                    && reg.VisaNum2.Equals(visa2, StringComparison.OrdinalIgnoreCase)
                    && reg.VisaNum3.Equals(visa3, StringComparison.OrdinalIgnoreCase)
                    && reg.VisaNum4.Equals(visa4, StringComparison.OrdinalIgnoreCase)
                    && reg.Name.Equals(name, StringComparison.OrdinalIgnoreCase)
                    && reg.DateOfBirth == dateOfBirth
                    && reg.Nationality == nationality)
                .First();
            }
            catch
            {
                valid = false;
            }

            var registration = new registration
            {
                DateOfBirth = dateOfBirth,
                Gender = gender,
                Name = name,
                Nationality = nationality,
                VisaNum1 = visa1,
                VisaNum2 = visa2,
                VisaNum3 = visa3,
                VisaNum4 = visa4
            };

            ViewBag.Registration = registration;
            ViewBag.Valid = valid;
            ViewBag.Exception = exception;
            ViewBag.ExceptionMessage = exceptionMessage;

            return View();
        }

        [Authorize(Roles = "admin")]
        public ActionResult ShowRegisterData()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public ActionResult RegisterData()
        {
            var visa1 = Request.Form["input_visa_1"];
            var visa2 = Request.Form["input_visa_2"];
            var visa3 = Request.Form["input_visa_3"];
            var visa4 = Request.Form["input_visa_4"];
            var name = Request.Form["fullname"];
            int gender, dob_dd, dob_mmm, dob_yyyy, nationality;
            try
            {
                gender = Convert.ToInt32(Request.Form["input_gender"]);
                dob_dd = Convert.ToInt32(Request.Form["select_dd"]);
                dob_mmm = Convert.ToInt32(Request.Form["select_mmm"]);
                dob_yyyy = Convert.ToInt32(Request.Form["select_yyyy"]);
                nationality = Convert.ToInt32(Request.Form["select_nationality"]);
            }
            catch
            {
                return Content("Gender, date of birth and/or nationality was not specified.");
            }

            if (string.IsNullOrEmpty(visa1))
            {
                return Content("Visa number entered is invalid.");
            }

            if (string.IsNullOrEmpty(visa2))
            {
                return Content("Visa number entered is invalid.");
            }

            if (string.IsNullOrEmpty(visa3))
            {
                return Content("Visa number entered is invalid.");
            }

            if (string.IsNullOrEmpty(visa4))
            {
                return Content("Visa number entered is invalid.");
            }

            if (string.IsNullOrEmpty(name))
            {
                return Content("Name was not entered");
            }

            DateTime dateOfBirth;
            try
            {
                dateOfBirth = new DateTime(dob_yyyy, dob_mmm, dob_dd);
            }
            catch
            {
                return Content("Date of birth was not entered correctly");
            }

            var registration = new registration
            {
                DateOfBirth = dateOfBirth,
                Gender = gender,
                Name = name,
                Nationality = nationality,
                VisaNum1 = visa1,
                VisaNum2 = visa2,
                VisaNum3 = visa3,
                VisaNum4 = visa4
            };
            db.registrations.Add(registration);
            db.SaveChanges();
            return RedirectToAction("ShowRegisterData");
            
        }

        [Authorize(Roles = "admin")]
        public ActionResult ViewRegistrations()
        {
            return View(db.registrations.ToList());
        }

    }
}