CREATE TABLE "postTag" (
	"id" serial NOT NULL PRIMARY KEY,
	"tagId" integer NOT NULL REFERENCES tag(id),
	"postsId" integer NOT NULL REFERENCES posts(id)
);
