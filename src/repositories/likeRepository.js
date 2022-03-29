import { connection } from "../database.js";

async function like(userId, postId) {
    return connection.query(
    `
        INSERT
            INTO likes ("userId", "postId")
            VALUES ($1, $2)
    `, [userId, postId]);
}

async function unlike(userId, postId) {
    return connection.query(
    `
        DELETE
            FROM likes
            WHERE "userId"=$1 AND "postId"=$2
    `, [userId, postId]);
}

async function checkPostExistence(id) {
    return connection.query(
    `
        SELECT
            *
            FROM posts
            WHERE id = $1
    `, [id]);
}

async function checkLikeExistence(userId, postId) {
    return connection.query(
    `
        SELECT
            *
            FROM likes
            WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function getLikes(id){
    return connection.query(
    `
        SELECT
            l."userId" AS id, u.name AS name
            FROM likes l
            JOIN users u ON u.id = "userId"
            WHERE "postId" = $1
    `,[id]);
}

export const likeRepository = {
    like,
    unlike,
    checkPostExistence,
    checkLikeExistence,
    getLikes
};