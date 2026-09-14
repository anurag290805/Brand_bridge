/**
 * BRANDBRIDGE · CENTRAL CONFIGURATION
 * ====================================
 * Every business value that may change lives here, in one place. Update these
 * values before deploy. Do NOT hardcode email/URLs/CTAs anywhere else.
 *
 * TODO before launch:
 *  - Set BRANDBRIDGE_EMAIL to the real contact inbox.
 *  - Set BRANDBRIDGE_SITE_URL to the real production URL.
 *  - Set FORM_ENDPOINT once a real submission target exists (see the form service
 *    layer in src/services/). Until then the form runs in "demo success" mode.
 */

export const config = {
  /** Primary contact inbox. Creators who reply to outreach reach this address. */
  email: 'brandbridge.collaboration@gmail.com',

  /** Full Instagram profile URL. Set to '' to hide the Instagram CTA entirely. */
  instagram: 'https://www.instagram.com/brandbridge.collab/',

  /** Display label for the Instagram profile (shown WITHOUT an "@" prefix). */
  instagramHandle: 'brandbridge.collab',

  /** Production URL, used for canonical + social meta. */
  siteUrl: 'https://brandbridge.example.com',

  /** The single conversion CTA label, used consistently across the whole page. */
  ctaLabel: 'Get started',

  /** Secondary, non-conversion CTA (an in-page anchor, not a second intent). */
  secondaryAnchorLabel: 'How it works',

  /**
   * Form submission endpoint. When set, submissions POST here as JSON.
   * Until provisioned, the form service simulates a successful submit so the
   * site can ship without backend infrastructure. See src/services/formService.ts
   */
  formEndpoint: '',

  /** Instagram follower ranges shown in the creator form. Easy to edit. */
  followerRanges: [
    'Under 5K',
    '5K - 10K',
    '10K - 25K',
    '25K - 50K',
    '50K - 100K',
    '100K - 250K',
    '250K+',
    'Prefer not to say',
  ],

  /** Creator categories shown in the "Who it's for" section. */
  creatorCategories: [
    'Fashion',
    'Beauty',
    'Fitness',
    'Food',
    'Travel',
    'Lifestyle',
    'Entertainment',
    'Gaming',
    'Education',
    'Niche communities',
  ],
} as const

export type Config = typeof config