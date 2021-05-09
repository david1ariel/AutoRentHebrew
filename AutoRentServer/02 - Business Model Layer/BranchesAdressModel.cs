using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    class BranchesAdressModel
    {
        public int BranchAdressId { get; set; }
        public int? BranchId { get; set; }
        public int? AdressId { get; set; }

        public BranchesAdressModel() { }

        public BranchesAdressModel(BranchesAdress branchesAdress)
        {
            BranchAdressId = branchesAdress.BranchAdressId;
            BranchId = branchesAdress.BranchId;
            AdressId = branchesAdress.AdressId;
        }
    }
}
