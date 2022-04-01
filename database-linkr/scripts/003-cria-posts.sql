CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"description" TEXT,
	"time" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"userId" integer NOT NULL REFERENCES users(id),
	"metadataImg" TEXT NOT NULL,
	"metadataDescription" TEXT NOT NULL,
	"metadataTitle" TEXT NOT NULL
);
