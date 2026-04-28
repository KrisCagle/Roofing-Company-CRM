import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-8 py-16 text-white shadow-2xl md:px-12 md:py-20">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-10 md:grid-cols-[1.4fr_0.8fr] md:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              StormRoof CRM
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Manage roofing leads, claims, documents, and job progress all in one place.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
              Built for roofing companies handling storm damage, insurance claims,
              inspections, approvals, contracts, and production follow-up.
              Keep your whole workflow organized from the first door knock to the final payment.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/leads"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                View Leads
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-medium text-slate-200">Track the full process</p>
              <p className="mt-2 text-2xl font-bold text-white">Lead → Claim → Job</p>
              <p className="mt-2 text-sm text-slate-300">
                Organize every step from inspection to completion.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-medium text-slate-200">Built for teams</p>
              <p className="mt-2 text-2xl font-bold text-white">Notes + Docs + Milestones</p>
              <p className="mt-2 text-sm text-slate-300">
                Keep reps aligned and jobs moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl shadow-sm">
            🏠
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Track Every Lead</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Organize homeowner info, storm dates, assigned reps, insurance details,
            and current stage in one place.
          </p>
        </div>

        <div className="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl shadow-sm">
            📋
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Stay On Top of Claims</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use claim milestones, status tracking, and notes to manage inspections,
            adjuster meetings, approvals, and checks.
          </p>
        </div>

        <div className="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl shadow-sm">
            📄
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Keep Documents Together</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Save contracts, photos, insurance checks, and notes directly on the lead
            so important files are never scattered.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 1
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-800">Capture the lead</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Log homeowner details, storm date, rep assignment, and early contact notes
            as soon as the opportunity comes in.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 2
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-800">Manage the claim</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keep track of inspections, filed claims, adjuster meetings, approvals,
            checks, and contract status.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 3
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-800">Complete the job</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Move from production scheduling to job completion while keeping every
            milestone, document, and update visible.
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Why teams use it
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              A roofing workflow built for real field operations
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              StormRoof CRM helps teams stay focused on what matters most:
              following up with customers, moving claims forward, keeping paperwork
              organized, and making sure jobs don’t slip through the cracks.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Centralized Workflow</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                All lead activity in one place
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Field Friendly</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                Notes, docs, and milestones built in
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Manager Visibility</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                Quickly see where every lead stands
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home