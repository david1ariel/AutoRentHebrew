using System;
using System.Collections.Generic;
using System.Text;

namespace BeardMan
{
    public class LocationModel
    {
        public int LocationId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public LocationModel() { }

        public LocationModel(Location location)
        {
            LocationId = location.LocationId;
            Latitude = location.Latitude;
            Longitude = location.Longitude;
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
    }
}
