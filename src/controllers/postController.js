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

export async function handleLike(req, res) {
  const {id, type} = req.params;
  const {user} = res.locals;
  try {
    const postExistence = await postRepository.checkPostExistence(id);
    if (postExistence.rowCount === 0){
        return res.sendStatus(422);
    }

    const likeExistence = await postRepository.checkLikeExistence(user.id, id);

    if(type === 'like' && likeExistence.rowCount === 0){
      await postRepository.like(user.id, id)
    }else if(type === 'unlike' && likeExistence.rowCount > 0){
      await postRepository.unlike(user.id, id)
    } else {
      return res.sendStatus(422)
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}