import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"
import { NavBar } from "./components/Navbar"
import { getLeads, createLead } from "./services/leadService"
import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import NewLead from "./pages/NewLead"
import LeadDetails from "./pages/LeadDetails"

function App() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    getLeads().then((leadsArray) => {
      const sortedLeads = [...leadsArray].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : Number(a.id)
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : Number(b.id)
        return bTime - aTime
      })

      setLeads(sortedLeads)
    })
  }, [])

  const addLead = async (newLeadData) => {
    const leadToCreate = {
      ...newLeadData,
      createdAt: new Date().toISOString(),
    }

    const createdLead = await createLead(leadToCreate)

    setLeads((currentLeads) => [createdLead, ...currentLeads])
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <NavBar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads leads={leads} />} />
          <Route path="/leads/new" element={<NewLead addLead={addLead} />} />
          <Route path="/leads/:leadId" element={<LeadDetails leads={leads} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App