import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export const NavBar = ({ currentUser, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-gray-200 hover:text-white transition"

  return (
    <nav className="bg-slate-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          StormRoof CRM
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/dashboard" className={navLinkStyle}>
              Dashboard
            </NavLink>

            <NavLink to="/leads" className={navLinkStyle}>
              Leads
            </NavLink>

            <NavLink to="/leads/new" className={navLinkStyle}>
              New Lead
            </NavLink>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-600 text-white transition hover:bg-slate-700"
            >
              ☰
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Signed In
                  </p>
                  <p className="mt-2 font-medium text-slate-800">
                    {currentUser?.fullName || "Guest"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {currentUser?.email || "Not logged in"}
                  </p>
                </div>

                <div className="mt-3 flex flex-col">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Home
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/leads"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Leads
                  </Link>

                  <Link
                    to="/leads/new"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    New Lead
                  </Link>

                  {!currentUser ? (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="mt-2 rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                      Login
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onLogout()
                        setMenuOpen(false)
                      }}
                      className="mt-2 rounded-md bg-red-600 px-3 py-2 text-left text-sm font-medium text-white hover:bg-red-500"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}