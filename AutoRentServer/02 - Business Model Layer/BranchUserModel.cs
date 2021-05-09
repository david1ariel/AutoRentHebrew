using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class BranchUserModel
    {
        public int BranchUserId { get; set; }
        public int BranchId { get; set; }
        public string UserId { get; set; }

        public BranchUserModel() { }

        public BranchUserModel( BranchUser branchUser)
        {
            BranchUserId = branchUser.BranchUserId;
            BranchId = branchUser.BranchId;
            UserId = branchUser.UserId;
        }

        public BranchUser ConvertToBranchUser()
        {
            return new BranchUser
            {
                BranchUserId = BranchUserId,
                BranchId = BranchId,
                UserId = UserId
            };
        }
    }
}
