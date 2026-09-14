import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Envelope, InstagramLogo, CircleNotch, CaretDown, WarningCircle, UserCheck, Briefcase } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { config } from '../config'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'
import { submitCreatorInterest } from '../services/formService'
import { useToast } from '../lib/Toast'
import { haptic } from '../lib/haptics'

type UserType = 'creator' | 'brand'

interface Fields {
  type: UserType
  name: string
  email: string
  handleOrCompany: string
  nicheOrIndustry: string
  followerRangeOrBudget: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const empty: Fields = {
  type: 'creator',
  name: '',
  email: '',
  handleOrCompany: '',
  nicheOrIndustry: '',
  followerRangeOrBudget: '',
  message: '',
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return <p id={id} className="field-error min-h-[1.4em] opacity-0" aria-hidden="true">.</p>
  return (
    <p id={id} className="field-error" role="alert">
      {msg}
    </p>
  )
}

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!f.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address.'

  if (f.type === 'creator') {
    if (!f.handleOrCompany.trim()) e.handleOrCompany = 'Please enter your Instagram handle.'
    if (!f.nicheOrIndustry.trim()) e.nicheOrIndustry = 'Please enter your creator niche.'
  } else {
    if (!f.handleOrCompany.trim()) e.handleOrCompany = 'Please enter your brand/company name.'
    if (!f.nicheOrIndustry.trim()) e.nicheOrIndustry = 'Please enter your industry.'
  }
  return e
}

export default function ContactSection() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const { addToast } = useToast()
  const reduce = useReducedMotion()
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.25 }

  const setField = (key: keyof Fields, value: string) => {
    setFields((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleTypeChange = (type: UserType) => {
    setFields((p) => ({ ...p, type }))
    setErrors({})
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate(fields)
    setErrors(e)
    if (Object.keys(e).some((k) => e[k as keyof Errors])) return

    setStatus('submitting')

    // Generate mailto backup link if no server
    const subject = encodeURIComponent(`BrandBridge Enquiry from ${fields.name} (${fields.type.toUpperCase()})`)
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\nType: ${fields.type}\nHandle/Company: ${fields.handleOrCompany}\nNiche/Industry: ${fields.nicheOrIndustry}\nParam: ${fields.followerRangeOrBudget}\n\nMessage:\n${fields.message}`
    )
    const mailtoUrl = `mailto:${config.email}?subject=${subject}&body=${body}`

    const result = await submitCreatorInterest({
      name: fields.name.trim(),
      email: fields.email.trim(),
      handle: fields.handleOrCompany.trim(),
      niche: fields.nicheOrIndustry.trim(),
      followerRange: fields.followerRangeOrBudget,
      note: fields.message.trim(),
    })

    if (result.ok) {
      setStatus('success')
      addToast('success', 'Thank you! Your enquiry has been recorded.')
      setFields(empty)
      haptic('success')

      // Also trigger mailto client if configured
      if (!config.formEndpoint && typeof window !== 'undefined') {
        window.location.href = mailtoUrl
      }
    } else {
      setStatus('error')
      addToast('error', result.error || 'An error occurred. Please try again.')
      setSubmitError(result.error)
      haptic('error')
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden py-24 md:py-32">
      {/* A soft centered focus light behind the form — otherwise the atmosphere
          comes from the persistent FilmLayer so the section stays continuous. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-primary-glow] opacity-30 blur-3xl"
      />

      <Container className="relative max-w-4xl">
        <Reveal>
          <div className="text-center">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[--color-primary]">
              Start a Conversation
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.02em] text-[--color-ink]">
              Let’s build the right collaboration.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[--color-body]">
              Both creators and brands can get started with BrandBridge. Tell us a bit about what you are looking for.
            </p>
          </div>
        </Reveal>

        {/* Messaging Cards for Creator vs Brand */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div
              onClick={() => handleTypeChange('creator')}
              className={`p-6 rounded-[16px] cursor-pointer transition-all duration-300 border ${
                fields.type === 'creator'
                  ? 'border-[--color-primary] bg-[--color-surface-soft] shadow-md'
                  : 'border-[--color-hairline] bg-[--color-surface-dark]/50 hover:border-[--color-hairline-strong]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-primary]">
                  FOR CREATORS
                </span>
                <UserCheck size={20} className={fields.type === 'creator' ? 'text-[--color-primary]' : 'text-[--color-muted]'} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[--color-ink] font-medium">
                Looking for relevant brand partnerships without cold outreach?
              </p>
            </div>

            <div
              onClick={() => handleTypeChange('brand')}
              className={`p-6 rounded-[16px] cursor-pointer transition-all duration-300 border ${
                fields.type === 'brand'
                  ? 'border-[--color-accent-blue] bg-[--color-surface-soft] shadow-md'
                  : 'border-[--color-hairline] bg-[--color-surface-dark]/50 hover:border-[--color-hairline-strong]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-accent-blue]">
                  FOR BRANDS
                </span>
                <Briefcase size={20} className={fields.type === 'brand' ? 'text-[--color-accent-blue]' : 'text-[--color-muted]'} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[--color-ink] font-medium">
                Looking for creators whose audience actually fits your campaign?
              </p>
            </div>
          </div>
        </Reveal>

        {/* Contact Form */}
        <Reveal delay={0.12}>
          <div className="mt-8 glass-panel rounded-[20px] p-5 sm:p-8">
            {status === 'success' ? (
              <div className="py-10 text-center">
                <p className="mx-auto max-w-xl font-display text-3xl leading-tight text-[--color-ink]">
                  Enquiry received.
                </p>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[--color-body]">
                  Thank you for reaching out. We will review your details and connect with you at{' '}
                  <span className="text-[--color-ink] font-medium">{fields.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-[8px] border border-[--color-hairline-strong] bg-[--color-canvas] px-7 text-[15px] font-medium text-[--color-ink] transition-colors hover:border-[--color-muted] hover:bg-[--color-surface-soft]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="field-label">
                      Your Name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      className="field"
                      placeholder="Name"
                      value={fields.name}
                      onChange={(e) => setField('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby="cf-name-err"
                    />
                    <FieldError id="cf-name-err" msg={errors.name} />
                  </div>

                  <div>
                    <label htmlFor="cf-email" className="field-label">
                      Email Address
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      className="field"
                      placeholder="you@example.com"
                      value={fields.email}
                      onChange={(e) => setField('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby="cf-email-err"
                    />
                    <FieldError id="cf-email-err" msg={errors.email} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-handleOrCompany" className="field-label">
                      {fields.type === 'creator' ? 'Instagram Handle' : 'Brand / Company Name'}
                    </label>
                    <input
                      id="cf-handleOrCompany"
                      type="text"
                      className="field"
                      placeholder={fields.type === 'creator' ? '@yourhandle' : 'Company Name'}
                      value={fields.handleOrCompany}
                      onChange={(e) => setField('handleOrCompany', e.target.value)}
                      aria-invalid={!!errors.handleOrCompany}
                      aria-describedby="cf-handleOrCompany-err"
                    />
                    <FieldError id="cf-handleOrCompany-err" msg={errors.handleOrCompany} />
                  </div>

                  <div>
                    <label htmlFor="cf-nicheOrIndustry" className="field-label">
                      {fields.type === 'creator' ? 'Niche / Content Style' : 'Industry'}
                    </label>
                    <input
                      id="cf-nicheOrIndustry"
                      type="text"
                      className="field"
                      placeholder={fields.type === 'creator' ? 'e.g. Fitness, Fashion, Tech' : 'e.g. Apparel, SaaS, Beverage'}
                      value={fields.nicheOrIndustry}
                      onChange={(e) => setField('nicheOrIndustry', e.target.value)}
                      aria-invalid={!!errors.nicheOrIndustry}
                      aria-describedby="cf-nicheOrIndustry-err"
                    />
                    <FieldError id="cf-nicheOrIndustry-err" msg={errors.nicheOrIndustry} />
                  </div>
                </div>

                {fields.type === 'creator' && (
                  <div>
                    <label htmlFor="cf-range" className="field-label">
                      Instagram Followers
                    </label>
                    <div className="relative">
                      <select
                        id="cf-range"
                        className="field"
                        value={fields.followerRangeOrBudget}
                        onChange={(e) => setField('followerRangeOrBudget', e.target.value)}
                      >
                        <option value="">Select range (optional)</option>
                        {config.followerRanges.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <CaretDown
                        size={16}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[--color-muted]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="cf-message" className="field-label">
                    Message <span className="font-normal normal-case text-[--color-muted-soft]">(optional)</span>
                  </label>
                  <textarea
                    id="cf-message"
                    rows={3}
                    className="field resize-y"
                    placeholder={
                      fields.type === 'creator'
                        ? 'Tell us a bit about your audience and content goals...'
                        : 'Tell us about your upcoming campaign or target creator criteria...'
                    }
                    value={fields.message}
                    onChange={(e) => setField('message', e.target.value)}
                    style={{ minHeight: '72px' }}
                  />
                </div>

                {status === 'error' && (
                  <p role="alert" className="flex items-center gap-2 text-[14px] text-[--color-error]">
                    <WarningCircle size={18} /> {submitError}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileTap={reduce || status === 'submitting' ? undefined : { scale: 0.98, transition: spring }}
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[--color-cta-bg] px-6 text-[15px] font-medium text-[--color-cta-text] shadow-md hover:bg-[--color-cta-bg-hover] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <CircleNotch size={18} className="animate-spin" /> Sending enquiry...
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight size={16} weight="bold" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-[14px] text-[--color-muted] border-t border-[--color-hairline] pt-5">
              <a href={`mailto:${config.email}`} className="flex items-center gap-1.5 hover:text-[--color-primary] transition-colors">
                <Envelope size={16} /> {config.email}
              </a>
              <span className="text-[--color-hairline-strong]" aria-hidden="true">·</span>
              {config.instagram && (
                <a href={config.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[--color-primary] transition-colors">
                  <InstagramLogo size={16} /> {config.instagramHandle}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
