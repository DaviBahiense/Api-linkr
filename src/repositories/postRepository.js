import { connection } from "../database.js";

async function createPost(
  userId,
  description,
  link,
  metadataImg,
  metadataTitle,
  metadataDescription
) {
  await connection.query(
    `
    INSERT INTO 
    posts ("userId",description, link, "metadataImg", "metadataDescription", "metadataTitle")
    VALUES ($1,$2,$3,$4,$5,$6)`,
    [userId, description, link, metadataImg, metadataTitle, metadataDescription]
  );

  return connection.query(`
  SELECT id FROM posts
  ORDER BY posts.id DESC
  LIMIT 1
  `);
}

async function getPosts(offset) {
  let offsetQuery = "";

  if (offset && typeof parseInt(offset) === "number") {
    offsetQuery = `OFFSET ${offset}`;
  }
  console.log(offsetQuery);
  const result = await connection.query(
    `SELECT 
    posts.id as "postId", 
    users.id AS "userId", 
    users.name, 
    users.img, 
    link, 
    description,
    "metadataImg",
    "metadataDescription",
    "metadataTitle"
  FROM posts
    LEFT JOIN users ON users.id = posts."userId"
  ORDER BY posts.id DESC
  LIMIT 10 ${offsetQuery}
    `
  );
  console.log(result);
  return result.rows;
}

async function countPosts() {
  return await connection.query(`
    SELECT COUNT(*) as "countPosts"
      FROM (
        SELECT 
      posts.id as "postId", 
      users.id AS "userId", 
      users.name, 
      users.img, 
      link, 
      description,
      "metadataImg",
      "metadataDescription",
      "metadataTitle"
    FROM posts
      JOIN users ON users.id = posts."userId" 
      ) as "salve"
  `);
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
  countPosts,
};
