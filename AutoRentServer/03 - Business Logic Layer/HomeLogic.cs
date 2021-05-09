using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace BeardMan
{
    public class HomeLogic : BaseLogic
    {
        public HomeLogic(AutoRentContext db) : base(db) { }

        public HomeModel GetHomeObject()
        {
            return new HomeModel(DB.Homes.First());
        }


        public HomeModel UpdateHome(HomeModel homeModel)
        {
            if (homeModel.BackgroundImage != null)
            {
                string extension = Path.GetExtension(homeModel.BackgroundImage.FileName);

                homeModel.BackgroundImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + homeModel.BackgroundImageFileName))
                {
                    homeModel.BackgroundImage.CopyTo(fileStream);
                }
                homeModel.BackgroundImage = null;
            }

            Home home = DB.Homes.FirstOrDefault();
            if (home == null)
            {
                DB.Homes.Add(homeModel.ConvertToHome());

            }
            else
            {
                home.MailingAdress = homeModel.MailingAdress;
                home.Phone = homeModel.Phone;
                home.Fax = homeModel.Fax;
                home.SundayToThursdayOpenHour = homeModel.SundayToThursdayOpenHour;
                home.SundayToThursdayCloseHour = homeModel.SundayToThursdayCloseHour;
                home.FridayOpenHour = homeModel.FridayOpenHour;
                home.FridayCloseHour = homeModel.FridayCloseHour;
                home.BackgroundImageFileName = homeModel.BackgroundImageFileName;
            }
            
            DB.SaveChanges();
            return homeModel;
        }


    }
}
