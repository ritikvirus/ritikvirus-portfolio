import { gql } from 'graphql-request'

export const GetGithubContributions = gql`
  query ($userName: String!) {
    user(login: $userName) {
      repositories(first: 1, orderBy: { direction: DESC, field: PUSHED_AT }) {
        nodes {
          name
          pushedAt
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export const GetLastUpdatedTime = gql`
  query ($username: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $username) {
      id
      name
      nameWithOwner
      openGraphImageUrl
      pushedAt
      updatedAt
      url
    }
  }
`
