import request from 'superagent'
import { Challenge } from '../../models/challenges'
import { Solution } from '../../models/solutions'
import { SolutionComment } from '../../models/solutions'

const rootUrl = '/api/v1'

export async function fetchChallenges(): Promise<Challenge[]> {
  const res = await request.get(`${rootUrl}/challenges`)
  return res.body
}

export async function fetchSolutionDisBox(): Promise<SolutionComment[]> {
  const res = await request.get(`${rootUrl}/solutions/comments`)
  return res.body
}

export async function addSolutionDisBox(
  comment: SolutionComment,
): Promise<SolutionComment[]> {
  const res = await request
    .post(`${rootUrl}/solutions/comments`)
    .send({ comment })
  return res.body
}

// export function getFruits(): Promise<string[]> {
//   return request.get(rootUrl + '/fruits').then((res) => {
//     return res.body.fruits
//   })
// }

export async function getCompletedChallenges(id: number): Promise<Challenge[]> {
  const res = await request.get(`${rootUrl}/challenges/completed/${id}`)

  return res.body
}

export async function getChallenge(id: number) {
  const res = await request.get(`${rootUrl}/challenges/${id}`)
  return res.body
}

export async function getChallengeSolutions(id: number) {
  const res = await request.get(`${rootUrl}/solutions/challengesolution/${id}`)
  return res.body
}

export async function getIncompleteChallenges(
  id: number,
): Promise<Challenge[]> {
  const res = await request.get(`${rootUrl}/challenges/incomplete/${id}`)
  return res.body
}

