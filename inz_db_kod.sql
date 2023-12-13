-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inz_db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--
CREATE SCHEMA IF NOT EXISTS `inz_db` DEFAULT CHARACTER SET utf8 ;
USE `inz_db` ;


DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BrandName_UNIQUE` (`name`),
  UNIQUE KEY `BrandId_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Bakalland'),(2,'Bakoma'),(3,'Cisowianka'),(4,'Colian'),(5,'Delikatesowy'),(6,'Firma Roleski'),(7,'Flora'),(8,'Food Care'),(9,'Gellwe'),(10,'Hochland'),(11,'Janex'),(12,'Jurajska'),(13,'Kamis'),(14,'Koral'),(15,'Kotlin'),(16,'Krakuski'),(17,'Krasnystaw'),(18,'Lubella'),(19,'Magnat'),(20,'Mars'),(21,'Maspex'),(22,'Mlekowita'),(23,'Mlekpol'),(24,'Muszynianka'),(25,'Nestlé'),(26,'Olewnik'),(27,'Piątnica'),(28,'Prymat'),(29,'Puchatek'),(30,'Pudliszki'),(31,'Sokołów'),(32,'Storck'),(33,'Tarczyński'),(34,'Tymbark'),(35,'Wawel'),(36,'Wedel'),(37,'Winiary'),(38,'Woseba'),(39,'Zbyszko'),(40,'Żywiec-Zdrój'),(41,'Łowicz');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CategoryName_UNIQUE` (`name`),
  UNIQUE KEY `CategoryId_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (3,'Bakalie'),(14,'Konserwy, marynaty'),(16,'Mąka, cukier, makarony, płatki'),(6,'Mięso i drób'),(5,'Mleko, nabiał, jaja'),(4,'Mrożonki'),(11,'Napoje'),(18,'Olej, oliwa, ocet, przyprawy'),(2,'Owoce, warzywa, zioła'),(1,'Pieczywo i wyroby cukiernicze'),(10,'Produkty roślinne'),(17,'Przetwory owocowe'),(7,'Ryby i owoce morza'),(8,'Sery'),(15,'Sosy, przeciery'),(12,'Słodycze'),(13,'Słone przekąski'),(9,'Wędliny');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `Voivodeship_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `City_id_UNIQUE` (`id`),
  KEY `fk_City_Voivodeship1_idx` (`Voivodeship_id`),
  CONSTRAINT `fk_City_Voivodeship1` FOREIGN KEY (`Voivodeship_id`) REFERENCES `voivodeship` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Warszawa',7),(2,'Kraków',6),(3,'Wrocław',1),(4,'Poznań',15),(5,'Gdańsk',11),(6,'Łódź',5),(7,'Szczecin',16),(8,'Lublin',3),(9,'Toruń',2),(10,'Zielona Góra',4),(11,'Opole',8),(12,'Rzeszów',9),(13,'Białystok',10),(14,'Katowice',12),(15,'Kielce',13),(16,'Olsztyn',14),(17,'Kalisz',15);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Polska');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `currency_name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (3,'EUR'),(1,'PLN'),(2,'USD');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_read`
--

DROP TABLE IF EXISTS `price_read`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_read` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date DEFAULT NULL,
  `confirmation_number` int NOT NULL,
  `rejected_number` int NOT NULL,
  `Shop_has_Product_id` int NOT NULL,
  `Currency_id` int NOT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Price_Read_Shop_has_Product1_idx` (`Shop_has_Product_id`),
  KEY `fk_Price_Read_Currency1_idx` (`Currency_id`),
  KEY `fk_Price_Read_User1_idx` (`User_id`),
  CONSTRAINT `fk_Price_Read_Currency1` FOREIGN KEY (`Currency_id`) REFERENCES `currency` (`id`),
  CONSTRAINT `fk_Price_Read_Shop_has_Product1` FOREIGN KEY (`Shop_has_Product_id`) REFERENCES `shop_has_product` (`id`),
  CONSTRAINT `fk_Price_Read_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_read`
--

LOCK TABLES `price_read` WRITE;
/*!40000 ALTER TABLE `price_read` DISABLE KEYS */;
INSERT INTO `price_read` VALUES (1,3.29,'2023-11-07','2023-11-16',1,3,1,1,1),(3,5.99,'2023-11-07',NULL,5,2,3,1,1),(4,5.49,'2023-11-07',NULL,8,2,3,1,1),(5,4.99,'2023-11-07',NULL,5,1,4,1,1),(6,4.29,'2023-11-07',NULL,4,1,4,1,1),(7,6.39,'2023-11-07',NULL,6,1,5,1,1),(8,5.99,'2023-11-07',NULL,3,1,5,1,1),(9,3.49,'2023-11-07',NULL,3,3,6,1,1),(10,1.99,'2023-11-07',NULL,1,2,6,1,1),(11,4.99,'2023-11-09',NULL,8,2,7,1,1),(12,5.99,'2023-11-07',NULL,7,3,7,1,1),(13,3.7,'2023-11-07',NULL,12,8,7,1,1),(14,1.99,'2023-11-09',NULL,14,1,7,1,1),(15,4.59,'2023-11-09','2023-11-22',14,5,8,1,1),(17,3.99,'2023-11-23',NULL,0,0,9,1,1),(18,6.49,'2023-11-08',NULL,0,0,8,1,1),(19,10.99,'2023-11-15',NULL,0,0,9,1,1),(23,6.99,'2023-11-04',NULL,2,1,6,1,2),(25,3.29,'2023-11-01',NULL,0,0,5,1,2),(26,4.99,'2023-11-09',NULL,0,0,6,1,2),(27,1,'2023-11-21',NULL,1,0,10,1,1),(28,5.99,'2023-11-21',NULL,0,0,11,1,1);
/*!40000 ALTER TABLE `price_read` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `Brand_id` int NOT NULL,
  `Subcategory_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductName_UNIQUE` (`name`),
  UNIQUE KEY `ProductId_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_Product_Brand1_idx` (`Brand_id`),
  KEY `fk_Product_Subcategory1_idx` (`Subcategory_id`),
  CONSTRAINT `fk_Product_Brand1` FOREIGN KEY (`Brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_Product_Subcategory1` FOREIGN KEY (`Subcategory_id`) REFERENCES `subcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Ciasteczka serduszka Krakuski','5901414204525',38,55),(2,'Flora masło roślinne','8719200236769',37,22),(3,'Serek śmietankowy','5900531000546',5,43),(4,'Płatki owsiane','5908267100677',39,80),(5,'Śmietana do zupy','5900531001130',5,25),(6,'Sos Spagetii','5900397016255',26,76),(7,'Pasztet z pieczarkami','5901204017199',41,71),(8,'Musztarda delikatesowa','5900084229456',40,73),(9,'Makaron świderki','5900049823026',21,79),(10,'Sok jabłkowy','5900334005939',28,54),(11,'Żywiec zdrój woda niegazowana','5900541000000',36,53),(12,'Pieprz czarny','5901135017350',25,86),(13,'Ketchup łagodny','5900783003043',33,73);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `x_location` float NOT NULL,
  `y_location` float NOT NULL,
  `status` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `Street_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Shop_id_UNIQUE` (`id`),
  KEY `fk_Shop_Street1_idx` (`Street_id`),
  CONSTRAINT `fk_Shop_Street1` FOREIGN KEY (`Street_id`) REFERENCES `street` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'Lidl',51.2293,22.5368,'AKTYWNY','Romantyczna 2',3),(2,'Lewiatan',51.2421,22.516,'AKTYWNY','Zygmunta Krasińskiego 3',2),(3,'Żabka',51.2371,22.548,'AKTYWNY','Nadbystrzycka 39',1),(4,'Stokrotka',51.2373,22.5486,'AKTYWNY','Nadbystrzycka 25',1),(5,'Lewiatan',51.2343,22.5399,'AKTYWNY','Nadbystrzycka 70',1);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_has_product`
--

DROP TABLE IF EXISTS `shop_has_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_has_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Shop_id` int NOT NULL,
  `Product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Shop_has_Product_Product1_idx` (`Product_id`),
  KEY `fk_Shop_has_Product_Shop1_idx` (`Shop_id`),
  CONSTRAINT `fk_Shop_has_Product_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_Shop_has_Product_Shop1` FOREIGN KEY (`Shop_id`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_has_product`
--

LOCK TABLES `shop_has_product` WRITE;
/*!40000 ALTER TABLE `shop_has_product` DISABLE KEYS */;
INSERT INTO `shop_has_product` VALUES (1,1,1),(3,1,2),(4,1,13),(5,2,1),(6,2,2),(7,3,1),(8,3,13),(9,3,2),(10,5,1),(11,5,2);
/*!40000 ALTER TABLE `shop_has_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopapp`
--

DROP TABLE IF EXISTS `shopapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `link` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shopapp_name_UNIQUE` (`name`),
  UNIQUE KEY `shopapp_link_UNIQUE` (`link`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopapp`
--

LOCK TABLES `shopapp` WRITE;
/*!40000 ALTER TABLE `shopapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppinglist`
--

DROP TABLE IF EXISTS `shoppinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppinglist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` float DEFAULT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ShoppingListId_UNIQUE` (`id`),
  KEY `fk_ShoppingList_User1_idx` (`User_id`),
  CONSTRAINT `fk_ShoppingList_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppinglist`
--

LOCK TABLES `shoppinglist` WRITE;
/*!40000 ALTER TABLE `shoppinglist` DISABLE KEYS */;
INSERT INTO `shoppinglist` VALUES (5,'lista2',NULL,2),(6,'bh',NULL,2),(7,'dsad',NULL,2),(8,'dadad',NULL,2),(16,'Lista',NULL,1),(17,'nowa',NULL,1);
/*!40000 ALTER TABLE `shoppinglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppinglist_has_product`
--

DROP TABLE IF EXISTS `shoppinglist_has_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppinglist_has_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isBought` int NOT NULL,
  `ShoppingList_id` int NOT NULL,
  `Product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_ShoppingList_has_Product_Product1_idx` (`Product_id`),
  KEY `fk_ShoppingList_has_Product_ShoppingList1_idx` (`ShoppingList_id`),
  CONSTRAINT `fk_ShoppingList_has_Product_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_ShoppingList_has_Product_ShoppingList1` FOREIGN KEY (`ShoppingList_id`) REFERENCES `shoppinglist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppinglist_has_product`
--

LOCK TABLES `shoppinglist_has_product` WRITE;
/*!40000 ALTER TABLE `shoppinglist_has_product` DISABLE KEYS */;
INSERT INTO `shoppinglist_has_product` VALUES (19,0,5,1),(20,0,5,1),(21,0,6,1),(22,0,6,1),(23,0,7,1),(24,0,7,2),(25,0,7,3),(26,0,7,5),(27,0,7,8),(28,0,7,11),(29,0,8,2),(56,0,16,1),(57,0,17,1),(58,0,17,2);
/*!40000 ALTER TABLE `shoppinglist_has_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `street`
--

DROP TABLE IF EXISTS `street`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `street` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `City_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_street_City1_idx` (`City_id`),
  CONSTRAINT `fk_street_City1` FOREIGN KEY (`City_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `street`
--

LOCK TABLES `street` WRITE;
/*!40000 ALTER TABLE `street` DISABLE KEYS */;
INSERT INTO `street` VALUES (1,'Nadbystrzycka',8),(2,'Zygmunta Krasińskiego',8),(3,'Romantyczna',8);
/*!40000 ALTER TABLE `street` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `Category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SubcategoryName_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Subcategory_Category1_idx` (`Category_id`),
  CONSTRAINT `fk_Subcategory_Category1` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Chleb',1),(2,'Bułki i bagietki',1),(3,'Wypieki słodkie',1),(4,'Pieczywo kruche',1),(5,'Wafle kukurydziane i ryżowe',1),(6,'Placki tortilla i pozostałe',1),(7,'Pieczywo bezglutenowe',1),(8,'Owoce',2),(9,'Warzywa',2),(10,'Zioła i kiełki',2),(11,'Sałaty i miksy sałat',2),(12,'Owoce suszone',3),(13,'Orzechy',3),(14,'Chipsy z owoców i warzyw',3),(15,'Peski suszone i ziarna',3),(16,'Mrożone warzywa',4),(17,'Mrożone owoce',4),(18,'Gotowe dania mrożone',4),(19,'Ryby mrożone',4),(20,'Mięso mrożone',4),(21,'Lody i mrożone desery',4),(22,'Masło, margaryny, tłuszcze',5),(23,'Jajka',5),(24,'Mleko',5),(25,'Śmietana',5),(26,'Jogurty ',5),(27,'Serki homogenizowane',5),(28,'Serki wiejskie',5),(29,'Twarogi',5),(30,'Kefiry, maślanki, zsiadłe mleko',5),(31,'Napoje mleczne i kawowe',5),(32,'Mięso drobiowe',6),(33,'Mięso wieprzowe',6),(34,'Mięso wołowe',6),(35,'Mięso mielone',6),(36,'Ryby wędzone i suszone ',7),(37,'Owoce morza, surimi',7),(38,'Śledzie i inne ryby',7),(39,'Dania sałatki i pasty rybne',7),(40,'Kozie i owcze',8),(41,'Sery żółte',8),(42,'Sery pleśniowe',8),(43,'Serki kanapkowe',8),(44,'Sery mascarpone, riccotta, capri',8),(45,'Wędliny tradycjne',9),(46,'Kiełbasy i parówki',9),(47,'Kabanosy, snacki',9),(48,'Pasztety i pasztetowe',9),(49,'Wędlina roślinna',10),(50,'Hummus, pasta',10),(51,'Tofu',10),(52,'Napoje gazowane',11),(53,'Napoje niegazowane',11),(54,'Soki, nektary',11),(55,'Ciastka',12),(56,'Batony, wafelki',12),(57,'Czekolady',12),(58,'Cukierki',12),(59,'Żelki',12),(60,'Landrynki, dropsy, gumy',12),(61,'Chipsy',13),(62,'Chrupki',13),(63,'Paluszki, krakersy',13),(64,'Orzeszki',13),(65,'Popcorn',13),(66,'Groszek, fasola, kukurydza',14),(67,'Grzyby, oliwki, czosnek, kapary',14),(68,'Konserwy rybne',14),(69,'Pomidory suszone',14),(70,'Papryka, ogórki',14),(71,'Pasztety, konserwy',14),(72,'Gotowe sosy, fixy',15),(73,'Ketchup, majonez, musztarda',15),(74,'Chrzan, ćwikła, żurawina',15),(75,'Koncentraty pomidorowe',15),(76,'Passaty i pomidory w puszkach',15),(77,'Cukier',16),(78,'Mąka',16),(79,'Makarony',16),(80,'Płatki, muesli, otręby',16),(81,'Ryż, kasza',16),(82,'Nasiona, groch, fasola',16),(83,'Dżem, konfitury',17),(84,'Miody',17),(85,'Kremy',17),(86,'Przyprawy do dań, zup',18),(87,'Olej, oliwa, ocet',18),(88,'Sól, pieprz, przyprawy',18);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `alias` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `x_location` double NOT NULL,
  `y_location` double NOT NULL,
  `radius` double NOT NULL,
  `status` varchar(45) NOT NULL,
  `forgotten_password_link` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_alias_UNIQUE` (`alias`),
  UNIQUE KEY `User_id_UNIQUE` (`id`),
  UNIQUE KEY `User_email_UNIQUE` (`email`),
  UNIQUE KEY `forgotten_password_link_UNIQUE` (`forgotten_password_link`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@o2.pl','test','$2b$10$mPf663A730UMXkNARK7Ak.PGIFGMZ6wWLhTC5iM0q8URclqnuqrqS',51.2293,22.5368,2,'USER',NULL),(2,'test2@o2.pl','Test2','$2b$10$/SdYY0Cfh9PLLsoZoO9tj.2hiEq1SWw.Le8veb.s4nex5cMWx/XPS',0,0,2,'USER',NULL),(3,'admin@o2.pl','admin','$2b$10$NM940fMqmDyBE.qt4/29OeGY36Zj1WtsxL5WdUI5q86GPDisoy4PO',0,0,2,'ADMIN',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voivodeship`
--

DROP TABLE IF EXISTS `voivodeship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voivodeship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `Country_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Voivodeship_id_UNIQUE` (`id`),
  UNIQUE KEY `Voivodeship_name_UNIQUE` (`name`),
  KEY `fk_Voivodeship_Country1_idx` (`Country_id`),
  CONSTRAINT `fk_Voivodeship_Country1` FOREIGN KEY (`Country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voivodeship`
--

LOCK TABLES `voivodeship` WRITE;
/*!40000 ALTER TABLE `voivodeship` DISABLE KEYS */;
INSERT INTO `voivodeship` VALUES (1,'Dolnośląskie',1),(2,'Kujawsko-pomorskie',1),(3,'Lubelskie',1),(4,'Lubuskie',1),(5,'Łódzkie',1),(6,'Małopolskie',1),(7,'Mazowieckie',1),(8,'Opolskie',1),(9,'Podkarpackie',1),(10,'Podlaskie',1),(11,'Pomorskie',1),(12,'Śląskie',1),(13,'Świętokrzyskie',1),(14,'Warmińsko-pomorskie',1),(15,'Wielkopolskie',1),(16,'Zachodniopomorskie',1);
/*!40000 ALTER TABLE `voivodeship` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 13:19:46
