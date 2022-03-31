import { userRepository } from "./userRepository.js";
import { connection } from "../database.js";

async function follow(userId, followId) {
  return connection.query(
    `
        INSERT
            INTO follows ("userId", "followId")
            VALUES ($1, $2)
    `,
    [userId, followId]
  );
}

async function unfollow(userId, followId) {
  return connection.query(
    `
        DELETE
            FROM follows
            WHERE "userId"=$1 AND "followId"=$2
    `,
    [userId, followId]
  );
}

async function checkUserExistence(id) {
  return userRepository.usersId(id);
}

async function checkFollowExistence(userId, followId) {
  return connection.query(
    `
        SELECT
            *
            FROM follows
            WHERE "userId" = $1 AND "followId" = $2
    `,
    [userId, followId]
  );
}

async function getUserFollow(userId) {
  return connection.query(
    `
        SELECT
            *
        FROM follows
        WHERE "userId" = $1 
    `,
    [userId]
  );
}

export const followRepository = {
  follow,
  unfollow,
  checkUserExistence,
  checkFollowExistence,
  getUserFollow,
};
