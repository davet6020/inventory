CREATE TABLE `hardware` (
  `id` int(11) NOT NULL,
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
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


delete from hardware; alter table hardware auto_increment = 1;


INSERT INTO `hardware` (`type_id`, `vendor`, `manufacturer`, `serial_number`, `state`, `series`, `model`, `warranty`, `cpu`, `ram`, `hard_drive`, `os`, `graphics`, `bluetooth`, `wireless`, `security`, `cdrom`) VALUES
('6', '9', '9', 'R8DG7N5', 'Used', 'T420', '4177CTO', '1 Year', 'Intel i5 | 2.3 GHz', '8GB', '320 GB 7200', 'Windows 7 Pro', 'Intel HD Graphics 3000', '3.0', 'AGN 3x3', 'Fingerprint Reader', 'DVD Reader/Writer')



select authors.name as "Author", biblios.title as "Title", publishers.name as "Publisher", biblio_publisher.date_string as "Pub Date", array_to_string(array[call_number_prefix, classification_part, item_part, call_number_suffix], ' ') as "Call Number", barcode as "Bar Code" 
from holdings
join authors
on holdings.biblio_id = authors.id
join biblios
on holdings.biblio_id = biblios.id
join biblio_publisher
on holdings.biblio_id = biblio_publisher.id
join publishers
on biblio_publisher.publisher_id = publishers.id



select users.email, users.lastname, users.firstname, departments.name as 'department', types.name as 'type', hardware.series, hardware.cpu, hardware.ram  from hardware_owners
join users
on users.id = hardware_owners.user_id
join hardware
on hardware_owners.hardware_id = hardware.id
join departments
on users.department_id = departments.id
join types
on hardware.type_id = types.id
where users.id=23


