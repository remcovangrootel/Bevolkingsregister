-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 25 okt 2025 om 13:51
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `star_wars_db`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `quotes`
--

CREATE TABLE `quotes` (
  `Quote_id` int(11) NOT NULL,
  `Quote` varchar(100) NOT NULL,
  `Personage` varchar(100) NOT NULL,
  `Film` varchar(100) NOT NULL,
  `Datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `quotes`
--

INSERT INTO `quotes` (`Quote_id`, `Quote`, `Personage`, `Film`, `Datum`) VALUES
(1, 'I find your lack of faith distrubing', 'Darth Vader', 'Star Wars - A New Hope', '1977-12-15'),
(2, 'You failed me for the last time Admiral', 'Darth Vader', 'Star Wars - The Empire Strikes Back', '1980-12-18'),
(3, 'I hope so Commander, for your sake. The Emperor is not as forgiving as I am', 'Darth Vader', 'Star Wars - Return of the Jedi', '1983-05-25');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`Quote_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `quotes`
--
ALTER TABLE `quotes`
  MODIFY `Quote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
