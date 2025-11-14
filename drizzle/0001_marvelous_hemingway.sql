CREATE TABLE `businessInfo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shopName` varchar(255) NOT NULL DEFAULT 'Taj Tailor',
	`shopPhone` varchar(20) NOT NULL,
	`shopEmail` varchar(320) NOT NULL,
	`shopAddress` text NOT NULL,
	`shopCity` varchar(100) NOT NULL DEFAULT 'Karachi',
	`shopCountry` varchar(100) NOT NULL DEFAULT 'Pakistan',
	`latitude` varchar(50),
	`longitude` varchar(50),
	`openingHours` text,
	`socialLinks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businessInfo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cardNumber` varchar(20) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320) NOT NULL,
	`preferredVisitDate` timestamp,
	`preferredVisitTime` varchar(50),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_cardNumber_unique` UNIQUE(`cardNumber`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` text NOT NULL,
	`imageKey` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cardNumber` varchar(20) NOT NULL,
	`customerId` int NOT NULL,
	`description` text,
	`status` enum('Pending','In Progress','Ready') NOT NULL DEFAULT 'Pending',
	`estimatedDeliveryDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_cardNumber_unique` UNIQUE(`cardNumber`)
);
