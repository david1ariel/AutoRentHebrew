using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BeardMan
{
    public class RentsLogic : BaseLogic
    {
        public RentsLogic(AutoRentContext db) : base(db) { }

        public List<RentModel> GetAllRents()
        {
            return DB.Rents.Select(p => new RentModel(p)).ToList();
        }

        public List<RentModel> GetRentsByCarId(string carId)
        {
            return DB.Rents.Where(p => p.CarId == carId).Select(p => new RentModel(p)).ToList();
        }

        
        public RentModel RentFirstCarAvailable(int carTypeId, RentModel rentModel)
        {
            CarModel rentedCar = new CarModel();
            Car car = (DB.Cars.FirstOrDefault(p => p.CarTypeId == carTypeId && !DB.Rents.Any(r => r.CarId == p.CarId)));
            if (car != null)
                rentedCar = new CarModel(car);

            else
            {
                rentedCar = new CarModel(DB.Cars.FirstOrDefault(
                    p => p.CarTypeId == carTypeId && !(DB.Rents.Any(r =>
                                     ((r.ReturnDate >= rentModel.PickupDate && r.ReturnDate <= rentModel.ReturnDate) ||
                                     (r.PickupDate >= rentModel.PickupDate && r.PickupDate <= rentModel.ReturnDate) ||
                                     (r.PickupDate <= rentModel.PickupDate && r.ReturnDate >= rentModel.ReturnDate)) && r.CarId == p.CarId))));
            }

            if (rentedCar == null)
                return null;

            rentModel.CarId = rentedCar.CarId;
            rentModel.PracticalReturnDate = null;

            DB.Rents.Add(rentModel.convertToRent());
            DB.SaveChanges();


            return rentModel;
        }

        public RentModel RentCar(RentModel rentModel)
        {



            DB.Rents.Add(rentModel.convertToRent());
            DB.SaveChanges();
            return rentModel;
        }

        public RentModel GetCurrentRentOfCarId(string carId)
        {
            RentModel currentRent = new RentModel(DB.Rents
                .SingleOrDefault(p => p.CarId == carId 
                && p.PickupDate < DateTime.Now 
                && p.PracticalReturnDate ==null));
            return currentRent;
        }

        public RentModel ReturnCar(int rentId, RentModel rentModel)
        {
            Rent rentToUpdate = DB.Rents.SingleOrDefault(p => p.RentId == rentId);
            if (rentToUpdate == null)
                return null;
            rentToUpdate.PracticalReturnDate = rentModel.PracticalReturnDate;
            rentToUpdate.FinalPayment = rentModel.FinalPayment;
            DB.SaveChanges();

            return rentModel;
        }

        public List<RentModel> GetRentsOfUser(string userId)
        {
            List<RentModel> rentModels = DB.Rents.Where(p => p.UserId == userId).Select(p => new RentModel(p)).ToList();
            return rentModels;
        }

        public RentModel UpdateRent(int rentId, RentModel rentModel)
        {
            Rent rentToUpdate = DB.Rents.SingleOrDefault(p => p.RentId == rentId);
            rentToUpdate.PickupDate = rentModel.PickupDate;
            rentToUpdate.ReturnDate = rentModel.ReturnDate;
            rentToUpdate.PracticalReturnDate = rentModel.PracticalReturnDate;
            rentToUpdate.FinalPayment = rentModel.FinalPayment;
            rentToUpdate.UserId = rentModel.UserId;
            DB.SaveChanges();
            return new RentModel(rentToUpdate);
        }

        public void DeleteRent(int rentId)
        {
            Rent rentToDelete = DB.Rents.SingleOrDefault(p => p.RentId == rentId);
            DB.Rents.Remove(rentToDelete);
            DB.SaveChanges();
        }
    }
}
