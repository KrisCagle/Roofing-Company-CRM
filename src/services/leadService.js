const API_URL = "http://localhost:8088/leads"

export const getLeads = async () => {
  const response = await fetch(API_URL)
  const leads = await response.json()
  return leads
}

export const getLeadById = async (leadId) => {
  const response = await fetch(`${API_URL}/${leadId}`)
  const lead = await response.json()
  return lead
}

export const createLead = async (newLead) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLead),
  })

  const createdLead = await response.json()
  return createdLead
}