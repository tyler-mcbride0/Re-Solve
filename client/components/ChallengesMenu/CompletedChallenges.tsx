import HeadingBlock from '../BuildingBlocks/HeadingBlock'
import ChallengeCard from '../BuildingBlocks/ChallengeCard'
import { useQuery } from '@tanstack/react-query'
import { getFiveCompletedChallenges } from '../../apis/apiClient'
import useUser from '../../hooks/useUser'

export default function CompletedChallenges() {
  const user = useUser().data
  const id = user?.id

  // PROBLEM - This query function is dependent on "id"
  // Can try adding completed challenges to the useUser return?

  const {
    isLoading,
    isError,
    error,
    data: challengesData,
  } = useQuery({
    queryKey: ['completedChallenges'],
    queryFn: () => getFiveCompletedChallenges(id),
    enabled: !!id, // Enabled once id exists
  })
  if (isLoading || !challengesData) {
    return (
      <div className="flex flex-col justify-center">
        <HeadingBlock>Completed Challenges</HeadingBlock>
        <span className="mt-4 text-center">Loading...</span>
      </div>
    )
  }

  if (isError) {
    return <h1>Error: {String(error)}</h1>
  }
  return (
    <div>
      <HeadingBlock>Completed Challenges</HeadingBlock>
      {challengesData?.map((challenge, index) => (
        <ChallengeCard key={index} linkToSolution={true} {...challenge} />
      ))}
    </div>
  )
}
