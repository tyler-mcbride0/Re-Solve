import { Router } from 'express'
import * as db from '../db/db-functions'

const router = Router()

router.get('/all', async (req, res) => {
  try {
    const challenges = await db.getAllSolutions()
    res.json(challenges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', async (req, res) => {
  const solution = req.body
  try {
    await db.saveSolution(solution)
    res.status(201).send('Solution saved')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const updates = req.body
  try {
    await db.updateSolution(id, updates)
    res.status(200).send('Solution updated')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/comments', async (req, res) => {
  try {
    const comments = await db.getAllSolutionComments()
    res.json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/comments', async (req, res) => {
  const comment = req.body
  try {
    await db.saveComment(comment)
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
    await db.updateComment(id, updates)
    res.status(200).send('Comment updated')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router

// router.patch('/comment', async (req, res) => {
//   const { id, solutionId } = req.body
//   try {
//     await db.updateSolutionId(id, solutionId)
//     res.status(200).send("got 'em")
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("It ain't it")
//   }
// })

// router.patch('/feature', async (req, res) => {
//   const { id, solutionId } = req.body
//   try {
//     await db.updateFeaturedSolutionId(id, solutionId)
//     res.status(200).send("got 'em")
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("It ain't it")
//   }
// })
