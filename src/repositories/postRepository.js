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

async function getPosts(userId) {
  return connection.query(
    `
    SELECT * FROM
    posts WHERE "userId"=$1 
    ORDER BY id DESC LIMIT 20`,
    [userId]
  );
}

export const postRepository = {
  createPost,
  getPosts,
};
