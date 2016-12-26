/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.7.16-0ubuntu0.16.10.1 : Database - workremaider
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`workremaider` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `workremaider`;

/*Table structure for table `tbl_company` */

DROP TABLE IF EXISTS `tbl_company`;

CREATE TABLE `tbl_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tbl_role` */

/*Table structure for table `tbl_user` */

DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`),
  UNIQUE KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_user` */

insert  into `tbl_user`(`id`,`username`,`password`,`email`,`is_active`,`created_at`,`updated_at`) values (1,'admin','sha1$3afa2e4b$1$1f8c05044dd2f1e214ab6c768516f6aab0447ed7','tuanquynh0508@gmail.com',1,'2016-11-29 20:33:03','2016-11-30 22:42:20'),(2,'test1a','sha1$b5e3ce0c$1$aa1d16dec80677d10b1566be5ba39ba93d856687','test-1@gmail.com',0,'2016-11-29 20:34:44','2016-11-30 22:07:12'),(4,'test2','sha1$2da6ba35$1$eccb444362912c0c150e42632a34bfe34369628b','test-2@gmail.com',0,'2016-11-30 21:58:55',NULL),(7,'test2a','sha1$eb2e0a79$1$2f713b93fe655e2f63d5fc344dd4cfc2a1c38116','test-2a@gmail.com',0,'2016-11-30 22:57:44',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
