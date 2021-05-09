using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class Rent
    {
        public int RentId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? PracticalReturnDate { get; set; }
        public string UserId { get; set; }
        public string CarId { get; set; }
        public decimal? FinalPayment { get; set; }

        public virtual Car Car { get; set; }
        public virtual User User { get; set; }
    }
}
