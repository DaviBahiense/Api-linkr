import { connection } from "../database.js";

async function checkRepostExistence(userId, postId) {
    return connection.query(
    `
        SELECT
            *
            FROM shares
            WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function repost(userId, postId) {
    return connection.query(
    `
        INSERT
            INTO shares ("userId", "postId")
            VALUES ($1, $2)
    `, [userId, postId]);
}

async function unrepost(userId, postId) {
    return connection.query(
    `
        DELETE
            FROM shares
            WHERE "userId"=$1 AND "postId"=$2
    `, [userId, postId]);
}

async function getReposts(id){
    return connection.query(
    `
        SELECT
            s."userId" AS id, u.name AS name
            FROM shares s
            JOIN users u ON u.id = "userId"
            WHERE "postId" = $1
    `,[id]);
}

export const repostRepository = {
    checkRepostExistence,
    repost,
    unrepost,
    getReposts
}