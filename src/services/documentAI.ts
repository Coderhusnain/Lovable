import { supabase } from "@/integrations/supabase/client";

export interface GenerateDocumentInput {
  /** e.g. "Partnership Agreement" */
  documentType: string;
  /** Key/value details collected from the user. */
  details?: Record<string, string>;
  /** Optional freeform description. */
  freeform?: string;
}

export interface GenerateDocumentResult {
  document: string | null;
  error: string | null;
}

/**
 * Calls the `generate-document` Supabase Edge Function, which drafts a full
 * legal document with Claude (server-side — the API key never reaches the
 * browser). Works for any document type: the 240+ templates *or* a brand-new
 * custom one the user describes.
 */
export async function generateDocumentWithAI(
  input: GenerateDocumentInput,
): Promise<GenerateDocumentResult> {
  try {
    const { data, error } = await supabase.functions.invoke("generate-document", {
      body: input,
    });

    if (error) {
      console.error("[documentAI] invoke error:", error);
      // supabase.functions.invoke wraps non-2xx responses in FunctionsHttpError;
      // the function's own error message is in error.context (a Response).
      let detail = "";
      try {
        const ctx = (error as { context?: Response }).context;
        if (ctx && typeof ctx.json === "function") {
          const body = await ctx.json();
          if (body?.error) detail = String(body.error);
        }
      } catch {
        // body was not JSON or already consumed - keep the generic message
      }
      return {
        document: null,
        error:
          detail ||
          "Couldn't reach the document generator right now. Please try again in a moment.",
      };
    }

    if (data?.error) {
      return { document: null, error: data.error as string };
    }

    if (!data?.document) {
      return { document: null, error: "The generator returned no document. Please retry." };
    }

    return { document: data.document as string, error: null };
  } catch (err) {
    console.error("[documentAI] unexpected error:", err);
    return {
      document: null,
      error: "Something went wrong while generating the document. Please try again.",
    };
  }
}
