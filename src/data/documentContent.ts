// Re-export from the local implementation so Vercel does not depend on the nested mirror.
import * as docModule from "./documentContent.impl";

export type DocumentFAQ = docModule.DocumentFAQ;
export type DocumentContent = docModule.DocumentContent;
export const documentContent = docModule.documentContent;
export const getDocumentContent = docModule.getDocumentContent;
