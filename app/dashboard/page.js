"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {

  const { data: session, status } = useSession()

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    profilePic: "",
    coverPic: "",
  })

  useEffect(() => {

    if (status === "loading") return

    if (!session) {
      router.push("/login")
    }

  }, [session, status, router])

  useEffect(() => {

    if (session?.user) {
      getUserData()
    }

  }, [session])

  const getUserData = async () => {

    try {

      const res = await fetch(
        `/api/getuser?email=${session.user.email}`
      )

      const data = await res.json()

      if (data.success) {

        setForm({
          name: data.user.name || "",
          email: data.user.email || "",
          username: data.user.username || "",
          bio: data.user.bio || "",
          profilePic: data.user.profilePic || "",
          coverPic: data.user.coverPic || "",
        })

      }

    } catch (error) {

      console.log(error)

    }
  }

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await fetch("/api/updateprofile", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (data.success) {

        alert("Profile Updated Successfully")

      } else {

        alert("Something went wrong")

      }

    } catch (error) {

      console.log(error)

      alert("Error occurred")
    }
  }

  if (status === "loading") {

    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  if (!session) return null

  return (

    <div className="min-h-screen flex items-center justify-center text-white p-4">

      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">

        <h1 className="text-4xl font-bold text-center mb-8">
          Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none"
          />

          <input
            type="email"
            name="email"
            value={session.user.email}
            readOnly
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none cursor-not-allowed text-white"
          />

          <input
            type="text"
            name="username"
            value={session.user.name}
            readOnly
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none cursor-not-allowed text-white"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows="4"
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none"
          />

          <input
            type="text"
            name="profilePic"
            value={form.profilePic}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none"
          />

          <input
            type="text"
            name="coverPic"
            value={form.coverPic}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  )
}

export default Dashboard