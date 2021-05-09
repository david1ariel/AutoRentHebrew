using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class BranchesAdress
    {
        public int BranchAdressId { get; set; }
        public int BranchId { get; set; }
        public int AdressId { get; set; }

        public virtual Adress Adress { get; set; }
        public virtual Branch Branch { get; set; }
    }
}
