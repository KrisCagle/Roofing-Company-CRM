import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ onLogin }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = {
      fullName: formData.fullName.trim() || "StormRoof User",
      email: formData.email.trim(),
    }

    onLogin(user)
    navigate("/dashboard")
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold text-slate-800">Login</h1>
      <p className="mt-2 text-slate-600">
        Sign in to access your roofing CRM dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Kris Cagle"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="kris@email.com"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login