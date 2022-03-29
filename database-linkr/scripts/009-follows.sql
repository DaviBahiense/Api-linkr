CREATE TABLE "follows" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"followId" integer NOT NULL REFERENCES users(id)
);
