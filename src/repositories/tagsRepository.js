import { connection } from "../database.js";

async function checkTag(tag) {
  const dbTag = await connection.query(
    `
    SELECT name 
    FROM tag 
    WHERE name=$1 `,
    [tag]
  );

  if (dbTag.rows[0] === undefined) {
    await connection.query(
      `
        INSERT INTO tag (name) 
        VALUES ($1)`,
      [tag]
    );
  }

  console.log("checking tag " + tag)
}

async function insertPostTag(tag, postId) {
  const tagIdQuery = await connection.query(
    `
      SELECT id FROM tag
      WHERE name=$1`,
    [tag]
  );
  const tagId = tagIdQuery.rows[0].id

  await connection.query(
    `
        INSERT INTO 
        "postTag" ("tagId" , "postsId") 
        VALUES ($1 , $2)` ,
    [tagId, postId]
  );
}

export const tagsRepository = {
  checkTag,
  insertPostTag,
}