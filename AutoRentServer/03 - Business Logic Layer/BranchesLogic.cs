using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml.Linq;

namespace BeardMan
{
    public class BranchesLogic : BaseLogic
    {
        public BranchesLogic(AutoRentContext db) : base(db) { }

        public List<BranchModel> GetAllBranches()
        {
            var result = DB.Branches
                .Join(
                    DB.Locations,
                    branch => branch.LocationId,
                    location => location.LocationId,
                    (branch, location) => new { branch, location })
                .Join(
                    DB.BranchesAdresses,
                    BranchLocation => BranchLocation.branch.BranchId,
                    branchAdress => branchAdress.BranchId,
                    (BranchLocation, branchAdress) => new { BranchLocation, branchAdress })
                .Join(
                    DB.Adresses,
                    branchLocationAdress => branchLocationAdress.branchAdress.AdressId,
                    adress => adress.AdressId, (branchLocationAdress, adress) => new { branchLocationAdress, adress })
                .Select(p => new BranchModel()
                {
                    BranchId = p.branchLocationAdress.BranchLocation.branch.BranchId,
                    Name = p.branchLocationAdress.BranchLocation.branch.Name,
                    Latitude = p.branchLocationAdress.BranchLocation.location.Latitude,
                    Longitude = p.branchLocationAdress.BranchLocation.location.Longitude,
                    Country = p.adress.Country,
                    City = p.adress.City,
                    AdressLine = p.adress.AdressLine,
                    PostalZipCode = p.adress.PostalZipCode
                }).ToList();
            return result;
        }

        public BranchModel AddBranch(BranchModel branch)
        {
            if (DB.Branches.SingleOrDefault(p => p.Name == branch.Name) != null)
                throw new ExistingBranchNameException();
            if (DB.Adresses.SingleOrDefault(p => p.City == branch.City && p.AdressLine == branch.AdressLine) != null)
                throw new ExistingAdressException();

            using (DB.Database.BeginTransaction())
            {
                if (branch.Latitude == 0 || branch.Longitude == 0)
                {
                    GetLatLngByAdress(branch);
                }

                Location addedLocation = branch.ConvertToLocation();
                DB.Locations.Add(addedLocation);
                DB.SaveChanges();
                branch.LocationId = addedLocation.LocationId;

                Branch addedBranch = branch.ConvertToBranch();
                DB.Branches.Add(addedBranch);
                DB.SaveChanges();
                branch.BranchId = addedBranch.BranchId;

                Adress addedAdress = branch.ConvertToAdress();
                DB.Adresses.Add(addedAdress);
                DB.SaveChanges();

                BranchesAdress branchesAdress = new BranchesAdress();
                branchesAdress.AdressId = addedAdress.AdressId;
                branchesAdress.BranchId = addedBranch.BranchId;
                DB.BranchesAdresses.Add(branchesAdress);

                DB.SaveChanges();
                
                DB.Database.CommitTransaction();
            }
            return branch;
        }

        public BranchModel UpdateBranch(BranchModel branchModel)
        {
            Branch branch = DB.Branches.SingleOrDefault(p => p.BranchId == branchModel.BranchId);
            if (branch.Name != branchModel.Name)
                branch.Name = branchModel.Name;
            
            LocationModel location = new LocationModel(DB.Locations.SingleOrDefault(
                p => p.Latitude.ToString().Substring(0, 10) == branchModel.Latitude.ToString().Substring(0, 10)
                &&
                p.Longitude.ToString().Substring(0, 10) == branchModel.Longitude.ToString().Substring(0, 10)));

            Adress adress = DB.Adresses.SingleOrDefault(p => p.AdressId == DB.BranchesAdresses.FirstOrDefault(p => p.BranchId == branchModel.BranchId).AdressId);

            if ((branchModel.Country != adress.Country || branchModel.City != adress.City || branchModel.AdressLine != adress.AdressLine)
                &&
                (branchModel.Latitude == location.Latitude && branchModel.Longitude == location.Longitude))
            {
                GetLatLngByAdress(branchModel);
            }
            
            if (adress.Country != branchModel.Country)
                adress.Country = branchModel.Country;
            if (adress.City != branchModel.City)
                adress.City = branchModel.City;
            if (adress.AdressLine != branchModel.AdressLine)
                adress.AdressLine = branchModel.AdressLine;
            if (adress.PostalZipCode != branchModel.PostalZipCode)
                adress.PostalZipCode = branchModel.PostalZipCode;

            if (branchModel.Latitude != location.Latitude || branchModel.Longitude != location.Longitude)
            {
                location.Latitude = branchModel.Latitude;
                location.Longitude = branchModel.Longitude;
            }

            DB.SaveChanges();

            return branchModel;
        }

        public void DeleteBranch(int branchId)
        {
            Branch branchToDelete = DB.Branches.SingleOrDefault(p => p.BranchId == branchId);
            Adress adressToDelete = DB.Adresses.SingleOrDefault(p => p.AdressId == DB.BranchesAdresses.SingleOrDefault(p => p.BranchId == branchId).AdressId);
            if (branchToDelete != null && adressToDelete != null)
            {
                DB.Branches.Remove(branchToDelete);
                DB.Adresses.Remove(adressToDelete);
                DB.SaveChanges();
            }

        }

        private static BranchModel GetLatLngByAdress(BranchModel branchModel)
        {
            string address = branchModel.AdressLine + ", " + branchModel.City;
            string apiKey = "AIzaSyBipKMPPpcUPALUdBAmZ25cKLSj2BBoZA8";
            string requestUri = string.Format("https://maps.googleapis.com/maps/api/geocode/xml?key={1}&address={0}&sensor=false", Uri.EscapeDataString(address), apiKey);

            WebRequest request = WebRequest.Create(requestUri);
            WebResponse response = request.GetResponse();
            XDocument xdoc = XDocument.Load(response.GetResponseStream());

            XElement result = xdoc.Element("GeocodeResponse").Element("result");
            XElement locationElement = result.Element("geometry").Element("location");

            branchModel.Latitude = (decimal)locationElement.Element("lat");
            branchModel.Longitude = (decimal)locationElement.Element("lng");

            return branchModel;
        }
    }
}
