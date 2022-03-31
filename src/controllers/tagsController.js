import { tagsRepository } from "../repositories/tagsRepository.js";

export async function getPostsFromATag(req, res) {
  const { hashtag } = req.params;

  try {
    const { rows: posts } = await tagsRepository.getPostsFromATag(hashtag);

    res.send(posts);
  } catch (error) {

    return res.status(500).send(error.message);
  }
}

export async function getTrendingTags(req, res) {
  try {
    const tags = await tagsRepository.getTrendingTags()
    res.send(tags.rows)
  } catch (error) {

    return res.status(500).send(error.message);
  }
}