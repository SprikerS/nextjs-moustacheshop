'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import { API_URL, LoginFormValues, LoginSchema } from '@/constants'
import { JwtToken } from '@/interfaces'
import { getErrorMessage } from '@/lib/http'

export async function signIn(formData: LoginFormValues) {
  const validatedFields = LoginSchema.safeParse(formData)
  if (!validatedFields.success) throw new Error('El formulario contiene errores')

  try {
    const res = await fetch(`${API_URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) throw new Error('Credenciales incorrectas, inténtelo de nuevo')

    const { token } = await res.json()
    if (!token) throw new Error('No se recibió un token de autenticación')

    const decoded = jwtDecode<{ exp: number }>(token)

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'access_token',
      value: token,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: new Date(decoded.exp * 1000),
      path: '/',
    })

    return { error: '', token: jwtDecode(token) as JwtToken }
  } catch (error) {
    return { error: getErrorMessage(error) || 'Error de conexión' }
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}
