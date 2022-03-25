import { connection } from "../database.js";

async function createPost(userId, description, link) {
  return connection.query(
    `
    INSERT INTO 
    posts ("userId",description, link)
    VALUES ($1,$2,$3)`,
    [userId, description, link]
  );
}

async function getPosts() {
  return connection.query(
    `
    SELECT posts.id AS id, users.id AS "userId", users.name, users.img, link, description
    FROM posts
    JOIN users ON users.id = posts."userId"
    ORDER BY posts.id DESC LIMIT 20`
  );
}

async function like(userId, postId){
  return connection.query(`
    INSERT
      INTO likes ("usersId", "postsId")
      VALUES ($1, $2)
  `, [userId, postId])
}

async function unlike(userId, postId){
  return connection.query(`
    DELETE
      FROM likes
      WHERE "usersId"=$1 AND "postsId"=$2
  `, [userId, postId])
}

async function checkPostExistence(id){
  return connection.query(`
  SELECT
    *
    FROM posts
    WHERE id = $1
`, [id]);
}

async function checkLikeExistence(userId, postId){
  return connection.query(`
  SELECT
    *
    FROM likes
    WHERE "usersId" = $1 AND "postsId" = $2
`, [userId, postId]);
}

export const postRepository = {
  createPost,
  getPosts,
  like,
  unlike,
  checkPostExistence,
  checkLikeExistence
};
