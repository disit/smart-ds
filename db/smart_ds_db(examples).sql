-- SmartDS
--   Copyright (C) 2017 DISIT Lab http://www.disit.org - University of Florence
--
--   This program is free software: you can redistribute it and/or modify
--   it under the terms of the GNU Affero General Public License as
--   published by the Free Software Foundation, either version 3 of the
--   License, or (at your option) any later version.
--
--   This program is distributed in the hope that it will be useful,
--  but WITHOUT ANY WARRANTY; without even the implied warranty of
--   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
--   GNU Affero General Public License for more details.
--
--   You should have received a copy of the GNU Affero General Public License
--   along with this program.  If not, see <http://www.gnu.org/licenses/>. */


-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Giu 15, 2015 alle 18:22
-- Versione del server: 5.6.21
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `smart_ds_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `criteria`
--

CREATE TABLE IF NOT EXISTS `criteria` (
`id` int(11) NOT NULL,
  `position` text NOT NULL,
  `description` text NOT NULL,
  `idModel` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `criteria`
--

INSERT INTO `criteria` (`id`, `position`, `description`, `idModel`) VALUES
(1, 'C0', 'Open Restaurant', 1),
(2, 'C1', 'Other restaurant near', 1),
(3, 'C11', 'Restaurant within 500m', 1),
(4, 'C12', 'Restaurant from 500m to 1Km', 1),
(5, 'C2', 'Parking', 1),
(6, 'C21', 'Parking dimension', 1),
(7, 'C22', 'Parking Type', 1),
(8, 'C221', 'Free', 1),
(9, 'C222', 'Paid', 1),
(10, 'C3', 'Persons flow', 1),
(11, 'C31', 'TPL flow', 1),
(12, 'C32', 'Traffic Flow', 1),
(13, 'C321', 'Day', 1),
(14, 'C322', 'Night', 1),
(15, 'C4', 'Leisure activity', 1),
(16, 'C41', 'Cinema', 1),
(17, 'C42', 'Theatre', 1),
(18, 'C43', 'Pub', 1),
(19, 'C0', 'Change position of a bus stop', 5),
(20, 'C1', 'Keep originary route', 5),
(21, 'C11', 'Distance from previous bus stop', 5),
(22, 'C12', 'Same street of previous bus stop', 5),
(23, 'C2', 'Issues new bus stop', 5),
(24, 'C21', 'Works presence', 5),
(25, 'C22', 'Width of the street', 5),
(26, 'C23', 'waste collection point', 5),
(27, 'C3', 'Traffic Flow', 5),
(28, 'C31', 'Car flow', 5),
(29, 'C311', 'Sensor data', 5),
(30, 'C312', 'Citizens Opinion', 5),
(31, 'C313', 'Public Administration Opinion', 5),
(32, 'C32', 'TPL flow', 5),
(33, 'C321', 'Sensor data', 5),
(34, 'C322', 'Public Administration Opinion', 5),
(35, 'C4', 'near POI', 5),
(36, 'C41', 'Shopping mall', 5),
(37, 'C411', 'Sensor data', 5),
(38, 'C412', 'Citizens Opinion', 5),
(39, 'C42', 'Hospital', 5),
(40, 'C43', 'University', 5),
(41, 'C44', 'School', 5),
(42, 'C5', 'Presence of TLZ', 5),
(43, 'C6', 'Inclusion in existing bus stop', 5),
(44, 'C61', 'High number of line in existing bus stop', 5),
(45, 'C62', 'Near business activity (100m)', 5);

-- --------------------------------------------------------

--
-- Struttura della tabella `criteria_instance`
--

CREATE TABLE IF NOT EXISTS `criteria_instance` (
  `id` int(11) NOT NULL,
  `url_discussion` text,
  `comment` text,
  `weights` text NOT NULL,
  `idMatrixComp` int(11) NOT NULL,
  `idIfInsert` int(11) NOT NULL DEFAULT '0',
  `idIfCalculated` int(11) NOT NULL DEFAULT '0',
  `idFunctionManager` int(11) NOT NULL,
  `idCriteria` int(11) NOT NULL,
  `idModelInstance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `criteria_instance`
--

INSERT INTO `criteria_instance` (`id`, `url_discussion`, `comment`, `weights`, `idMatrixComp`, `idIfInsert`, `idIfCalculated`, `idFunctionManager`, `idCriteria`, `idModelInstance`) VALUES
(1, 'null', 'null', '0.156,0.465,0.253,0.127', 0, 0, 14, 0, 1, 1),
(2, 'null', 'null', '0.75,0.25', 0, 0, 8, 0, 2, 1),
(3, 'null', 'null', '0', 0, 1, 0, 0, 3, 1),
(4, 'null', 'null', '0', 0, 2, 0, 0, 4, 1),
(5, 'null', 'null', '0.333,0.667', 0, 0, 10, 0, 5, 1),
(6, 'null', 'null', '0', 0, 3, 0, 0, 6, 1),
(7, 'null', 'null', '0.9,0.1', 0, 0, 9, 0, 7, 1),
(8, 'null', 'null', '0', 0, 4, 0, 0, 8, 1),
(9, 'null', 'null', '0', 0, 5, 0, 0, 9, 1),
(10, 'null', 'null', '0.2,0.8', 0, 0, 12, 0, 10, 1),
(11, 'null', 'null', '0', 0, 6, 0, 0, 11, 1),
(12, 'null', 'null', '0.167,0.833', 0, 0, 11, 0, 12, 1),
(13, 'null', 'null', '0', 0, 7, 0, 0, 13, 1),
(14, 'null', 'null', '0', 0, 8, 0, 0, 14, 1),
(15, 'null', 'null', '0.715,0.187,0.098', 0, 0, 13, 0, 15, 1),
(16, 'null', 'null', '0', 0, 9, 0, 0, 16, 1),
(17, 'null', 'null', '0', 0, 10, 0, 0, 17, 1),
(18, 'null', 'null', '0', 0, 11, 0, 0, 18, 1),
(19, 'null', 'null', '0.156,0.465,0.253,0.127', 0, 0, 7, 0, 1, 2),
(20, 'null', 'null', '0.75,0.25', 0, 0, 1, 0, 2, 2),
(21, 'null', 'null', '0', 0, 12, 0, 0, 3, 2),
(22, 'null', 'null', '0', 0, 13, 0, 0, 4, 2),
(23, 'null', 'null', '0.333,0.667', 0, 0, 3, 0, 5, 2),
(24, 'null', 'null', '0', 0, 14, 0, 0, 6, 2),
(25, 'null', 'null', '0.9,0.1', 0, 0, 2, 0, 7, 2),
(26, 'null', 'null', '0', 0, 15, 0, 0, 8, 2),
(27, 'null', 'null', '0', 0, 16, 0, 0, 9, 2),
(28, 'null', 'null', '0.2,0.8', 0, 0, 5, 0, 10, 2),
(29, 'null', 'null', '0', 0, 17, 0, 0, 11, 2),
(30, 'null', 'null', '0.167,0.833', 0, 0, 4, 0, 12, 2),
(31, 'null', 'null', '0', 0, 18, 0, 0, 13, 2),
(32, 'null', 'null', '0', 0, 19, 0, 0, 14, 2),
(33, 'null', 'null', '0.715,0.187,0.098', 0, 0, 6, 0, 15, 2),
(34, 'null', 'null', '0', 0, 20, 0, 0, 16, 2),
(35, 'null', 'null', '0', 0, 21, 0, 0, 17, 2),
(36, 'null', 'null', '0', 0, 22, 0, 0, 18, 2),
(37, 'null', 'null', '0.156,0.465,0.253,0.127', 0, 0, 21, 0, 1, 3),
(38, 'null', 'null', '0.75,0.25', 0, 0, 15, 0, 2, 3),
(39, 'null', 'null', '0', 0, 23, 0, 0, 3, 3),
(40, 'null', 'null', '0', 0, 24, 0, 0, 4, 3),
(41, 'null', 'null', '0.333,0.667', 0, 0, 17, 0, 5, 3),
(42, 'null', 'null', '0', 0, 25, 0, 0, 6, 3),
(43, 'null', 'null', '0.9,0.1', 0, 26, 16, 0, 7, 3),
(44, 'null', 'null', '0', 0, 27, 0, 0, 8, 3),
(45, 'null', 'null', '0', 0, 28, 0, 0, 9, 3),
(46, 'null', 'null', '0.2,0.8', 0, 0, 19, 0, 10, 3),
(47, 'null', 'null', '0', 0, 29, 0, 0, 11, 3),
(48, 'null', 'null', '0.167,0.833', 0, 0, 18, 0, 12, 3),
(49, 'null', 'null', '0', 0, 30, 0, 0, 13, 3),
(50, 'null', 'null', '0', 0, 31, 0, 0, 14, 3),
(51, 'null', 'null', '0.715,0.187,0.098', 0, 0, 20, 0, 15, 3),
(52, 'null', 'null', '0', 0, 32, 0, 0, 16, 3),
(53, 'null', 'null', '0', 0, 33, 0, 0, 17, 3),
(54, 'null', 'null', '0', 0, 34, 0, 0, 18, 3),
(55, 'null', 'null', '0.325,0.057,0.233,0.115,0.2,0.07', 0, 0, 30, 0, 19, 4),
(56, 'null', 'null', '0.75,0.25', 0, 0, 22, 0, 20, 4),
(57, 'null', 'null', '0', 0, 35, 0, 0, 21, 4),
(58, 'null', 'null', '0', 0, 36, 0, 0, 22, 4),
(59, 'null', 'null', '0.648,0.23,0.122', 0, 0, 23, 0, 23, 4),
(60, 'null', 'null', '0', 0, 37, 0, 0, 24, 4),
(61, 'null', 'null', '0', 0, 38, 0, 0, 25, 4),
(62, 'null', 'null', '0', 0, 39, 0, 0, 26, 4),
(63, 'null', 'null', '0.75,0.25', 0, 0, 26, 0, 27, 4),
(64, 'null', 'null', '0.6,0.1,0.3', 0, 0, 24, 0, 28, 4),
(65, 'null', 'null', '0', 0, 40, 0, 0, 29, 4),
(66, 'null', 'null', '0', 0, 41, 0, 0, 30, 4),
(67, 'null', 'null', '0', 0, 42, 0, 0, 31, 4),
(68, 'null', 'null', '0.6,0.4', 0, 0, 25, 0, 32, 4),
(69, 'null', 'null', '0', 0, 43, 0, 0, 33, 4),
(70, 'null', 'null', '0', 0, 44, 0, 0, 34, 4),
(71, 'null', 'null', '0.499,0.209,0.187,0.105', 0, 0, 28, 0, 35, 4),
(72, 'null', 'null', '0.6,0.4', 0, 0, 27, 0, 36, 4),
(73, 'null', 'null', '0', 0, 45, 0, 0, 37, 4),
(74, 'null', 'null', '0', 0, 46, 0, 0, 38, 4),
(75, 'null', 'null', '0', 0, 47, 0, 0, 39, 4),
(76, 'null', 'null', '0', 0, 48, 0, 0, 40, 4),
(77, 'null', 'null', '0', 0, 49, 0, 0, 41, 4),
(78, 'null', 'null', '0', 0, 50, 0, 0, 42, 4),
(79, 'null', 'null', '0.667,0.333', 0, 0, 29, 0, 43, 4),
(80, 'null', 'null', '0', 0, 51, 0, 0, 44, 4),
(81, 'null', 'null', '0', 0, 52, 0, 0, 45, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `italian_flag_calculated`
--

CREATE TABLE IF NOT EXISTS `italian_flag_calculated` (
  `id` int(11) NOT NULL,
  `green` double NOT NULL,
  `white` double NOT NULL,
  `red` double NOT NULL,
  `idCriteriaInstance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `italian_flag_calculated`
--

INSERT INTO `italian_flag_calculated` (`id`, `green`, `white`, `red`, `idCriteriaInstance`) VALUES
(1, 0, 0.4375, 0.5625, 20),
(2, 0.1476, 0.7687999999999999, 0.08360000000000001, 25),
(3, 0.22066020000000003, 0.5127896, 0.2665502, 23),
(4, 0.6983539999999999, 0.030820999999999998, 0.270825, 30),
(5, 0.6752832, 0.058056800000000006, 0.26666, 28),
(6, 0.68192, 0.08574999999999999, 0.23233, 33),
(7, 0.3600574826, 0.3322757844, 0.308666733, 19),
(8, 1, 0, 0, 2),
(9, 0.378, 0.5640000000000001, 0.057999999999999996, 7),
(10, 0.37433700000000003, 0.3761880000000001, 0.249475, 5),
(11, 0.6983539999999999, 0.030820999999999998, 0.270825, 12),
(12, 0.6752832, 0.058056800000000006, 0.26666, 10),
(13, 0.68192, 0.08574999999999999, 0.23233, 15),
(14, 0.5875171946, 0.20050604040000006, 0.212976765, 1),
(15, 0, 0.125, 0.875, 38),
(16, 0.0297, 0.8735999999999999, 0.09670000000000001, 43),
(17, 0.07641990000000001, 0.5826912, 0.34088890000000005, 41),
(18, 0.270825, 0.156071, 0.573104, 48),
(19, 0.33326, 0.1582568, 0.5084832, 46),
(20, 0.28152, 0.08574999999999999, 0.6327299999999999, 51),
(21, 0.15560307350000002, 0.3413806284, 0.5040162981, 37),
(22, 0.925, 0, 0.075, 56),
(23, 0.847, 0.061, 0.09200000000000001, 59),
(24, 0.8300000000000001, 0.13, 0.04, 64),
(25, 0.54, 0.33999999999999997, 0.12, 68),
(26, 0.7575000000000001, 0.1825, 0.06, 63),
(27, 0.7, 0.12, 0.18, 72),
(28, 0.45189999999999997, 0.12047999999999999, 0.42762000000000006, 71),
(29, 0.7, 0, 0.3, 79),
(30, 0.8263700000000002, 0.059854700000000004, 0.11377530000000001, 55);

-- --------------------------------------------------------

--
-- Struttura della tabella `italian_flag_insert`
--

CREATE TABLE IF NOT EXISTS `italian_flag_insert` (
  `id` int(11) NOT NULL,
  `green` double NOT NULL,
  `white` double NOT NULL,
  `red` double NOT NULL,
  `idCriteriaInstance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `italian_flag_insert`
--

INSERT INTO `italian_flag_insert` (`id`, `green`, `white`, `red`, `idCriteriaInstance`) VALUES
(1, 1, 0, 0, 3),
(2, 1, 0, 0, 4),
(3, 0.367, 0, 0.633, 6),
(4, 0.42, 0.58, 0, 8),
(5, 0, 0.42, 0.58, 9),
(6, 0.583, 0.167, 0.25, 11),
(7, 0.75, 0, 0.25, 13),
(8, 0.688, 0.037, 0.275, 14),
(9, 0.73, 0.1, 0.17, 16),
(10, 0.41, 0.05, 0.54, 17),
(11, 0.85, 0.05, 0.1, 18),
(12, 0, 0.5, 0.5, 21),
(13, 0, 0.25, 0.75, 22),
(14, 0.367, 0, 0.633, 24),
(15, 0.164, 0.836, 0, 26),
(16, 0, 0.164, 0.836, 27),
(17, 0.583, 0.167, 0.25, 29),
(18, 0.75, 0, 0.25, 31),
(19, 0.688, 0.037, 0.275, 32),
(20, 0.73, 0.1, 0.17, 34),
(21, 0.41, 0.05, 0.54, 35),
(22, 0.85, 0.05, 0.1, 36),
(23, 0, 0, 1, 39),
(24, 0, 0.5, 0.5, 40),
(25, 0.17, 0, 0.83, 42),
(26, 0.15, 0.824, 0.026, 43),
(27, 0.033, 0.967, 0, 44),
(28, 0, 0.033, 0.967, 45),
(29, 0.583, 0.167, 0.25, 47),
(30, 0.25, 0.75, 0, 49),
(31, 0.275, 0.037, 0.688, 50),
(32, 0.17, 0.1, 0.73, 52),
(33, 0.41, 0.05, 0.54, 53),
(34, 0.85, 0.05, 0.1, 54),
(35, 1, 0, 0, 57),
(36, 0.7, 0, 0.3, 58),
(37, 1, 0, 0, 60),
(38, 0.6, 0, 0.4, 61),
(39, 0.5, 0.5, 0, 62),
(40, 0.8, 0.2, 0, 65),
(41, 0.8, 0.1, 0.1, 66),
(42, 0.9, 0, 0.1, 67),
(43, 0.5, 0.5, 0, 69),
(44, 0.6, 0.1, 0.3, 70),
(45, 0.7, 0.1, 0.2, 73),
(46, 0.7, 0.15, 0.15, 74),
(47, 0.1, 0.1, 0.8, 75),
(48, 0.1, 0.1, 0.8, 76),
(49, 0.6, 0.2, 0.2, 77),
(50, 1, 0, 0, 78),
(51, 0.7, 0, 0.3, 80),
(52, 0.7, 0, 0.3, 81);

-- --------------------------------------------------------

--
-- Struttura della tabella `logic_function`
--

CREATE TABLE IF NOT EXISTS `logic_function` (
  `id` int(11) NOT NULL,
  `query` text NOT NULL,
  `compare` int(11) NOT NULL,
  `threshold1` double NOT NULL,
  `threshold2` double NOT NULL,
  `result` double NOT NULL,
  `status` int(11) NOT NULL,
  `idFunctionManager` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `logic_function_manager`
--

CREATE TABLE IF NOT EXISTS `logic_function_manager` (
  `id` int(11) NOT NULL,
  `notFunction1` int(11) NOT NULL,
  `idFunction1` int(11) NOT NULL,
  `logicConnector` int(11) NOT NULL,
  `notFunction2` int(11) NOT NULL,
  `idFunction2` int(11) NOT NULL,
  `typeIF1` char(1) NOT NULL,
  `value_true1` double NOT NULL,
  `value_false1` double NOT NULL,
  `typeIF2` char(1) NOT NULL,
  `value_true2` double NOT NULL,
  `value_false2` double NOT NULL,
  `status` int(11) NOT NULL,
  `sparql_repository` text,
  `idCriteriaInstance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `matrix_comparison`
--

CREATE TABLE IF NOT EXISTS `matrix_comparison` (
`id` int(11) NOT NULL,
  `value` text NOT NULL,
  `idCriteriaInstance` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `model`
--

CREATE TABLE IF NOT EXISTS `model` (
`id` int(11) NOT NULL,
  `objective` text NOT NULL,
  `description` text,
  `url_model` text NOT NULL,
  `size` int(11) NOT NULL,
  `date_create` timestamp NULL DEFAULT NULL,
  `date_last_modify` timestamp NULL DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `model`
--

INSERT INTO `model` (`id`, `objective`, `description`, `url_model`, `size`, `date_create`, `date_last_modify`, `idUser`) VALUES
(1, 'Open Restaurant', '', '', 18, '2015-06-15 13:44:37', '2015-06-15 13:57:05', 3),
(5, 'Change position of a bus stop', '', '', 28, '2015-06-15 16:03:32', '2015-06-15 16:12:44', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `model_instance`
--

CREATE TABLE IF NOT EXISTS `model_instance` (
  `id` int(11) NOT NULL,
  `objective` text NOT NULL,
  `idUser` int(11) NOT NULL,
  `idModel` int(11) NOT NULL,
  `date_create` timestamp NULL DEFAULT NULL,
  `date_last_modify` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `start_exec` timestamp NULL DEFAULT NULL,
  `end_exec` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `model_instance`
--

INSERT INTO `model_instance` (`id`, `objective`, `idUser`, `idModel`, `date_create`, `date_last_modify`, `status`, `start_exec`, `end_exec`) VALUES
(1, 'viale spartaco lavagnini', 3, 1, '2015-06-15 13:58:23', '2015-06-15 14:21:07', 2, '2015-06-15 14:43:46', '2015-06-15 14:43:47'),
(2, 'via san gallo', 3, 1, '2015-06-15 14:32:26', '2015-06-15 14:39:03', 2, '2015-06-15 14:39:16', '2015-06-15 14:40:17'),
(3, 'via santa marta 3', 3, 1, '2015-06-15 14:45:08', '2015-06-15 15:01:13', 2, '2015-06-15 15:01:19', '2015-06-15 15:01:20'),
(4, 'line 14 in viale morgagni 10', 3, 5, '2015-06-15 16:16:15', '2015-06-15 16:20:56', 2, '2015-06-15 16:21:13', '2015-06-15 16:21:14');

-- --------------------------------------------------------

--
-- Struttura della tabella `permit`
--

CREATE TABLE IF NOT EXISTS `permit` (
`id` int(11) NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `permit`
--

INSERT INTO `permit` (`id`, `description`, `type`) VALUES
(1, 'Visualizzazione di tutti i modelli', 0),
(2, 'Creazione di un nuovo modello', 0),
(3, 'Modifica modello', 0),
(4, 'Salvataggio modello', 0),
(5, 'Clonazione modello', 0),
(6, 'Eliminazione modello', 0),
(7, 'Visualizzazione istanze modello', 1),
(8, 'Creazione nuova istanza', 1),
(9, 'Modifica istanza modello', 1),
(10, 'Salvataggio istanza modello', 1),
(11, 'Eliminazione istanza', 1),
(12, 'Calcolo decisione', 1),
(13, 'Impostazioni applicazione', 2),
(14, 'Gestione permessi gruppi di utenti', 2),
(15, 'Clonazione istanza modello', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `country` text NOT NULL,
  `password` text NOT NULL,
  `userType` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `country`, `password`, `userType`) VALUES
(1, 'admin', 'admin@disit.org', 'Italia', '*d1s1t*', 4),
(2, 'marco', 'marco.bartolozzi@unifi.it', 'Italia', 'marco1234', 3),
(3, 'Paolo', 'paolo.nesi@unifi.it', 'Italia', 'paolo', 3),
(4, 'Luca', 'luca.santi@unifi.it', 'Italia', 'luca1234', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `usergroup_permits`
--

CREATE TABLE IF NOT EXISTS `usergroup_permits` (
  `idUserGroup` int(11) NOT NULL,
  `idPermit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `usergroup_permits`
--

INSERT INTO `usergroup_permits` (`idUserGroup`, `idPermit`) VALUES
(1, 1),
(1, 7),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(2, 1),
(2, 7),
(2, 9),
(2, 12),
(2, 15),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 15);

-- --------------------------------------------------------

--
-- Struttura della tabella `user_group`
--

CREATE TABLE IF NOT EXISTS `user_group` (
`id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `user_group`
--

INSERT INTO `user_group` (`id`, `description`) VALUES
(1, 'User Basic'),
(2, 'User Advanced'),
(3, 'Decision Maker'),
(4, 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
 ADD PRIMARY KEY (`id`), ADD KEY `ModelIndex` (`idModel`);

--
-- Indexes for table `criteria_instance`
--
ALTER TABLE `criteria_instance`
 ADD PRIMARY KEY (`id`), ADD KEY `CriteriaIndex` (`idCriteria`), ADD KEY `ModelInstanceIndex` (`idModelInstance`);

--
-- Indexes for table `italian_flag_calculated`
--
ALTER TABLE `italian_flag_calculated`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `CriteriaInstanceIndex` (`idCriteriaInstance`);

--
-- Indexes for table `italian_flag_insert`
--
ALTER TABLE `italian_flag_insert`
 ADD PRIMARY KEY (`id`), ADD KEY `CriteriaInstanceIndex` (`idCriteriaInstance`);

--
-- Indexes for table `logic_function`
--
ALTER TABLE `logic_function`
 ADD PRIMARY KEY (`id`), ADD KEY `FunctionManager1Index` (`idFunctionManager`);

--
-- Indexes for table `logic_function_manager`
--
ALTER TABLE `logic_function_manager`
 ADD PRIMARY KEY (`id`), ADD KEY `CriteriaInstanceIndex` (`idCriteriaInstance`);

--
-- Indexes for table `matrix_comparison`
--
ALTER TABLE `matrix_comparison`
 ADD PRIMARY KEY (`id`), ADD KEY `CriteriaInstanceIndex` (`idCriteriaInstance`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
 ADD PRIMARY KEY (`id`), ADD KEY `UserIndex` (`idUser`);

--
-- Indexes for table `model_instance`
--
ALTER TABLE `model_instance`
 ADD PRIMARY KEY (`id`), ADD KEY `UserIndex` (`idUser`), ADD KEY `ModelIndex` (`idModel`);

--
-- Indexes for table `permit`
--
ALTER TABLE `permit`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD KEY `UserGroupIndex` (`userType`);

--
-- Indexes for table `usergroup_permits`
--
ALTER TABLE `usergroup_permits`
 ADD KEY `UserGroupIndex` (`idUserGroup`), ADD KEY `PermitIndex` (`idPermit`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT for table `matrix_comparison`
--
ALTER TABLE `matrix_comparison`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `permit`
--
ALTER TABLE `permit`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `criteria`
--
ALTER TABLE `criteria`
ADD CONSTRAINT `criteria_ibfk_1` FOREIGN KEY (`idModel`) REFERENCES `model` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `criteria_instance`
--
ALTER TABLE `criteria_instance`
ADD CONSTRAINT `criteria_instance_ibfk_2` FOREIGN KEY (`idCriteria`) REFERENCES `criteria` (`id`),
ADD CONSTRAINT `criteria_instance_ibfk_3` FOREIGN KEY (`idModelInstance`) REFERENCES `model_instance` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `italian_flag_calculated`
--
ALTER TABLE `italian_flag_calculated`
ADD CONSTRAINT `italian_flag_calculated_ibfk_1` FOREIGN KEY (`idCriteriaInstance`) REFERENCES `criteria_instance` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `italian_flag_insert`
--
ALTER TABLE `italian_flag_insert`
ADD CONSTRAINT `italian_flag_insert_ibfk_1` FOREIGN KEY (`idCriteriaInstance`) REFERENCES `criteria_instance` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `logic_function`
--
ALTER TABLE `logic_function`
ADD CONSTRAINT `logic_function_ibfk_1` FOREIGN KEY (`idFunctionManager`) REFERENCES `logic_function_manager` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `logic_function_manager`
--
ALTER TABLE `logic_function_manager`
ADD CONSTRAINT `logic_function_manager_ibfk_1` FOREIGN KEY (`idCriteriaInstance`) REFERENCES `criteria_instance` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `matrix_comparison`
--
ALTER TABLE `matrix_comparison`
ADD CONSTRAINT `matrix_comparison_ibfk_1` FOREIGN KEY (`idCriteriaInstance`) REFERENCES `criteria_instance` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `model`
--
ALTER TABLE `model`
ADD CONSTRAINT `model_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Limiti per la tabella `model_instance`
--
ALTER TABLE `model_instance`
ADD CONSTRAINT `model_instance_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
ADD CONSTRAINT `model_instance_ibfk_2` FOREIGN KEY (`idModel`) REFERENCES `model` (`id`);

--
-- Limiti per la tabella `user`
--
ALTER TABLE `user`
ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userType`) REFERENCES `user_group` (`id`);

--
-- Limiti per la tabella `usergroup_permits`
--
ALTER TABLE `usergroup_permits`
ADD CONSTRAINT `usergroup_permits_ibfk_1` FOREIGN KEY (`idUserGroup`) REFERENCES `user_group` (`id`),
ADD CONSTRAINT `usergroup_permits_ibfk_2` FOREIGN KEY (`idPermit`) REFERENCES `permit` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
