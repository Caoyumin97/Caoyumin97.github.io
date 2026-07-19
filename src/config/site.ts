/**
 * Site-wide visual configuration.
 * Edit values here to tweak the look without touching component code.
 */

export const background = {
  /** Path to background image (relative to /public). Set to '' to disable. */
  image: '',

  /** How the image fills the viewport: 'cover' (crop to fill) or 'contain' (fit inside). */
  size: 'cover' as 'cover' | 'contain',

  /** Anchor point when cropping. e.g. 'center', 'top', 'bottom left'. */
  position: 'center',

  /** Theme overlay opacity (0 = fully visible image, 1 = image hidden). */
  overlay: {
    dark: 0.85,
    light: 0.8,
  },
};
