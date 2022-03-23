CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"description" TEXT,
	"userId" integer NOT NULL REFERENCES users(id),
	"likes" integer
);
