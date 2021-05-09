using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    class CarsBranchModel
    {
        public int CarBranchId { get; set; }
        public string CarId { get; set; }
        public int? BranchId { get; set; }

        public CarsBranchModel() { }

        public CarsBranchModel(CarsBranch carsBranch)
        {
            CarBranchId = carsBranch.CarBranchId;
            CarId = carsBranch.CarId;
            BranchId = carsBranch.BranchId;
        }
    }
}
