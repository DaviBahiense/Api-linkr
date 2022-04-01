import { postRepository } from "../repositories/postRepository.js";
import { tagsRepository } from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postRepository.getPosts();
    const { lastIndex } = req.query;

    //res.send(posts);

    const totalPosts = [...posts.rows];

    const orderedPosts = totalPosts.sort(function (a, b) {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    });

    // const post = orderedPosts.filter((post) =>
    //   !post.userRepostId
    //     ? followings.includes(post.userId) || post.userId === userId
    //     : followings.includes(post.userRepostId) || post.userRepostId === userId
    // );

    const post = orderedPosts;
    const lastIdPosts = post[post.length - 1]?.id;
    const limitPosts = post.splice(lastIndex, 10);
    const lastIdLimitPosts = limitPosts[limitPosts.length - 1]?.id;

    const compare = lastIdPosts === lastIdLimitPosts;
    const hasMore = compare ? false : true;

    res.send({ limitPosts, hasMore });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const { user } = res.locals;
  const { link, description } = req.body;

  const metadata = await urlMetadata(link);

  const regex = /([#|＃][^\s]+)/g;
  const tags = [...new Set(description.match(regex))];

  try {
    const post = await postRepository.createPost(
      user.id,
      description,
      link,
      metadata.image,
      metadata.title,
      metadata.description
    );

    const postId = post.rows[0].id;

    tagsRepository.checkTags(tags, postId);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function updatePost(req, res) {
  const { postId, description } = req.body;

  try {
    await postRepository.updatePost(postId, description);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function deletePost(req, res) {
  let { id } = req.params;

  try {
    const result = await postRepository.selectPost(id, res.locals.user.id);
    if (result.rowCount === 0) {
      return res.sendStatus(401);
    }
    await postRepository.deletePost(id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
