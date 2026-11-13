import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // House Elf parental verification: the token lives in the URL, and the
        // page is part of a children's-privacy flow.
        source: "/house-elf/verify",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Dev server needs eval for HMR; production does not.
              process.env.NODE_ENV === "production"
                ? "script-src 'self' 'unsafe-inline'"
                : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data:",
              `connect-src 'self'${process.env.NODE_ENV === "production" ? "" : " ws:"} https://rmtejutpgyrpronihhmv.supabase.co https://glefnadlbpmksxnkkvnu.supabase.co`,
              "frame-ancestors 'none'",
              "base-uri 'none'",
              "form-action 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
