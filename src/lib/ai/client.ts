import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// No ANTHROPIC_API_KEY has been supplied yet — see .env.local. Every AI
// feature checks this first and degrades to a clear "not configured" state
// instead of throwing at request time, matching the blank-until-supplied
// pattern used for siteConfig.contacts.email / leadCapture.
export function isAiConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!isAiConfigured()) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

// Sonnet 5 balances quality and per-grading cost for a small tutoring
// business grading many submissions; it supports vision (photos of
// handwritten work) and PDF documents.
export const HOMEWORK_MODEL = "claude-sonnet-5";
