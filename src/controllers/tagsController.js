import { tagsRepository } from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";

export async function getPostsFromATag(req, res) {
  const { hashtag } = req.params;

  try {
    const { rows: posts } = await tagsRepository.getPostsFromATag(hashtag);
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
    console.log(postsArray)
    res.send(postsArray);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}