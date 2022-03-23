CREATE TABLE "sessions" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "token" TEXT NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES users(id)
  
);
