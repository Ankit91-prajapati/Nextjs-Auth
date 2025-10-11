'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { authClient } from '@/actions/auth-client'

export default function VerifyEmail() {
  const params = useSearchParams()
  const token = params.get('token')
  const router = useRouter()

  useEffect(() => {
    if (!token) return
    (async () => {
      const res = await authClient.verifyEmail({ query: { token } })
      if (res.error) {
        // show error
      } else {
        setTimeout(()=>{
          router.push('/dashboard')
        }, 4000)
       
      }
    })()
  }, [token])

  return <div>Verifying...</div>
}
