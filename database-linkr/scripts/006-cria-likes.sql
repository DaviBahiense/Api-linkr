CREATE TABLE "likes" (
	"id" serial NOT NULL PRIMARY KEY,
	"usersId" integer NOT NULL REFERENCES users(id),
	"postsId" integer NOT NULL REFERENCES posts(id)
);
