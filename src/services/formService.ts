import { config } from '../config'

/**
 * Form submission service layer.
 *
 * ABSTRACTED so the backend can be swapped later without touching UI. Currently:
 *
 *  - If `config.formEndpoint` is set, submissions POST a JSON body and respect
 *    the response (success / error / network error).
 *  - Until a real endpoint exists, the service simulates a successful submit so
 *    the site ships with no backend dependency. This is intentional per the
 *    brief: free / low-cost infra, no forced backend for the marketing site.
 */

export interface CreatorInterest {
  name: string
  email: string
  handle: string
  niche: string
  followerRange: string
  note: string
}

export type SubmitResult = { ok: true } | { ok: false; error: string }

/** Simulate a short network latency so loading states are truthful. */
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export async function submitCreatorInterest(
  data: CreatorInterest,
): Promise<SubmitResult> {
  if (config.formEndpoint) {
    try {
      const res = await fetch(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        return { ok: false, error: 'We could not submit your details just now. Please try again.' }
      }
      return { ok: true }
    } catch {
      return {
        ok: false,
        error: 'Network issue. Your details were not sent. Please try again.',
      }
    }
  }

  // Demo mode: no real endpoint configured yet. Simulate success.
  await wait(900)
  return { ok: true }
}