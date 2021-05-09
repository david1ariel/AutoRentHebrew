using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BeardMan
{
    public class CarModel
    {
        private AutoRentContext DB;

        public CarModel(AutoRentContext DB)
        {
            this.DB = DB;
        }

        public string CarId { get; set; }
        public int Km { get; set; }
        public int CarTypeId { get; set; }
        public bool IsFixed { get; set; }
        public bool IsAvailable { get; set; }
        public string Branch { get; set; }

        public CarModel() { }

        public CarModel(Car car)
        {
            CarId = car.CarId;
            Km = car.Km;
            CarTypeId = car.CarTypeId;
            if(car.IsFixed == 1)
                IsFixed = true;
            if (car.IsFixed == 0)
                IsFixed = false;
        }

        public Car ConvertToCar()
        {
            Car car = new Car
            {
                CarId = CarId,
                Km = Km,
                CarTypeId = CarTypeId,
            };

            if (IsFixed == true)
                car.IsFixed = 1;
            if (IsFixed == false)
                car.IsFixed = 0;

            return car;
        }
    }
}
