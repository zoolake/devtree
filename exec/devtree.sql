-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: devtree
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment` (
  `comment_seq` bigint NOT NULL AUTO_INCREMENT,
  `community_seq` bigint NOT NULL,
  `user_seq` bigint NOT NULL,
  `comment_content` text,
  `comment_create_time` datetime DEFAULT NULL,
  `comment_update_time` datetime DEFAULT NULL,
  `comment_like_cnt` int DEFAULT NULL,
  PRIMARY KEY (`comment_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment`
--

LOCK TABLES `tb_comment` WRITE;
/*!40000 ALTER TABLE `tb_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_comment_like`
--

DROP TABLE IF EXISTS `tb_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment_like` (
  `user_seq` bigint NOT NULL,
  `comment_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`comment_seq`),
  KEY `FK_tb_comment_TO_tb_comment_like_1` (`comment_seq`),
  CONSTRAINT `FK_tb_comment_TO_tb_comment_like_1` FOREIGN KEY (`comment_seq`) REFERENCES `tb_comment` (`comment_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_comment_like_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment_like`
--

LOCK TABLES `tb_comment_like` WRITE;
/*!40000 ALTER TABLE `tb_comment_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_community`
--

DROP TABLE IF EXISTS `tb_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_community` (
  `community_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL,
  `community_title` varchar(20) DEFAULT NULL,
  `community_content` text,
  `community_create_time` datetime DEFAULT NULL,
  `community_update_time` datetime DEFAULT NULL,
  `community_like_cnt` int DEFAULT NULL,
  `community_view_cnt` int DEFAULT NULL,
  PRIMARY KEY (`community_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_community`
--

LOCK TABLES `tb_community` WRITE;
/*!40000 ALTER TABLE `tb_community` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_community_like`
--

DROP TABLE IF EXISTS `tb_community_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_community_like` (
  `community_seq` bigint NOT NULL,
  `user_seq` bigint NOT NULL,
  PRIMARY KEY (`community_seq`,`user_seq`),
  KEY `FK_tb_user_TO_tb_community_like_1` (`user_seq`),
  CONSTRAINT `FK_tb_community_TO_tb_community_like_1` FOREIGN KEY (`community_seq`) REFERENCES `tb_community` (`community_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_community_like_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_community_like`
--

LOCK TABLES `tb_community_like` WRITE;
/*!40000 ALTER TABLE `tb_community_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_community_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_community_tech`
--

DROP TABLE IF EXISTS `tb_community_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_community_tech` (
  `community_seq` bigint NOT NULL,
  `tech_seq` bigint NOT NULL,
  PRIMARY KEY (`community_seq`,`tech_seq`),
  KEY `FK_tb_tech_TO_tb_community_tech_1` (`tech_seq`),
  CONSTRAINT `FK_tb_community_TO_tb_community_tech_1` FOREIGN KEY (`community_seq`) REFERENCES `tb_community` (`community_seq`),
  CONSTRAINT `FK_tb_tech_TO_tb_community_tech_1` FOREIGN KEY (`tech_seq`) REFERENCES `tb_tech` (`tech_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_community_tech`
--

LOCK TABLES `tb_community_tech` WRITE;
/*!40000 ALTER TABLE `tb_community_tech` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_community_tech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentor`
--

DROP TABLE IF EXISTS `tb_mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentor` (
  `mentor_seq` bigint NOT NULL,
  `mentor_career` text,
  `mentoring_cnt` int DEFAULT NULL,
  `mentor_exp` bigint DEFAULT NULL,
  `mentor_desc` text,
  `verification_date` datetime DEFAULT NULL,
  PRIMARY KEY (`mentor_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_mentor_1` FOREIGN KEY (`mentor_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentor`
--

LOCK TABLES `tb_mentor` WRITE;
/*!40000 ALTER TABLE `tb_mentor` DISABLE KEYS */;
INSERT INTO `tb_mentor` VALUES (6,'3년차 백엔드 개발자',0,0,'안녕하세요! 3년차 백엔드 개발자 호준문입니다! 여러분에게 도움이 될 수 있는 멘토가 되겠습니다~ 감사합니다',NULL),(8,'12년차 풀스택 개발자',0,0,'안녕하세요! 영국 런던에서 근무하고있는 한국 최고의 개발자 손흥민입니다. 저를 믿고 따라와주세요. 슈퍼손~슈퍼콘~',NULL),(10,'5년차 프론트엔드 개발자',0,0,'반가워요~ 프론트엔드 개발자 이천재입니다! 저의 천재적인 두뇌로 사회에 이바지하고 싶습니다. 멘토링 예약 많이 해주세요',NULL),(12,'12년차 백엔드 개발자',2,20000,'안녕하세요~ 자바 마스터입니다~',NULL),(21,'1년차 프론트엔드 개발자',0,0,'안녕하세요 react할줄 모르는 1년차 프론트 엔드 개발자입니다.','2022-02-18 10:14:32'),(22,'1년차 백엔드 개발자',0,0,NULL,'2022-02-18 10:26:13'),(23,'1년차 프론트엔드 개발자',0,0,'안녕하세요! 프론트를 좋아하는 개발자입니다.','2022-02-18 11:42:52');
/*!40000 ALTER TABLE `tb_mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentor_authentication`
--

DROP TABLE IF EXISTS `tb_mentor_authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentor_authentication` (
  `user_seq` bigint NOT NULL,
  `mentor_company_email` varchar(100) DEFAULT NULL,
  `mentor_documentation` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`user_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_mentor_authentication_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentor_authentication`
--

LOCK TABLES `tb_mentor_authentication` WRITE;
/*!40000 ALTER TABLE `tb_mentor_authentication` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_mentor_authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentor_schedule`
--

DROP TABLE IF EXISTS `tb_mentor_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentor_schedule` (
  `mentor_seq` bigint NOT NULL,
  `mentor_date` date NOT NULL,
  `mentor_time` time NOT NULL,
  PRIMARY KEY (`mentor_date`,`mentor_time`,`mentor_seq`),
  KEY `FK_tb_mentor_TO_tb_mentor_schedule_1` (`mentor_seq`),
  CONSTRAINT `FK_tb_mentor_TO_tb_mentor_schedule_1` FOREIGN KEY (`mentor_seq`) REFERENCES `tb_mentor` (`mentor_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentor_schedule`
--

LOCK TABLES `tb_mentor_schedule` WRITE;
/*!40000 ALTER TABLE `tb_mentor_schedule` DISABLE KEYS */;
INSERT INTO `tb_mentor_schedule` VALUES (8,'2022-02-19','14:00:00'),(8,'2022-02-19','16:00:00'),(8,'2022-02-19','18:00:00'),(8,'2022-02-20','14:00:00'),(8,'2022-02-20','16:00:00'),(10,'2022-02-18','10:00:00'),(10,'2022-02-19','10:00:00'),(10,'2022-02-19','11:00:00'),(10,'2022-02-19','12:00:00'),(10,'2022-02-19','18:00:00'),(10,'2022-02-19','19:00:00'),(10,'2022-02-19','20:00:00'),(10,'2022-02-19','21:00:00'),(10,'2022-02-20','10:00:00'),(10,'2022-02-20','11:00:00'),(10,'2022-02-20','14:00:00'),(10,'2022-02-20','15:00:00'),(10,'2022-02-20','16:00:00'),(10,'2022-02-20','17:00:00'),(10,'2022-02-21','09:00:00'),(10,'2022-02-21','18:00:00'),(10,'2022-02-21','19:00:00'),(10,'2022-02-21','20:00:00'),(10,'2022-02-21','21:00:00'),(10,'2022-02-21','22:00:00'),(10,'2022-02-21','23:00:00'),(10,'2022-02-22','09:00:00'),(10,'2022-02-22','19:00:00'),(10,'2022-02-22','20:00:00'),(10,'2022-02-22','21:00:00'),(10,'2022-02-22','22:00:00'),(10,'2022-02-23','09:00:00'),(10,'2022-02-23','17:00:00'),(10,'2022-02-23','18:00:00'),(10,'2022-02-23','19:00:00'),(10,'2022-02-23','20:00:00'),(10,'2022-02-24','09:00:00'),(10,'2022-02-24','19:00:00'),(10,'2022-02-24','20:00:00'),(10,'2022-02-24','21:00:00'),(10,'2022-02-24','22:00:00'),(10,'2022-02-25','10:00:00'),(10,'2022-02-25','20:00:00'),(10,'2022-02-25','21:00:00'),(10,'2022-02-25','22:00:00'),(10,'2022-02-25','23:00:00'),(21,'2022-02-19','04:00:00'),(21,'2022-02-20','04:00:00'),(21,'2022-02-20','06:00:00'),(21,'2022-02-20','08:00:00'),(22,'2022-02-21','02:00:00'),(22,'2022-02-21','06:00:00'),(22,'2022-02-21','08:00:00'),(22,'2022-02-21','10:00:00'),(22,'2022-02-21','14:00:00'),(22,'2022-02-21','16:00:00'),(22,'2022-02-21','18:00:00'),(22,'2022-02-22','06:00:00'),(22,'2022-02-22','10:00:00'),(22,'2022-02-22','12:00:00'),(22,'2022-02-22','14:00:00'),(22,'2022-02-22','18:00:00'),(22,'2022-02-22','20:00:00'),(22,'2022-02-22','22:00:00'),(23,'2022-02-19','02:00:00'),(23,'2022-02-19','08:00:00'),(23,'2022-02-19','10:00:00'),(23,'2022-02-19','14:00:00'),(23,'2022-02-19','18:00:00'),(23,'2022-02-20','00:00:00'),(23,'2022-02-20','02:00:00'),(23,'2022-02-20','04:00:00'),(23,'2022-02-20','14:00:00'),(23,'2022-02-20','16:00:00'),(23,'2022-02-21','02:00:00'),(23,'2022-02-21','06:00:00'),(23,'2022-02-21','10:00:00'),(23,'2022-02-23','02:00:00'),(23,'2022-02-23','04:00:00'),(23,'2022-02-23','06:00:00');
/*!40000 ALTER TABLE `tb_mentor_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentor_tech`
--

DROP TABLE IF EXISTS `tb_mentor_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentor_tech` (
  `mentor_seq` bigint NOT NULL,
  `tech_seq` bigint NOT NULL,
  PRIMARY KEY (`mentor_seq`,`tech_seq`),
  KEY `FK_tb_tech_TO_tb_mentor_tech_1` (`tech_seq`),
  CONSTRAINT `FK_tb_mentor_TO_tb_mentor_tech_1` FOREIGN KEY (`mentor_seq`) REFERENCES `tb_mentor` (`mentor_seq`),
  CONSTRAINT `FK_tb_tech_TO_tb_mentor_tech_1` FOREIGN KEY (`tech_seq`) REFERENCES `tb_tech` (`tech_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentor_tech`
--

LOCK TABLES `tb_mentor_tech` WRITE;
/*!40000 ALTER TABLE `tb_mentor_tech` DISABLE KEYS */;
INSERT INTO `tb_mentor_tech` VALUES (6,1),(8,1),(10,1),(12,1),(22,1),(8,2),(10,2),(6,3),(8,3),(10,3),(8,4),(10,5),(6,6),(12,6),(6,7),(10,7),(21,7),(12,9),(22,9),(21,11),(21,12),(22,12),(23,12),(22,13),(23,15);
/*!40000 ALTER TABLE `tb_mentor_tech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentoring_comment`
--

DROP TABLE IF EXISTS `tb_mentoring_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentoring_comment` (
  `user_seq` bigint NOT NULL,
  `mentoring_seq` bigint NOT NULL,
  `mentor_comment` text,
  PRIMARY KEY (`user_seq`,`mentoring_seq`),
  KEY `FK_tb_mentoring_reservation_TO_tb_mentoring_user_1` (`mentoring_seq`),
  CONSTRAINT `FK_tb_mentoring_reservation_TO_tb_mentoring_user_1` FOREIGN KEY (`mentoring_seq`) REFERENCES `tb_mentoring_reservation` (`mentoring_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_mentoring_user_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentoring_comment`
--

LOCK TABLES `tb_mentoring_comment` WRITE;
/*!40000 ALTER TABLE `tb_mentoring_comment` DISABLE KEYS */;
INSERT INTO `tb_mentoring_comment` VALUES (1,1,'잘썼습니다~'),(6,1,'왜 안되는거야...'),(7,1,'아유 너무 좋습니다~!'),(17,1,'많이 배웠습니다! 감사합니다!'),(17,5,'유익한 시간이였습니다.');
/*!40000 ALTER TABLE `tb_mentoring_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mentoring_reservation`
--

DROP TABLE IF EXISTS `tb_mentoring_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mentoring_reservation` (
  `mentoring_seq` bigint NOT NULL AUTO_INCREMENT,
  `team_seq` bigint NOT NULL,
  `mentor_seq` bigint NOT NULL,
  `mentoring_start_date` date DEFAULT NULL,
  `mentoring_start_time` time DEFAULT NULL,
  `mentoring_application_comment` varchar(100) DEFAULT NULL,
  `mentoring_create_time` datetime DEFAULT NULL,
  `mentoring_state` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`mentoring_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mentoring_reservation`
--

LOCK TABLES `tb_mentoring_reservation` WRITE;
/*!40000 ALTER TABLE `tb_mentoring_reservation` DISABLE KEYS */;
INSERT INTO `tb_mentoring_reservation` VALUES (1,4,8,'2022-02-11','12:00:00','요청',NULL,'FINISH'),(2,31,10,'2022-02-21','18:00:00','자바 좀 가르쳐주세요~','2022-02-18 04:12:30','ACCEPT'),(3,30,8,'2022-02-19','14:00:00','멘토링 신청합니다.','2022-02-18 05:04:26','WAIT'),(4,32,10,'2022-02-19','12:00:00','','2022-02-18 06:02:26','WAIT'),(5,29,21,'2022-02-19','06:00:00','한 수 배워가겠습니다.','2022-02-18 11:31:33','FINISH'),(6,34,21,'2022-02-19','02:00:00','리액트 가르쳐주세요!','2022-02-18 11:59:09','ACCEPT'),(7,33,8,'2022-02-20','18:00:00','','2022-02-18 12:05:12','ACCEPT'),(8,32,8,'2022-02-19','14:00:00','자바를 잡겠습니다','2022-02-18 12:06:58','WAIT');
/*!40000 ALTER TABLE `tb_mentoring_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_notification`
--

DROP TABLE IF EXISTS `tb_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_notification` (
  `notification_seq` bigint NOT NULL AUTO_INCREMENT,
  `notification_send_user_seq` bigint DEFAULT NULL,
  `notification_receive_user_seq` bigint DEFAULT NULL,
  `notification_send_time` datetime DEFAULT NULL,
  `notification_detail_position_name` varchar(20) DEFAULT NULL,
  `notification_content` varchar(100) DEFAULT NULL,
  `notification_type` varchar(10) DEFAULT NULL,
  `is_check` tinyint DEFAULT NULL,
  `notification_team_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`notification_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_notification`
--

LOCK TABLES `tb_notification` WRITE;
/*!40000 ALTER TABLE `tb_notification` DISABLE KEYS */;
INSERT INTO `tb_notification` VALUES (1,17,1,'2022-02-17 21:13:42',NULL,'문준호님이 초고수 리액트 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',1,5),(2,1,1,'2022-02-17 23:48:59',NULL,'오나연님이 HAPPY HOUSE팀 프로젝트의 웹 서버 에 신청 요청을 보냈습니다','PROJECT',1,27),(3,20,1,'2022-02-18 00:35:17',NULL,'데브트리님이 병아리 자바 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',0,4),(4,20,1,'2022-02-18 00:35:44',NULL,'데브트리님이 HAPPY HOUSE팀 프로젝트의 웹 서버 에 신청 요청을 보냈습니다','PROJECT',1,27),(5,20,1,'2022-02-18 03:48:30',NULL,'데브트리님이 병아리 자바 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',1,4),(6,20,1,'2022-02-18 03:49:03',NULL,'데브트리님이 병아리 자바 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',0,4),(7,20,1,'2022-02-18 03:49:47',NULL,'데브트리님이 HAPPY HOUSE팀 프로젝트의 웹 서버 에 신청 요청을 보냈습니다','PROJECT',0,27),(8,1,20,'2022-02-18 04:11:09',NULL,'병아리 자바 스터디팀 스터디 신청이 수락되었습니다!','STUDY',0,4),(9,20,10,'2022-02-18 04:12:30',NULL,'devtree 자바 스터디팀(STUDY)이 멘토링 신청 요청을 보냈습니다','MENTORING',0,31),(10,17,8,'2022-02-18 05:04:26',NULL,'바나나시저스킥팀(STUDY)이 멘토링 신청 요청을 보냈습니다','MENTORING',0,30),(11,15,1,'2022-02-18 06:00:48',NULL,'조항준님이 testtest팀 스터디에 신청 요청을 보냈습니다','STUDY',1,11),(12,15,10,'2022-02-18 06:02:26',NULL,'자바를 자바라팀(STUDY)이 멘토링 신청 요청을 보냈습니다','MENTORING',0,32),(13,15,15,'2022-02-18 06:03:47',NULL,'조항준님이 프로젝트프로젝트팀 프로젝트의 안드로이드 에 신청 요청을 보냈습니다','PROJECT',1,33),(14,15,15,'2022-02-18 06:03:51',NULL,'프로젝트프로젝트팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,33),(15,15,15,'2022-02-18 06:04:12',NULL,'프로젝트프로젝트팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,33),(16,15,15,'2022-02-18 06:04:13',NULL,'프로젝트프로젝트팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,33),(17,15,15,'2022-02-18 06:04:14',NULL,'프로젝트프로젝트팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,33),(18,18,17,'2022-02-18 06:44:36',NULL,'힝구님이 ROOTNODE팀 프로젝트의 웹 서버 에 신청 요청을 보냈습니다','PROJECT',0,29),(19,21,1,'2022-02-18 10:17:01',NULL,'루트노드팀장님이 병아리 자바 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',1,4),(20,21,1,'2022-02-18 10:17:51',NULL,'루트노드팀장님이 HAPPY HOUSE팀 프로젝트의 웹 프론트엔드 에 신청 요청을 보냈습니다','PROJECT',1,27),(21,1,21,'2022-02-18 10:17:55',NULL,'병아리 자바 스터디팀 스터디 신청이 수락되었습니다!','STUDY',1,4),(22,1,1,'2022-02-18 10:18:12',NULL,'HAPPY HOUSE팀 프로젝트 신청이 수락되었습니다!','PROJECT',0,27),(23,1,20,'2022-02-18 10:18:13',NULL,'HAPPY HOUSE팀 프로젝트 신청이 수락되었습니다!','PROJECT',0,27),(24,1,21,'2022-02-18 10:18:14',NULL,'HAPPY HOUSE팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,27),(25,18,1,'2022-02-18 10:24:44',NULL,'힝구님이 초고수 리액트 스터디팀 스터디에 신청 요청을 보냈습니다','STUDY',0,5),(26,17,17,'2022-02-18 10:53:39',NULL,'문준호님이 ROOTNODE팀 프로젝트의 웹 서버 에 신청 요청을 보냈습니다','PROJECT',1,29),(27,17,17,'2022-02-18 10:54:29',NULL,'ROOTNODE팀 프로젝트 신청이 수락되었습니다!','PROJECT',1,29),(28,17,18,'2022-02-18 10:54:30',NULL,'ROOTNODE팀 프로젝트 신청이 수락되었습니다!','PROJECT',0,29),(29,17,21,'2022-02-18 11:31:33',NULL,'ROOTNODE팀(PROJECT)이 멘토링 신청 요청을 보냈습니다','MENTORING',1,29),(30,21,17,'2022-02-18 11:31:57',NULL,'clsrn5004멘토님이ROOTNODE팀이 멘토링 요청을 수락하였습니다!','MENTORING',1,29),(31,23,21,'2022-02-18 11:59:09',NULL,'리액트 뿌수기팀(STUDY)이 멘토링 신청 요청을 보냈습니다','MENTORING',1,34),(32,21,23,'2022-02-18 12:00:12',NULL,'clsrn5004멘토님이리액트 뿌수기팀이 멘토링 요청을 수락하였습니다!','MENTORING',1,34),(33,15,8,'2022-02-18 12:05:12',NULL,'프로젝트프로젝트팀(PROJECT)이 멘토링 신청 요청을 보냈습니다','MENTORING',1,33),(34,15,8,'2022-02-18 12:06:58',NULL,'자바를 자바라팀(STUDY)이 멘토링 신청 요청을 보냈습니다','MENTORING',0,32),(35,8,15,'2022-02-18 12:07:07',NULL,'월드클래스멘토님이프로젝트프로젝트팀이 멘토링 요청을 수락하였습니다!','MENTORING',0,33),(36,15,1,'2022-02-18 12:08:29',NULL,'조항준님이 HAPPY HOUSE팀 프로젝트의 웹 퍼블리셔 에 신청 요청을 보냈습니다','PROJECT',0,27);
/*!40000 ALTER TABLE `tb_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_position`
--

DROP TABLE IF EXISTS `tb_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_position` (
  `detail_position_name` varchar(20) NOT NULL,
  `position_name` varchar(20) NOT NULL,
  PRIMARY KEY (`detail_position_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_position`
--

LOCK TABLES `tb_position` WRITE;
/*!40000 ALTER TABLE `tb_position` DISABLE KEYS */;
INSERT INTO `tb_position` VALUES ('3D 디자인','디자인'),('AI','백엔드 개발'),('DB/빅데이터/DS','백엔드 개발'),('IOS','프론트엔드 개발'),('UI/UX 기획','기획'),('UI/UX 디자인','디자인'),('게임 기획','기획'),('게임 서버','백엔드 개발'),('그래픽 디자인','디자인'),('기타','디자인'),('블록체인','백엔드 개발'),('안드로이드','프론트엔드 개발'),('웹 서버','백엔드 개발'),('웹 퍼블리셔','프론트엔드 개발'),('웹 프론트엔드','프론트엔드 개발'),('크로스플랫폼','프론트엔드 개발'),('프로젝트 매니저','기획'),('하드웨어(제품) 기획','기획'),('하드웨어(제품) 디자인','디자인');
/*!40000 ALTER TABLE `tb_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_project_position`
--

DROP TABLE IF EXISTS `tb_project_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_project_position` (
  `detail_position_name` varchar(20) NOT NULL,
  `team_seq` bigint NOT NULL,
  `position_recruit_cnt` int DEFAULT NULL,
  `position_member_cnt` int DEFAULT NULL,
  PRIMARY KEY (`detail_position_name`,`team_seq`),
  KEY `FK_tb_team_TO_tb_project_position_1` (`team_seq`),
  CONSTRAINT `FK_tb_position_TO_tb_project_position_1` FOREIGN KEY (`detail_position_name`) REFERENCES `tb_position` (`detail_position_name`),
  CONSTRAINT `FK_tb_team_TO_tb_project_position_1` FOREIGN KEY (`team_seq`) REFERENCES `tb_team` (`team_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_project_position`
--

LOCK TABLES `tb_project_position` WRITE;
/*!40000 ALTER TABLE `tb_project_position` DISABLE KEYS */;
INSERT INTO `tb_project_position` VALUES ('3D 디자인',10,10,0),('3D 디자인',11,10,0),('3D 디자인',12,10,0),('3D 디자인',20,10,0),('AI',18,10,0),('DB/빅데이터/DS',7,10,0),('DB/빅데이터/DS',9,10,0),('DB/빅데이터/DS',19,10,0),('UI/UX 디자인',27,2,0),('게임 서버',33,10,0),('블록체인',7,10,0),('블록체인',9,10,0),('안드로이드',33,10,4),('웹 서버',27,3,2),('웹 서버',29,3,2),('웹 퍼블리셔',27,1,0),('웹 프론트엔드',27,3,1),('웹 프론트엔드',29,3,0),('크로스플랫폼',19,10,0),('프로젝트 매니저',19,10,0);
/*!40000 ALTER TABLE `tb_project_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_project_position_reservation`
--

DROP TABLE IF EXISTS `tb_project_position_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_project_position_reservation` (
  `user_seq` bigint NOT NULL,
  `detail_position_name` varchar(20) NOT NULL,
  `team_seq` bigint NOT NULL,
  `project_reservation_create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_seq`,`detail_position_name`,`team_seq`),
  KEY `FK_tb_project_position_TO_tb_project_position_reservation_1` (`detail_position_name`),
  KEY `FK_tb_project_position_TO_tb_project_position_reservation_2` (`team_seq`),
  CONSTRAINT `FK_tb_project_position_TO_tb_project_position_reservation_1` FOREIGN KEY (`detail_position_name`) REFERENCES `tb_project_position` (`detail_position_name`),
  CONSTRAINT `FK_tb_project_position_TO_tb_project_position_reservation_2` FOREIGN KEY (`team_seq`) REFERENCES `tb_project_position` (`team_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_project_position_reservation_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_project_position_reservation`
--

LOCK TABLES `tb_project_position_reservation` WRITE;
/*!40000 ALTER TABLE `tb_project_position_reservation` DISABLE KEYS */;
INSERT INTO `tb_project_position_reservation` VALUES (15,'웹 퍼블리셔',27,'2022-02-18 12:08:29');
/*!40000 ALTER TABLE `tb_project_position_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_project_position_user`
--

DROP TABLE IF EXISTS `tb_project_position_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_project_position_user` (
  `user_seq` bigint NOT NULL,
  `detail_position_name` varchar(20) NOT NULL,
  `team_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`detail_position_name`,`team_seq`),
  KEY `FK_tb_project_position_TO_tb_project_position_user_1` (`detail_position_name`),
  KEY `FK_tb_project_position_TO_tb_project_position_user_2` (`team_seq`),
  CONSTRAINT `FK_tb_project_position_TO_tb_project_position_user_1` FOREIGN KEY (`detail_position_name`) REFERENCES `tb_project_position` (`detail_position_name`),
  CONSTRAINT `FK_tb_project_position_TO_tb_project_position_user_2` FOREIGN KEY (`team_seq`) REFERENCES `tb_project_position` (`team_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_project_position_user_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_project_position_user`
--

LOCK TABLES `tb_project_position_user` WRITE;
/*!40000 ALTER TABLE `tb_project_position_user` DISABLE KEYS */;
INSERT INTO `tb_project_position_user` VALUES (1,'웹 서버',27),(20,'웹 서버',27),(21,'웹 프론트엔드',27),(17,'웹 서버',29),(18,'웹 서버',29),(15,'안드로이드',33);
/*!40000 ALTER TABLE `tb_project_position_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_report`
--

DROP TABLE IF EXISTS `tb_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_report` (
  `report_seq` bigint NOT NULL AUTO_INCREMENT,
  `report_sender_seq` bigint DEFAULT NULL,
  `report_receiver_seq` bigint DEFAULT NULL,
  `report_reason` varchar(100) DEFAULT NULL,
  `report_time` datetime DEFAULT NULL,
  `report_receiver_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`report_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_report`
--

LOCK TABLES `tb_report` WRITE;
/*!40000 ALTER TABLE `tb_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_study_reservation`
--

DROP TABLE IF EXISTS `tb_study_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_study_reservation` (
  `user_seq` bigint NOT NULL,
  `team_seq` bigint NOT NULL,
  `study_reservation_create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_seq`,`team_seq`),
  KEY `FK_tb_team_TO_tb_study_reservation_1` (`team_seq`),
  CONSTRAINT `FK_tb_team_TO_tb_study_reservation_1` FOREIGN KEY (`team_seq`) REFERENCES `tb_team` (`team_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_study_reservation_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_study_reservation`
--

LOCK TABLES `tb_study_reservation` WRITE;
/*!40000 ALTER TABLE `tb_study_reservation` DISABLE KEYS */;
INSERT INTO `tb_study_reservation` VALUES (15,11,'2022-02-18 06:00:48'),(17,5,'2022-02-17 21:13:42'),(18,5,'2022-02-18 10:24:44');
/*!40000 ALTER TABLE `tb_study_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_study_user`
--

DROP TABLE IF EXISTS `tb_study_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_study_user` (
  `user_seq` bigint NOT NULL,
  `team_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`team_seq`),
  KEY `FK_tb_team_TO_tb_study_user_1` (`team_seq`),
  CONSTRAINT `FK_tb_team_TO_tb_study_user_1` FOREIGN KEY (`team_seq`) REFERENCES `tb_team` (`team_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_study_user_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_study_user`
--

LOCK TABLES `tb_study_user` WRITE;
/*!40000 ALTER TABLE `tb_study_user` DISABLE KEYS */;
INSERT INTO `tb_study_user` VALUES (1,4),(7,4),(15,4),(16,4),(17,4),(18,4),(19,4),(20,4),(21,4),(1,5),(1,6),(1,13),(1,15),(1,21),(1,22),(1,23),(1,24),(1,25),(16,26),(17,30),(20,31),(15,32),(23,34);
/*!40000 ALTER TABLE `tb_study_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_team`
--

DROP TABLE IF EXISTS `tb_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_team` (
  `team_seq` bigint NOT NULL AUTO_INCREMENT,
  `team_manager_seq` bigint DEFAULT NULL,
  `team_type` varchar(10) DEFAULT NULL,
  `team_name` varchar(20) DEFAULT NULL,
  `team_desc` text,
  `team_state` varchar(10) DEFAULT NULL,
  `team_recruit_cnt` int DEFAULT NULL,
  `team_member_cnt` int DEFAULT NULL,
  `team_create_time` datetime DEFAULT NULL,
  `team_update_time` datetime DEFAULT NULL,
  `team_start_time` datetime DEFAULT NULL,
  `team_end_time` datetime DEFAULT NULL,
  `team_favorites_cnt` int DEFAULT NULL,
  PRIMARY KEY (`team_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_team`
--

LOCK TABLES `tb_team` WRITE;
/*!40000 ALTER TABLE `tb_team` DISABLE KEYS */;
INSERT INTO `tb_team` VALUES (4,1,'STUDY','병아리 자바 스터디',' 함께 자바 스터디하실 분을 찾고있습니다~\n못하셔도 상관없습니다!! 많은 지원 부탁드립니다. 감사합니다!','RECRUIT',10,3,'2022-02-09 11:48:14','2022-02-18 10:17:55',NULL,NULL,0),(5,1,'STUDY','초고수 리액트 스터디','고수들만 찾고 있습니다. 빠르게 10분 찾고있습니다. 초보 안받습니다.','RECRUIT',10,1,'2022-02-09 11:50:00','2022-02-09 11:50:00',NULL,NULL,0),(6,1,'STUDY','자바 알고리즘 마스터 스터디','자바 알고리즘 마스터 하실 분 구합니다!\n빠르게 모집합니다!\n많관부~','RECRUIT',10,1,'2022-02-09 13:22:12','2022-02-09 13:22:12',NULL,NULL,0),(7,1,'STUDY','프로젝트명','설명은 10자이상 길게 ','RECRUIT',20,0,'2022-02-09 15:58:06','2022-02-09 15:58:06',NULL,NULL,0),(9,1,'STUDY','프로젝트명','설명은 10자이상 길게 ','RECRUIT',20,0,'2022-02-09 15:58:09','2022-02-09 15:58:09',NULL,NULL,0),(10,1,'STUDY','testtest','testtestest','COMPLETED',10,0,'2022-02-09 17:28:10','2022-02-09 17:28:10',NULL,NULL,0),(11,1,'STUDY','testtest','testtestest','RECRUIT',10,0,'2022-02-09 17:28:12','2022-02-09 17:28:12',NULL,NULL,0),(12,1,'STUDY','testtest','testtestest','RECRUIT',10,0,'2022-02-09 17:28:13','2022-02-09 17:28:13',NULL,NULL,0),(13,1,'STUDY','testest','testtesttest','RECRUIT',10,1,'2022-02-09 17:28:44','2022-02-09 17:28:44',NULL,NULL,0),(15,1,'STUDY','testtest','testtesttest','RECRUIT',10,1,'2022-02-09 18:18:24','2022-02-09 18:18:24',NULL,NULL,0),(18,1,'STUDY','testtest','testtesttest','RECRUIT',10,0,'2022-02-09 18:19:12','2022-02-09 18:19:12',NULL,NULL,0),(19,1,'STUDY','..............','....................','RECRUIT',30,0,'2022-02-10 09:58:14','2022-02-10 09:58:14',NULL,NULL,0),(20,1,'STUDY','testtest','testeestsetset','RECRUIT',10,0,'2022-02-10 18:54:09','2022-02-10 18:54:09',NULL,NULL,0),(21,1,'STUDY','안녕하세요 다녀갑니다','안녕하세요 다른곳에서 잠깐 들렸다 갑니다\n여기 깔끔하고 예쁘네요','RECRUIT',10,1,'2022-02-11 13:19:43','2022-02-11 13:19:43',NULL,NULL,0),(22,1,'STUDY','안녕하세요 다녀갑니다','안녕하세요 다른곳에서 잠깐 들렸다 갑니다\n여기 깔끔하고 예쁘네요','RECRUIT',10,1,'2022-02-11 13:19:45','2022-02-11 13:19:45',NULL,NULL,0),(23,1,'STUDY','안녕하세요 다녀갑니다','안녕하세요 다른곳에서 잠깐 들렸다 갑니다\n여기 깔끔하고 예쁘네요','RECRUIT',10,1,'2022-02-11 13:19:46','2022-02-11 13:19:46',NULL,NULL,0),(24,1,'STUDY','안녕하세요 다녀갑니다','안녕하세요 다른곳에서 잠깐 들렸다 갑니다\n여기 깔끔하고 예쁘네요','RECRUIT',10,1,'2022-02-11 13:19:47','2022-02-11 13:19:47',NULL,NULL,0),(25,1,'STUDY','캬캬캬캬캬','캬캬캬캬캬캬캬캬캬캬캬','RECRUIT',10,1,'2022-02-15 16:24:57','2022-02-15 16:24:57',NULL,NULL,0),(26,16,'STUDY','안녕하세요','스터디 설명은 10글자 이상이어야 합니다.','RECRUIT',5,1,'2022-02-17 21:29:38','2022-02-17 21:29:54','2022-02-17 21:29:52','2022-02-17 21:29:53',0),(27,1,'PROJECT','HAPPY HOUSE','부동산 관련 플랫폼을 제작하려고 합니다.\n많은 관심 부탁드려요 :)','RECRUIT',9,3,'2022-02-17 23:48:50','2022-02-18 10:18:14',NULL,NULL,0),(28,1,'PROJECT','HappyBirthDay (HBD)','매년 생일이 돌아오면 12시마다 생일을 축하해주는 서비스를 제작하려고 합니다.\n\n부담 갖지 말고 연락주세요.','RECRUIT',0,0,'2022-02-17 23:52:10','2022-02-17 23:52:10',NULL,NULL,0),(29,17,'PROJECT','ROOTNODE','개발자들의 성장을 돕는 스터디+프로젝트 팀원 모집 및 멘토링 서비스를 제공하는 플랫폼을 꿈꾸고 있습니다.','RECRUIT',6,2,'2022-02-18 02:25:04','2022-02-18 10:54:30','2022-02-18 02:25:31','2022-02-18 02:25:31',0),(30,17,'STUDY','바나나시저스킥','자바스크립트를 함께 공부할 팀원을 구하고 있습니다! 편하게 연락주세요~ \njunhomoon224@naver.com','RECRUIT',5,1,'2022-02-18 02:34:06','2022-02-18 02:37:18','2022-02-18 02:37:01','2022-02-18 02:37:01',0),(31,20,'STUDY','devtree 자바 스터디','자바 스프링 스터디 구해요~~','RECRUIT',5,1,'2022-02-18 03:51:21','2022-02-18 03:51:21',NULL,NULL,0),(32,15,'STUDY','자바를 자바라','자바자바자밪바ㅏ바바ㅏㅈ바바ㅏㅈ바','RECRUIT',4,1,'2022-02-18 06:01:25','2022-02-18 06:01:25',NULL,NULL,0),(33,15,'PROJECT','프로젝트프로젝트','프로젝트설명입니다람쥐','RECRUIT',0,4,'2022-02-18 06:03:22','2022-02-18 06:04:14',NULL,NULL,0),(34,23,'STUDY','리액트 뿌수기','리액트를 뿌숩시다!!!','RECRUIT',5,1,'2022-02-18 11:55:01','2022-02-18 11:55:01',NULL,NULL,0);
/*!40000 ALTER TABLE `tb_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_team_comment`
--

DROP TABLE IF EXISTS `tb_team_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_team_comment` (
  `comment_seq` bigint NOT NULL,
  `comment_content` text,
  `comment_create_time` datetime DEFAULT NULL,
  `comment_update_time` datetime DEFAULT NULL,
  `comment_like_cnt` int DEFAULT NULL,
  `user_seq` bigint NOT NULL,
  `team_seq` bigint NOT NULL,
  PRIMARY KEY (`comment_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_team_comment`
--

LOCK TABLES `tb_team_comment` WRITE;
/*!40000 ALTER TABLE `tb_team_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_team_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_team_tech`
--

DROP TABLE IF EXISTS `tb_team_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_team_tech` (
  `team_seq` bigint NOT NULL,
  `tech_seq` bigint NOT NULL,
  PRIMARY KEY (`team_seq`,`tech_seq`),
  KEY `FK_tb_tech_TO_tb_team_tech_1` (`tech_seq`),
  CONSTRAINT `FK_tb_team_TO_tb_team_tech_1` FOREIGN KEY (`team_seq`) REFERENCES `tb_team` (`team_seq`),
  CONSTRAINT `FK_tb_tech_TO_tb_team_tech_1` FOREIGN KEY (`tech_seq`) REFERENCES `tb_tech` (`tech_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_team_tech`
--

LOCK TABLES `tb_team_tech` WRITE;
/*!40000 ALTER TABLE `tb_team_tech` DISABLE KEYS */;
INSERT INTO `tb_team_tech` VALUES (4,1),(6,1),(10,1),(11,1),(12,1),(13,1),(15,1),(20,1),(27,1),(29,1),(31,1),(32,1),(18,2),(25,2),(13,3),(19,3),(7,4),(9,4),(15,4),(15,6),(27,6),(29,6),(31,6),(28,7),(33,8),(28,9),(29,9),(31,9),(7,10),(9,10),(26,10),(29,10),(33,10),(5,11),(29,11),(30,11),(32,11),(5,12),(7,12),(9,12),(28,12),(29,12),(32,12),(34,12),(19,13),(26,13),(29,13),(32,13),(7,14),(9,14),(28,14),(27,15),(19,16),(19,17),(6,19),(21,19),(22,19),(23,19),(24,19);
/*!40000 ALTER TABLE `tb_team_tech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tech`
--

DROP TABLE IF EXISTS `tb_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tech` (
  `tech_seq` bigint NOT NULL AUTO_INCREMENT,
  `tech_name` varchar(20) DEFAULT NULL,
  `tech_image` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`tech_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tech`
--

LOCK TABLES `tb_tech` WRITE;
/*!40000 ALTER TABLE `tb_tech` DISABLE KEYS */;
INSERT INTO `tb_tech` VALUES (1,'Java',NULL),(2,'Python',NULL),(3,'C',NULL),(4,'C++',NULL),(5,'C#',NULL),(6,'Spring',NULL),(7,'Node',NULL),(8,'Swift',NULL),(9,'MySQL',NULL),(10,'HTML',NULL),(11,'JavaScript',NULL),(12,'React',NULL),(13,'JPA',NULL),(14,'Django',NULL),(15,'Vue',NULL),(16,'Go',NULL),(17,'MongoDB',NULL),(18,'Kotlin',NULL),(19,'알고리즘',NULL);
/*!40000 ALTER TABLE `tb_tech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tier`
--

DROP TABLE IF EXISTS `tb_tier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tier` (
  `tier_seq` bigint NOT NULL AUTO_INCREMENT,
  `tier_name` varchar(20) DEFAULT NULL,
  `tier_icon` varchar(150) DEFAULT NULL,
  `tier_min_exp` bigint DEFAULT NULL,
  `tier_max_exp` bigint DEFAULT NULL,
  PRIMARY KEY (`tier_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tier`
--

LOCK TABLES `tb_tier` WRITE;
/*!40000 ALTER TABLE `tb_tier` DISABLE KEYS */;
INSERT INTO `tb_tier` VALUES (1,'씨앗',NULL,0,1000),(2,'새싹',NULL,1001,2500),(3,'잎새',NULL,2501,4500),(4,'가지',NULL,4501,7000),(5,'열매',NULL,7001,10000),(6,'나무',NULL,10001,10000000000);
/*!40000 ALTER TABLE `tb_tier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_nickname` varchar(20) DEFAULT NULL,
  `user_desc` text,
  `user_role` varchar(20) DEFAULT NULL,
  `user_id` varchar(20) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'cjcm1525@naver.com','오나연','$2a$10$uvlfx./tEgN1s9VxuCo4s.hLND8fKxhtBhBYx0oyJu1.4.g4hC28y','nayeon','ㅎㅇㅎㅇ','USER','yeon97','P0Wio6ns'),(3,'hongildong@gmail.com','홍길동','$2a$10$UYsQxbRe7FP70k5Y8eW0POW0OtYXCO1omO0aBbV8odcA/UU8gkW6u',NULL,NULL,'USER','junhomoon',NULL),(5,'test@test.com','테스트','$2a$10$N8mBodmYqgUBIkhJKKh9Cu.A.DI3Cqhez4ZCV49ttSptzVssXOKj6',NULL,NULL,'USER','testaccount',NULL),(6,'hojun@devtree.com','호준문','$2a$10$XNdBp11FFH0fBzMQkAFIDOLGMB5837uG4re1Q0MI1KF4TVLg5t8ti','나는멘토',NULL,'MENTOR','zoolake',NULL),(7,'','','$2a$10$8vb8y0IyA9S3CYkVamp8Se2d2OYOUTpcMSf9OLP3XE4.BnaKgwPQy','드노트루','','USER','rootnode',NULL),(8,'sonson@naver.com','손흥민','$2a$10$8eMQuTFup.QbeItOUiQ/1OlzNL5dU2mMkiG1m0OzfP/ebLMcgg2ku','월드클래스','절대 월드클래스 아닙니다~','MENTOR','sonheungmin',NULL),(9,'iambabo@naver.com','김바보','$2a$10$hLDKk5KmrF5HUmRLqliEzeERTB5IO//RNYcG7WTYsjMMDY9Amr/pC',NULL,NULL,'USER','geniuskim',NULL),(10,'geniuslee@gmail.com','이천재','$2a$10$ZCjM3uTq1yXKa4r8vhU2buK/EapxOkJD4zLUpfDS9zCobHB3JykeK','이천재',NULL,'MENTOR','babolee',NULL),(11,'moonrobot@devtree.com','문로봇','$2a$10$VopF5ypjzGX4LdBimPqL6OZV39hVZzxPw5S1RwvWD7x6UCBBE6YNW',NULL,NULL,'USER','testhttps',NULL),(12,'t@gmail.com','testtest','$2a$10$LSGuP2988p4zRvcNNhwRoeuT1YZ2SrM6gwDaw6yY6RQukI4MI5tqS','최고가될거야','최고','MENTOR','testtest',NULL),(13,'wjdgur778@gmail.com','정혁킴','$2a$10$Q90wDfHDnDC5AHgONBBVWuBZE9APwkYJpyyXuEN7iAS0IEp0YMz26',NULL,NULL,'USER','rkskekfkakqktk',NULL),(14,'rkskekfk@naver.com','가나다라','$2a$10$LyxYrUKMe4S2MjU8nxrp8OrYSRyS5kmCvFVQlgTp7Dm6IjWKaIB26','rkskekfk',NULL,'USER','rkskekfk',NULL),(15,'wngkdroqkf441@gmail.com','조항준','$2a$10$Fi48RkLI4Y07kSPuVKtcJuyHHC2rtjQwvaEMjq5ivVsat7lMVFWkq','HansJo','주니어 개발자 조항준입니다!','USER','wngkdroqkf441',NULL),(16,'wjdgur778@gmail.com','김정혁','$2a$10$04TjpqJERCuOCAkCbGtsyuM7PqmqwUrktdt3/vovH9L.ALq3QauXa','wjdgur778',NULL,'USER','wjdgur778',NULL),(17,'anwngh@naver.com','문준호','$2a$10$ivhaxY0mBebty4Au8B.R6.1belCZDsEW9zMb1h/GwM3u3SqvpD4te','moonjunho',NULL,'USER','moonjunho',NULL),(18,'sunmlee@naver.com','힝구','$2a$10$pyvCkvl3nkvQMdT0HVUr0.AaBSVSqLEoY9q5gc3QYoyOs7sRuBVSG','sunmlee',NULL,'USER','sunmlee',NULL),(19,'riverboy94@gmail.com','all_eviate','$2a$10$F712zwG6jCpsLI0IdoCcmuMfKtm1m1/5B9O3lO0UbX8FSlhjkSv7q','riverboy94',NULL,'USER','riverboy94',NULL),(20,'devtree@rootnode.com','데브트리','$2a$10$R/1ynijyLt57pnOMQKTAGOzA9zD3zs2UwPK/NIWmUvLvMp/aSvGii','devtree',NULL,'USER','devtree',NULL),(21,'wjdgur778@gmail.com','루트노드팀장','$2a$10$OHLWJNWPRac/SPxgnqk2QutrTJQqSWQAbvyWf8tYg9Gyxo2qi4h22','clsrn5004',NULL,'MENTOR','clsrn5004','P0Wio6ns'),(22,'mentor@devtree.com','데브멘토','$2a$10$j9SSec/Y1dRMIFPvvC6LCOy3nm2hLhxRte67i.2lBnvxpyt4zd2rq','devmentor',NULL,'MENTOR','devmentor','P0Wio6ns'),(23,'sunmin@naver.com','이선민','$2a$10$5ru1o0ejt3rQ6SPfLlx6P.KRzrzp4T6m5BYerCZTl7bNVedljRkQm','메리',NULL,'MENTOR','sunmin7','P0Wio6ns');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_mentor_favorites`
--

DROP TABLE IF EXISTS `tb_user_mentor_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_mentor_favorites` (
  `user_seq` bigint NOT NULL,
  `mentor_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`mentor_seq`),
  KEY `FK_tb_mentor_TO_tb_user_mentor_favorites_1` (`mentor_seq`),
  CONSTRAINT `FK_tb_mentor_TO_tb_user_mentor_favorites_1` FOREIGN KEY (`mentor_seq`) REFERENCES `tb_mentor` (`mentor_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_user_mentor_favorites_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_mentor_favorites`
--

LOCK TABLES `tb_user_mentor_favorites` WRITE;
/*!40000 ALTER TABLE `tb_user_mentor_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_mentor_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_team_favorites`
--

DROP TABLE IF EXISTS `tb_user_team_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_team_favorites` (
  `user_seq` bigint NOT NULL,
  `team_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`team_seq`),
  KEY `FK_tb_team_TO_tb_user_team_favorites_1` (`team_seq`),
  CONSTRAINT `FK_tb_team_TO_tb_user_team_favorites_1` FOREIGN KEY (`team_seq`) REFERENCES `tb_team` (`team_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_user_team_favorites_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_team_favorites`
--

LOCK TABLES `tb_user_team_favorites` WRITE;
/*!40000 ALTER TABLE `tb_user_team_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_team_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_tech`
--

DROP TABLE IF EXISTS `tb_user_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_tech` (
  `user_seq` bigint NOT NULL,
  `tech_seq` bigint NOT NULL,
  PRIMARY KEY (`user_seq`,`tech_seq`),
  KEY `FK_tb_tech_TO_tb_user_tech_1` (`tech_seq`),
  CONSTRAINT `FK_tb_tech_TO_tb_user_tech_1` FOREIGN KEY (`tech_seq`) REFERENCES `tb_tech` (`tech_seq`),
  CONSTRAINT `FK_tb_user_TO_tb_user_tech_1` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_tech`
--

LOCK TABLES `tb_user_tech` WRITE;
/*!40000 ALTER TABLE `tb_user_tech` DISABLE KEYS */;
INSERT INTO `tb_user_tech` VALUES (1,1),(15,2),(15,11),(1,12),(15,12),(1,13);
/*!40000 ALTER TABLE `tb_user_tech` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18  3:10:40
