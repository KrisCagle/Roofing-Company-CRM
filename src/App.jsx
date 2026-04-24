import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"
import { NavBar } from "./components/Navbar"
import { getLeads, createLead, updateLead } from "./services/leadService"
import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import NewLead from "./pages/NewLead"
import LeadDetails from "./pages/LeadDetails"

function App() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    getLeads().then((leadsArray) => {
      const sortedLeads = [...leadsArray].sort((a, b) => {
        const aTime = a.createdAt
          ? new Date(a.createdAt).getTime()
          : Number(a.id)
        const bTime = b.createdAt
          ? new Date(b.createdAt).getTime()
          : Number(b.id)
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

  const updateLeadStage = async (leadId, newStage) => {
    const updatedLead = await updateLead(leadId, { stage: newStage })

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        String(lead.id) === String(leadId) ? updatedLead : lead
      )
    )
  }

  const updateLeadMilestones = async (leadId, updatedMilestones) => {
    const updatedLead = await updateLead(leadId, {
      milestones: updatedMilestones,
    })

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        String(lead.id) === String(leadId) ? updatedLead : lead
      )
    )
  }

  const updateLeadNotes = async (leadId, updatedNotes) => {
    const updatedLead = await updateLead(leadId, {
      notes: updatedNotes,
    })

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        String(lead.id) === String(leadId) ? updatedLead : lead
      )
    )
  }

  const updateLeadDetails = async (leadId, updatedFields) => {
    const updatedLead = await updateLead(leadId, updatedFields)

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        String(lead.id) === String(leadId) ? updatedLead : lead
      )
    )
  }

  const updateLeadDocuments = async (leadId, updatedDocuments) => {
    const updatedLead = await updateLead(leadId, {
      documents: updatedDocuments,
    })

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        String(lead.id) === String(leadId) ? updatedLead : lead
      )
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <NavBar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard leads={leads} />} />
          <Route path="/leads" element={<Leads leads={leads} />} />
          <Route path="/leads/new" element={<NewLead addLead={addLead} />} />
          <Route
            path="/leads/:leadId"
            element={
              <LeadDetails
  leads={leads}
  onUpdateLeadStage={updateLeadStage}
  onUpdateLeadMilestones={updateLeadMilestones}
  onUpdateLeadNotes={updateLeadNotes}
  onUpdateLeadDetails={updateLeadDetails}
  onUpdateLeadDocuments={updateLeadDocuments}
/>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App