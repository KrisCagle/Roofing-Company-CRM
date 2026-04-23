import { useParams } from "react-router"

export const LeadDetails = ({ leads }) => {
  const { leadId } = useParams()

  const lead = leads.find((lead) => lead.id === Number(leadId))

  if (!lead) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-slate-800">Lead Not Found</h1>
        <p className="mt-2 text-slate-600">
          We could not find a lead with that ID.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-slate-800">{lead.fullName}</h1>
        <p className="mt-2 text-slate-600">
          Customer record and claim progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Contact Info</h2>
          <div className="mt-4 space-y-2 text-slate-700">
            <p><span className="font-semibold">Address:</span> {lead.address}</p>
            <p><span className="font-semibold">Phone:</span> {lead.phone}</p>
            <p><span className="font-semibold">Email:</span> {lead.email}</p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Claim Info</h2>
          <div className="mt-4 space-y-2 text-slate-700">
            <p><span className="font-semibold">Stage:</span> {lead.stage}</p>
            <p><span className="font-semibold">Insurance:</span> {lead.insuranceCompany}</p>
            <p><span className="font-semibold">Storm Date:</span> {lead.stormDate}</p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Assignment</h2>
          <div className="mt-4 space-y-2 text-slate-700">
            <p><span className="font-semibold">Assigned Rep:</span> {lead.assignedRep}</p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Next Actions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>Call homeowner for follow-up</li>
            <li>Confirm inspection or adjuster scheduling</li>
            <li>Update claim stage after next contact</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default LeadDetails