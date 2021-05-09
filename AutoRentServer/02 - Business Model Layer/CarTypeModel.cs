using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class CarTypeModel
    {
        public int CarTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal PricePerDayLate { get; set; }
        public int Year { get; set; }
        public string Gear { get; set; }
        public IFormFile Image { get; set; }
        public string ImageFileName { get; set; }

        public CarTypeModel() { }


        public CarTypeModel(CarType carType)
        {
            CarTypeId = carType.CarTypeId;
            Manufacturer = carType.Manufacturer;
            Model = carType.Model;
            PricePerDay = carType.PricePerDay;
            PricePerDayLate = carType.PricePerDayLate;
            Year = carType.Year;
            Gear = carType.Gear;
            ImageFileName = carType.ImageFileName;
        }

        public CarType ConvertToCarType()
        {
            return new CarType
            {
                CarTypeId = CarTypeId,
                Manufacturer = Manufacturer,
                Model = Model,
                PricePerDay = PricePerDay,
                PricePerDayLate = PricePerDayLate,
                Year = Year,
                Gear = Gear,
                ImageFileName = ImageFileName
            };
        }
    }
}
