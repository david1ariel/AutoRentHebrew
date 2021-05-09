using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class BranchModel
    {
        public int BranchId { get; set; }
        public int LocationId { get; set; }
        public string Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string AdressLine { get; set; }
        public string PostalZipCode { get; set; }

        public BranchModel() { }

        public BranchModel(Branch branch)
        {
            BranchId = branch.BranchId;
            LocationId = branch.LocationId;
            Name = branch.Name;
        }

        public BranchModel(Location location)
        {
            LocationId = location.LocationId;
            Latitude = location.Latitude;
            Longitude = location.Longitude;
        }

        public BranchModel(Adress adress)
        {
            Country = adress.Country;
            City = adress.City;
            AdressLine = adress.AdressLine;
            PostalZipCode = adress.PostalZipCode;

        }

        public BranchModel(Branch branch, Location location)
        {
            BranchId = branch.BranchId;
            LocationId = branch.LocationId;
            Name = branch.Name;
            LocationId = location.LocationId;
            Latitude = location.Latitude;
            Longitude = location.Longitude;
        }

        public Branch ConvertToBranch()
        {
            return new Branch
            {
                BranchId = BranchId,
                LocationId = LocationId,
                Name = Name
            };
        }

        public Location ConvertToLocation()
        {
            return new Location
            {
                LocationId = LocationId,
                Latitude = Latitude,
                Longitude = Longitude
            };
        }

        public Adress ConvertToAdress()
        {
            return new Adress
            {
                Country = Country,
                City = City,
                AdressLine = AdressLine,
                PostalZipCode = PostalZipCode
            };
        }
    }
}
