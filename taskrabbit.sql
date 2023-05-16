-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: taskrabbit
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `aws_images`
--

DROP TABLE IF EXISTS `aws_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aws_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `header_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aws_images`
--

LOCK TABLES `aws_images` WRITE;
/*!40000 ALTER TABLE `aws_images` DISABLE KEYS */;
INSERT INTO `aws_images` VALUES (1,1,'https://thumb9.shutterstock.com/image-photo/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-250nw-1714666150.jpg','https://thumbs.dreamstime.com/b/yellow-red-pumpkins-white-wooden-background-top-view-thanksgiving-fall-header-198261209.jpg'),(2,2,'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=','https://www.holsby.org/wp-content/uploads/2016/06/nature-header.jpg'),(3,3,'https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?b=1&s=170667a&w=0&k=20&c=KZM6TIhdaJAy28BA9sg0Sn-ZRd160F6HytdAKykza-s=','https://i.pinimg.com/736x/f1/07/38/f10738c944f86fc9f95b2e065ab50552--twitter-headers-layout.jpg'),(4,4,'https://media.istockphoto.com/id/1318858332/photo/headshot-portrait-of-smiling-female-employee-posing-in-office.jpg?b=1&s=170667a&w=0&k=20&c=xaXWxTDSzfZp6Xa16RFBfFknXBRQkfkZD8BKr07-Aac=','https://www.freewebheaders.com/wp-content/gallery/mountains-snow/cache/snow-mountains-blue-sky-and-lake-panoramic-web-header-.jpg-nggid045216-ngg0dyn-1280x720x100-00f0w010c010r110f110r010t010.jpg'),(5,5,'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=','https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-lake-header.jpg?fit=1584%2C396&ssl=1'),(6,6,'https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-788567.jpg&fm=jpg','https://pbs.twimg.com/media/BwoW_A5CEAA-uO5.jpg');
/*!40000 ALTER TABLE `aws_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Adam Miller','$2a$10$60FhpuJmGtLKbTCL9ycjZ.seo//ax71QZrSoBTUXu2Qfps7lnG/mW','user'),(2,'James Rodriguez','$2a$10$5phN19j6Sf.99hd5P8us5.5uIq/NcvY3mFgEK/2vwj2BhFebWTR0i','user'),(3,'Daniel Jackson','$2a$10$CGNxkWQCedTzPZkZbBTYguOlvKQwoij2NkGvlvpVWPaF.oHRxJPS.','user'),(4,'Laura Anderson','$2a$10$mhxK2ysu2A/Z5FG1X3i5peIrbhE2Y/IEo.N5RcTwS84suYp00RiCi','user'),(5,'Emily Smith','$2a$10$g0cv0U3SyPkMGqmr/.OP0u0AOUxb2Xp3/L8FtASUJzHWjBNn/AOyW','user'),(6,'Elizabeth Jones','$2a$10$wwIKXIPWNRwwctAN50KLBe47RBdzu0b0bb48QGA.XaSl.JpjCIZbC','user');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_location`
--

DROP TABLE IF EXISTS `profile_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profile_location_profile_id` (`profile_id`),
  CONSTRAINT `fk_profile_location_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_location`
--

LOCK TABLES `profile_location` WRITE;
/*!40000 ALTER TABLE `profile_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `targetuser_id` int NOT NULL,
  `task_id` int NOT NULL,
  `value` int NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `performer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `targetuser_id` (`targetuser_id`),
  KEY `task_id` (`task_id`),
  KEY `performer_id` (`performer_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`targetuser_id`) REFERENCES `profile` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`performer_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,2,2,5,'It was great to meet you James!','2023-05-15 11:40:16',4),(2,5,12,4,'Well done!','2023-05-15 11:57:06',6),(3,5,13,0,'Thank you!','2023-05-15 11:58:35',2),(4,6,16,5,'Amazing!','2023-05-15 11:58:42',2),(5,5,14,4,'Great job, thank you!','2023-05-15 11:58:54',2),(6,5,15,5,'Thank you very much for helping!','2023-05-15 12:22:58',3),(7,6,17,5,'Great job!','2023-05-15 12:23:14',3),(8,3,19,0,'A bit sloppy work...','2023-05-15 12:23:24',3),(9,4,6,5,'Well done!','2023-05-15 12:24:49',5),(10,4,8,3,'Good job','2023-05-15 12:25:07',5),(11,6,18,4,'Nice!','2023-05-15 12:25:13',5),(12,6,12,4,'Thanks for helping!','2023-05-15 12:25:25',5),(13,2,13,5,'Thanks James!','2023-05-15 12:25:33',5),(14,2,14,4,'A job well done!','2023-05-15 12:25:39',5),(15,3,15,2,'Thanks for helping!','2023-05-15 12:25:47',5),(16,1,1,5,'Thanks!','2023-05-15 12:26:51',4),(17,3,20,5,'Well done!','2023-05-15 14:20:11',4);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `payment` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `available_from` timestamp NOT NULL,
  `available_to` timestamp NOT NULL,
  `duration` int DEFAULT NULL,
  `creator_id` int NOT NULL,
  `performer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `performer_id` (`performer_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `profile` (`id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`performer_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Testing addition of task','This is a test description','done','Test location',60.170678011956504,24.941513320129406,5,'2023-05-10 07:44:35','2023-05-09 18:00:00','2023-05-10 18:00:00',60,1,4),(2,'Dog walker needed for my furry friend','I am looking for someone to walk my dog for 30 minutes a day, Monday through Friday. My dog is a friendly Labrador Retriever and loves going on walks. I will provide the leash and waste bags.','done','Ullanlinna',60.158839043173906,24.946534415405285,10,'2023-05-15 11:22:51','2023-05-21 18:00:00','2023-05-25 18:00:00',30,2,4),(3,'Help needed for yard work','I need help with weeding, trimming hedges, and mowing my lawn. The yard is relatively small, and I estimate that the job will take around 2-3 hours. I will provide the tools and equipment needed.','available','Kumpula',60.20912254659831,24.95464541546632,50,'2023-05-15 11:24:15','2023-05-20 03:00:00','2023-05-20 15:00:00',120,3,NULL),(4,'Tutor needed for my child','My child needs help with math and English homework. They are in the 6th grade, and I am looking for someone to come to our home for one hour twice a week. I will provide all textbooks and materials.','unavailable','Kamppi',60.168730052850634,24.931235095184338,5,'2023-05-15 11:25:12','2023-05-21 18:00:00','2023-05-25 18:00:00',60,4,3),(5,'Moving help needed for a few hours','I need help with moving some boxes and furniture from my old apartment to my new one. This includes carrying boxes down stairs and loading them into a truck. I estimate that the job will take around 2-3 hours. I will provide the truck and necessary moving equipment.','available','Kamppi',60.16540491336683,24.935569544952404,20,'2023-05-15 11:26:04','2023-05-21 03:00:00','2023-05-21 12:00:00',120,4,NULL),(6,'Babysitter needed for my child','I am looking for a responsible and experienced babysitter to watch my 3-year-old child for a few hours on Saturday night. Duties include playing with my child, giving them dinner, and putting them to bed.','done','Kamppi',60.16849844515311,24.931557597622692,80,'2023-05-15 11:49:37','2023-06-09 18:00:00','2023-06-11 18:00:00',128,4,5),(7,'Computer help needed',' I need help with setting up my new computer, installing software, and connecting to the internet. The job will take around 2-3 hours, and I will provide the computer and necessary software.','unavailable','Kamppi',60.1687033676774,24.932479640167248,0,'2023-05-15 11:50:21','2023-06-10 18:00:00','2023-06-16 18:00:00',20,4,2),(8,'Photographer needed for event','I am looking for a photographer to take pictures at my upcoming wedding. The job will take around 5-6 hours, and I will provide all necessary equipment.','done','Tuomiokirkko',60.17043252210108,24.95211341015626,200,'2023-05-15 11:51:06','2023-06-22 18:00:00','2023-06-23 18:00:00',300,4,5),(9,'Errands runner needed',' I need someone to run some errands for me, including grocery shopping and picking up a prescription from the pharmacy. The job will take around 2 hours, and I will provide the list of items needed.','unavailable','Herttoniemi',60.192210067069176,25.031684734887705,10,'2023-05-15 11:53:20','2023-05-15 18:00:00','2023-05-16 18:00:00',45,5,2),(10,'Graphic designer needed','I need a graphic designer to create a business card for my new business. I will provide all the necessary information, and the job should take around 1-2 hours.','available','Herttoniemi',60.192743384527226,25.031126835412607,20,'2023-05-15 11:54:05','2023-05-15 18:00:00','2023-05-16 18:00:00',60,5,NULL),(11,'Personal trainer needed','I am looking for a personal trainer to help me reach my fitness goals. This includes creating a workout plan, providing motivation, and tracking progress. I will provide the gym membership.','available','Hertsi',60.194257958858316,25.035418369836435,10,'2023-05-15 11:54:54','2023-05-17 18:00:00','2023-05-21 18:00:00',90,5,NULL),(12,'For review','tmp','done','tmp',60.1698348,24.9383805,2,'2023-05-15 11:55:44','2023-05-15 18:00:00','2023-05-17 18:00:00',2,5,6),(13,'asd','asd','done','asd',60.1698348,24.9383805,2,'2023-05-15 11:55:53','2023-05-15 18:00:00','2023-05-17 18:00:00',2,5,2),(14,'asd','asd','done','asd',60.1698348,24.9383805,2,'2023-05-15 11:56:02','2023-05-15 18:00:00','2023-05-17 18:00:00',4,5,2),(15,'asd','asd','done','sad',60.1698348,24.9383805,3,'2023-05-15 11:56:14','2023-05-15 18:00:00','2023-05-17 18:00:00',32,5,3),(16,'asd','asd','done','asd',60.1698348,24.9383805,2,'2023-05-15 11:56:46','2023-05-16 18:00:00','2023-05-28 18:00:00',2,6,2),(17,'asdasd','asdasd','done','asd',60.1698348,24.9383805,23123,'2023-05-15 11:57:44','2023-05-15 18:00:00','2023-05-17 18:00:00',2,6,3),(18,'asd','asdasd','done','asasd',60.1698348,24.9383805,4,'2023-05-15 11:57:54','2023-05-15 18:00:00','2023-05-17 18:00:00',2,6,5),(19,'asd','asd','done','asdasd',60.1698348,24.9383805,13,'2023-05-15 11:59:37','2023-05-14 18:00:00','2023-05-15 18:00:00',23,3,3),(20,'asdasd','asdasd','done','asdasd',60.1698348,24.9383805,42,'2023-05-15 11:59:46','2023-05-14 18:00:00','2023-05-15 18:00:00',1,3,4),(21,'Language tutor needed','I am seeking a language tutor to practice speaking French with me. I am looking for someone who is a native speaker or has advanced proficiency. The job will take around 1-2 hours per week.','available','Töölö',60.17288733810799,24.920527716796887,10,'2023-05-15 14:13:51','2023-05-15 18:00:00','2023-05-18 18:00:00',60,2,NULL),(22,'Magic Show Assistant','I am a magician and need an assistant to help me with my tricks during a performance. The job will take around 2-3 hours, and I will provide a top hat and a cape.','available','Forum',60.16885280436835,24.938123007934582,20,'2023-05-15 14:16:44','2023-05-19 03:00:00','2023-05-19 06:00:00',15,1,NULL),(23,'Need a house cleaner ','I need someone to deep clean my house, including the bathrooms, kitchen, floors, and dusting. The job will take around 4-5 hours, and I will provide all the cleaning supplies.','available','Töölö',60.177903130854844,24.927050849121105,50,'2023-05-15 14:18:09','2023-05-14 18:00:00','2023-05-21 18:00:00',120,3,NULL),(24,'Need a handyman to fix my leaky faucet',' I need someone to fix my leaky faucet in the bathroom. The job will take around 1-2 hours, and I will provide the necessary tools.','available','Kamppi',60.1697067152778,24.93239380947877,100,'2023-05-15 14:19:03','2023-05-14 18:00:00','2023-05-16 18:00:00',90,4,NULL),(25,'Need a photographer','I need someone to take engagement photos of my fiancé and me. The job will take around 1-2 hours, and I will provide the location and props.','available','Töölönlahti',60.177177489082574,24.93417479626466,0,'2023-05-15 14:19:54','2023-05-15 18:00:00','2023-05-22 18:00:00',120,4,NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-16 10:14:08
