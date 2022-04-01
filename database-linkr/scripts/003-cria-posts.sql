CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"description" TEXT,
	"userId" integer NOT NULL REFERENCES users(id),
	"time" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"metadataImg" TEXT NOT NULL,
	"metadataDescription" TEXT NOT NULL,
	"metadataTitle" TEXT NOT NULL
);
