using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeardMan
{
    public class CarTypesLogic : BaseLogic
    {
        public CarTypesLogic(AutoRentContext db) : base(db) { }

        public List<CarTypeModel> GetAllCarTypes()
        {
            return DB.CarTypes.Select(p => new CarTypeModel(p)).ToList();
        }

        public CarTypeModel UpdateCarType(CarTypeModel carTypeModel)
        {
            if (carTypeModel.Image != null)
            {
                string extension = Path.GetExtension(carTypeModel.Image.FileName);
                carTypeModel.ImageFileName = Guid.NewGuid() + extension;
                using (FileStream fileStream = File.Create("Uploads/" + carTypeModel.ImageFileName))
                {
                    carTypeModel.Image.CopyTo(fileStream);
                }
                carTypeModel.Image = null;
            }

            CarType carType = DB.CarTypes.SingleOrDefault(p => p.CarTypeId == carTypeModel.CarTypeId);

            carType.Manufacturer = carTypeModel.Manufacturer;
            carType.Model = carTypeModel.Model;
            carType.PricePerDay = carTypeModel.PricePerDay;
            carType.PricePerDayLate = carTypeModel.PricePerDayLate;
            carType.Year = carTypeModel.Year;
            carType.Gear = carTypeModel.Gear;
            carType.ImageFileName = carTypeModel.ImageFileName;


            DB.SaveChanges();
            carTypeModel.CarTypeId = carType.CarTypeId;
            return carTypeModel;
        }

        public CarTypeModel AddNewCarType(CarTypeModel carTypeModel)
        {
            if (carTypeModel.Image != null)
            {
                string extension = Path.GetExtension(carTypeModel.Image.FileName);

                carTypeModel.ImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + carTypeModel.ImageFileName))
                {
                    carTypeModel.Image.CopyTo(fileStream);
                }
                carTypeModel.Image = null;
            }
            CarType addedCarType = carTypeModel.ConvertToCarType();

            DB.CarTypes.Add(addedCarType);
            DB.SaveChanges();
            carTypeModel.CarTypeId = addedCarType.CarTypeId;
            return carTypeModel;
        }

        //public List<CarTypeModel> UpdateManyCarTypes(List<CarTypeModel> carTypesToUpdate)
        //{
        //    for (int i = 0; i < carTypesToUpdate.Count; i++)
        //    {
        //        carTypesToUpdate[i] = this.UpdateCarType(carTypesToUpdate[i]);
        //    }

        //    return carTypesToUpdate;
        //}

        public List<CarTypeModel> GetAllAvailableCarTypes(RentModel rentModel)
        {
            List<string> unabailableCarsIds = DB.Rents
                .Where(rent =>
                        (rent.ReturnDate >= rentModel.PickupDate && rent.ReturnDate <= rentModel.ReturnDate) ||
                        (rent.PickupDate >= rentModel.PickupDate && rent.PickupDate <= rentModel.ReturnDate) ||
                        (rent.PickupDate <= rentModel.PickupDate && rent.ReturnDate >= rentModel.ReturnDate))
                .ToList()
                .GroupBy(p => p.CarId)
                .Select(p => p.First().CarId)
                .ToList();

            List<CarType> availableCarTypes = DB.Cars
                .Where(p=>!unabailableCarsIds.Contains(p.CarId))
                .Join(DB.CarTypes, car => car.CarTypeId, carType => carType.CarTypeId, (car, carType) => carType)
                .Select(carType => carType)
                .Distinct()
                .ToList();

            List<CarTypeModel> carTypeModels = new List<CarTypeModel>();
            foreach (var item in availableCarTypes)
            {
                carTypeModels.Add(new CarTypeModel(item));
            }

            List<Car> carsWithNoAvail = new List<Car>();
            bool carHasNoAvail;

            List<Car> cars = DB.Cars.ToList();

            foreach (var car in cars)
            {
                carHasNoAvail = true;
                foreach (var rent in DB.Rents)
                {
                    if (rent.CarId == car.CarId)
                    {
                        carHasNoAvail = false;
                        break;
                    }
                }
                if (carHasNoAvail == true)
                {
                    carsWithNoAvail.Add(car);
                }
            }
            foreach (var item in carsWithNoAvail)
            {
                CarTypeModel carTypeToCheck = carTypeModels.SingleOrDefault(p => p.CarTypeId == item.CarTypeId);
                if (carTypeToCheck == null)
                    carTypeModels.Add(new CarTypeModel(DB.CarTypes.SingleOrDefault(p => p.CarTypeId == item.CarTypeId)));
            }
            return carTypeModels;
        }

        public void DeleteCarType(int id)
        {
            CarType carTypeToDelete = DB.CarTypes.SingleOrDefault(p => p.CarTypeId == id);
            DB.CarTypes.Remove(carTypeToDelete);
            DB.SaveChanges();
        }
    }
}

