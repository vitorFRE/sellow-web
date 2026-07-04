export type FeedbackType = "BUG" | "SUGGESTION" | "OTHER"

export type FeedbackStatus = "OPEN" | "IN_REVIEW" | "RESOLVED" | "CLOSED"

export type FeedbackUser = {
  id: string
  name: string | null
  email: string
}

export type FeedbackWorkspace = {
  id: string
  name: string
}

export type Feedback = {
  id: string
  userId: string
  workspaceId: string | null
  type: FeedbackType
  message: string
  status: FeedbackStatus
  adminNote: string | null
  createdAt: string
  updatedAt: string
  user?: FeedbackUser
  workspace?: FeedbackWorkspace | null
}

export type FeedbackListResponse = {
  data: Feedback[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
