import { HttpError } from "@/shared/api/http-error"

export async function parseApiJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // ignora parse errors
    }
    throw new HttpError(res.status, message)
  }
  return res.json() as Promise<T>
}
