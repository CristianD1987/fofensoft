"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";

// Only these Supabase projects may ever be called from this page.
const ALLOWED_REFS = new Set([
  "rmtejutpgyrpronihhmv", // production
  "glefnadlbpmksxnkkvnu", // development
]);
const DEFAULT_REF = "rmtejutpgyrpronihhmv";

// base64url, optionally padded. Length is bounded loosely; the server is the
// authority on whether a token is real.
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{1,200}={0,2}$/;

type Status =
  | "idle"
  | "loading"
  | "verified"
  | "already_verified"
  | "expired"
  | "invalid"
  | "error";

const COLORS = {
  card: "#0A3440",
  border: "#1B4D5B",
  gold: "#F0C46A",
  text: "#F2FDFF",
  muted: "#8FC3D4",
};

const INFO_ROWS: { label: string; text: string }[] = [
  {
    label: "What we collect",
    text: "The nickname your child picks in the House (not their real name), their age range and figure for their avatar, and their quests, rewards and activity.",
  },
  {
    label: "Photo",
    text: "Optional. If you approve one on your own phone, it's used once to create their avatar and is never saved. Without a photo, they get a general avatar.",
  },
  {
    label: "Your child's account",
    text: "Your child doesn't create an account. Their app connects to your House.",
  },
  {
    label: "How we use it",
    text: "Only to run House Elf for your family. No ads, no tracking, never sold.",
  },
];

const RESULT_COPY: Record<
  "verified" | "already_verified" | "expired" | "invalid" | "error",
  { title: string; text: string; icon: "check" | "clock" | "alert" }
> = {
  verified: {
    title: "You're verified",
    text: "Return to House Elf to invite your child. You'll also get a confirmation email.",
    icon: "check",
  },
  already_verified: {
    title: "You're all set",
    text: "This link was already used. Return to House Elf to continue.",
    icon: "check",
  },
  expired: {
    title: "This link has expired",
    text: "Open House Elf and send a new email from the invite screen.",
    icon: "clock",
  },
  invalid: {
    title: "This link isn't valid",
    text: "Open House Elf and send a new email from the invite screen.",
    icon: "alert",
  },
  error: {
    title: "Something went wrong",
    text: "Please try again in a moment.",
    icon: "alert",
  },
};

function resolveLink(params: URLSearchParams | null) {
  const token = params?.get("token") ?? "";
  const rawRef = params?.get("ref");
  const ref = rawRef == null || rawRef === "" ? DEFAULT_REF : rawRef;
  if (!ALLOWED_REFS.has(ref) || !TOKEN_PATTERN.test(token)) return null;
  return { token, ref };
}

function statusFromResponse(httpStatus: number, body: unknown): Status {
  const s =
    body && typeof body === "object" && "status" in body
      ? (body as { status: unknown }).status
      : undefined;
  if (
    s === "verified" ||
    s === "already_verified" ||
    s === "expired" ||
    s === "invalid"
  ) {
    return s;
  }
  if (httpStatus === 410) return "expired";
  if (httpStatus === 400) return "invalid";
  return "error";
}

export default function VerifyCard() {
  const params = useSearchParams();
  const link = resolveLink(params);

  const [status, setStatus] = useState<Status>(link ? "idle" : "invalid");
  const inFlight = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the result title so keyboard / screen reader users land on it.
  useEffect(() => {
    if (status !== "idle" && status !== "loading" && link) {
      titleRef.current?.focus();
    }
  }, [status, link]);

  async function confirm() {
    if (!link || inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://${link.ref}.supabase.co/functions/v1/parental-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "verify", token: link.token }),
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer",
        },
      );
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      setStatus(res.status >= 500 ? "error" : statusFromResponse(res.status, body));
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  const isResult = status !== "idle" && status !== "loading";

  return (
    <section
      className="rounded-3xl border px-5 py-7 sm:px-7"
      style={{ background: COLORS.card, borderColor: COLORS.border }}
    >
      <div aria-live="polite" aria-atomic="true">
        {isResult ? <ResultView status={status} titleRef={titleRef} /> : null}
      </div>

      {isResult && status === "error" ? (
        <button type="button" className="he-btn mt-8" onClick={confirm}>
          Try again
        </button>
      ) : null}

      {!isResult ? (
        <DefaultView loading={status === "loading"} onConfirm={confirm} />
      ) : null}
    </section>
  );
}

function ResultView({
  status,
  titleRef,
}: {
  status: keyof typeof RESULT_COPY;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const copy = RESULT_COPY[status];
  const Icon =
    copy.icon === "check" ? CircleCheck : copy.icon === "clock" ? Clock : CircleAlert;
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <Icon
        aria-hidden
        size={56}
        strokeWidth={2}
        color={COLORS.gold}
        className="mb-5"
      />
      <h1
        ref={titleRef}
        tabIndex={-1}
        className="text-[1.75rem] leading-tight font-extrabold"
        style={{ color: COLORS.text }}
      >
        {copy.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed" style={{ color: COLORS.muted }}>
        {copy.text}
      </p>
    </div>
  );
}

function DefaultView({
  loading,
  onConfirm,
}: {
  loading: boolean;
  onConfirm: () => void;
}) {
  return (
    <div>
      <p
        className="text-xs font-extrabold tracking-[0.16em]"
        style={{ color: COLORS.gold }}
      >
        PARENT CONFIRMATION
      </p>
      <h1
        className="mt-3 text-[1.75rem] leading-tight font-extrabold"
        style={{ color: COLORS.text }}
      >
        Confirm you&apos;re a parent or guardian
      </h1>
      <p className="mt-4 text-base leading-relaxed" style={{ color: COLORS.text }}>
        Someone is inviting a child to join their House on House Elf. Because
        House Elf is used by children, we ask a parent or legal guardian to
        confirm first.
      </p>

      <dl
        className="mt-6 divide-y rounded-2xl border"
        style={{ borderColor: COLORS.border, background: "#021C24" }}
      >
        {INFO_ROWS.map((row) => (
          <div
            key={row.label}
            className="px-4 py-4"
            style={{ borderColor: COLORS.border }}
          >
            <dt className="text-sm font-extrabold" style={{ color: COLORS.text }}>
              {row.label}
            </dt>
            <dd
              className="mt-1 text-[0.9375rem] leading-relaxed"
              style={{ color: COLORS.muted }}
            >
              {row.text}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 text-[0.9375rem] leading-relaxed" style={{ color: COLORS.text }}>
        By confirming, you agree that you&apos;re 18 or older and a parent or
        legal guardian of the children you invite, and you consent to the
        collection and use described above.
      </p>

      <button
        type="button"
        className="he-btn mt-5"
        onClick={onConfirm}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? "Confirming…" : "Yes, I'm a parent or guardian"}
      </button>

      <p className="mt-4 text-center text-sm leading-relaxed" style={{ color: COLORS.muted }}>
        If this wasn&apos;t you, close this page. No child will be invited.
      </p>
    </div>
  );
}
