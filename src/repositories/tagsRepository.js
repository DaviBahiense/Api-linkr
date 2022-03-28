import { connection } from "../database.js";

async function checkTags(tags, postId) {
  for (let i in tags) {
    const dbTag = await connection.query(
      `
    SELECT name 
    FROM tag 
    WHERE name=$1`,
      [tags[i].substr(1)]
    )

    if (dbTag.rows[0] === undefined) {
      await connection.query(
        `
        INSERT INTO tag (name) 
        VALUES ($1)`,
        [tags[i].substr(1)]
      );
    }
  };


  for (let i in tags) {
    const tagIdQuery = await connection.query(
      `
      SELECT id FROM tag
      WHERE name=$1`,
      [tags[i].substr(1)]
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
      JOIN "postTag" ON "postTag"."postsId" = posts.id
      JOIN tag ON "postTag"."tagId" = tag.id
    WHERE tag.name=$1
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
        tag.name AS tag,
        COUNT("postTag"."tagId") AS "tagCount"
      FROM tag
        JOIN "postTag" ON "postTag"."tagId" = tag.id
      GROUP BY tag.name
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