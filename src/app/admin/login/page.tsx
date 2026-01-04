'use client'

import { useState } from 'react'

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    })

    if (res.ok) {
      window.location.href = '/admin/dashboard'
    } else {
      alert('Invalid credentials')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Admin username" required />
      <input name="password" type="password" required />
      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
