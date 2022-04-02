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

async function getPosts(limit) {
  return connection.query(
    `
    SELECT
      s."userId" AS "reposterById",
      reposter.name AS "reposterByName",
      p."userId" AS "userId",
      author.name AS name,
      author.img AS img,
      p.id AS "postId",
      p.link AS link,
      p.description AS description,
      p.time AS time,
      p."metadataImg" AS "metadataImg",
      p."metadataDescription" AS "metadataDescription",
      p."metadataTitle" AS "metadataTitle",
      s.time AS time
      FROM shares s
      JOIN posts p
        ON p.id = s."postId"
      JOIN users reposter
        ON reposter.id = s."userId"
      JOIN users author
        ON author.id = p."userId"
    
    UNION
    
    SELECT
      NULL,
      NULL,
      p."userId" AS "userId",
      u.name AS name,
      u.img AS img,
      p.id AS "postId",
      p.link AS link,
      p.description AS description,
      p.time AS time,
      p."metadataImg" AS "metadataImg",
      p."metadataDescription" AS "metadataDescription",
      p."metadataTitle" AS "metadataTitle",
      p.time AS time
      FROM posts p
      JOIN users u
        ON u.id = p."userId"
        ORDER BY p.id DESC LIMIT $1
        `,
    [limit]
  );
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
