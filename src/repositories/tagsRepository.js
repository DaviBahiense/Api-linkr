import { connection } from "../database.js";

async function checkTag(tag) {
  const dbTag = await connection.query(
    `
    SELECT name 
    FROM tag 
    WHERE name=$1`,
    [tag]
  );

  console.log(dbTag.rows[0] === undefined);
  console.log(tag)

  if (dbTag.rows[0] === undefined) {
    await connection.query(
      `
        INSERT INTO tag (name) 
        VALUES ($1)`,
      [tag]
    );
  }
}

async function insertPostTag(tag, postId) {
  const tagIdQuery = await connection.query(
    `
      SELECT id FROM tag
      WHERE name=$1`,
    [tag]
  );
  console.log(tagIdQuery.rows)
  const tagId = tagIdQuery.rows[0]?.id

  await connection.query(
    `
        INSERT INTO 
        "postTag" ("tagId" , "postsId") 
        VALUES ($1 , $2)` ,
    [tagId, postId]
  );
}

async function getPostsFromATag(tag) {
  return connection.query(
    `
    SELECT 
      users.id AS "userId", 
      users.name, 
      users.img ,
      link, 
      description
    FROM posts
      JOIN users ON users.id = posts."userId"
      JOIN "postTag" ON "postTag"."postsId" = posts.id
      JOIN tag ON "postTag"."tagId" = tag.id
    WHERE tag.name=$1
    ORDER BY posts.id DESC LIMIT 20
  `,
    [tag]
  )
}

export const tagsRepository = {
  checkTag,
  insertPostTag,
  getPostsFromATag
}