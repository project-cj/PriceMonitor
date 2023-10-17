-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Paź 2023, 12:13
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `inz_db`

CREATE SCHEMA IF NOT EXISTS `inz_db` DEFAULT CHARACTER SET utf8 ;
USE `inz_db` ;
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'Bakalland'),
(2, 'Bakoma'),
(3, 'Cisowianka'),
(4, 'Colian'),
(5, 'Delikatesowy'),
(6, 'Firma Roleski'),
(7, 'Flora'),
(8, 'Food Care'),
(9, 'Gellwe'),
(10, 'Hochland'),
(11, 'Janex'),
(12, 'Jurajska'),
(13, 'Kamis'),
(14, 'Koral'),
(15, 'Kotlin'),
(16, 'Krakuski'),
(17, 'Krasnystaw'),
(18, 'Lubella'),
(19, 'Magnat'),
(20, 'Mars'),
(21, 'Maspex'),
(22, 'Mlekowita'),
(23, 'Mlekpol'),
(24, 'Muszynianka'),
(25, 'Nestlé'),
(26, 'Olewnik'),
(27, 'Piątnica'),
(28, 'Prymat'),
(29, 'Puchatek'),
(30, 'Pudliszki'),
(31, 'Sokołów'),
(32, 'Storck'),
(33, 'Tarczyński'),
(34, 'Tymbark'),
(35, 'Wawel'),
(36, 'Wedel'),
(37, 'Winiary'),
(38, 'Woseba'),
(39, 'Zbyszko'),
(40, 'Żywiec-Zdrój'),
(41, 'Łowicz');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(3, 'Bakalie'),
(14, 'Konserwy, marynaty'),
(16, 'Mąka, cukier, makarony, płatki'),
(6, 'Mięso i drób'),
(5, 'Mleko, nabiał, jaja'),
(4, 'Mrożonki'),
(11, 'Napoje'),
(18, 'Olej, oliwa, ocet, przyprawy'),
(2, 'Owoce, warzywa, zioła'),
(1, 'Pieczywo i wyroby cukiernicze'),
(10, 'Produkty roślinne'),
(17, 'Przetwory owocowe'),
(7, 'Ryby i owoce morza'),
(8, 'Sery'),
(15, 'Sosy, przeciery'),
(12, 'Słodycze'),
(13, 'Słone przekąski'),
(9, 'Wędliny');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `Voivodeship_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `city`
--

INSERT INTO `city` (`id`, `name`, `Voivodeship_id`) VALUES
(1, 'Warszawa', 7),
(2, 'Kraków', 6),
(3, 'Wrocław', 1),
(4, 'Poznań', 15),
(5, 'Gdańsk', 11),
(6, 'Łódź', 5),
(7, 'Szczecin', 16),
(8, 'Lublin', 3),
(9, 'Toruń', 2),
(10, 'Zielona Góra', 4),
(11, 'Opole', 8),
(12, 'Rzeszów', 9),
(13, 'Białystok', 10),
(14, 'Katowice', 12),
(15, 'Kielce', 13),
(16, 'Olsztyn', 14),
(17, 'Kalisz', 15);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'Polska');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `currency`
--

INSERT INTO `currency` (`id`, `name`) VALUES
(3, 'EUR'),
(1, 'PLN'),
(2, 'USD');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `price_read`
--

CREATE TABLE `price_read` (
  `id` int(11) NOT NULL,
  `price` float NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date DEFAULT NULL,
  `confirmation_number` int(11) NOT NULL,
  `rejected_number` int(11) NOT NULL,
  `Shop_has_Product_id` int(11) NOT NULL,
  `Currency_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `Brand_id` int(11) NOT NULL,
  `Subcategory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `product`
--

INSERT INTO `product` (`id`, `name`, `code`, `Brand_id`, `Subcategory_id`) VALUES
(1, 'Ciasteczka serduszka Krakuski', '5901414204525', 38, 55),
(2, 'Flora masło roślinne', '8719200236769', 37, 22),
(3, 'Serek śmietankowy', '5900531000546', 5, 43),
(4, 'Płatki owsiane', '5908267100677', 39, 80),
(5, 'Śmietana do zupy', '5900531001130', 5, 25),
(6, 'Sos Spagetii', '5900397016255', 26, 76),
(7, 'Pasztet z pieczarkami', '5901204017199', 41, 71),
(8, 'Musztarda delikatesowa', '5900084229456', 40, 73),
(9, 'Makaron świderki', '5900049823026', 21, 79),
(10, 'Sok jabłkowy', '5900334005939', 28, 54),
(11, 'Żywiec zdrój woda niegazowana', '5900541000000', 36, 53),
(12, 'Pieprz czarny', '5901135017350', 25, 86),
(13, 'Ketchup łagodny', '5900783003043', 33, 73);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `x_location` float NOT NULL,
  `y_location` float NOT NULL,
  `status` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `Street_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `shop`
--

INSERT INTO `shop` (`id`, `name`, `x_location`, `y_location`, `status`, `address`, `Street_id`) VALUES
(1, 'Lidl', 51.2293, 22.5368, 'AKTYWNY', 'Romantyczna 2', 3),
(2, 'Lewiatan', 51.2421, 22.516, 'AKTYWNY', 'Zygmunta Krasińskiego 3', 2),
(3, 'Żabka', 51.2371, 22.548, 'AKTYWNY', 'Nadbystrzycka 39', 1),
(4, 'Stokrotka', 51.2373, 22.5486, 'AKTYWNY', 'Nadbystrzycka 25', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shopapp`
--

CREATE TABLE `shopapp` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `link` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` float DEFAULT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shoppinglist_has_product`
--

CREATE TABLE `shoppinglist_has_product` (
  `id` int(11) NOT NULL,
  `isBought` int(11) NOT NULL,
  `ShoppingList_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop_has_product`
--

CREATE TABLE `shop_has_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Shop_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `street`
--

CREATE TABLE `street` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `City_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `street`
--

INSERT INTO `street` (`id`, `name`, `City_id`) VALUES
(1, 'Nadbystrzycka', 8),
(2, 'Zygmunta Krasińskiego', 8),
(3, 'Romantyczna', 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `Category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `subcategory`
--

INSERT INTO `subcategory` (`id`, `name`, `Category_id`) VALUES
(1, 'Chleb', 1),
(2, 'Bułki i bagietki', 1),
(3, 'Wypieki słodkie', 1),
(4, 'Pieczywo kruche', 1),
(5, 'Wafle kukurydziane i ryżowe', 1),
(6, 'Placki tortilla i pozostałe', 1),
(7, 'Pieczywo bezglutenowe', 1),
(8, 'Owoce', 2),
(9, 'Warzywa', 2),
(10, 'Zioła i kiełki', 2),
(11, 'Sałaty i miksy sałat', 2),
(12, 'Owoce suszone', 3),
(13, 'Orzechy', 3),
(14, 'Chipsy z owoców i warzyw', 3),
(15, 'Peski suszone i ziarna', 3),
(16, 'Mrożone warzywa', 4),
(17, 'Mrożone owoce', 4),
(18, 'Gotowe dania mrożone', 4),
(19, 'Ryby mrożone', 4),
(20, 'Mięso mrożone', 4),
(21, 'Lody i mrożone desery', 4),
(22, 'Masło, margaryny, tłuszcze', 5),
(23, 'Jajka', 5),
(24, 'Mleko', 5),
(25, 'Śmietana', 5),
(26, 'Jogurty ', 5),
(27, 'Serki homogenizowane', 5),
(28, 'Serki wiejskie', 5),
(29, 'Twarogi', 5),
(30, 'Kefiry, maślanki, zsiadłe mleko', 5),
(31, 'Napoje mleczne i kawowe', 5),
(32, 'Mięso drobiowe', 6),
(33, 'Mięso wieprzowe', 6),
(34, 'Mięso wołowe', 6),
(35, 'Mięso mielone', 6),
(36, 'Ryby wędzone i suszone ', 7),
(37, 'Owoce morza, surimi', 7),
(38, 'Śledzie i inne ryby', 7),
(39, 'Dania sałatki i pasty rybne', 7),
(40, 'Kozie i owcze', 8),
(41, 'Sery żółte', 8),
(42, 'Sery pleśniowe', 8),
(43, 'Serki kanapkowe', 8),
(44, 'Sery mascarpone, riccotta, capri', 8),
(45, 'Wędliny tradycjne', 9),
(46, 'Kiełbasy i parówki', 9),
(47, 'Kabanosy, snacki', 9),
(48, 'Pasztety i pasztetowe', 9),
(49, 'Wędlina roślinna', 10),
(50, 'Hummus, pasta', 10),
(51, 'Tofu', 10),
(52, 'Napoje gazowane', 11),
(53, 'Napoje niegazowane', 11),
(54, 'Soki, nektary', 11),
(55, 'Ciastka', 12),
(56, 'Batony, wafelki', 12),
(57, 'Czekolady', 12),
(58, 'Cukierki', 12),
(59, 'Żelki', 12),
(60, 'Landrynki, dropsy, gumy', 12),
(61, 'Chipsy', 13),
(62, 'Chrupki', 13),
(63, 'Paluszki, krakersy', 13),
(64, 'Orzeszki', 13),
(65, 'Popcorn', 13),
(66, 'Groszek, fasola, kukurydza', 14),
(67, 'Grzyby, oliwki, czosnek, kapary', 14),
(68, 'Konserwy rybne', 14),
(69, 'Pomidory suszone', 14),
(70, 'Papryka, ogórki', 14),
(71, 'Pasztety, konserwy', 14),
(72, 'Gotowe sosy, fixy', 15),
(73, 'Ketchup, majonez, musztarda', 15),
(74, 'Chrzan, ćwikła, żurawina', 15),
(75, 'Koncentraty pomidorowe', 15),
(76, 'Passaty i pomidory w puszkach', 15),
(77, 'Cukier', 16),
(78, 'Mąka', 16),
(79, 'Makarony', 16),
(80, 'Płatki, muesli, otręby', 16),
(81, 'Ryż, kasza', 16),
(82, 'Nasiona, groch, fasola', 16),
(83, 'Dżem, konfitury', 17),
(84, 'Miody', 17),
(85, 'Kremy', 17),
(86, 'Przyprawy do dań, zup', 18),
(87, 'Olej, oliwa, ocet', 18),
(88, 'Sól, pieprz, przyprawy', 18);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `alias` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `x_location` double NOT NULL,
  `y_location` double NOT NULL,
  `radius` double NOT NULL,
  `status` varchar(45) NOT NULL,
  `forgotten_password_link` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `voivodeship`
--

CREATE TABLE `voivodeship` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `Country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `voivodeship`
--

INSERT INTO `voivodeship` (`id`, `name`, `Country_id`) VALUES
(1, 'Dolnośląskie', 1),
(2, 'Kujawsko-pomorskie', 1),
(3, 'Lubelskie', 1),
(4, 'Lubuskie', 1),
(5, 'Łódzkie', 1),
(6, 'Małopolskie', 1),
(7, 'Mazowieckie', 1),
(8, 'Opolskie', 1),
(9, 'Podkarpackie', 1),
(10, 'Podlaskie', 1),
(11, 'Pomorskie', 1),
(12, 'Śląskie', 1),
(13, 'Świętokrzyskie', 1),
(14, 'Warmińsko-pomorskie', 1),
(15, 'Wielkopolskie', 1),
(16, 'Zachodniopomorskie', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BrandName_UNIQUE` (`name`),
  ADD UNIQUE KEY `BrandId_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CategoryName_UNIQUE` (`name`),
  ADD UNIQUE KEY `CategoryId_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `City_id_UNIQUE` (`id`),
  ADD KEY `fk_City_Voivodeship1_idx` (`Voivodeship_id`);

--
-- Indeksy dla tabeli `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `currency_name_UNIQUE` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `price_read`
--
ALTER TABLE `price_read`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Price_Read_Shop_has_Product1_idx` (`Shop_has_Product_id`),
  ADD KEY `fk_Price_Read_Currency1_idx` (`Currency_id`);

--
-- Indeksy dla tabeli `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProductName_UNIQUE` (`name`),
  ADD UNIQUE KEY `ProductId_UNIQUE` (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD KEY `fk_Product_Brand1_idx` (`Brand_id`),
  ADD KEY `fk_Product_Subcategory1_idx` (`Subcategory_id`);

--
-- Indeksy dla tabeli `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Shop_id_UNIQUE` (`id`),
  ADD KEY `fk_Shop_Street1_idx` (`Street_id`);

--
-- Indeksy dla tabeli `shopapp`
--
ALTER TABLE `shopapp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shopapp_name_UNIQUE` (`name`),
  ADD UNIQUE KEY `shopapp_link_UNIQUE` (`link`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ShoppingListId_UNIQUE` (`id`),
  ADD KEY `fk_ShoppingList_User1_idx` (`User_id`);

--
-- Indeksy dla tabeli `shoppinglist_has_product`
--
ALTER TABLE `shoppinglist_has_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_ShoppingList_has_Product_Product1_idx` (`Product_id`),
  ADD KEY `fk_ShoppingList_has_Product_ShoppingList1_idx` (`ShoppingList_id`);

--
-- Indeksy dla tabeli `shop_has_product`
--
ALTER TABLE `shop_has_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Shop_has_Product_Product1_idx` (`Product_id`),
  ADD KEY `fk_Shop_has_Product_Shop1_idx` (`Shop_id`);

--
-- Indeksy dla tabeli `street`
--
ALTER TABLE `street`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_street_City1_idx` (`City_id`);

--
-- Indeksy dla tabeli `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SubcategoryName_UNIQUE` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Subcategory_Category1_idx` (`Category_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_alias_UNIQUE` (`alias`),
  ADD UNIQUE KEY `User_id_UNIQUE` (`id`),
  ADD UNIQUE KEY `User_email_UNIQUE` (`email`);

--
-- Indeksy dla tabeli `voivodeship`
--
ALTER TABLE `voivodeship`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Voivodeship_id_UNIQUE` (`id`),
  ADD UNIQUE KEY `Voivodeship_name_UNIQUE` (`name`),
  ADD KEY `fk_Voivodeship_Country1_idx` (`Country_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT dla tabeli `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT dla tabeli `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `price_read`
--
ALTER TABLE `price_read`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT dla tabeli `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `shopapp`
--
ALTER TABLE `shopapp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `shoppinglist_has_product`
--
ALTER TABLE `shoppinglist_has_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `street`
--
ALTER TABLE `street`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `voivodeship`
--
ALTER TABLE `voivodeship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `fk_City_Voivodeship1` FOREIGN KEY (`Voivodeship_id`) REFERENCES `voivodeship` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `price_read`
--
ALTER TABLE `price_read`
  ADD CONSTRAINT `fk_Price_Read_Currency1` FOREIGN KEY (`Currency_id`) REFERENCES `currency` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Price_Read_Shop_has_Product1` FOREIGN KEY (`Shop_has_Product_id`) REFERENCES `shop_has_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_Product_Brand1` FOREIGN KEY (`Brand_id`) REFERENCES `brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Product_Subcategory1` FOREIGN KEY (`Subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `fk_Shop_Street1` FOREIGN KEY (`Street_id`) REFERENCES `street` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD CONSTRAINT `fk_ShoppingList_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `shoppinglist_has_product`
--
ALTER TABLE `shoppinglist_has_product`
  ADD CONSTRAINT `fk_ShoppingList_has_Product_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ShoppingList_has_Product_ShoppingList1` FOREIGN KEY (`ShoppingList_id`) REFERENCES `shoppinglist` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `shop_has_product`
--
ALTER TABLE `shop_has_product`
  ADD CONSTRAINT `fk_Shop_has_Product_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Shop_has_Product_Shop1` FOREIGN KEY (`Shop_id`) REFERENCES `shop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `street`
--
ALTER TABLE `street`
  ADD CONSTRAINT `fk_street_City1` FOREIGN KEY (`City_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `fk_Subcategory_Category1` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `voivodeship`
--
ALTER TABLE `voivodeship`
  ADD CONSTRAINT `fk_Voivodeship_Country1` FOREIGN KEY (`Country_id`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
