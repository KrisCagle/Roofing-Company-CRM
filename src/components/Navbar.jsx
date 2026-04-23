import { Link, NavLink } from "react-router"

export const NavBar = () => {
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
          <NavLink to="/" className={navLinkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/leads" className={navLinkStyle}>
            Leads
          </NavLink>

          <NavLink to="/leads/new" className={navLinkStyle}>
            New Lead
          </NavLink>
        </div>
      </div>
    </nav>
  )
}