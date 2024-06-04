-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 29, 2024 at 04:10 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dms`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for each audit log, typically an auto-incrementing integer that serves as the primary key for the table (INTEGER, auto-increment).',
  `activity` text COMMENT 'logs app action',
  `log_date` datetime DEFAULT NULL COMMENT 'action date',
  `res_attr_1` text COMMENT 'Reserve column for future attributes',
  `res_attr_2` text COMMENT 'Reserve column for future attributes',
  `res_attr_3` text COMMENT 'Reserve column for future attributes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `activity`, `log_date`, `res_attr_1`, `res_attr_2`, `res_attr_3`) VALUES
(182, 'syed.asadali.zaidi@gmail.com uploaded new online document [The End Of The Manual Transmission]', '2024-05-20 17:55:24', NULL, NULL, NULL),
(183, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 81] [DOC NAME: How To Convert Array Values To Lowercase In PHP ?]', '2024-05-20 17:58:49', NULL, NULL, NULL),
(184, 'syed.asadali.zaidi@gmail.com deleted [DOC ID: 79] [DOC NAME: logo_1.png]', '2024-05-20 17:59:03', NULL, NULL, NULL),
(185, 'syed.asadali.zaidi@gmail.com uploaded new document [MA_Scope_of_Work.docx]', '2024-05-20 18:00:05', NULL, NULL, NULL),
(186, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:26', NULL, NULL, NULL),
(187, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:28', NULL, NULL, NULL),
(188, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:34', NULL, NULL, NULL),
(189, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:43', NULL, NULL, NULL),
(190, 'syed.asadali.zaidi@gmail.com searched for documentation with tags scope of work', '2024-05-20 18:00:44', NULL, NULL, NULL),
(191, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:48', NULL, NULL, NULL),
(192, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:53', NULL, NULL, NULL),
(193, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:55', NULL, NULL, NULL),
(194, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:00:58', NULL, NULL, NULL),
(195, 'syed.asadali.zaidi@gmail.com searched for documentation with tags scope of work', '2024-05-20 18:01:00', NULL, NULL, NULL),
(196, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:01:03', NULL, NULL, NULL),
(197, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:02:22', NULL, NULL, NULL),
(198, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:02:24', NULL, NULL, NULL),
(199, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:02:27', NULL, NULL, NULL),
(200, 'syed.asadali.zaidi@gmail.com searched for documentation with tags scope of work', '2024-05-20 18:02:43', NULL, NULL, NULL),
(201, 'syed.asadali.zaidi@gmail.com searched for documentation with tags scope of work', '2024-05-20 18:03:20', NULL, NULL, NULL),
(202, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:04:50', NULL, NULL, NULL),
(203, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-20 18:04:54', NULL, NULL, NULL),
(204, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 84] [DOC NAME: MA_Scope_of_Work.docx]', '2024-05-20 18:05:50', NULL, NULL, NULL),
(205, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 80] [DOC NAME: Information Head]', '2024-05-20 18:06:11', NULL, NULL, NULL),
(206, 'User javed@gmail.com\'s role changed to Admin by syed.asadali.zaidi@gmail.com.', '2024-05-20 18:08:00', NULL, NULL, NULL),
(207, 'User javed@gmail.com\'s role changed to User by syed.asadali.zaidi@gmail.com.', '2024-05-20 18:08:04', NULL, NULL, NULL),
(208, 'syed.asadali.zaidi@gmail.com searched for activities in last 7 days by [syed.asadali.zaidi@gmail.com]', '2024-05-20 18:08:31', NULL, NULL, NULL),
(209, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-21 16:55:27', NULL, NULL, NULL),
(210, 'syed.asadali.zaidi@gmail.com searched for documentation with tags ajax php, php lowercase, php array', '2024-05-21 16:55:54', NULL, NULL, NULL),
(211, 'syed.asadali.zaidi@gmail.com searched for documentation with tags scope of work', '2024-05-21 16:56:00', NULL, NULL, NULL),
(212, 'User: javed@gmail.com successfully logged in.', '2024-05-21 16:56:42', NULL, NULL, NULL),
(213, 'javed@gmail.com uploaded new document [application_for_LoD.docx]', '2024-05-21 16:58:14', NULL, NULL, NULL),
(214, 'javed@gmail.com updated [DOC ID: 85] [DOC NAME: application_for_LoD.docx]', '2024-05-21 16:58:37', NULL, NULL, NULL),
(215, 'syed.asadali.zaidi@gmail.com searched for activities in last 7 days by [javed@gmail.com]', '2024-05-21 16:59:23', NULL, NULL, NULL),
(216, 'User javed@gmail.com\'s role changed to Admin by syed.asadali.zaidi@gmail.com.', '2024-05-21 16:59:39', NULL, NULL, NULL),
(217, 'User javed@gmail.com\'s role changed to User by syed.asadali.zaidi@gmail.com.', '2024-05-21 16:59:44', NULL, NULL, NULL),
(218, 'User javed@gmail.com\'s role changed to Admin by syed.asadali.zaidi@gmail.com.', '2024-05-21 16:59:48', NULL, NULL, NULL),
(219, 'User javed@gmail.com\'s role changed to User by syed.asadali.zaidi@gmail.com.', '2024-05-21 17:00:02', NULL, NULL, NULL),
(220, 'syed.asadali.zaidi@gmail.com archived [DOC ID: 81] [DOC NAME: How To Convert Array Values To Lowercase In PHP ?]', '2024-05-21 17:03:04', NULL, NULL, NULL),
(221, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 81] [DOC NAME: How To Convert Array Values To Lowercase In PHP ?]', '2024-05-21 17:03:52', NULL, NULL, NULL),
(222, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 81] [DOC NAME: How To Convert Array Values To Lowercase In PHP ?]', '2024-05-21 17:04:17', NULL, NULL, NULL),
(223, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 84] [DOC NAME: MA_Scope_of_Work.docx]', '2024-05-22 14:17:34', NULL, NULL, NULL),
(224, 'syed.asadali.zaidi@gmail.com updated [DOC ID: 84] [DOC NAME: MA_Scope_of_Work.docx]', '2024-05-22 14:17:43', NULL, NULL, NULL),
(225, 'User: syed.asadali.zaidi@gmail.com successfully logged in.', '2024-05-29 21:19:37', NULL, NULL, NULL),
(226, 'User: javed@gmail.com successfully logged in.', '2024-05-29 21:20:59', NULL, NULL, NULL),
(227, 'syed.asadali.zaidi@gmail.com uploaded new document [10k_icici_payment_15_feb_23.png]', '2024-05-29 21:21:21', NULL, NULL, NULL),
(228, ' No results found.', '2024-05-29 21:21:40', NULL, NULL, NULL),
(229, 'javed@gmail.com searched for documentation with tags php lowercase, demo pic', '2024-05-29 21:21:47', NULL, NULL, NULL),
(230, ' No results found.', '2024-05-29 21:22:47', NULL, NULL, NULL),
(231, 'syed.asadali.zaidi@gmail.com searched for documentation with tags manual transmission', '2024-05-29 21:22:49', NULL, NULL, NULL),
(232, 'syed.asadali.zaidi@gmail.com searched for documentation with tags pab min 24', '2024-05-29 21:22:53', NULL, NULL, NULL),
(233, 'javed@gmail.com archived [DOC ID: 85] [DOC NAME: application_for_LoD.docx]', '2024-05-29 21:23:39', NULL, NULL, NULL),
(234, 'syed.asadali.zaidi@gmail.com searched for activities in last 7 days by [javed@gmail.com]', '2024-05-29 21:38:13', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for each document and is a primary key ',
  `doc_nm` varchar(255) DEFAULT NULL COMMENT 'The title or name of the document',
  `owner_author_id` varchar(120) DEFAULT NULL COMMENT 'The email id which is also the user name of the person who created/uploaded the document.',
  `doc_path` text COMMENT 'The location on the file system where the document is stored.',
  `doc_type` varchar(50) DEFAULT NULL COMMENT 'Helps to specify what sort of information document can be used for. (e.g. A&D, troubleshooting, project plan, use case etc.)',
  `doc_format` varchar(4) DEFAULT NULL COMMENT 'The file type/extension of the document (e.g. .doc, .pdf, .xlsx, url)',
  `assoc_tags` text COMMENT 'Associated tags attached while uploading the document. It may hold multiple tag id separated by #',
  `folder_id` int DEFAULT NULL COMMENT 'A foreign key that references the folder in which the document is stored in the "folders" table.',
  `doc_description` text COMMENT 'The version of the document.',
  `doc_status` varchar(10) DEFAULT 'active' COMMENT 'Status of the document (e.g. "active", "archived", "deleted").',
  `is_published` int NOT NULL DEFAULT '0' COMMENT '1 is for published and 0 is not published. To be search ready for all the user, document needs to be published after being uploaded. Be default it will be unpublished.',
  `date_uploaded` datetime DEFAULT NULL COMMENT 'The date and time the document was uploaded in the system.',
  `uploaded_by` varchar(120) DEFAULT NULL COMMENT 'User id who uploaded the document',
  `res_attr_1` text COMMENT 'Reserve column for future attributes',
  `res_attr_2` text COMMENT 'Reserve column for future attributes',
  `res_attr_3` text COMMENT 'Reserve column for future attributes',
  `res_attr_4` text COMMENT 'Reserve column for future attributes',
  `res_attr_5` text COMMENT 'Reserve column for future attributes',
  PRIMARY KEY (`id`),
  KEY `FK_folderid` (`folder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `doc_nm`, `owner_author_id`, `doc_path`, `doc_type`, `doc_format`, `assoc_tags`, `folder_id`, `doc_description`, `doc_status`, `is_published`, `date_uploaded`, `uploaded_by`, `res_attr_1`, `res_attr_2`, `res_attr_3`, `res_attr_4`, `res_attr_5`) VALUES
(80, 'Information Head', 'javed@gmail.com', 'https://chromestatus.com/feature/5745543795965952', '1', 'url', '17', NULL, 'Description', 'active', 1, '2024-05-14 21:25:22', 'syed.asadali.zaidi@gmail.com', NULL, NULL, NULL, NULL, NULL),
(81, 'How To Convert Array Values To Lowercase In PHP ?', 'syed.asadali.zaidi@gmail.com', 'https://www.geeksforgeeks.org/how-to-convert-array-values-to-lowercase-in-php/', '1', 'url', '19', NULL, 'Given an array containing uppercase string elements and the task is to convert the array elements (uppercase) into lowercase. There are two ways to convert array values to lowercase in PHP.', 'active', 1, '2024-05-14 21:26:38', 'syed.asadali.zaidi@gmail.com', NULL, NULL, NULL, NULL, NULL),
(82, 'logo_1_CP_775.png', 'javed@gmail.com', 'docrep/', '1', 'png', '1', NULL, 'Brief Description', 'active', 1, '2024-05-14 21:55:28', 'javed@gmail.com', NULL, NULL, NULL, NULL, NULL),
(83, 'The End Of The Manual Transmission', 'syed.asadali.zaidi@gmail.com', 'https://www.engineering.com/story/the-end-of-the-manual-transmission', '2', 'url', '15', NULL, 'The automatic transmission has been mass produced since the 1940s, but until the ‘60s most people changed gears manually. Why?', 'active', 1, '2024-05-20 17:55:24', 'syed.asadali.zaidi@gmail.com', NULL, NULL, NULL, NULL, NULL),
(84, 'MA_Scope_of_Work.docx', 'syed.asadali.zaidi@gmail.com', 'docrep/', '2', 'docx', '19', NULL, 'Sample description', 'active', 1, '2024-05-20 18:00:05', 'syed.asadali.zaidi@gmail.com', NULL, NULL, NULL, NULL, NULL),
(85, 'application_for_LoD.docx', 'javed@gmail.com', 'docrep/', '3', 'docx', NULL, NULL, 'Dsffdf', 'archived', 0, '2024-05-21 16:58:14', 'javed@gmail.com', NULL, NULL, NULL, NULL, NULL),
(86, '10k_icici_payment_15_feb_23.png', 'syed.asadali.zaidi@gmail.com', 'docrep/', '1', 'png', '14,22', NULL, 'Dsglkjdfghk', 'active', 0, '2024-05-29 21:21:21', 'syed.asadali.zaidi@gmail.com', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document_type`
--

DROP TABLE IF EXISTS `document_type`;
CREATE TABLE IF NOT EXISTS `document_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctype_nm` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `document_type`
--

INSERT INTO `document_type` (`id`, `doctype_nm`) VALUES
(1, 'Technical Guide'),
(2, 'White paper'),
(3, 'Instructions'),
(4, 'SoP');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `noti_type` varchar(50) DEFAULT NULL,
  `description` varchar(250) NOT NULL,
  `readstatus` varchar(1) NOT NULL DEFAULT 'N' COMMENT 'Y if the notification is marked read by the user else it will keep showing in the alert bell',
  `raised_by` varchar(50) NOT NULL,
  `raised_on` datetime NOT NULL,
  `attr_1` text,
  `attr_2` text,
  `attr_3` text,
  `attr_4` text,
  `attr_5` text,
  `readby` varchar(50) DEFAULT NULL,
  `readon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for each role, typically an auto-incrementing integer that serves as the primary key for the table.',
  `role_nm` varchar(25) DEFAULT NULL COMMENT 'The role',
  `role_description` varchar(255) DEFAULT NULL COMMENT 'Roles description',
  `res_attr_1` text COMMENT 'Reserve column for future attributes',
  `res_attr_2` text COMMENT 'Reserve column for future attributes',
  `res_attr_3` text COMMENT 'Reserve column for future attributes',
  `res_attr_4` text COMMENT 'Reserve column for future attributes',
  `res_attr_5` text COMMENT 'Reserve column for future attributes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `searchedtags`
--

DROP TABLE IF EXISTS `searchedtags`;
CREATE TABLE IF NOT EXISTS `searchedtags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_nm` text,
  `user_eml` text,
  `searchedon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `searchedtags`
--

INSERT INTO `searchedtags` (`id`, `tag_nm`, `user_eml`, `searchedon`) VALUES
(95, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:25'),
(96, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:28'),
(97, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:28'),
(98, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:34'),
(99, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:34'),
(100, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:34'),
(101, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:43'),
(102, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:43'),
(103, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:44'),
(104, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:48'),
(105, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:53'),
(106, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:55'),
(107, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:55'),
(108, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:58'),
(109, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:58'),
(110, 'seo best practices', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:58'),
(111, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:00'),
(112, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:00'),
(113, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:00'),
(114, 'seo best practices', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:00'),
(115, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:03'),
(116, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:03'),
(117, 'seo best practices', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:01:03'),
(118, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:22'),
(119, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:24'),
(120, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:24'),
(121, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:27'),
(122, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:27'),
(123, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:27'),
(124, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:43'),
(125, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:43'),
(126, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:43'),
(127, 'seo best practices', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:02:43'),
(128, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:03:20'),
(129, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:04:50'),
(130, 'ajax php', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:04:54'),
(131, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:04:54'),
(132, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-21 16:55:27'),
(133, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-21 16:55:54'),
(134, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-21 16:56:00'),
(135, 'demo pic', 'javed@gmail.com', '2024-05-29 21:21:40'),
(136, 'demo pic', 'javed@gmail.com', '2024-05-29 21:21:47'),
(137, 'seo guide', 'javed@gmail.com', '2024-05-29 21:21:47'),
(138, 'new tasg', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:47'),
(139, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:49'),
(140, 'new tasg', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:49'),
(141, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:53'),
(142, 'new tasg', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:53'),
(143, 'pab min 24', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:22:53');

-- --------------------------------------------------------

--
-- Table structure for table `system_vars`
--

DROP TABLE IF EXISTS `system_vars`;
CREATE TABLE IF NOT EXISTS `system_vars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variable_name` varchar(50) NOT NULL,
  `value` varchar(25) NOT NULL,
  `description` varchar(150) NOT NULL,
  `allowed_to_change` varchar(1) NOT NULL DEFAULT 'Y',
  `last_updated` varchar(50) NOT NULL,
  `last_updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `system_vars`
--

INSERT INTO `system_vars` (`id`, `variable_name`, `value`, `description`, `allowed_to_change`, `last_updated`, `last_updated_on`) VALUES
(1, 'file_upload_limit', '5000', 'The limit is in Kb, calculate the equivalent value in Mb. 1 Mb = 1024 Kb', 'Y', '', '2024-04-21 10:05:59');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for each tag, typically an auto-incrementing integer that serves as the primary key for the table.',
  `tag_nm` varchar(100) DEFAULT NULL COMMENT 'The name of the document/url tag',
  `created_by` text COMMENT 'The name of the user who created the tag.',
  `created_at` datetime DEFAULT NULL COMMENT 'tag creation time',
  `status` varchar(10) DEFAULT 'active' COMMENT 'Status of the tag (e.g. "active", "archived", "deleted").',
  `res_attr_1` text COMMENT 'Reserve column for future attributes',
  `res_attr_2` text COMMENT 'Reserve column for future attributes',
  `res_attr_3` text COMMENT 'Reserve column for future attributes',
  `res_attr_4` text COMMENT 'Reserve column for future attributes',
  `res_attr_5` text COMMENT 'Reserve column for future attributes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag_nm`, `created_by`, `created_at`, `status`, `res_attr_1`, `res_attr_2`, `res_attr_3`, `res_attr_4`, `res_attr_5`) VALUES
(1, 'ajax php', 'syed.asadali.zaidi@gmail.com', '2024-04-21 15:40:41', 'active', NULL, NULL, NULL, NULL, NULL),
(2, 'shopify setup guide', 'syed.asadali.zaidi@gmail.com', '2024-04-21 15:40:41', 'active', NULL, NULL, NULL, NULL, NULL),
(5, 'seo guide', 'syed.asadali.zaidi@gmail.com', '2024-04-27 15:44:14', 'active', NULL, NULL, NULL, NULL, NULL),
(6, 'seo best practices', 'syed.asadali.zaidi@gmail.com', '2024-04-27 15:44:14', 'active', NULL, NULL, NULL, NULL, NULL),
(14, 'php lowercase', 'syed.asadali.zaidi@gmail.com', '2024-05-20 17:52:28', 'active', NULL, NULL, NULL, NULL, NULL),
(15, 'manual transmission', 'syed.asadali.zaidi@gmail.com', '2024-05-20 17:55:24', 'active', NULL, NULL, NULL, NULL, NULL),
(16, 'php array', 'syed.asadali.zaidi@gmail.com', '2024-05-20 17:58:49', 'active', NULL, NULL, NULL, NULL, NULL),
(17, 'scope of work', 'syed.asadali.zaidi@gmail.com', '2024-05-20 18:00:05', 'active', NULL, NULL, NULL, NULL, NULL),
(18, 'new tasg', 'javed@gmail.com', '2024-05-21 16:58:14', 'active', NULL, NULL, NULL, NULL, NULL),
(19, 'pab min 24', 'javed@gmail.com', '2024-05-21 16:58:14', 'active', NULL, NULL, NULL, NULL, NULL),
(20, '', 'syed.asadali.zaidi@gmail.com', '2024-05-21 17:03:04', 'active', NULL, NULL, NULL, NULL, NULL),
(21, 'na', 'syed.asadali.zaidi@gmail.com', '2024-05-22 14:17:34', 'active', NULL, NULL, NULL, NULL, NULL),
(22, 'demo pic', 'syed.asadali.zaidi@gmail.com', '2024-05-29 21:21:21', 'active', NULL, NULL, NULL, NULL, NULL),
(23, '', 'javed@gmail.com', '2024-05-29 21:23:39', 'active', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for each user, typically an auto-incrementing integer that serves as the primary key for the table.',
  `user_nm` varchar(100) DEFAULT NULL COMMENT 'User fname and lname',
  `user_eml` varchar(120) DEFAULT NULL COMMENT 'User email',
  `password` text COMMENT 'Hashed password',
  `role_id` int DEFAULT '2' COMMENT 'The role id, 1 is admin, 2 is user',
  `status` varchar(10) DEFAULT 'active' COMMENT 'Status of the tag (e.g. "active", "inactive").',
  `res_attr_1` text COMMENT 'Reserve column for future attributes',
  `res_attr_2` text COMMENT 'Reserve column for future attributes',
  `res_attr_3` text COMMENT 'Reserve column for future attributes',
  `res_attr_4` text COMMENT 'Reserve column for future attributes',
  `res_attr_5` text COMMENT 'Reserve column for future attributes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_nm`, `user_eml`, `password`, `role_id`, `status`, `res_attr_1`, `res_attr_2`, `res_attr_3`, `res_attr_4`, `res_attr_5`) VALUES
(1, 'superadmin', 'syed.asadali.zaidi@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 'active', NULL, NULL, NULL, NULL, NULL),
(2, 'Javed Ali Khan', 'javed@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 'active', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_doctags`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_doctags`;
CREATE TABLE IF NOT EXISTS `vw_doctags` (
`id` int
,`tag_nm` varchar(100)
,`created_by` text
,`created_at` datetime
,`status` varchar(10)
,`res_attr_1` text
,`res_attr_2` text
,`res_attr_3` text
,`res_attr_4` text
,`res_attr_5` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_doctypes`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_doctypes`;
CREATE TABLE IF NOT EXISTS `vw_doctypes` (
`id` int
,`doctype_nm` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_doc_doc_type`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_doc_doc_type`;
CREATE TABLE IF NOT EXISTS `vw_doc_doc_type` (
`id` int unsigned
,`doc_nm` varchar(255)
,`owner_author_id` varchar(120)
,`doc_path` text
,`doc_type` varchar(50)
,`doctype_nm` varchar(50)
,`doc_format` varchar(4)
,`assoc_tags` text
,`folder_id` int
,`doc_description` text
,`doc_status` varchar(10)
,`is_published` int
,`date_uploaded` datetime
,`uploaded_by` varchar(120)
,`res_attr_1` text
,`res_attr_2` text
,`res_attr_3` text
,`res_attr_4` text
,`res_attr_5` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_logs`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_logs`;
CREATE TABLE IF NOT EXISTS `vw_logs` (
`id` int
,`activity` text
,`log_date` datetime
,`res_attr_1` text
,`res_attr_2` text
,`res_attr_3` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_searchedata`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_searchedata`;
CREATE TABLE IF NOT EXISTS `vw_searchedata` (
`id` int
,`tag_nm` text
,`user_eml` text
,`searchedon` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_syssettings`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_syssettings`;
CREATE TABLE IF NOT EXISTS `vw_syssettings` (
`id` int
,`variable_name` varchar(50)
,`value` varchar(25)
,`description` varchar(150)
,`allowed_to_change` varchar(1)
,`last_updated` varchar(50)
,`last_updated_on` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_systemusers`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_systemusers`;
CREATE TABLE IF NOT EXISTS `vw_systemusers` (
`id` int unsigned
,`user_nm` varchar(100)
,`password` text
,`user_eml` varchar(120)
,`role_id` int
,`status` varchar(10)
,`res_attr_1` text
,`res_attr_2` text
,`res_attr_3` text
,`res_attr_4` text
,`res_attr_5` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_sys_notifications`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `vw_sys_notifications`;
CREATE TABLE IF NOT EXISTS `vw_sys_notifications` (
`id` int
,`noti_type` varchar(50)
,`description` varchar(250)
,`readstatus` varchar(1)
,`raised_by` varchar(50)
,`raised_on` datetime
,`attr_1` text
,`attr_2` text
,`attr_3` text
,`attr_4` text
,`attr_5` text
,`readby` varchar(50)
,`readon` datetime
);

-- --------------------------------------------------------

--
-- Structure for view `vw_doctags`
--
DROP TABLE IF EXISTS `vw_doctags`;

DROP VIEW IF EXISTS `vw_doctags`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_doctags`  AS SELECT `tags`.`id` AS `id`, `tags`.`tag_nm` AS `tag_nm`, `tags`.`created_by` AS `created_by`, `tags`.`created_at` AS `created_at`, `tags`.`status` AS `status`, `tags`.`res_attr_1` AS `res_attr_1`, `tags`.`res_attr_2` AS `res_attr_2`, `tags`.`res_attr_3` AS `res_attr_3`, `tags`.`res_attr_4` AS `res_attr_4`, `tags`.`res_attr_5` AS `res_attr_5` FROM `tags` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_doctypes`
--
DROP TABLE IF EXISTS `vw_doctypes`;

DROP VIEW IF EXISTS `vw_doctypes`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_doctypes`  AS SELECT `document_type`.`id` AS `id`, `document_type`.`doctype_nm` AS `doctype_nm` FROM `document_type` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_doc_doc_type`
--
DROP TABLE IF EXISTS `vw_doc_doc_type`;

DROP VIEW IF EXISTS `vw_doc_doc_type`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_doc_doc_type`  AS SELECT `d`.`id` AS `id`, `d`.`doc_nm` AS `doc_nm`, `d`.`owner_author_id` AS `owner_author_id`, `d`.`doc_path` AS `doc_path`, `d`.`doc_type` AS `doc_type`, `dt`.`doctype_nm` AS `doctype_nm`, `d`.`doc_format` AS `doc_format`, `d`.`assoc_tags` AS `assoc_tags`, `d`.`folder_id` AS `folder_id`, `d`.`doc_description` AS `doc_description`, `d`.`doc_status` AS `doc_status`, `d`.`is_published` AS `is_published`, `d`.`date_uploaded` AS `date_uploaded`, `d`.`uploaded_by` AS `uploaded_by`, `d`.`res_attr_1` AS `res_attr_1`, `d`.`res_attr_2` AS `res_attr_2`, `d`.`res_attr_3` AS `res_attr_3`, `d`.`res_attr_4` AS `res_attr_4`, `d`.`res_attr_5` AS `res_attr_5` FROM (`document` `d` join `document_type` `dt`) WHERE (`d`.`doc_type` = `dt`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_logs`
--
DROP TABLE IF EXISTS `vw_logs`;

DROP VIEW IF EXISTS `vw_logs`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_logs`  AS SELECT `audit_logs`.`id` AS `id`, `audit_logs`.`activity` AS `activity`, `audit_logs`.`log_date` AS `log_date`, `audit_logs`.`res_attr_1` AS `res_attr_1`, `audit_logs`.`res_attr_2` AS `res_attr_2`, `audit_logs`.`res_attr_3` AS `res_attr_3` FROM `audit_logs` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_searchedata`
--
DROP TABLE IF EXISTS `vw_searchedata`;

DROP VIEW IF EXISTS `vw_searchedata`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_searchedata`  AS SELECT `searchedtags`.`id` AS `id`, `searchedtags`.`tag_nm` AS `tag_nm`, `searchedtags`.`user_eml` AS `user_eml`, `searchedtags`.`searchedon` AS `searchedon` FROM `searchedtags` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_syssettings`
--
DROP TABLE IF EXISTS `vw_syssettings`;

DROP VIEW IF EXISTS `vw_syssettings`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_syssettings`  AS SELECT `system_vars`.`id` AS `id`, `system_vars`.`variable_name` AS `variable_name`, `system_vars`.`value` AS `value`, `system_vars`.`description` AS `description`, `system_vars`.`allowed_to_change` AS `allowed_to_change`, `system_vars`.`last_updated` AS `last_updated`, `system_vars`.`last_updated_on` AS `last_updated_on` FROM `system_vars` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_systemusers`
--
DROP TABLE IF EXISTS `vw_systemusers`;

DROP VIEW IF EXISTS `vw_systemusers`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_systemusers`  AS SELECT `users`.`id` AS `id`, `users`.`user_nm` AS `user_nm`, `users`.`password` AS `password`, `users`.`user_eml` AS `user_eml`, `users`.`role_id` AS `role_id`, `users`.`status` AS `status`, `users`.`res_attr_1` AS `res_attr_1`, `users`.`res_attr_2` AS `res_attr_2`, `users`.`res_attr_3` AS `res_attr_3`, `users`.`res_attr_4` AS `res_attr_4`, `users`.`res_attr_5` AS `res_attr_5` FROM `users` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_sys_notifications`
--
DROP TABLE IF EXISTS `vw_sys_notifications`;

DROP VIEW IF EXISTS `vw_sys_notifications`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dmsadmin`@`localhost` SQL SECURITY DEFINER VIEW `vw_sys_notifications`  AS SELECT `notifications`.`id` AS `id`, `notifications`.`noti_type` AS `noti_type`, `notifications`.`description` AS `description`, `notifications`.`readstatus` AS `readstatus`, `notifications`.`raised_by` AS `raised_by`, `notifications`.`raised_on` AS `raised_on`, `notifications`.`attr_1` AS `attr_1`, `notifications`.`attr_2` AS `attr_2`, `notifications`.`attr_3` AS `attr_3`, `notifications`.`attr_4` AS `attr_4`, `notifications`.`attr_5` AS `attr_5`, `notifications`.`readby` AS `readby`, `notifications`.`readon` AS `readon` FROM `notifications` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
