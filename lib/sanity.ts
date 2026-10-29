import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing Sanity Project ID");
}

if (!dataset) {
  throw new Error("Missing Sanity Dataset");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-10-29",
  useCdn: true,
});