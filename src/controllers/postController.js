import { postRepository } from "../repositories/postRepository.js";

export async function getPosts(req, res) {
  const { posts } = res.locals;

  try {
    res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const { user } = res.locals;
  const { link, description } = req.body;
  try {
    await postRepository.createPost(user.id, description, link);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}
