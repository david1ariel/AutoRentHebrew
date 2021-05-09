using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class CarType
    {
        public CarType()
        {
            Cars = new HashSet<Car>();
        }

        public int CarTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal PricePerDayLate { get; set; }
        public int Year { get; set; }
        public string Gear { get; set; }
        public string ImageFileName { get; set; }

        public virtual ICollection<Car> Cars { get; set; }
    }
}
