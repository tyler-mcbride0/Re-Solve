import { useQuery } from '@tanstack/react-query'
import { getPageOfChallenges } from '../../apis/apiClient'
import ChallengeCard from '../BuildingBlocks/ChallengeCard'

interface Props {
  pageNo: number
  pageSize: number
}

export default function PageOfChallenges(props: Props) {
  const { pageNo, pageSize } = props
  const { isPending, isError, error, data } = useQuery({
    queryKey: ['getPage'],
    queryFn: () => getPageOfChallenges(pageNo, pageSize),
  })

  if (isError) {
    return <span>Error! ${String(error)}</span>
  }

  if (isPending) {
    return (
      <span className="loading loading-xs mx-auto mt-4 animate-spin"></span>
    )
  }

  if (data.length == 0) {
    return <span>No challenges to display for page {pageNo}</span>
  }
  return (
    <div>
      {data.map((challenge, index) => {
        return <ChallengeCard key={index} {...challenge} />
      })}
    </div>
  )
}
