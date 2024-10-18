export interface SpotifyData {
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export interface GithubContributionDay {
  contributionCount: number
  date: string
}

export interface GithubContributionData {
  totalContributions: number
  weeks: { contributionDays: GithubContributionDay[] }[]
}
