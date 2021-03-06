import { searchBarRepository } from "../repositories/searchBarRepository.js"

export async function searchUsers(req, res) {
  const { name } = req.params

  try {
    const search = await searchBarRepository.searchUsers(name)
    return res.send(search.rows)

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export async function verifyFollow(req, res) {
  const { userId } = req.params
  const { followerId } = req.params

  try {
    const verification = await searchBarRepository.verifyFollow(userId, followerId)
    res.send(verification.rows[0]?.followId.toString())
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}