import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewLead = ({ addLead }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    stage: "New Lead",
    insuranceCompany: "",
    stormDate: "",
    assignedRep: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addLead({
      ...formData,
      notes: [],
      documents: [],
      milestones: {
        doorKnocked: false,
        inspectionCompleted: false,
        claimFiled: false,
        adjusterMeetingDone: false,
        approved: false,
        firstCheckReceived: false,
        contractSigned: false,
        productionScheduled: false,
        jobCompleted: false,
        finalPaymentReceived: false,
      },
    })

    setFormData({
      fullName: "",
      address: "",
      phone: "",
      email: "",
      stage: "New Lead",
      insuranceCompany: "",
      stormDate: "",
      assignedRep: "",
    })

    navigate("/leads")
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold text-slate-800">New Lead</h1>
      <p className="mt-2 text-slate-600">Add a new roofing lead to the CRM</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Carter"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="615-555-0142"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="1428 Maple Drive, Nashville, TN"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
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
            placeholder="john@email.com"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="stage"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
            >
              <option value="New Lead">New Lead</option>
              <option value="Contact Attempted">Contact Attempted</option>
              <option value="Inspection Scheduled">Inspection Scheduled</option>
              <option value="Inspected">Inspected</option>
              <option value="Claim Filed">Claim Filed</option>
              <option value="Approved">Approved</option>
              <option value="Waiting for Check">Waiting for Check</option>
              <option value="Contract Signed">Contract Signed</option>
              <option value="Ready for Production">Ready for Production</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="insuranceCompany"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Insurance Company
            </label>
            <input
              id="insuranceCompany"
              name="insuranceCompany"
              type="text"
              value={formData.insuranceCompany}
              onChange={handleChange}
              placeholder="State Farm"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="stormDate"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Storm Date
            </label>
            <input
              id="stormDate"
              name="stormDate"
              type="date"
              value={formData.stormDate}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="assignedRep"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Assigned Rep
            </label>
            <input
              id="assignedRep"
              name="assignedRep"
              type="text"
              value={formData.assignedRep}
              onChange={handleChange}
              placeholder="Kris"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewLead