using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BeardMan
{
    public partial class AutoRentContext : DbContext
    {
        public AutoRentContext()
        {
        }

        public AutoRentContext(DbContextOptions<AutoRentContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Adress> Adresses { get; set; }
        public virtual DbSet<Availability> Availabilities { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<BranchUser> BranchUsers { get; set; }
        public virtual DbSet<BranchesAdress> BranchesAdresses { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<CarType> CarTypes { get; set; }
        public virtual DbSet<CarsBranch> CarsBranches { get; set; }
        public virtual DbSet<Home> Homes { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Rent> Rents { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UsersAdress> UsersAdresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-C2FEDD5\\SQLEXPRESS;Database=AutoRent;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Adress>(entity =>
            {
                entity.Property(e => e.AdressLine)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(15);

                entity.Property(e => e.Country).HasMaxLength(15);

                entity.Property(e => e.PostalZipCode).HasMaxLength(10);
            });

            modelBuilder.Entity<Availability>(entity =>
            {
                entity.Property(e => e.CarId)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.PickupDate).HasColumnType("date");

                entity.Property(e => e.ReturnDate).HasColumnType("date");
            });

            modelBuilder.Entity<Branch>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<BranchUser>(entity =>
            {
                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.BranchUsers)
                    .HasForeignKey(d => d.BranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BranchUsers_Branches");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BranchUsers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BranchUsers_Users");
            });

            modelBuilder.Entity<BranchesAdress>(entity =>
            {
                entity.HasKey(e => e.BranchAdressId);

                entity.HasOne(d => d.Adress)
                    .WithMany(p => p.BranchesAdresses)
                    .HasForeignKey(d => d.AdressId)
                    .HasConstraintName("FK_BranchesAdresses_Adresses");

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.BranchesAdresses)
                    .HasForeignKey(d => d.BranchId)
                    .HasConstraintName("FK_BranchesAdresses_Branches");
            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.Property(e => e.CarId).HasMaxLength(8);

                entity.HasOne(d => d.CarType)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.CarTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cars_CarTypes");
            });

            modelBuilder.Entity<CarType>(entity =>
            {
                entity.Property(e => e.Gear)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.ImageFileName)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Manufacturer)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PricePerDay).HasColumnType("money");

                entity.Property(e => e.PricePerDayLate).HasColumnType("money");
            });

            modelBuilder.Entity<CarsBranch>(entity =>
            {
                entity.HasKey(e => e.CarBranchId);

                entity.Property(e => e.CarId)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.CarsBranches)
                    .HasForeignKey(d => d.BranchId)
                    .HasConstraintName("FK_CarsBranches_Branches");

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.CarsBranches)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CarsBranches_Cars");
            });

            modelBuilder.Entity<Home>(entity =>
            {
                entity.ToTable("Home");

                entity.Property(e => e.BackgroundImageFileName).HasMaxLength(1000);

                entity.Property(e => e.Fax).HasMaxLength(50);

                entity.Property(e => e.FridayCloseHour).HasMaxLength(7);

                entity.Property(e => e.FridayOpenHour).HasMaxLength(7);

                entity.Property(e => e.MailingAdress).HasMaxLength(150);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.SundayToThursdayCloseHour).HasMaxLength(7);

                entity.Property(e => e.SundayToThursdayOpenHour).HasMaxLength(7);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Latitude).HasColumnType("decimal(17, 15)");

                entity.Property(e => e.Longitude).HasColumnType("decimal(17, 15)");
            });

            modelBuilder.Entity<Rent>(entity =>
            {
                entity.Property(e => e.CarId)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.FinalPayment).HasColumnType("money");

                entity.Property(e => e.PickupDate).HasColumnType("date");

                entity.Property(e => e.PracticalReturnDate).HasColumnType("date");

                entity.Property(e => e.ReturnDate).HasColumnType("date");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rents_Cars1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rents_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasMaxLength(10);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.ImageFileName).HasMaxLength(200);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Salt).HasMaxLength(500);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<UsersAdress>(entity =>
            {
                entity.HasKey(e => e.UserAdressId);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Adress)
                    .WithMany(p => p.UsersAdresses)
                    .HasForeignKey(d => d.AdressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersAdresses_Adresses");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersAdresses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersAdresses_Users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
