USE [master]
GO
/****** Object:  Database [AutoRent]    Script Date: 24/12/2020 04:03:29 ******/
CREATE DATABASE [AutoRent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AutoRent', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AutoRent.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AutoRent_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AutoRent_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [AutoRent] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AutoRent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AutoRent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AutoRent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AutoRent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AutoRent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AutoRent] SET ARITHABORT OFF 
GO
ALTER DATABASE [AutoRent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AutoRent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AutoRent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AutoRent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AutoRent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AutoRent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AutoRent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AutoRent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AutoRent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AutoRent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AutoRent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AutoRent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AutoRent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AutoRent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AutoRent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AutoRent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AutoRent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AutoRent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AutoRent] SET  MULTI_USER 
GO
ALTER DATABASE [AutoRent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AutoRent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AutoRent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AutoRent] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AutoRent] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AutoRent] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [AutoRent] SET QUERY_STORE = OFF
GO
USE [AutoRent]
GO
/****** Object:  Table [dbo].[Adresses]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Adresses](
	[AdressId] [int] IDENTITY(1,1) NOT NULL,
	[Country] [nvarchar](15) NULL,
	[city] [nvarchar](15) NOT NULL,
	[AdressLine] [nvarchar](50) NOT NULL,
	[PostalZipCode] [nvarchar](10) NULL,
 CONSTRAINT [PK_Adresses] PRIMARY KEY CLUSTERED 
(
	[AdressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Availabilities]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Availabilities](
	[AvailabilityId] [int] IDENTITY(1,1) NOT NULL,
	[CarId] [nvarchar](8) NOT NULL,
	[PickupDate] [date] NOT NULL,
	[ReturnDate] [date] NOT NULL,
 CONSTRAINT [PK_Availabilities] PRIMARY KEY CLUSTERED 
(
	[AvailabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchId] [int] IDENTITY(1,1) NOT NULL,
	[LocationId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BranchesAdresses]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BranchesAdresses](
	[BranchAdressId] [int] IDENTITY(1,1) NOT NULL,
	[BranchId] [int] NOT NULL,
	[AdressId] [int] NOT NULL,
 CONSTRAINT [PK_BranchesAdresses] PRIMARY KEY CLUSTERED 
(
	[BranchAdressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarId] [nvarchar](8) NOT NULL,
	[Km] [int] NOT NULL,
	[CarTypeId] [int] NOT NULL,
	[IsFixed] [tinyint] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarsBranches]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarsBranches](
	[CarBranchId] [int] IDENTITY(1,1) NOT NULL,
	[CarId] [nvarchar](8) NOT NULL,
	[BranchId] [int] NOT NULL,
 CONSTRAINT [PK_CarsBranches] PRIMARY KEY CLUSTERED 
(
	[CarBranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarTypes]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarTypes](
	[CarTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](50) NOT NULL,
	[Model] [nvarchar](50) NOT NULL,
	[PricePerDay] [money] NOT NULL,
	[PricePerDayLate] [money] NOT NULL,
	[Year] [int] NOT NULL,
	[Gear] [nvarchar](10) NOT NULL,
	[ImageFileName] [nvarchar](1000) NOT NULL,
 CONSTRAINT [PK_CarTypes] PRIMARY KEY CLUSTERED 
(
	[CarTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Home]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Home](
	[HomeId] [int] IDENTITY(1,1) NOT NULL,
	[MailingAdress] [nvarchar](150) NULL,
	[SundayToThursdayOpenHour] [nvarchar](7) NULL,
	[SundayToThursdayCloseHour] [nvarchar](7) NULL,
	[FridayOpenHour] [nvarchar](7) NULL,
	[FridayCloseHour] [nvarchar](7) NULL,
	[Phone] [nvarchar](50) NULL,
	[Fax] [nvarchar](50) NULL,
	[BackgroundImageFileName] [nvarchar](1000) NULL,
 CONSTRAINT [PK_Home] PRIMARY KEY CLUSTERED 
(
	[HomeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[LocationId] [int] IDENTITY(1,1) NOT NULL,
	[Latitude] [decimal](17, 15) NOT NULL,
	[Longitude] [decimal](17, 15) NOT NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rents]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rents](
	[RentId] [int] IDENTITY(1,1) NOT NULL,
	[PickupDate] [date] NOT NULL,
	[ReturnDate] [date] NOT NULL,
	[PracticalReturnDate] [date] NULL,
	[UserId] [nvarchar](10) NOT NULL,
	[CarId] [nvarchar](8) NOT NULL,
	[FinalPayment] [money] NULL,
 CONSTRAINT [PK_Rents] PRIMARY KEY CLUSTERED 
(
	[RentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [nvarchar](10) NOT NULL,
	[FirstName] [nvarchar](15) NOT NULL,
	[LastName] [nvarchar](15) NOT NULL,
	[Gender] [nvarchar](10) NOT NULL,
	[BirthDate] [date] NULL,
	[Email] [nvarchar](30) NOT NULL,
	[Username] [nvarchar](20) NOT NULL,
	[Password] [nvarchar](30) NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
	[ImageFileName] [nvarchar](200) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersAdresses]    Script Date: 24/12/2020 04:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersAdresses](
	[UserAdressId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](10) NOT NULL,
	[AdressId] [int] NOT NULL,
 CONSTRAINT [PK_UsersAdresses] PRIMARY KEY CLUSTERED 
(
	[UserAdressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Adresses] ON 

INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1, N'Israel', N'ירושלים', N'דוד המלך 15', N'4567440')
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (2, N'Israel', N'תל אביב', N'נמיר 271', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (13, NULL, N'חיפה', N'שדרות ההסתדרות 162', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (27, NULL, N'באר שבע', N'עמל 5', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (28, N'ישראל', N'כפר סבא', N'העבודה, 12', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1050, NULL, N'ירושלים', N'אבא אבן 4', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1053, NULL, N'רחובות', N'הרצל 36', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1054, NULL, N'יצהר', N'דוד אריאל', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1055, NULL, N'יצהר', N'דוד אריאל', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1056, NULL, N'יצהר', N'דוד אריאל', NULL)
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1057, NULL, N'יצהר', N'דוד אריאל', N'4483100')
INSERT [dbo].[Adresses] ([AdressId], [Country], [city], [AdressLine], [PostalZipCode]) VALUES (1058, NULL, N'יצהר', N'דוד אריאל', N'4483100')
SET IDENTITY_INSERT [dbo].[Adresses] OFF
GO
SET IDENTITY_INSERT [dbo].[Availabilities] ON 

INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (1, N'23454367', CAST(N'2020-12-01' AS Date), CAST(N'2020-12-06' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (2, N'34267876', CAST(N'2020-12-26' AS Date), CAST(N'2020-12-29' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (4, N'54737214', CAST(N'2020-12-02' AS Date), CAST(N'2020-12-05' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (6, N'54976352', CAST(N'2020-12-05' AS Date), CAST(N'2020-12-27' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (7, N'72606742', CAST(N'2020-12-02' AS Date), CAST(N'0202-12-10' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (8, N'97534267', CAST(N'2020-12-25' AS Date), CAST(N'2020-12-27' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (9, N'97647362', CAST(N'2020-12-10' AS Date), CAST(N'2020-12-20' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (10, N'98564213', CAST(N'2020-12-20' AS Date), CAST(N'2020-12-30' AS Date))
INSERT [dbo].[Availabilities] ([AvailabilityId], [CarId], [PickupDate], [ReturnDate]) VALUES (11, N'98576432', CAST(N'2020-12-05' AS Date), CAST(N'2020-12-13' AS Date))
SET IDENTITY_INSERT [dbo].[Availabilities] OFF
GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (1, 1, N'ירושלים')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (2, 2, N'תל אביב')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (15, 10, N'חיפה')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (30, 19, N'באר שבע')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (31, 20, N'כפר סבא')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (1026, 0, N'אלפסי')
INSERT [dbo].[Branches] ([BranchId], [LocationId], [Name]) VALUES (1029, 1031, N'רחובות')
SET IDENTITY_INSERT [dbo].[Branches] OFF
GO
SET IDENTITY_INSERT [dbo].[BranchesAdresses] ON 

INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (1, 1, 1)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (2, 2, 2)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (8, 15, 13)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (16, 30, 27)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (17, 31, 28)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (1038, 1026, 1050)
INSERT [dbo].[BranchesAdresses] ([BranchAdressId], [BranchId], [AdressId]) VALUES (1041, 1029, 1053)
SET IDENTITY_INSERT [dbo].[BranchesAdresses] OFF
GO
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'23454367', 74635, 2, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'23753986', 23875, 3, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'34267876', 39574, 2, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'34659454', 12547, 4, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'34765421', 2532, 5, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'45872786', 4723, 4, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'54737214', 63542, 2, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'54897654', 74870, 3, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'54976352', 21951, 1, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'72606742', 45354, 1, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'97534267', 64968, 2, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'97647362', 32785, 1, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'97846270', 23764, 5, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'98463251', 15987, 4, 0)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'98564213', 34084, 1, 1)
INSERT [dbo].[Cars] ([CarId], [Km], [CarTypeId], [IsFixed]) VALUES (N'98576432', 19573, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[CarsBranches] ON 

INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (1, N'23454367', 1)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (2, N'34267876', 1)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (3, N'54737214', 1)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (4, N'54976352', 1)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (5, N'72606742', 2)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (6, N'97534267', 2)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (7, N'97647362', 2)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (8, N'98564213', 15)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (9, N'98576432', 15)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (10, N'23753986', 31)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (11, N'54897654', 30)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (12, N'98463251', 1029)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (13, N'45872786', 30)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (14, N'34659454', 1029)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (15, N'97846270', 31)
INSERT [dbo].[CarsBranches] ([CarBranchId], [CarId], [BranchId]) VALUES (16, N'34765421', 15)
SET IDENTITY_INSERT [dbo].[CarsBranches] OFF
GO
SET IDENTITY_INSERT [dbo].[CarTypes] ON 

INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [PricePerDay], [PricePerDayLate], [Year], [Gear], [ImageFileName]) VALUES (1, N'Mazda', N'6', 179.0000, 229.0000, 2019, N'Automatic', N'47513b66-2af2-4da2-9d4a-471efa079c80.png')
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [PricePerDay], [PricePerDayLate], [Year], [Gear], [ImageFileName]) VALUES (2, N'Hyundai', N'i-20', 139.0000, 169.0000, 2018, N'Automatic', N'bb22c4e9-5ff0-4efd-877a-21b1efe98b49.png')
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [PricePerDay], [PricePerDayLate], [Year], [Gear], [ImageFileName]) VALUES (3, N'Suzuki', N'Baleno', 159.0000, 199.0000, 2021, N'Manual', N'3efb6fc0-ff8d-4e45-b842-e9931a46e140.png')
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [PricePerDay], [PricePerDayLate], [Year], [Gear], [ImageFileName]) VALUES (4, N'Skoda', N'Octavia', 179.0000, 229.0000, 2020, N'Automatic', N'50072e0b-504f-4d96-bbff-0d4609aed049.png')
INSERT [dbo].[CarTypes] ([CarTypeId], [Manufacturer], [Model], [PricePerDay], [PricePerDayLate], [Year], [Gear], [ImageFileName]) VALUES (5, N'Kia', N'Stonic', 220.0000, 260.0000, 2019, N'Automatic', N'dc741795-e983-4a36-9bdc-70d941ca3fd1.png')
SET IDENTITY_INSERT [dbo].[CarTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Home] ON 

INSERT [dbo].[Home] ([HomeId], [MailingAdress], [SundayToThursdayOpenHour], [SundayToThursdayCloseHour], [FridayOpenHour], [FridayCloseHour], [Phone], [Fax], [BackgroundImageFileName]) VALUES (1, N'Sumsum street, 1, Tel-Aviv', N'08:00', N'17:30', N'07:00', N'13:30', N'03-1234567', N'03-2345678', N'a3762c0f-89db-46d3-a5d9-ba055c049cfc.jpg')
SET IDENTITY_INSERT [dbo].[Home] OFF
GO
SET IDENTITY_INSERT [dbo].[Locations] ON 

INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1, CAST(31.775466074016084 AS Decimal(17, 15)), CAST(35.222173608920531 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (2, CAST(32.106744306738230 AS Decimal(17, 15)), CAST(34.791711188049270 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (10, CAST(32.806643800000000 AS Decimal(17, 15)), CAST(35.059389400000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (19, CAST(31.249807900000000 AS Decimal(17, 15)), CAST(34.823131300000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (20, CAST(32.179451605904010 AS Decimal(17, 15)), CAST(34.908236872646450 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (21, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (22, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (23, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (24, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (25, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (26, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (27, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (28, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (29, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (30, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (31, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (32, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (33, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (34, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (35, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (36, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (37, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (38, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (39, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (40, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1009, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1010, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1011, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1012, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1013, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1014, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1015, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1016, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1017, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1018, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1019, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1020, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1021, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1022, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1023, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1024, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1025, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1028, CAST(31.785198400000000 AS Decimal(17, 15)), CAST(35.205194700000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1030, CAST(31.881842300000000 AS Decimal(17, 15)), CAST(34.817585200000000 AS Decimal(17, 15)))
INSERT [dbo].[Locations] ([LocationId], [Latitude], [Longitude]) VALUES (1031, CAST(31.881842300000000 AS Decimal(17, 15)), CAST(34.817585200000000 AS Decimal(17, 15)))
SET IDENTITY_INSERT [dbo].[Locations] OFF
GO
SET IDENTITY_INSERT [dbo].[Rents] ON 

INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (34, CAST(N'2020-12-22' AS Date), CAST(N'2020-12-23' AS Date), CAST(N'2020-12-28' AS Date), N'597628000', N'23454367', 999.0000)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (35, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-23' AS Date), CAST(N'2020-12-27' AS Date), N'597628000', N'54976352', 916.0000)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (36, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-23' AS Date), NULL, N'597628000', N'72606742', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (37, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-30' AS Date), NULL, N'597628000', N'97647362', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (38, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-30' AS Date), NULL, N'597628000', N'98564213', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (42, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-23' AS Date), NULL, N'597628000', N'97846270', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (43, CAST(N'2020-12-23' AS Date), CAST(N'2020-12-23' AS Date), NULL, N'597628000', N'34765421', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (44, CAST(N'2021-01-02' AS Date), CAST(N'2021-01-10' AS Date), NULL, N'597628000', N'34659454', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (45, CAST(N'2021-01-02' AS Date), CAST(N'2021-01-10' AS Date), NULL, N'597628000', N'98463251', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (46, CAST(N'2021-01-02' AS Date), CAST(N'2021-01-10' AS Date), NULL, N'597628000', N'45872786', NULL)
INSERT [dbo].[Rents] ([RentId], [PickupDate], [ReturnDate], [PracticalReturnDate], [UserId], [CarId], [FinalPayment]) VALUES (47, CAST(N'2020-12-24' AS Date), CAST(N'2020-12-30' AS Date), NULL, N'423532434', N'97846270', NULL)
SET IDENTITY_INSERT [dbo].[Rents] OFF
GO
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'012345678', N'Moishe', N'Ufnik', N'Male', CAST(N'1959-01-01' AS Date), N'moisheufnik@gmail.com', N'moshiko', N'123456', N'user', N'4550a58c-98f8-460c-9b01-d1c7915abd10.jpg')
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'423532434', N'קיפי', N'בן-קיפוד', N'זכר', CAST(N'1999-01-01' AS Date), N'kipi@ben.kipod', N'kipush', N'123456', N'user', NULL)
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'597628000', N'David', N'Ariel', N'Male', NULL, N'david1ariel@gmail.com', N'david', N'123456', N'manager', N'c1a3eec9-63e0-4fcc-8f3f-bcb8cb9170c4.jpg')
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'597628001', N'David', N'Ariel', N'Male', NULL, N'david1ariel@gmail.com', N'david1', N'123456', N'employee', NULL)
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'597628002', N'David', N'Ariel', N'Male', NULL, N'david1ariel@gmail.com', N'david3', N'123456', N'user', NULL)
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Gender], [BirthDate], [Email], [Username], [Password], [Role], [ImageFileName]) VALUES (N'999999999', N'David', N'Ariel', N'Male', NULL, N'david1ariel@gmail.com', N'david2', N'123456', N'user', NULL)
GO
ALTER TABLE [dbo].[Availabilities]  WITH CHECK ADD  CONSTRAINT [FK_Availabilities_Availabilities] FOREIGN KEY([AvailabilityId])
REFERENCES [dbo].[Availabilities] ([AvailabilityId])
GO
ALTER TABLE [dbo].[Availabilities] CHECK CONSTRAINT [FK_Availabilities_Availabilities]
GO
ALTER TABLE [dbo].[BranchesAdresses]  WITH CHECK ADD  CONSTRAINT [FK_BranchesAdresses_Adresses] FOREIGN KEY([AdressId])
REFERENCES [dbo].[Adresses] ([AdressId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BranchesAdresses] CHECK CONSTRAINT [FK_BranchesAdresses_Adresses]
GO
ALTER TABLE [dbo].[BranchesAdresses]  WITH CHECK ADD  CONSTRAINT [FK_BranchesAdresses_Branches] FOREIGN KEY([BranchId])
REFERENCES [dbo].[Branches] ([BranchId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BranchesAdresses] CHECK CONSTRAINT [FK_BranchesAdresses_Branches]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarTypes] FOREIGN KEY([CarTypeId])
REFERENCES [dbo].[CarTypes] ([CarTypeId])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarTypes]
GO
ALTER TABLE [dbo].[CarsBranches]  WITH CHECK ADD  CONSTRAINT [FK_CarsBranches_Branches] FOREIGN KEY([BranchId])
REFERENCES [dbo].[Branches] ([BranchId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CarsBranches] CHECK CONSTRAINT [FK_CarsBranches_Branches]
GO
ALTER TABLE [dbo].[CarsBranches]  WITH CHECK ADD  CONSTRAINT [FK_CarsBranches_Cars] FOREIGN KEY([CarId])
REFERENCES [dbo].[Cars] ([CarId])
GO
ALTER TABLE [dbo].[CarsBranches] CHECK CONSTRAINT [FK_CarsBranches_Cars]
GO
ALTER TABLE [dbo].[Rents]  WITH CHECK ADD  CONSTRAINT [FK_Rents_Cars1] FOREIGN KEY([CarId])
REFERENCES [dbo].[Cars] ([CarId])
GO
ALTER TABLE [dbo].[Rents] CHECK CONSTRAINT [FK_Rents_Cars1]
GO
ALTER TABLE [dbo].[Rents]  WITH CHECK ADD  CONSTRAINT [FK_Rents_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Rents] CHECK CONSTRAINT [FK_Rents_Users]
GO
ALTER TABLE [dbo].[UsersAdresses]  WITH CHECK ADD  CONSTRAINT [FK_UsersAdresses_Adresses] FOREIGN KEY([AdressId])
REFERENCES [dbo].[Adresses] ([AdressId])
GO
ALTER TABLE [dbo].[UsersAdresses] CHECK CONSTRAINT [FK_UsersAdresses_Adresses]
GO
ALTER TABLE [dbo].[UsersAdresses]  WITH CHECK ADD  CONSTRAINT [FK_UsersAdresses_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UsersAdresses] CHECK CONSTRAINT [FK_UsersAdresses_Users]
GO
USE [master]
GO
ALTER DATABASE [AutoRent] SET  READ_WRITE 
GO
