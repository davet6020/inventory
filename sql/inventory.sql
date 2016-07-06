-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2016 at 03:33 PM
-- Server version: 5.6.30-0ubuntu0.14.04.1
-- PHP Version: 5.6.20-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--
CREATE DATABASE IF NOT EXISTS `inventory` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `inventory`;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `manager_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `manager_id`) VALUES
(1, 'DevOps', 5),
(2, 'Engineering', 12),
(3, 'Human Resources', 25),
(4, 'Operations', 23),
(5, 'Sales', 17),
(6, 'Solutions', 6);

-- --------------------------------------------------------

--
-- Table structure for table `financial`
--

DROP TABLE IF EXISTS `financial`;
CREATE TABLE `financial` (
  `id` int(11) NOT NULL,
  `hardware_id` int(11) NOT NULL,
  `date_purchased` date NOT NULL,
  `total_cost` decimal(9,2) NOT NULL,
  `financed_leased_cash` varchar(16) NOT NULL DEFAULT 'Cash',
  `total_cash` decimal(9,2) NOT NULL DEFAULT '0.00',
  `total_financed_leased` decimal(9,2) NOT NULL DEFAULT '0.00',
  `down_payment` decimal(9,2) NOT NULL DEFAULT '0.00',
  `loan_term` decimal(9,2) NOT NULL DEFAULT '0.00',
  `monthly_payment` decimal(9,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `financial`
--

INSERT INTO `financial` (`id`, `hardware_id`, `date_purchased`, `total_cost`, `financed_leased_cash`, `total_cash`, `total_financed_leased`, `down_payment`, `loan_term`, `monthly_payment`) VALUES
(1, 1, '2011-09-14', 979.00, 'Cash', 0.00, 0.00, 0.00, 0.00, 0.00),
(2, 2, '2012-12-04', 89.99, 'Cash', 0.00, 0.00, 0.00, 0.00, 0.00),
(3, 3, '2014-04-02', 149.99, 'Cash', 0.00, 0.00, 0.00, 0.00, 0.00),
(4, 4, '2015-01-05', 979.00, 'Cash', 0.00, 0.00, 0.00, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `hardware`
--

DROP TABLE IF EXISTS `hardware`;
CREATE TABLE `hardware` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL COMMENT 'id from the types.id field',
  `vendor` int(11) DEFAULT NULL COMMENT 'Lenovo',
  `manufacturer` int(11) DEFAULT NULL COMMENT 'Lenovo',
  `serial_number` varchar(128) DEFAULT NULL COMMENT 'R8DG7N4',
  `state` varchar(128) DEFAULT NULL COMMENT 'New [condition is a reserved word]',
  `series` varchar(128) DEFAULT NULL COMMENT 'T420',
  `model` varchar(128) DEFAULT NULL COMMENT '4177CTO',
  `warranty` varchar(128) DEFAULT NULL COMMENT '1 Year',
  `cpu` varchar(128) DEFAULT NULL COMMENT 'Intel i5 2.4 GHz',
  `ram` varchar(128) DEFAULT NULL COMMENT '4 GB',
  `hard_drive` varchar(128) DEFAULT NULL COMMENT '320 GB 7200',
  `os` varchar(128) DEFAULT NULL COMMENT 'Windows 7 Professional',
  `graphics` varchar(128) DEFAULT NULL COMMENT 'Intel HD Graphics 3000',
  `bluetooth` varchar(128) DEFAULT NULL COMMENT '3.0',
  `wireless` varchar(128) DEFAULT NULL COMMENT 'AGN 3x3',
  `security` varchar(128) DEFAULT NULL COMMENT 'Fingerprint Reader',
  `cdrom` varchar(128) DEFAULT NULL COMMENT 'DVD Reader Writer',
  `date_purchased` datetime DEFAULT NULL,
  `description` text COMMENT 'a non-indexed/searchable text field'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hardware`
--

INSERT INTO `hardware` (`id`, `type_id`, `vendor`, `manufacturer`, `serial_number`, `state`, `series`, `model`, `warranty`, `cpu`, `ram`, `hard_drive`, `os`, `graphics`, `bluetooth`, `wireless`, `security`, `cdrom`, `date_purchased`, `description`) VALUES
(1, 6, 14, 14, 'R8DG7N5', 'Used', 'T420', '4177CTO', '1 Year', 'Intel i5 | 2.3 GHz', '8GB', '320 GB 7200', 'Windows 7 Pro', 'Intel HD Graphics 3000', '3.0', 'AGN 3x3', 'Fingerprint Reader', 'DVD Reader/Writer', '2011-09-14 00:00:00', 'This is Dereks laptop'),
(2, 6, 3, 14, '11S45N1006Z1ZKFG27R4HS', 'New', 'X000DY5K9F', '70++', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 7, 3, 14, 'ZWVUHTLF102888', 'New', '24 inch', 'S24B150BL', '1-Year Manufactor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 6, 14, 14, 'R8DG7N5', 'Used', 'T420', '4177CTO', '1 Year', 'Intel i5 | 2.3 GHz', '8 GB', '320 GB 7200', 'Windows 7 Pro', 'Intel HD Graphics 3000', '3.0', 'AGN 3x3', 'Fingerprint Reader', 'DVD Reader/Writer', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hardware_owners`
--

DROP TABLE IF EXISTS `hardware_owners`;
CREATE TABLE `hardware_owners` (
  `hardware_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hardware_owners`
--

INSERT INTO `hardware_owners` (`hardware_id`, `user_id`) VALUES
(1, 23),
(2, 23),
(3, 23);

-- --------------------------------------------------------

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
CREATE TABLE `software` (
  `id` int(11) NOT NULL,
  `vendor` int(11) DEFAULT NULL COMMENT 'Microsoft',
  `manufacturer` int(11) DEFAULT NULL COMMENT 'Microsoft',
  `app_suite` varchar(128) DEFAULT NULL COMMENT 'Office 2010',
  `app_name` varchar(128) DEFAULT NULL COMMENT 'MS Powerpoint',
  `version` varchar(128) DEFAULT NULL COMMENT '6.0.2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `software`
--

INSERT INTO `software` (`id`, `vendor`, `manufacturer`, `app_suite`, `app_name`, `version`) VALUES
(1, 16, 16, 'MS Office 2010', 'MS Office 2010', '2010'),
(2, 1, 1, 'Adobe Creative Cloud', 'Adobe Creative Cloud', NULL),
(3, 1, 1, 'Acrobat', 'Acrobat Reader', '9.0'),
(4, 1, 1, 'Adobe FrameMaker', 'Adobe FrameMaker', NULL),
(5, 1, 1, 'Adobe Flash', 'Adobe Flash', NULL),
(6, 1, 1, 'Adobe Photoshop', 'Adobe Photoshop', NULL),
(7, 1, 1, 'Adobe InDesign', 'Adobe InDesign', NULL),
(8, 1, 1, 'Adobe Illustrator', 'Adobe Illustrator', NULL),
(9, 8, 8, 'Balsamiq', 'Balsamiq', NULL),
(10, 17, 17, 'Firefox', 'Firefox', '6.02'),
(11, 12, 12, 'Google', 'Google', '12.0.742.112'),
(12, 16, 16, 'Internet Explorer', 'Internet Explorer', '9.0'),
(13, 20, 20, 'OmniGraffle Pro', 'OmniGraffle Pro', '5'),
(14, 20, 20, 'OmniGraffle Pro', 'OmniGraffle Pro', '6'),
(15, 22, 22, 'Parallels for Mac', 'Parallels Desktop', '8'),
(16, 13, 13, 'QuickBooks', 'QuickBooks', NULL),
(17, 25, 25, 'Smart FTP', 'Smart FTP Client', NULL),
(18, 26, 26, 'Sothink SWF Compiler (MAC)', 'Sothink SWF Compiler (MAC)', NULL),
(19, 27, 27, 'Sublime Text', 'Sublime Text', '2'),
(20, 31, 31, 'Fusion', 'Fusion', '6'),
(21, 31, 31, 'VMWare', 'VMWare', NULL),
(22, 21, 21, 'Transmit', 'Transmit', '4'),
(23, 11, 11, 'Nod 32 Antivirus', 'Nod 32 Antivirus', '8'),
(24, 16, 16, 'MS Project', 'MS Project', '2010'),
(25, 16, 16, 'MS Access', 'MS Access', '2010'),
(26, 16, 16, 'MS Visio Professional', 'MS Visio Professional', '2016');

-- --------------------------------------------------------

--
-- Table structure for table `software_owners`
--

DROP TABLE IF EXISTS `software_owners`;
CREATE TABLE `software_owners` (
  `software_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_key` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `software_owners`
--

INSERT INTO `software_owners` (`software_id`, `user_id`, `product_key`) VALUES
(24, 23, NULL),
(9, 23, 'eJzzzU/OLi0odswsqnFJLUrNVghJzMtML03OyKwxNDY0MzE3MjA2sjQxqXGuMQQAaKwOqA=='),
(3, 23, NULL),
(10, 23, NULL),
(11, 23, NULL),
(12, 23, NULL),
(1, 23, NULL),
(16, 23, NULL),
(9, 12, ''),
(3, 12, NULL),
(10, 12, NULL),
(11, 12, NULL),
(12, 12, NULL),
(1, 12, NULL),
(16, 12, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, '4-Port Component A/V Switch'),
(2, 'Conference Phone'),
(3, 'iPhone'),
(4, 'iPhone 5'),
(5, 'iPod Touch'),
(6, 'Laptop'),
(7, 'LCD Monitor'),
(8, 'Lenovo Battery'),
(9, 'Monitor'),
(10, 'Samsung Galaxy S3'),
(11, 'Smart Phone');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `lastname` varchar(128) DEFAULT NULL,
  `firstname` varchar(128) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1=employed, 2=contractor, 3=notemployee, 4=nothuman'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `lastname`, `firstname`, `department_id`, `status`) VALUES
(1, '', '', 'Cisco Conference Room', 0, 4),
(2, '', '', 'Company Hardware', 0, 4),
(3, '', '', 'Spectralink Hardware', 0, 4),
(4, 'chris.chares@303software.com', 'Chares', 'Chris', 2, 1),
(5, 'keith@303software.com', 'Decker', 'Keith', 1, 1),
(6, 'damon@303software.com', 'Delgado', 'Damon', 6, 1),
(7, 'don@303software.com', 'Downing', 'Don', 2, 1),
(8, 'eadoxy@303software.com', 'Doxy', 'Elizabeth', 2, 1),
(9, 'chase.foster@303software.com', 'Foster', 'Chase', 2, 1),
(10, 'Gantulga@303software.com', 'Gansukh', 'Gantulga', 2, 1),
(11, 'tierreg@303software.com', 'Gillespie', 'Tierre', 4, 1),
(12, 'matt@303software.com', 'Jaffe', 'Matt', 2, 1),
(13, '', 'Metrailer', 'Trey', 0, 3),
(14, '', 'Michael', 'Sean', 0, 3),
(15, '', 'Opalla', 'Chris', 0, 2),
(16, 'cass@303software.com', 'Pangell', 'Cassidy', 2, 1),
(17, 'mike.petersen@303software.com', 'Petersen', 'Mike', 5, 3),
(18, 'scott@303software.com', 'Quinney', 'Scott', 2, 1),
(19, '', 'Ramsbott', 'Pam', 0, 3),
(20, 'stefan@303software.com', 'Ramsbott', 'Stefan', 5, 1),
(21, 'michelle@303software.com', 'Resnick', 'Michelle', 2, 1),
(22, '', 'Schroeder', 'Karl', 0, 3),
(23, 'derek@303software.com', 'Taniguchi', 'Derek', 4, 1),
(24, 'dave.twiggs@303software.com', 'Twiggs', 'Dave', 2, 1),
(25, 'hannah@303software.com', 'Wright', 'Hannah', 3, 1),
(26, 'david.yoakum@303software.com', 'Yoakum', 'David', 2, 1),
(27, 'mollie@303software.com', 'Dunn', 'Mollie', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL COMMENT 'Asus'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`) VALUES
(1, 'Adobe'),
(2, 'Adorama'),
(3, 'Amazon'),
(4, 'Apple'),
(5, 'Apple Store'),
(6, 'Asus'),
(7, 'ATT'),
(8, 'Balsamiq'),
(9, 'Blackberry'),
(10, 'ConvergeAV | StarTech.com'),
(11, 'Eset'),
(12, 'Google'),
(13, 'Intuit'),
(14, 'Lenovo'),
(15, 'Micro Center'),
(16, 'Microsoft'),
(17, 'Mozilla'),
(18, 'MSI'),
(19, 'Newegg'),
(20, 'OmniGroup'),
(21, 'Panic.com'),
(22, 'Parallels'),
(23, 'Polycom'),
(24, 'Samsung'),
(25, 'SmartFTP'),
(26, 'Sothink'),
(27, 'Sublime Text'),
(28, 'T-Mobile'),
(29, 'ViewSonic'),
(30, 'XOTIC PC'),
(31, 'VMWare'),
(32, 'IBM'),
(40, 'blahblah'),
(41, 'tplink');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financial`
--
ALTER TABLE `financial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hardware`
--
ALTER TABLE `hardware`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `software`
--
ALTER TABLE `software`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `financial`
--
ALTER TABLE `financial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `hardware`
--
ALTER TABLE `hardware`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `software`
--
ALTER TABLE `software`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
