import type { Metadata } from "next";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return <TermsContent />;
}
