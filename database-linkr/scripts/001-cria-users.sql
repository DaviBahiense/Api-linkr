CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"img" TEXT NOT NULL
);
