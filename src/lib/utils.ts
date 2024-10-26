import { type ClassValue, clsx } from 'clsx'
import type { ClientResponse, InferRequestType } from 'hono/client'
import type { StatusCode } from 'hono/utils/http-status'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Append 'th', 'st', 'nd', or 'rd' for the day of the month
export const getDateSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th' // Special case for 11th-13th
  return ['th', 'st', 'nd', 'rd'][day % 10] || 'th'
}

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('en-US', options)

  const day = date.getDate()

  return formattedDate.replace(/\d+,/, day + getDateSuffix(day))
}

export const catchError = async <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> => {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => [error])
}
