using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    class UsersAdressModel
    {
        public int UserAdressId { get; set; }
        public string UserId { get; set; }
        public int? AdressId { get; set; }

        public UsersAdressModel( UsersAdress usersAdress)
        {
            UserAdressId = usersAdress.UserAdressId;
            UserId = usersAdress.UserId;
            AdressId = usersAdress.AdressId;
        }
    }
}
