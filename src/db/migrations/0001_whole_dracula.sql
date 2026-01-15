CREATE TABLE `aktivnosti` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`naziv` varchar(255) NOT NULL,
	`opis` varchar(512),
	`tip` varchar(100),
	`datum` timestamp,
	`uradjen` boolean DEFAULT false,
	CONSTRAINT `aktivnosti_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dnevnici` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`datum` timestamp DEFAULT (now()),
	`vreme` varchar(50),
	`slika` varchar(512),
	`kolicina_meda` decimal(10,2),
	`pregled` varchar(512),
	`komentar` varchar(512),
	`kosnica_id` varchar(36) NOT NULL,
	CONSTRAINT `dnevnici_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `izvestaji` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`datum_od` timestamp NOT NULL,
	`datum_do` timestamp NOT NULL,
	`korisnik_id` varchar(36),
	`pcelinjak_id` varchar(36),
	CONSTRAINT `izvestaji_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kosnice` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`broj` int NOT NULL,
	`tip` varchar(100),
	`datum` timestamp DEFAULT (now()),
	`starost_matice` int,
	`br_nastavaka` int,
	`pcelinjak_id` varchar(36) NOT NULL,
	CONSTRAINT `kosnice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifikacije` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`korisnik_id` varchar(36) NOT NULL,
	`aktivnost_id` varchar(36) NOT NULL,
	CONSTRAINT `notifikacije_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pcelinjaci` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`naziv` varchar(255) NOT NULL,
	`adresa` varchar(255),
	`geo_sirina` decimal(10,8),
	`geo_duzina` decimal(11,8),
	CONSTRAINT `pcelinjaci_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `dnevnici` ADD CONSTRAINT `dnevnici_kosnica_id_kosnice_id_fk` FOREIGN KEY (`kosnica_id`) REFERENCES `kosnice`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `izvestaji` ADD CONSTRAINT `izvestaji_korisnik_id_users_id_fk` FOREIGN KEY (`korisnik_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `izvestaji` ADD CONSTRAINT `izvestaji_pcelinjak_id_pcelinjaci_id_fk` FOREIGN KEY (`pcelinjak_id`) REFERENCES `pcelinjaci`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `kosnice` ADD CONSTRAINT `kosnice_pcelinjak_id_pcelinjaci_id_fk` FOREIGN KEY (`pcelinjak_id`) REFERENCES `pcelinjaci`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifikacije` ADD CONSTRAINT `notifikacije_korisnik_id_users_id_fk` FOREIGN KEY (`korisnik_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifikacije` ADD CONSTRAINT `notifikacije_aktivnost_id_aktivnosti_id_fk` FOREIGN KEY (`aktivnost_id`) REFERENCES `aktivnosti`(`id`) ON DELETE no action ON UPDATE no action;