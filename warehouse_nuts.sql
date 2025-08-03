-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 31 Lip 2025, 21:44
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `warehouse_nuts`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `quantity`, `price`, `description`) VALUES
(1, 'Standard construction nut', 'Konstrukcyjna', 150, '1.50', 'Nakrętka ogólnego zastosowania w konstrukcjach budowlanych.'),
(2, 'Machine nut M10', 'Maszynowa', 300, '2.10', 'Standardowa nakrętka maszynowa o gwincie M10.'),
(3, 'Wood nut 20mm', 'Do drewna', 120, '1.20', 'Specjalna nakrętka przeznaczona do mocowania w drewnie.'),
(4, 'Sheet metal nut galvanized', 'Do blachy', 200, '1.75', 'Ocynkowana nakrętka stosowana do elementów blaszanych.'),
(5, 'Foundation nut M16', 'Fundamentowa', 80, '3.40', 'Duża nakrętka M16 do zastosowań fundamentowych.'),
(6, 'Hex nut steel', 'Sześciokątna', 500, '1.00', 'Stalowa nakrętka sześciokątna do ogólnego użytku.'),
(7, 'Self-locking nylon nut', 'Samohamowna', 250, '2.75', 'Nakrętka z wkładką nylonową zabezpieczającą przed luzowaniem.'),
(8, 'Crown nut M12', 'Koronowa', 60, '4.00', 'Nakrętka koronowa M12 do zabezpieczenia zawleczką.'),
(9, 'Flange nut', 'Kołnierzowa', 180, '1.80', 'Nakrętka z kołnierzem zwiększającym powierzchnię docisku.'),
(10, 'Plastic butterfly nut', 'Motylkowa', 300, '2.50', 'Plastikowa nakrętka motylkowa do łatwego dokręcania ręcznego.'),
(11, 'Square nut M8', 'Czworokątna', 140, '1.20', 'Tradycyjna nakrętka czworokątna M8 do specjalnych połączeń.'),
(12, 'Knurled nut', 'Radełkowana', 90, '3.10', 'Nakrętka z radełkowaną powierzchnią ułatwiającą chwyt.'),
(13, 'Tapered nut', 'Stożkowa', 110, '2.85', 'Stożkowa nakrętka stosowana w połączeniach wymagających centrowania.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `filename`) VALUES
(1, 1, 'konstrukcyjna1.png'),
(2, 1, 'konstrukcyjna2.png'),
(3, 1, 'konstrukcyjna3.png'),
(4, 1, 'konstrukcyjna4.png'),
(6, 6, 'szesciokatna1.png'),
(7, 6, 'szesciokatna2.png'),
(8, 6, 'szesciokatna3.png'),
(9, 6, 'szesciokatna4.png'),
(11, 7, 'samohamowna1.png'),
(12, 7, 'samohamowna2.png'),
(13, 7, 'samohamowna3.png'),
(14, 7, 'samohamowna4.png'),
(15, 4, 'doblachy1.png'),
(16, 4, 'doblachy2.png'),
(17, 4, 'doblachy3.png'),
(18, 4, 'doblachy4.png'),
(19, 3, 'dodrewna1.png'),
(20, 3, 'dodrewna2.png'),
(21, 3, 'dodrewna3.png'),
(22, 3, 'dodrewna4.png'),
(23, 5, 'fundamentowa1.png'),
(24, 5, 'fundamentowa2.png'),
(25, 5, 'fundamentowa3.png'),
(26, 5, 'fundamentowa4.png'),
(27, 9, 'kolnierzowa1.png'),
(28, 9, 'kolnierzowa2.png'),
(29, 9, 'kolnierzowa3.png'),
(30, 9, 'kolnierzowa4.png'),
(31, 8, 'koronowa1.png'),
(32, 8, 'koronowa2.png'),
(33, 8, 'koronowa3.png'),
(34, 8, 'koronowa4.png'),
(35, 2, 'maszynowa1.png'),
(36, 2, 'maszynowa2.png'),
(37, 2, 'maszynowa3.png'),
(38, 2, 'maszynowa4.png'),
(39, 10, 'motylkowa1.png'),
(40, 10, 'motylkowa2.png'),
(41, 10, 'motylkowa3.png'),
(42, 10, 'motylkowa4.png'),
(43, 11, 'czworokatna1.png'),
(44, 11, 'czworokatna2.png'),
(45, 11, 'czworokatna3.png'),
(46, 11, 'czworokatna4.png'),
(47, 13, 'stozkowa1.png'),
(48, 13, 'stozkowa2.png'),
(49, 13, 'stozkowa3.png'),
(50, 13, 'stozkowa4.png'),
(51, 12, 'radelkowana1.png'),
(52, 12, 'radelkowana2.png'),
(53, 12, 'radelkowana3.png'),
(54, 12, 'radelkowana4.png');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT dla tabeli `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
