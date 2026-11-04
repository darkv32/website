import type { ComponentType } from 'react';
import type { Heading } from '@/lib/headings';
import { MEDIA_SERVER_HEADINGS, MediaServerPost } from './media-server/post';

interface InteractiveBody {
  Body: ComponentType;
  /** The contents list, when it should differ from the headings in the post's text. */
  headings: Heading[];
}

/** Posts whose body is built from components, with demos you can click, instead of markdown. The post's `content` in blog-data.json is a plain-text version for the feed and search engines. */
export const INTERACTIVE_BODIES: Record<string, InteractiveBody> = {
  'raspberry-pi-media-server': { Body: MediaServerPost, headings: MEDIA_SERVER_HEADINGS },
};
