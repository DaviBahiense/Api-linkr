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
    SELECT posts.id as "postId", users.id AS "userId", users.name, users.img, link, description
    FROM posts
    JOIN users ON users.id = posts."userId"
    ORDER BY posts.id DESC LIMIT 20`
  );
}

async function updatePost(postId, description) {
  return connection.query(
    `
    UPDATE
    posts 
    SET description=$2
    WHERE id=$1
    `,
    [postId, description]
  );
}

export const postRepository = {
  createPost,
  getPosts,
  updatePost,
};
