using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class HomeModel
    {
        
        public string MailingAdress { get; set; }
        public string SundayToThursdayOpenHour { get; set; }
        public string SundayToThursdayCloseHour { get; set; }
        public string FridayOpenHour { get; set; }
        public string FridayCloseHour { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public IFormFile BackgroundImage { get; set; }
        public string BackgroundImageFileName { get; set; }

        public HomeModel(){}

        public HomeModel(Home home)
        {
            
            MailingAdress = home.MailingAdress;
            SundayToThursdayOpenHour = home.SundayToThursdayOpenHour;
            SundayToThursdayCloseHour = home.SundayToThursdayCloseHour;
            FridayOpenHour = home.FridayOpenHour;
            FridayCloseHour = home.FridayCloseHour;
            Phone = home.Phone;
            Fax = home.Fax;
            BackgroundImageFileName = home.BackgroundImageFileName;

        }

        public Home ConvertToHome()
        {
            Home home = new Home
            {
                
                MailingAdress = MailingAdress,
                SundayToThursdayOpenHour = SundayToThursdayOpenHour,
                SundayToThursdayCloseHour = SundayToThursdayCloseHour,
                FridayOpenHour = FridayOpenHour,
                FridayCloseHour = FridayCloseHour,
                Phone = Phone,
                Fax = Fax,
                BackgroundImageFileName = BackgroundImageFileName
            };
            return home;
        }
    }
}
