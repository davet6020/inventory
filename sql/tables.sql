CREATE TABLE IF NOT EXISTS hardware (
  id int(11) NOT NULL AUTO_INCREMENT,
  vendor int(11) COMMENT 'Lenovo',
  manufacturer int(11) COMMENT 'Lenovo',
  serial_number varchar(128) COMMENT 'R8DG7N4',
  state varchar(128) COMMENT 'New [condition is a reserved word]',
  series varchar(128) COMMENT 'T420',
  model varchar(128) COMMENT '4177CTO',
  warranty varchar(128) COMMENT '1 Year',
  cpu varchar(128) COMMENT 'Intel i5 2.4 GHz',
  ram varchar(128) COMMENT '4 GB',
  hard_drive varchar(128) COMMENT '320 GB 7200',
  os varchar(128) COMMENT 'Windows 7 Professional',
  graphics varchar(128) COMMENT 'Intel HD Graphics 3000',
  bluetooth varchar(128) COMMENT '3.0',
  wireless varchar(128) COMMENT 'AGN 3x3',
  security varchar(128) COMMENT 'Fingerprint Reader',
  cdrom varchar(128) COMMENT 'DVD Reader Writer',
  PRIMARY KEY (id) )
  ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS software (
  id int(11) NOT NULL AUTO_INCREMENT,
  vendor int(11) COMMENT 'Microsoft', 
  manufacturer int(11) COMMENT 'Microsoft',
  app_suite varchar(128) COMMENT 'Office 2010',
  app_name varchar(128) COMMENT 'MS Powerpoint',
  version varchar(128) COMMENT '6.0.2',
  product_key text COMMENT '6.0.2',
  PRIMARY KEY (id) )
  ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS vendors (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(128) COMMENT 'Asus',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS software_owners (
  software_id int(11),
  user_id int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS hardware_owners (
  hardware_id int(11),
  user_id int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `manager` int(11) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


