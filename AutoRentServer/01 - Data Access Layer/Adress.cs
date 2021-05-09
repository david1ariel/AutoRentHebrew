using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class Adress
    {
        public Adress()
        {
            BranchesAdresses = new HashSet<BranchesAdress>();
            UsersAdresses = new HashSet<UsersAdress>();
        }

        public int AdressId { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string AdressLine { get; set; }
        public string PostalZipCode { get; set; }

        public virtual ICollection<BranchesAdress> BranchesAdresses { get; set; }
        public virtual ICollection<UsersAdress> UsersAdresses { get; set; }
    }
}
