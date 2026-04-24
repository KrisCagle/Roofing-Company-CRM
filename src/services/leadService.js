const API_URL = "http://localhost:8088/leads"

export const getLeads = async () => {
  const response = await fetch(API_URL)
  return await response.json()
}

export const createLead = async (newLead) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLead),
  })

  return await response.json()
}

export const updateLead = async (leadId, updatedFields) => {
  const response = await fetch(`${API_URL}/${leadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  })

  return await response.json()
}