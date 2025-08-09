declare module 'reading-time/lib/reading-time.js' {
  interface ReadingTimeResult {
    text: string
    minutes: number
    time: number
    words: number
  }
  export default function readingTime(text: string, opts?: {
    wordsPerMinute?: number
    wordBound?: (char: string) => boolean
  }): ReadingTimeResult
}
