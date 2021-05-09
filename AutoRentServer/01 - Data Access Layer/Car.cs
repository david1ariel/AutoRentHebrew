using System;
using System.Collections.Generic;

namespace BeardMan
{
    public partial class Car
    {
        public Car()
        {
            CarsBranches = new HashSet<CarsBranch>();
            Rents = new HashSet<Rent>();
        }

        public string CarId { get; set; }
        public int Km { get; set; }
        public int CarTypeId { get; set; }
        public byte IsFixed { get; set; }

        public virtual CarType CarType { get; set; }
        public virtual ICollection<CarsBranch> CarsBranches { get; set; }
        public virtual ICollection<Rent> Rents { get; set; }
    }
}
