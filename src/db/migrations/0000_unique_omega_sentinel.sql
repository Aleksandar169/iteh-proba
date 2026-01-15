CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`ime` varchar(100) NOT NULL,
	`prezime` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`sifra` varchar(255) NOT NULL,
	`uloga` enum('administrator','pcelar','poljoprivrednik') NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
