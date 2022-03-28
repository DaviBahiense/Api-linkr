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