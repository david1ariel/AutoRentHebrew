using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class RentModel
    {
        public int RentId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? PracticalReturnDate { get; set; }
        public string UserId { get; set; }
        public string CarId { get; set; }
        public decimal? FinalPayment { get; set; }

        public RentModel() { }

        public RentModel(Rent rent)
        {
            RentId = rent.RentId;
            PickupDate = rent.PickupDate;
            ReturnDate = rent.ReturnDate;
            PracticalReturnDate = rent.PracticalReturnDate;
            UserId = rent.UserId;
            CarId = rent.CarId;
            FinalPayment = rent.FinalPayment;
        }

        public Rent convertToRent()
        {
            return new Rent
            {
                RentId = RentId,
                PickupDate = PickupDate,
                ReturnDate = ReturnDate,
                PracticalReturnDate = PracticalReturnDate,
                UserId = UserId,
                CarId = CarId,
                FinalPayment = FinalPayment
            };
        }
    }
}
