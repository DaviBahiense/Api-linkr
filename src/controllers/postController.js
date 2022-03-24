import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getPosts();
    const postsArray = [];

    for (let i = 0; i < posts.length; i++) {
      const post = await urlMetadata(posts[i].link);
      postsArray.push({
        ...posts[i],
        metadataImg: post.image,
        metadataTitle: post.title,
        metadataDescription: post.description,
      });
    }
    res.send(postsArray);
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
