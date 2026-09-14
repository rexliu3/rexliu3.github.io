import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sanityConfig = require("../src/sanity/config.json");

const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const sanityToken = process.env.SANITY_API_TOKEN;
const projectId = process.env.SANITY_PROJECT_ID || sanityConfig.projectId;
const dataset = process.env.SANITY_DATASET || sanityConfig.dataset;
const instagramApiVersion = process.env.INSTAGRAM_API_VERSION || "v24.0";
const requestedLimit = Number.parseInt(process.env.INSTAGRAM_MEDIA_LIMIT || "12", 10);
const mediaLimit = Number.isFinite(requestedLimit) ? Math.min(50, Math.max(1, requestedLimit)) : 12;

if (!instagramToken) throw new Error("INSTAGRAM_ACCESS_TOKEN is required");
if (!sanityToken) throw new Error("SANITY_API_TOKEN is required");

const fields = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
  "username",
].join(",");
const instagramUrl = new URL(`https://graph.instagram.com/${instagramApiVersion}/me/media`);
instagramUrl.searchParams.set("fields", fields);
instagramUrl.searchParams.set("limit", String(mediaLimit));

const instagramResponse = await fetch(instagramUrl, {
  headers: { Authorization: `Bearer ${instagramToken}` },
});
if (!instagramResponse.ok) {
  throw new Error(`Instagram media request failed with status ${instagramResponse.status}`);
}

const instagramPayload = await instagramResponse.json();
const posts = (Array.isArray(instagramPayload.data) ? instagramPayload.data : [])
  .filter((post) => post.id && post.permalink && (post.thumbnail_url || post.media_url))
  .map((post) => ({
    _id: `instagram-${post.id}`,
    _type: "instagramPost",
    instagramId: post.id,
    mediaType: post.media_type || "",
    mediaUrl: post.media_url || "",
    thumbnailUrl: post.thumbnail_url || "",
    permalink: post.permalink,
    caption: post.caption || "",
    timestamp: post.timestamp || "",
    username: post.username || "",
  }));

const sanityResponse = await fetch(
  `https://${projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/mutate/${dataset}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sanityToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mutations: [
        { delete: { query: '*[_type == "instagramPost"]' } },
        ...posts.map((post) => ({ createOrReplace: post })),
      ],
    }),
  }
);
if (!sanityResponse.ok) {
  throw new Error(`Sanity sync failed with status ${sanityResponse.status}`);
}

console.log(`Synced ${posts.length} Instagram posts into ${projectId}/${dataset}.`);
