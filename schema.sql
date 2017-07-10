DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` varchar(100) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `frequencyInSeconds` int(11) DEFAULT '10',
  `allServices` int(11) DEFAULT '1',
  `critical` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;

INSERT INTO `services` (`id`, `service`, `url`, `frequencyInSeconds`, `allServices`, `critical`)
VALUES
	(1,'healthcheck','/status?code=200',10,1,1),
	(2,'home','/status?code=500',10,1,NULL),
	(3,'admin','/status?code=404',10,1,NULL),
	(4,'random-local','http://localhost:7001/random',10,1,NULL);

/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
