CREATE TABLE District_Zone (
  Zone_Num INT PRIMARY KEY,
  Zone_Name VARCHAR(255) NOT NULL
);

CREATE TABLE Realtor(
  Agent_Num INT PRIMARY KEY,
  First_Name VARCHAR(255) NOT NULL,
  Last_Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255),
  Phone_Num VARCHAR(20)
);

CREATE TABLE Property(
    TMK INT PRIMARY KEY,
    Asking_Price INT NOT NULL,
    Lava_Zone INT NOT NULL,
    HOA_Fees DOUBLE,
    Zipcode CHAR(5) NOT NULL,
    City VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    Street_Num INT NOT NULL,
    Street_Name VARCHAR(255) NOT NULL,
    Apt_Num VARCHAR(255),
    Realtor_ID INT NOT NULL,
    District_Num INT NOT NULL,
    FOREIGN KEY (Realtor_ID) REFERENCES Realtor(Agent_Num),
    FOREIGN KEY (District_Num) REFERENCES District_Zone(Zone_Num)
);

CREATE TABLE House(
    TMK INT PRIMARY KEY,
    Num_Bedroom INT NOT NULL,
    Num_Bathroom INT NOT NULL,
    Acreage DOUBLE NOT NULL,
    Square_Footage DOUBLE NOT NULL
);

CREATE TABLE Condo(
    TMK INT PRIMARY KEY NOT NULL,
    Num_Bedroom INT NOT NULL,
    Num_Bathroom INT NOT NULL,
    Square_Footage DOUBLE NOT NULL
);

CREATE TABLE Empty_Lot(
    TMK INT PRIMARY KEY NOT NULL,
    Acreage DOUBLE NOT NULL
);

CREATE TABLE School(
    School_Code INT PRIMARY KEY,
    District_Zone INT NOT NULL,
    Grade_Level VARCHAR(255) NOT NULL,
    School_Name VARCHAR(255) NOT NULL,
    FOREIGN KEY (District_Zone) REFERENCES District_Zone(Zone_Num)
);


CREATE TABLE Assessment(
    Report_Num INT PRIMARY KEY,
    Year INT NOT NULL,
    Assessed_Value DOUBLE NOT NULL,
    Market_Value DOUBLE NOT NULL,
    Estimated_Property_Tax DOUBLE NOT NULL,
    TMK INT NOT NULL,
    FOREIGN KEY (TMK) REFERENCES Property(TMK)
);

CREATE TABLE Sale_Record(
    Transaction_ID INT PRIMARY KEY,
    Sale_Price DOUBLE NOT NULL,
    Year INT NOT NULL,
    TMK INT NOT NULL,
    FOREIGN KEY (TMK) REFERENCES Property(TMK)
);

CREATE TABLE Tax_Record(
    Record_ID INT PRIMARY KEY,
    Total_Taxable_Value DOUBLE NOT NULL,
    Year INT NOT NULL,
    TMK INT NOT NULL,
    FOREIGN KEY (TMK) REFERENCES Property(TMK)
);



