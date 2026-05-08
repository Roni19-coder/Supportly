"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {

  const { data: session } = useSession()

  const [mobileMenu, setMobileMenu] =
    useState(false)

  const [showdropdown, setshowdropdown] =
    useState(false)

  return (

    <nav className="bg-gray-800 text-white w-full">

      <div className="flex items-center justify-between px-4 py-3">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg sm:text-xl"
        >

          <img
            src="/community.png"
            alt="logo"
            className="h-7 w-7"
          />

          <span>Supportly</span>

        </Link>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-2xl"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >

          ☰

        </button>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-4 relative">

          <Link href="/">

            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

              Home

            </button>

          </Link>

          <Link href="/about">

            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

              About

            </button>

          </Link>

          {session ? (

            <>

              {/* Dropdown Button */}

              <button
                onClick={() =>
                  setshowdropdown(!showdropdown)
                }

                onBlur={() => {

                  setTimeout(() => {

                    setshowdropdown(false)

                  }, 200)

                }}

                className="text-sm text-white"
              >

                Welcome {session.user.email}

              </button>

              {/* Dropdown */}

              <div
                className={`absolute top-12 right-24 bg-slate-800 shadow-lg w-44 border border-slate-700 z-50 ${showdropdown
                    ? "block"
                    : "hidden"
                  }`}
              >

                <ul className="p-2 text-sm">

                  <li>

                    <Link
                      href="/dashboard"
                      className="block p-2 rounded hover:bg-slate-700"
                    >

                      Dashboard

                    </Link>

                  </li>

                  <li>

                    <Link
                      href={`/${session.user.name}`}
                      className="block p-2 rounded hover:bg-slate-700"
                    >

                      Your Profile

                    </Link>

                  </li>

                </ul>

              </div>

              {/* Logout */}

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold"
              >

                Log Out

              </button>

            </>

          ) : (

            <Link href="/login">

              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

                Login

              </button>

            </Link>

          )}

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (

        <div className="md:hidden flex flex-col gap-3 px-4 pb-4 bg-gray-800">

          <Link href="/">

            <button className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

              Home

            </button>

          </Link>

          <Link href="/about">

            <button className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

              About

            </button>

          </Link>

          {session ? (

            <>

              <div className="text-center text-xs text-slate-300 break-all">

                Welcome {session.user.email}

              </div>

              <Link href="/dashboard">

                <button className="w-full bg-slate-700 rounded-full px-4 py-2 text-sm">

                  Dashboard

                </button>

              </Link>

              <Link href={`/${session.user.name}`}>

                <button className="w-full bg-slate-700 rounded-full px-4 py-2 text-sm">

                  Your Profile

                </button>

              </Link>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
                className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold"
              >

                Log Out

              </button>

            </>

          ) : (

            <Link href="/login">

              <button className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full text-sm px-4 py-2 font-bold">

                Login

              </button>

            </Link>

          )}

        </div>

      )}

    </nav>
  )
}

export default Navbar