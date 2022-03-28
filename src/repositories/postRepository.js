import { connection } from "../database.js";

async function createPost(userId, description, link) {
  await connection.query(
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

async function selectPost(id, userId) {
  return connection.query(
    `SELECT * FROM posts WHERE id=$1 
  AND "userId"=$2`,
    [id, userId]
  );
}

async function deletePost(id) {
  return connection.query(
    `DELETE FROM posts
  WHERE id=$1`,
    [id]
  );
}

export const postRepository = {
  createPost,
  getPosts,
  updatePost,
  selectPost,
  deletePost,
};
