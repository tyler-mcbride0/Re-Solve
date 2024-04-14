import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchChallenges } from '../apis/apiClient'

export default function Challenges() {
  const {
    isLoading,
    isError,
    data: ChallengesData,
  } = useQuery({
    queryKey: ['AllChallenges'],
    queryFn: () => fetchChallenges(),
  })
  if (isLoading) {
    return <h1>Loading...ChallengesDataPage</h1>
  }

  if (isError || !ChallengesData) {
    return <h1>Error</h1>
  }
  return (
    <div>
      <div>
        <h1>Challenges</h1>
        <Link to={`/`}>
          <button>Back</button>
        </Link>
      </div>
      <div>
        <table className="table border-separate space-y-6 text-sm text-gray-400">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="p-3">Challenge</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">Upvote</th>
              <th className="p-3 text-left">Downvotes</th>
              <th>Solutions</th>
            </tr>
          </thead>
          <tbody>
            {ChallengesData.map((challenge) => (
              <tr key={challenge.id} className="bg-blue-200 lg:text-black">
                <td className="p-3">
                  <span className="rounded-md bg-blue-400 px-2 text-gray-50">
                    <Link to={`/challenge/${challenge.id}`}>
                      {challenge.title}
                    </Link>
                  </span>
                </td>
                <td className="p-3">{challenge.difficulty}</td>
                <td className="p-3">{challenge.upvotes}</td>
                <td className="p-3">{challenge.downvotes}</td>
                <td className="p-3">
                  <span className="rounded-md bg-blue-400 px-2 text-gray-50">
                    <Link to={`/solution/${challenge.id}`}>➡</Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}