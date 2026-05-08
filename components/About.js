import React from "react"
import Link from "next/link"

export default function About() {

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Hero Section */}

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About Supportly 🙏
        </h1>

        <p className="max-w-2xl text-slate-300 text-lg leading-8">
          Supportly is a creator-support platform where fans can
          support developers, artists, writers and creators through
          simple and secure online donations.
        </p>

      </section>

      {/* Mission Section */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="text-slate-300 leading-8 text-lg">
              We want to simplify creator support by making online
              donations easy, fast and engaging. Every contribution
              helps creators continue building amazing things for
              the internet.
            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-lg">

            <h3 className="text-2xl font-semibold mb-4">
              Why Choose Us?
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li>❤️ Simple donation flow</li>

              <li>💳 Secure Razorpay payments</li>

              <li>🎨 Personalized creator pages</li>

              <li>📈 Track supporters & funds raised</li>

              <li>🚀 Built for creators and developers</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-slate-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Features
            </h2>
            <p className="text-slate-300">
              Everything creators need in one place
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-semibold mb-4">
                Creator Profiles
              </h3>
              <p className="text-slate-300 leading-7">
                Create personalized pages with profile pictures,
                cover images and creator bios.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-semibold mb-4">
                Secure Payments
              </h3>
              <p className="text-slate-300 leading-7">
                Seamless Razorpay integration for fast,
                smooth and secure donations.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-semibold mb-4">
                Analytics
              </h3>
              <p className="text-slate-300 leading-7">
                Track total payments, supporters and
                funds raised in real time.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-700 to-blue-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Start Supporting Creators Today ❤️
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-8">
            Join Supportly and help creators continue doing
            what they love.
          </p>
          <Link href="/">
            <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}