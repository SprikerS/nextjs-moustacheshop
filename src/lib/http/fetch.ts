import { cookies } from 'next/headers'
import { getErrorMessage } from './errors'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getHeaders = async () => {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const cookieHeader = allCookies.map(({ name, value }) => `${name}=${value}`).join('; ')

  return {
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
  }
}

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data
  const headers = await getHeaders()

  const res = await fetch(`${API_URL}/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })

  const parsedRes = await res.json()
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) }
  }

  return { error: '', data: parsedRes }
}

export const get = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const headers = await getHeaders()
  const url = params ? `${API_URL}/api/${path}?` + params : `${API_URL}/api/${path}`

  const res = await fetch(url, {
    headers,
    next: { tags },
  })

  return res.json() as T
}
