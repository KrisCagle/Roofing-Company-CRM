import { Link } from "react-router"

const Leads = ({ leads }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold text-slate-800">Leads</h1>
      <p className="mt-2 text-slate-600">View and manage all roofing leads</p>

      <div className="mt-6 space-y-4">
        {[...leads]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .map((lead) => (
            <div
              key={lead.id}
              className="rounded-lg border border-slate-200 p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800">
                {lead.fullName}
              </h2>

              <p className="text-slate-600">{lead.address}</p>

              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium">Stage:</span> {lead.stage}
              </p>

              <p className="text-sm text-slate-700">
                <span className="font-medium">Insurance:</span> {lead.insuranceCompany}
              </p>

              <p className="text-sm text-slate-700">
                <span className="font-medium">Assigned Rep:</span> {lead.assignedRep}
              </p>

              <Link
                to={`/leads/${lead.id}`}
                className="mt-4 inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                View Lead
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Leads