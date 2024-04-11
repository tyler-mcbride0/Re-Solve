import { Router } from 'express'
import * as db from '../db/db-functions'

const router = Router()

// '/api/v1/challenges'

router.get('/', async (req, res) => {
  try {
    const challenges = await db.getAllChallenges()
    res.json(challenges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/comments', async (req, res) => {
  try {
    const comments = await db.getAllChallengeComments()
    res.json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// router.get('/:id', async (req, res) => {
//   const id = parseInt(req.params.id)
//   try {
//     const challenge = await db.getChallengeById(id)
//     res.json(challenge)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Something went wrong')
//   }
// })

router.get('/completed/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const completedChallenges = await db.getCompletedChallenges(id)
    res.json(completedChallenges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/incomplete/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const incompleteChallenges = await db.getIncompleteChallenges(id)
    res.json(incompleteChallenges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/comments', async (req, res) => {
  const comment = req.body
  try {
    await db.saveChallengeComment(comment)
    res.status(201).send('Comment saved')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.patch('/comments/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const updates = req.body
  try {
    await db.updateChallengeComment(id, updates)
    res.status(200).send('Comment updated')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
