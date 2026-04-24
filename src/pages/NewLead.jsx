import { useState } from "react"
import { useParams } from "react-router"

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

const milestoneLabels = {
  doorKnocked: "Door Knocked",
  inspectionCompleted: "Inspection Completed",
  claimFiled: "Claim Filed",
  adjusterMeetingDone: "Adjuster Meeting Done",
  approved: "Approved",
  firstCheckReceived: "First Check Received",
  contractSigned: "Contract Signed",
  productionScheduled: "Production Scheduled",
  jobCompleted: "Job Completed",
  finalPaymentReceived: "Final Payment Received",
}

const documentTypes = [
  "Contract",
  "Insurance Check",
  "Supplement",
  "Estimate",
  "Invoice",
  "Permit",
  "Photo",
  "Other",
]

const documentStatuses = [
  "Received",
  "Pending Review",
  "Signed",
  "Submitted",
  "Paid",
  "Archived",
]

const LeadDetails = ({
  leads,
  onUpdateLeadStage,
  onUpdateLeadMilestones,
  onUpdateLeadNotes,
  onUpdateLeadDetails,
  onUpdateLeadDocuments,
}) => {
  const { leadId } = useParams()

  const [isSavingStage, setIsSavingStage] = useState(false)
  const [isSavingMilestones, setIsSavingMilestones] = useState(false)
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [isSavingDocuments, setIsSavingDocuments] = useState(false)

  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [isSavingDetails, setIsSavingDetails] = useState(false)
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    insuranceCompany: "",
    stormDate: "",
    assignedRep: "",
  })

  const [noteText, setNoteText] = useState("")
  const [documentForm, setDocumentForm] = useState({
    title: "",
    type: "Contract",
    status: "Received",
    note: "",
    fileName: "",
    imageName: "",
  })

  if (!leads || leads.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-slate-800">Loading Lead...</h1>
      </div>
    )
  }

  const lead = leads.find((lead) => String(lead.id) === String(leadId))

  if (!lead) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-slate-800">Lead Not Found</h1>
      </div>
    )
  }

  const milestones = lead.milestones || {
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
  }

  const notes = lead.notes || []
  const documents = lead.documents || []

  const completedMilestones = Object.values(milestones).filter(Boolean).length
  const totalMilestones = Object.values(milestones).length
  const progressPercent =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  const handleStageChange = async (event) => {
    setIsSavingStage(true)
    await onUpdateLeadStage(lead.id, event.target.value)
    setIsSavingStage(false)
  }

  const handleMilestoneChange = async (key, checked) => {
    const updatedMilestones = {
      ...milestones,
      [key]: checked,
    }

    setIsSavingMilestones(true)
    await onUpdateLeadMilestones(lead.id, updatedMilestones)
    setIsSavingMilestones(false)
  }

  const handleSaveNote = async () => {
    if (!noteText.trim()) return

    const newNote = {
      id: crypto.randomUUID(),
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
    }

    const updatedNotes = [newNote, ...notes]

    setIsSavingNote(true)
    await onUpdateLeadNotes(lead.id, updatedNotes)
    setNoteText("")
    setIsSavingNote(false)
  }

  const handleStartEditDetails = () => {
    setEditFormData({
      fullName: lead.fullName || "",
      address: lead.address || "",
      phone: lead.phone || "",
      email: lead.email || "",
      insuranceCompany: lead.insuranceCompany || "",
      stormDate: lead.stormDate || "",
      assignedRep: lead.assignedRep || "",
    })

    setIsEditingDetails(true)
  }

  const handleEditDetailsChange = (event) => {
    const { name, value } = event.target

    setEditFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSaveDetails = async () => {
    setIsSavingDetails(true)
    await onUpdateLeadDetails(lead.id, editFormData)
    setIsSavingDetails(false)
    setIsEditingDetails(false)
  }

  const handleCancelEditDetails = () => {
    setIsEditingDetails(false)
  }

  const handleDocumentFormChange = (event) => {
    const { name, value } = event.target

    setDocumentForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleDocumentFileChange = (event) => {
    const file = event.target.files?.[0]

    setDocumentForm((currentForm) => ({
      ...currentForm,
      fileName: file ? file.name : "",
    }))
  }

  const handleDocumentImageChange = (event) => {
    const file = event.target.files?.[0]

    setDocumentForm((currentForm) => ({
      ...currentForm,
      imageName: file ? file.name : "",
    }))
  }

  const handleSaveDocument = async () => {
    if (!documentForm.title.trim()) return

    const newDocument = {
      id: crypto.randomUUID(),
      title: documentForm.title.trim(),
      type: documentForm.type,
      status: documentForm.status,
      note: documentForm.note.trim(),
      fileName: documentForm.fileName,
      imageName: documentForm.imageName,
      uploadedAt: new Date().toISOString(),
    }

    const updatedDocuments = [newDocument, ...documents]

    setIsSavingDocuments(true)
    await onUpdateLeadDocuments(lead.id, updatedDocuments)
    setDocumentForm({
      title: "",
      type: "Contract",
      status: "Received",
      note: "",
      fileName: "",
      imageName: "",
    })
    setIsSavingDocuments(false)
  }

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl border border-slate-200 bg-white p-6 shadow ${getStageBorderClass(
          lead.stage
        )}`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold text-slate-800">
                {lead.fullName}
              </h1>

              <span
                className={`self-start rounded-full px-3 py-1 text-sm font-medium ${getStageBadgeClass(
                  lead.stage
                )}`}
              >
                {lead.stage}
              </span>
            </div>

            <p className="mt-2 text-slate-600">
              Customer record and claim progress
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartEditDetails}
            className="self-start rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Edit Lead
          </button>
        </div>
      </div>

      {isEditingDetails && (
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Edit Lead Details
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                value={editFormData.fullName}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
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
                type="text"
                value={editFormData.phone}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>

            <div className="md:col-span-2">
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
                value={editFormData.address}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
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
                value={editFormData.email}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
              />
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
                value={editFormData.insuranceCompany}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>

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
                value={editFormData.stormDate}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
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
                value={editFormData.assignedRep}
                onChange={handleEditDetailsChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelEditDetails}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveDetails}
              disabled={isSavingDetails}
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSavingDetails ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Contact Info
          </h2>
          <div className="mt-4 space-y-2 text-slate-700">
            <p>
              <span className="font-semibold">Address:</span> {lead.address}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {lead.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {lead.email}
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Claim Info</h2>
          <div className="mt-4 space-y-4 text-slate-700">
            <div>
              <label
                htmlFor="stage"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Stage
              </label>
              <select
                id="stage"
                value={lead.stage}
                onChange={handleStageChange}
                disabled={isSavingStage}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
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

            <p>
              <span className="font-semibold">Insurance:</span>{" "}
              {lead.insuranceCompany}
            </p>
            <p>
              <span className="font-semibold">Storm Date:</span> {lead.stormDate}
            </p>
            <p>
              <span className="font-semibold">Assigned Rep:</span>{" "}
              {lead.assignedRep}
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">Notes</h2>

          <div className="mt-4 space-y-3">
            {notes.length === 0 ? (
              <p className="text-sm text-slate-500">No notes saved yet.</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-700">{note.text}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <textarea
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Add a note about door knock, follow-up, adjuster meeting, or customer communication..."
              className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
            />

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={isSavingNote || !noteText.trim()}
                className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSavingNote ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Documents & Uploads
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track checks, contracts, and uploaded paperwork
          </p>

          <div className="mt-4 space-y-3">
            {documents.length === 0 ? (
              <p className="text-sm text-slate-500">No documents saved yet.</p>
            ) : (
              documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-800">
                        {document.title}
                      </p>
                      <p className="text-sm text-slate-600">{document.type}</p>
                    </div>

                    <span className="self-start rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                      {document.status}
                    </span>
                  </div>

                  {document.note && (
                    <p className="mt-3 text-sm text-slate-700">{document.note}</p>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    {document.fileName && <p>File: {document.fileName}</p>}
                    {document.imageName && <p>Photo: {document.imageName}</p>}
                    <p>{new Date(document.uploadedAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="document-title"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Document Title
                </label>
                <input
                  id="document-title"
                  name="title"
                  type="text"
                  value={documentForm.title}
                  onChange={handleDocumentFormChange}
                  placeholder="Insurance Check 1"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label
                  htmlFor="document-type"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Type
                </label>
                <select
                  id="document-type"
                  name="type"
                  value={documentForm.type}
                  onChange={handleDocumentFormChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="document-status"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>
                <select
                  id="document-status"
                  name="status"
                  value={documentForm.status}
                  onChange={handleDocumentFormChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                >
                  {documentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="document-file"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Upload File
                </label>
                <input
                  id="document-file"
                  type="file"
                  onChange={handleDocumentFileChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="document-image"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Upload Photo of Document
                </label>
                <input
                  id="document-image"
                  type="file"
                  accept="image/*"
                  onChange={handleDocumentImageChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="document-note"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Note
                </label>
                <textarea
                  id="document-note"
                  name="note"
                  value={documentForm.note}
                  onChange={handleDocumentFormChange}
                  placeholder="Add context about this document..."
                  className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveDocument}
                disabled={isSavingDocuments || !documentForm.title.trim()}
                className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSavingDocuments ? "Saving..." : "Save Document"}
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Claim Milestones
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track progress through the roofing and insurance process
            </p>
          </div>

          <div className="text-sm font-medium text-slate-700">
            {completedMilestones} / {totalMilestones} Completed
          </div>
        </div>

        <div className="mt-4 h-3 rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-slate-800"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isSavingMilestones && (
          <p className="mt-3 text-sm text-slate-500">Saving milestones...</p>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.entries(milestones).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={(event) =>
                  handleMilestoneChange(key, event.target.checked)
                }
                disabled={isSavingMilestones}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm font-medium text-slate-700">
                {milestoneLabels[key]}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LeadDetails