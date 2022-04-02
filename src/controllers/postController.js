import { postRepository } from "../repositories/postRepository.js";
import { tagsRepository } from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";

// export async function getPosts(req, res) {
//   const { limit } = req.query;

//   try {
//     const { rows: posts } = await postRepository.getPosts(limit);
//     const {
//       rows: [{ countPosts }],
//     } = await postRepository.countPosts();

//     const postsResponse = [];

//     for (const post of posts) {
//       postsResponse.push({
//         ...post,
//         countPosts: count,
//       });
//     }
//     res.send(postsResponse);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// }

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

export async function getPosts(request, response) {
  //console.log("banana");
  try {
    const offset = request.query.offset;
    //console.log(offset);

    const posts = await postRepository.getPosts(offset);
    console.log(posts);

    const post = [];

    response.send(posts);
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
