using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BeardMan
{
    public class UsersLogic : BaseLogic
    {
        public UsersLogic(AutoRentContext db) : base(db) { }

        public List<UserModel> GetAllUsers()
        {
            List<UserModel> users = DB.Users.Select(p => new UserModel(p)).ToList();
            for (int i = 0; i < users.Count; i++)
            {
                Adress adress = DB.Adresses.SingleOrDefault(p => p.AdressId == DB.UsersAdresses.SingleOrDefault(p=>p.UserId== users[i].UserId).AdressId);
                if (adress != null)
                    users[i].SetAdress(adress);
                BranchUser branchToCheck = DB.BranchUsers.SingleOrDefault(p => p.UserId == users[i].UserId);
                if (branchToCheck != null)
                    users[i].BranchId = branchToCheck.BranchId;
            }
            return users;
        }

        public bool isUserNameExists(string userName)
        {
            return DB.Users.Any(u => u.Username == userName);
        }

        public UserModel GetUserByCredentials(CredentialsModel credentialsModel)
        {
            UserModel userToCheck = new UserModel(DB.Users.SingleOrDefault(p => p.Username == credentialsModel.Username));

            if (credentialsModel.Password == userToCheck.Password)
                return userToCheck;

            credentialsModel.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: credentialsModel.Password,
            salt: Convert.FromBase64String(userToCheck.Salt),
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

            if (credentialsModel.Password == userToCheck.Password)
                return userToCheck;


            return null;
        }



        public UserModel AddUser(UserModel userModel)
        {
            if (userModel.Image != null)
            {
                string extension = Path.GetExtension(userModel.Image.FileName);

                userModel.ImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + userModel.ImageFileName))
                {
                    userModel.Image.CopyTo(fileStream);
                }
                userModel.Image = null;
            }
            using (DB.Database.BeginTransaction())
            {
                if (userModel.Role == null)
                    userModel.Role = "user";

                byte[] salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }
                userModel.Salt = Convert.ToBase64String(salt);
                userModel.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: userModel.Password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));

                User addedUser = userModel.ConvertToUser();
                DB.Users.Add(addedUser);
                DB.SaveChanges();

                if (userModel.City != null && userModel.AdressLine != null)
                {
                    Adress addedAdress = userModel.ConvertToAdress();
                    DB.Adresses.Add(addedAdress);
                    DB.SaveChanges();

                    UsersAdress usersAdress = new UsersAdress
                    {
                        UserId = addedUser.UserId,
                        AdressId = addedAdress.AdressId
                    };
                    DB.SaveChanges();
                }

                BranchUser branchUserToAdd = new BranchUser
                {
                    UserId = addedUser.UserId,
                    BranchId = userModel.BranchId
                };
                DB.BranchUsers.Add(branchUserToAdd);
                DB.SaveChanges();

                DB.Database.CommitTransaction();

                userModel.UserId = addedUser.UserId;
            }
            return userModel;
        }

        public UserModel UpdateUser(UserModel userModel)
        {

            if (userModel.Image != null)
            {
                string extension = Path.GetExtension(userModel.Image.FileName);

                userModel.ImageFileName = Guid.NewGuid() + extension;

                using (FileStream fileStream = File.Create("Uploads/" + userModel.ImageFileName))
                {
                    userModel.Image.CopyTo(fileStream);
                }
                userModel.Image = null;
            }
            User user = DB.Users.SingleOrDefault(p => p.UserId == userModel.UserId);
            if (user.FirstName != userModel.FirstName)
                user.FirstName = userModel.FirstName;

            if (user.LastName != userModel.LastName)
                user.LastName = userModel.LastName;

            if (user.Email != userModel.Email)
                user.Email = userModel.Email;

            if (user.Username != userModel.Username)
                user.Username = userModel.Username;

            if (user.Password != userModel.Password)
                user.Password = userModel.Password;

            if (user.ImageFileName != userModel.ImageFileName)
                user.ImageFileName = userModel.ImageFileName;

            Adress adress = DB.Adresses.SingleOrDefault(p => p.AdressId == DB.UsersAdresses.FirstOrDefault(p => p.UserId == userModel.UserId).AdressId);
            if (adress != null)
            {
                if (userModel.Country != adress.Country || userModel.City != adress.City || userModel.AdressLine != adress.AdressLine)
                {
                    if (adress.Country != userModel.Country)
                        adress.Country = userModel.Country;
                    if (adress.City != userModel.City)
                        adress.City = userModel.City;
                    if (adress.AdressLine != userModel.AdressLine)
                        adress.AdressLine = userModel.AdressLine;
                    if (adress.PostalZipCode != userModel.PostalZipCode)
                        adress.PostalZipCode = userModel.PostalZipCode;
                }
            }

            BranchUser branchUser = DB.BranchUsers.SingleOrDefault(p => p.UserId == userModel.UserId);
            if (branchUser == null)
            {
                BranchUser branchUserToAdd = new BranchUser
                {
                    BranchId=userModel.BranchId,
                    UserId = userModel.UserId
                };
                DB.BranchUsers.Add(branchUserToAdd);
            }
            else
            {
                if (branchUser.BranchId != userModel.BranchId)
                    branchUser.BranchId = userModel.BranchId;
            }
            DB.SaveChanges();

            return userModel;
        }

        public void DeleteUser(string userId)
        {
            User userToDelete = DB.Users.SingleOrDefault(p => p.UserId == userId);
            DB.Users.Remove(userToDelete);
            DB.SaveChanges();
        }

        public UserModel GetRentingClient(int rentId)
        {
            RentModel currentRent = new RentModel(DB.Rents.SingleOrDefault(p => p.RentId == rentId));
            UserModel rentingClient = new UserModel(DB.Users.SingleOrDefault(p => p.UserId == currentRent.UserId));
            return rentingClient;
        }
    }
}
