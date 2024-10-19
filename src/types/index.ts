export interface SpotifyData {
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export interface GithubContributionDay {
  count: number
  date: string
}

export interface GithubContributionData {
  lastPushedAt: number
  totalContributions: number
  contributions: GithubContributionDay[]
}
