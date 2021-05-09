using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class AvailabilityModel
    {
        public int AvailabilityId { get; set; }
        public string CarId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }

        public AvailabilityModel() { }

        public AvailabilityModel(Availability availability)
        {
            AvailabilityId = availability.AvailabilityId;
            CarId = availability.CarId;
            PickupDate = availability.PickupDate;
            ReturnDate = availability.ReturnDate;
        }

        public Availability ConvertToAvailability()
        {
            return new Availability
            {
                AvailabilityId = AvailabilityId,
                CarId = CarId,
                PickupDate = PickupDate,
                ReturnDate = ReturnDate
            };
        }
    }
}
