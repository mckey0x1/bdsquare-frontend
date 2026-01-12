import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about bdsquare. Learn about orders, shipping, returns, payments, and more.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "help",
    "questions",
    "support",
    "answers"
  ],
  openGraph: {
    title: "FAQ | bdsquare",
    description:
      "Find answers to common questions about bdsquare.",
    type: "website"
  }
};

export default function FAQLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

