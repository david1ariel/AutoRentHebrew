using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class CarsBranch
    {
        public int CarBranchId { get; set; }
        public string CarId { get; set; }
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual Car Car { get; set; }
    }
}
