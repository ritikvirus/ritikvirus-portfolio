import { MONKEYTYPE_API_KEY } from 'astro:env/server'

import type { MonkeyTypeData } from '@/types'

const mapResponse = (response: any) => {
  if (!response.data || typeof response.data !== 'object') {
    return []
  }

  return Object.entries(response.data).flatMap(([time, records]) => {
    if (!Array.isArray(records)) {
      return []
    }
    return records.map((record: any) => ({
      ...record,
      time: Number(time)
    }))
  })
}

const getMonkeytypeData = async (): Promise<MonkeyTypeData> => {
  try {
    const API_KEY = MONKEYTYPE_API_KEY
    if (!API_KEY) {
      return { acc: 0, consistency: 0, language: 'english', time: 60, wpm: 0 }
    }
    const response = await fetch(
      'https://api.monkeytype.com/users/personalBests?mode=time',
      { headers: { Authorization: `ApeKey ${API_KEY}` } }
    )

    if (!response.ok) {
      console.error('Monkeytype API error:', response.status, response.statusText)
      // Return default values when API fails
      return {
        acc: 0,
        consistency: 0,
        language: 'english',
        time: 60,
        wpm: 0
      }
    }

    const responseJSON = await response.json()
    const data = mapResponse(responseJSON)

    if (data.length === 0) {
      // Return default values when no data is available
      return {
        acc: 0,
        consistency: 0,
        language: 'english',
        time: 60,
        wpm: 0
      }
    }

    const bestScore = data.reduce((max, item) => {
      return item.wpm > max.wpm ? item : max
    }, data[0])

    return {
      acc: Math.round(bestScore.acc),
      consistency: Math.round(bestScore.consistency),
      language: bestScore.language,
      time: bestScore.time,
      wpm: Math.round(bestScore.wpm)
    }
  } catch (error) {
    console.error('Error fetching Monkeytype data:', error)
    // Return default values when there's an error
    return {
      acc: 0,
      consistency: 0,
      language: 'english',
      time: 60,
      wpm: 0
    }
  }
}

export default getMonkeytypeData