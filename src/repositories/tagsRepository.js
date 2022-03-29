import { connection } from "../database.js";

async function checkTags(tags, postId) {
  for (let i in tags) {
    const dbTag = await connection.query(
      `
    SELECT name 
    FROM tags 
    WHERE name=$1`,
      [tags[i].substr(1)]
    )

    if (dbTag.rows[0] === undefined) {
      await connection.query(
        `
        INSERT INTO tags (name) 
        VALUES ($1)`,
        [tags[i].substr(1)]
      );
    }
  };


  for (let i in tags) {
    const tagIdQuery = await connection.query(
      `
      SELECT id FROM tags
      WHERE name=$1`,
      [tags[i].substr(1)]
    );

    const tagId = tagIdQuery.rows[0].id

    await connection.query(
      `
        INSERT INTO 
        "postsTags" ("tagId" , "postId") 
        VALUES ($1 , $2)` ,
      [tagId, postId]
    );
  }
}

async function getPostsFromATag(tag) {
  const query = await connection.query(
    `
    SELECT 
      users.id AS "userId", 
      users.name, 
      users.img ,
      link, 
      description
    FROM posts
      JOIN users ON users.id = posts."userId"
      JOIN "postsTags" ON "postsTags"."postId" = posts.id
      JOIN tags ON "postsTags"."tagId" = tags.id
    WHERE tags.name=$1
    ORDER BY posts.id DESC LIMIT 20
  `,
    [tag]
  )
  return query
}

async function getTrendingTags() {
  const query = await connection.query(
    `
      SELECT
        tags.name AS tag,
        COUNT("postsTags"."tagId") AS "tagCount"
      FROM tag
        JOIN "postsTags" ON "postsTags"."tagId" = tags.id
      GROUP BY tags.name
      ORDER BY "tagCount" DESC
        LIMIT 10
    `
  )

  return query;
}

export const tagsRepository = {
  checkTags,
  getPostsFromATag,
  getTrendingTags
}