CREATE TABLE `users` (
	`user_id` serial AUTO_INCREMENT NOT NULL,
	`user_fullname` varchar(255) NOT NULL,
	`user_email` varchar(255) NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_user_email_unique` UNIQUE(`user_email`)
);
