CREATE TABLE "postsTags" (
	"id" serial NOT NULL PRIMARY KEY,
	"tagId" integer NOT NULL REFERENCES tag(id),
	"postId" integer NOT NULL REFERENCES posts(id) ON DELETE CASCADE
);
