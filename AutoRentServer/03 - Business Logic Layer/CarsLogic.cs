using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BeardMan
{
    public class CarsLogic : BaseLogic
    {
        public CarsLogic(AutoRentContext db) : base(db) { }



        public List<CarModel> GetAllCars()
        {
            List<CarModel> carModels = DB.Cars.Select(p => new CarModel(p)).ToList();

            for (int i = 0; i < carModels.Count; i++)
            {
                carModels[i].Branch = DB.Branches.SingleOrDefault(p => p.BranchId == DB.CarsBranches.SingleOrDefault(p => p.CarId == carModels[i].CarId).BranchId).Name;
            }

            return carModels;
        }

        public List<CarModel> GetAllAvailableCars(RentModel rentModel)
        {
            //List<Rent> query = DB.Rents
            //    .Where(p =>
            //        !(p.ReturnDate >= rentModel.PickupDate && p.ReturnDate <= rentModel.ReturnDate) ||
            //        !(p.PickupDate >= rentModel.PickupDate && p.PickupDate <= rentModel.ReturnDate) ||
            //        !(p.PickupDate <= rentModel.PickupDate && p.ReturnDate >= rentModel.ReturnDate))
            //    .ToList()
            //    .GroupBy(p => p.CarId)
            //    .Select(p => p.First())
            //    .ToList();

            //List<Car> query2 = query
            //    .Join(DB.Cars, rent => rent.CarId, car => car.CarId, (rent, car) => car)
            //    .Select(car => car)
            //    .Distinct()
            //    .ToList();


            List<Car> cars = DB.Cars.ToList();
            List<Rent> rents = DB.Rents.ToList();
            List<Car> availableCars = new List<Car>();
            foreach (var car in cars)
            {
                if (!rents.Any(p => p.CarId == car.CarId))
                {
                    availableCars.Add(car);
                    continue;
                }

                if (rents.Any(rent =>
                    rent.CarId==car.CarId && 
                        ((rent.ReturnDate >= rentModel.PickupDate && rent.ReturnDate <= rentModel.ReturnDate) ||
                        (rent.PickupDate >= rentModel.PickupDate && rent.PickupDate <= rentModel.ReturnDate) ||
                        (rent.PickupDate <= rentModel.PickupDate && rent.ReturnDate >= rentModel.ReturnDate))))
                {
                    continue;
                }
                availableCars.Add(car);




                //foreach (var rent in rents)
                //{

                //    if(car.CarId == rent.CarId && car.IsFixed == 1)
                //    {
                //        if (!(rent.ReturnDate >= rentModel.PickupDate && rent.ReturnDate <= rentModel.ReturnDate) ||
                //            !(rent.PickupDate >= rentModel.PickupDate && rent.PickupDate <= rentModel.ReturnDate) ||
                //            !(rent.PickupDate <= rentModel.PickupDate && rent.ReturnDate >= rentModel.ReturnDate))
                //        {
                //            availableCars.Add(car);
                //            break;
                //        }
                //    }
                //}
            }

            List<CarModel> availableCarModels = availableCars.Select(p => new CarModel(p)).ToList();
            foreach (var item in availableCarModels)
            {
                item.Branch = DB.Branches.SingleOrDefault(p => p.BranchId == DB.CarsBranches.SingleOrDefault(p => p.CarId == item.CarId).BranchId).Name;
            }
            return availableCarModels;
        }

        public CarModel GetSingleCar(string carId)
        {
            return new CarModel(DB.Cars.SingleOrDefault(p => p.CarId == carId));
        }
        

        public List<CarModel> GetCarsByCarTypeId(int carTypeId)
        {
            List<CarModel> carModels = DB.Cars.Where(p => p.CarTypeId == carTypeId).Select(p => new CarModel(p)).ToList();
            bool isCarAvailable;
            for (int i = 0; i < carModels.Count; i++)
            {
                carModels[i].Branch = DB.Branches.SingleOrDefault(p => p.BranchId == DB.CarsBranches.SingleOrDefault(p => p.CarId == carModels[i].CarId).BranchId).Name;
            }

            foreach (var car in carModels)
            {
                isCarAvailable = true;
                foreach (var avail in DB.Rents.Where(p => p.CarId == car.CarId)
                    .Join(
                    DB.Cars,
                    avail => avail.CarId,
                    car => car.CarId,
                    (avail, car) => new { avail, car })
                    .Join(
                    DB.CarTypes,
                    availCar => availCar.car.CarTypeId,
                    carType => carType.CarTypeId,
                    (availCar, carType) => new { availCar, carType })
                    .Where(p => p.carType.CarTypeId == carTypeId)
                    .ToList())
                {
                    if (avail.availCar.avail.PickupDate <= DateTime.Now && avail.availCar.avail.ReturnDate >= DateTime.Now)
                        isCarAvailable = false;
                    break;

                }
                if (isCarAvailable == false)
                    car.IsAvailable = false;
                else
                    car.IsAvailable = true;

            }

            return carModels;
        }

        public CarModel AddCar(CarModel carModel)
        {
            Car car = carModel.ConvertToCar();

            using (DB.Database.BeginTransaction())
            {
                DB.Cars.Add(car);
                DB.SaveChanges();


                CarsBranch carsBranch = new CarsBranch();

                carsBranch.CarId = car.CarId;
                carsBranch.BranchId = DB.Branches.SingleOrDefault(p => p.Name == carModel.Branch).BranchId;

                DB.CarsBranches.Add(carsBranch);
                DB.SaveChanges();

                DB.Database.CommitTransaction();
            }

            carModel.CarId = car.CarId;

            return carModel;
        }

        public CarModel UpdateCar(CarModel carModel)
        {
            Car car = DB.Cars.SingleOrDefault(p => p.CarId == carModel.CarId);

            if (car == null)
                return null;

            if (carModel.IsFixed == true && car.IsFixed != 1)
                car.IsFixed = 1;
            if (carModel.IsFixed == false && car.IsFixed != 0)
                car.IsFixed = 0;

            if (car.Km != carModel.Km)
                car.Km = carModel.Km;

            CarsBranch carsBranch = DB.CarsBranches.SingleOrDefault(p => p.CarId == car.CarId);
            if (DB.Branches.SingleOrDefault(p => p.BranchId == carsBranch.BranchId).Name != carModel.Branch)
                carsBranch.BranchId = DB.Branches.SingleOrDefault(p => p.Name == carModel.Branch).BranchId;

            DB.SaveChanges();

            return carModel;
        }

        public void DeleteCar(string carId)
        {
            Car carToDelete = DB.Cars.SingleOrDefault(p => p.CarId == carId);
            DB.Cars.Remove(carToDelete);
            DB.SaveChanges();
        }

        
    }
}
