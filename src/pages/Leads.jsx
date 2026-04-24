import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router"

const getStageBorderClass = (stage) => {
  switch (stage) {
    case "New Lead":
      return "border-l-4 border-l-blue-500"
    case "Contact Attempted":
      return "border-l-4 border-l-gray-500"
    case "Inspection Scheduled":
      return "border-l-4 border-l-amber-500"
    case "Inspected":
      return "border-l-4 border-l-orange-500"
    case "Claim Filed":
      return "border-l-4 border-l-purple-500"
    case "Approved":
      return "border-l-4 border-l-green-800"
    case "Waiting for Check":
      return "border-l-4 border-l-yellow-500"
    case "Contract Signed":
      return "border-l-4 border-l-indigo-500"
    case "Ready for Production":
      return "border-l-4 border-l-cyan-500"
    case "In Progress":
      return "border-l-4 border-l-sky-500"
    case "Completed":
      return "border-l-4 border-l-emerald-500"
    case "Closed Lost":
      return "border-l-4 border-l-red-500"
    default:
      return "border-l-4 border-l-slate-300"
  }
}

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

const allStages = [
  "New Lead",
  "Contact Attempted",
  "Inspection Scheduled",
  "Inspected",
  "Claim Filed",
  "Approved",
  "Waiting for Check",
  "Contract Signed",
  "Ready for Production",
  "In Progress",
  "Completed",
  "Closed Lost",
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
]

const Leads = ({ leads }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState(searchParams.get("stage") || "")
  const [repFilter, setRepFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const repOptions = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.assignedRep).filter(Boolean))].sort()
  }, [leads])

  const handleStageFilterChange = (event) => {
    const selectedStage = event.target.value
    setStageFilter(selectedStage)

    if (selectedStage) {
      setSearchParams({ stage: selectedStage })
    } else {
      setSearchParams({})
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setStageFilter("")
    setRepFilter("")
    setSortBy("newest")
    setSearchParams({})
  }

  const processedLeads = [...leads]
    .filter((lead) =>
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) => (stageFilter ? lead.stage === stageFilter : true))
    .filter((lead) => (repFilter ? lead.assignedRep === repFilter : true))
    .sort((a, b) => {
      const aTime = a.createdAt
        ? new Date(a.createdAt).getTime()
        : Number(a.id)

      const bTime = b.createdAt
        ? new Date(b.createdAt).getTime()
        : Number(b.id)

      switch (sortBy) {
        case "oldest":
          return aTime - bTime
        case "name-asc":
          return a.fullName.localeCompare(b.fullName)
        case "name-desc":
          return b.fullName.localeCompare(a.fullName)
        case "newest":
        default:
          return bTime - aTime
      }
    })

  const hasActiveFilters =
    searchTerm || stageFilter || repFilter || sortBy !== "newest"

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 shadow">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Leads</h1>
            <p className="mt-1 text-slate-600">View and manage all roofing leads</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            )}

            <Link
              to="/leads/new"
              className="inline-flex rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Add New Lead
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          <div className="xl:col-span-1">
            <label
              htmlFor="lead-search"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Search Homeowner
            </label>
            <input
              id="lead-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by homeowner name..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label
              htmlFor="stage-filter"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Stage
            </label>
            <select
              id="stage-filter"
              value={stageFilter}
              onChange={handleStageFilterChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            >
              <option value="">All Stages</option>
              {allStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rep-filter"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Assigned Rep
            </label>
            <select
              id="rep-filter"
              value={repFilter}
              onChange={(event) => setRepFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            >
              <option value="">All Reps</option>
              {repOptions.map((rep) => (
                <option key={rep} value={rep}>
                  {rep}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sort-by"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-700">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {searchTerm && (
                <span>
                  Search: <span className="font-semibold">{searchTerm}</span>
                </span>
              )}
              {stageFilter && (
                <span>
                  Stage: <span className="font-semibold">{stageFilter}</span>
                </span>
              )}
              {repFilter && (
                <span>
                  Rep: <span className="font-semibold">{repFilter}</span>
                </span>
              )}
              {sortBy !== "newest" && (
                <span>
                  Sort:{" "}
                  <span className="font-semibold">
                    {sortOptions.find((option) => option.value === sortBy)?.label}
                  </span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {processedLeads.length === 0 ? (
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">No leads match your filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {processedLeads.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md ${getStageBorderClass(
                lead.stage
              )}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {lead.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{lead.address}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStageBadgeClass(
                    lead.stage
                  )}`}
                >
                  {lead.stage}
                </span>
              </div>

              <div className="mt-4 space-y-1 text-sm text-slate-700">
                <p>
                  <span className="font-medium">Phone:</span> {lead.phone}
                </p>
                <p>
                  <span className="font-medium">Rep:</span> {lead.assignedRep}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={`/leads/${lead.id}`}
                  className="inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  View Lead
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leads