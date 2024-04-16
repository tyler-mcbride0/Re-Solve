import { useParams } from 'react-router-dom'
import useUser from '../hooks/useUser'
import {
  changeToDownvoteOnChallenge,
  checkChallengeVote,
  newDownvoteOnChallenge,
} from '../apis/apiClient'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Downvote() {
  const [buttonColor, setButtonColor] = useState('bg-gray-300')
  const challengeId = useParams().id
  const user = useUser().data

  const { data: check } = useQuery({
    queryKey: [`${challengeId}, ${user?.id} votecheck`],
    queryFn: () => checkChallengeVote(user?.id, challengeId),
  })

  const queryClient = useQueryClient()
  const newDownvote = useMutation({
    mutationFn: () => newDownvoteOnChallenge(user?.id, challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${challengeId}, ${user?.id} votecheck`],
      })
    },
    onError: (error) => {
      console.log('Vote Failed', error)
    },
  })

  const changeDownvote = useMutation({
    mutationFn: () => changeToDownvoteOnChallenge(user?.id, challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${challengeId}, ${user?.id} votecheck`],
      })
    },
    onError: (error) => {
      console.log('Vote Failed', error)
    },
  })

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!check) {
      console.log('new downvote recording')
      newDownvote.mutate()
    } else if (check.vote === -1) {
      console.log('you already downvoted')
      return
    } else if (check.vote === 1) {
      console.log('change to downvote')
      changeDownvote.mutate()
    }
  }

  useEffect(() => {
    if (check === null || check === undefined) {
      setButtonColor('bg-gray-300')
    } else if (check.vote === -1) {
      setButtonColor('bg-accent')
    } else {
      setButtonColor('bg-secondary')
    }
  }, [check])

  return (
    <div>
      <button
        className={`btn ${buttonColor} text-accent-content drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-gray-400`}
        onClick={handleClick}
      >
        Downvote
      </button>
    </div>
  )
}
