import { Link } from "react-router"

const getStageBadgeClass = (stage) => {
  switch (stage) {
    case "New Lead":
      return "bg-blue-100 text-blue-700"
    case "Contact Attempted":
      return "bg-gray-200 text-gray-700"
    case "Inspection Scheduled":
      return "bg-amber-100 text-amber-700"
    case "Inspected":
      return "bg-orange-100 text-orange-700"
    case "Claim Filed":
      return "bg-purple-100 text-purple-700"
    case "Approved":
      return "bg-green-200 text-green-900"
    case "Waiting for Check":
      return "bg-yellow-100 text-yellow-700"
    case "Contract Signed":
      return "bg-indigo-100 text-indigo-700"
    case "Ready for Production":
      return "bg-cyan-100 text-cyan-700"
    case "In Progress":
      return "bg-sky-100 text-sky-700"
    case "Completed":
      return "bg-emerald-100 text-emerald-700"
    case "Closed Lost":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

const parseMoney = (value) => {
  if (value === null || value === undefined || value === "") return 0
  if (typeof value === "number") return value

  const cleaned = String(value).replace(/[$,]/g, "")
  const parsed = Number(cleaned)

  return Number.isNaN(parsed) ? 0 : parsed
}

const Dashboard = ({ leads }) => {
  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.stage === "New Lead").length
  const waitingOnCheck = leads.filter(
    (lead) => lead.stage === "Waiting for Check"
  ).length
  const readyForProduction = leads.filter(
    (lead) => lead.stage === "Ready for Production"
  ).length
  const completedLeads = leads.filter(
    (lead) => lead.stage === "Completed"
  ).length

  const unassignedLeads = leads.filter(
    (lead) => !lead.assignedRep || lead.assignedRep.trim() === ""
  ).length

  const inspectionsScheduled = leads.filter(
    (lead) => lead.stage === "Inspection Scheduled"
  ).length

  const recentLeads = [...leads]
    .filter((lead) => lead.stage !== "Completed" && lead.stage !== "Closed Lost")
    .sort((a, b) => {
      const aTime = a.createdAt
        ? new Date(a.createdAt).getTime()
        : Number(a.id)
      const bTime = b.createdAt
        ? new Date(b.createdAt).getTime()
        : Number(b.id)

      return bTime - aTime
    })
    .slice(0, 5)

  const totalCollected = leads.reduce((sum, lead) => {
    return sum + parseMoney(lead.financials?.amountCollected)
  }, 0)

  const totalClaimValue = leads.reduce((sum, lead) => {
    return sum + parseMoney(lead.financials?.claimAmount)
  }, 0)

  const totalExpectedRevenue = leads.reduce((sum, lead) => {
    return sum + parseMoney(lead.financials?.finalInvoice)
  }, 0)


  const totalGrossProfit = leads.reduce((sum, lead) => {
    const storedGrossProfit = parseMoney(lead.financials?.grossProfit)

    if (storedGrossProfit > 0) return sum + storedGrossProfit

    const invoice = parseMoney(lead.financials?.finalInvoice)
    const cost = parseMoney(lead.financials?.jobCost)
    return sum + (invoice - cost)
  }, 0)

  const stillToCollect = Math.max(totalExpectedRevenue - totalCollected, 0)

  const leadsWithFinancials = leads.filter(
    (lead) =>
      lead.financials &&
      (
        parseMoney(lead.financials?.claimAmount) > 0 ||
        parseMoney(lead.financials?.finalInvoice) > 0 ||
        parseMoney(lead.financials?.amountCollected) > 0
      )
  ).length

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Quick overview of your roofing CRM pipeline
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/leads"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              View All Leads
            </Link>
            <Link
              to="/leads/new"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Add New Lead
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Total Leads</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{totalLeads}</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">New Leads</p>
          <p className="mt-3 text-3xl font-bold text-blue-600">{newLeads}</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Waiting on Check</p>
          <p className="mt-3 text-3xl font-bold text-yellow-600">
            {waitingOnCheck}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Ready for Production</p>
          <p className="mt-3 text-3xl font-bold text-cyan-700">
            {readyForProduction}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <p className="mt-3 text-3xl font-bold text-emerald-600">
            {completedLeads}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Total Collected</p>
          <p className="mt-3 text-2xl font-bold text-emerald-700">
            {formatMoney(totalCollected)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Still To Collect</p>
          <p className="mt-3 text-2xl font-bold text-red-600">
            {formatMoney(stillToCollect)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Claim Value</p>
          <p className="mt-3 text-2xl font-bold text-slate-800">
            {formatMoney(totalClaimValue)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Expected Revenue</p>
          <p className="mt-3 text-2xl font-bold text-indigo-700">
            {formatMoney(totalExpectedRevenue)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm font-medium text-slate-500">Gross Profit</p>
          <p className="mt-3 text-2xl font-bold text-green-800">
            {formatMoney(totalGrossProfit)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Needs Attention
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">New Leads</p>
                <p className="text-sm text-slate-500">
                  First contact still needed
                </p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {newLeads}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">
                  Inspection Scheduled
                </p>
                <p className="text-sm text-slate-500">
                  Upcoming inspection follow-up
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                {inspectionsScheduled}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">Waiting on Check</p>
                <p className="text-sm text-slate-500">
                  Payment or insurance follow-up
                </p>
              </div>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                {waitingOnCheck}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">Leads with Financials</p>
                <p className="text-sm text-slate-500">
                  Jobs already carrying money data
                </p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {leadsWithFinancials}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">Unassigned Leads</p>
                <p className="text-sm text-slate-500">
                  Leads missing a rep assignment
                </p>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                {unassignedLeads}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Recent Leads
            </h2>
            <Link
              to="/leads"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              View All
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentLeads.length === 0 ? (
              <p className="text-slate-500">No active recent leads.</p>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {lead.fullName}
                    </p>
                    <p className="text-sm text-slate-600">{lead.address}</p>
                    <p className="mt-1 text-sm text-slate-500">{lead.phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStageBadgeClass(
                        lead.stage
                      )}`}
                    >
                      {lead.stage}
                    </span>

                    <Link
                      to={`/leads/${lead.id}`}
                      className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard