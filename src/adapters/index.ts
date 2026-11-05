import type { Adapter } from '../core/types';
import { youtubeAdapter } from './youtube';
import { spotifyAdapter } from './spotify';
import { genericAdapter } from './generic';

/** Trusted site adapters first, heuristic generic last. */
export const allAdapters: Adapter[] = [youtubeAdapter, spotifyAdapter, genericAdapter];
export { youtubeAdapter, spotifyAdapter, genericAdapter };
