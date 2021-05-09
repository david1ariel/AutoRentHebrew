using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class BranchUser
    {
        public int BranchUserId { get; set; }
        public int BranchId { get; set; }
        public string UserId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual User User { get; set; }
    }
}
