using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class UsersAdress
    {
        public int UserAdressId { get; set; }
        public string UserId { get; set; }
        public int AdressId { get; set; }

        public virtual Adress Adress { get; set; }
        public virtual User User { get; set; }
    }
}
