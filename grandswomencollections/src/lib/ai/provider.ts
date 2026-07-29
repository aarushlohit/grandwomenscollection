import { env } from "@/lib/env";
import { products } from "@/lib/data/catalog";
import { searchProducts } from "@/lib/search";

async function queryOpenCode(prompt: string) {
  if (!env.OPENCODE_API_KEY) {
    return null;
  }

  return {
    provider: "opencode",
    answer: `OpenCode would answer: ${prompt}`
  };
}

async function queryNvidia(prompt: string) {
  if (!env.NVIDIA_API_KEY) {
    return null;
  }

  return {
    provider: "nvidia",
    answer: `NVIDIA fallback would answer: ${prompt}`
  };
}

export async function resolveAssistantPrompt(prompt: string) {
  const openCodeResponse = await queryOpenCode(prompt);
  if (openCodeResponse) {
    return openCodeResponse;
  }

  const fallbackResponse = await queryNvidia(prompt);
  if (fallbackResponse) {
    return fallbackResponse;
  }

  const suggested = searchProducts(products, prompt).slice(0, 3).map((product) => product.title);

  return {
    provider: "mock",
    answer: suggested.length
      ? `I found these suggestions: ${suggested.join(", ")}.`
      : "I can help with sizing, shipping, or finding a style if you describe the occasion."
  };
}
