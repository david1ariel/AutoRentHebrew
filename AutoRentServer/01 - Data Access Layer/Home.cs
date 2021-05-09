using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class Home
    {
        public int HomeId { get; set; }
        public string MailingAdress { get; set; }
        public string SundayToThursdayOpenHour { get; set; }
        public string SundayToThursdayCloseHour { get; set; }
        public string FridayOpenHour { get; set; }
        public string FridayCloseHour { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string BackgroundImageFileName { get; set; }
    }
}
