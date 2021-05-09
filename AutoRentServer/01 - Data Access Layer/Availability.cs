using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class Availability
    {
        public int AvailabilityId { get; set; }
        public string CarId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
