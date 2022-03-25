import { connection } from "../database.js";

async function createPost(userId, description, link) {
  connection.query(
    `
    INSERT INTO 
    posts ("userId",description, link)
    VALUES ($1,$2,$3)`,
    [userId, description, link]
  );

  return connection.query(`
  SELECT id FROM posts
  ORDER BY posts.id DESC
  LIMIT 1
  `)
}

async function getPosts() {
  return connection.query(
    `
    SELECT users.id AS "userId", users.name, users.img, link, description
    FROM posts
    JOIN users ON users.id = posts."userId"
    ORDER BY posts.id DESC LIMIT 20`
  );
}

export const postRepository = {
  createPost,
  getPosts,
};
