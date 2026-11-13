"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, Clock, LoaderCircle } from "lucide-react";

// Only these Supabase projects may ever be called from this page.
const ALLOWED_REFS = new Set([
  "rmtejutpgyrpronihhmv", // production
  "glefnadlbpmksxnkkvnu", // development
]);
const DEFAULT_REF = "rmtejutpgyrpronihhmv";

// base64url, optionally padded. Length is bounded loosely; the server is the
// authority on whether a token is real.
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{1,200}={0,2}$/;

type ResultStatus =
  | "verified"
  | "already_verified"
  | "expired"
  | "invalid"
  | "error";
type Status = "loading" | ResultStatus;

const COLORS = {
  card: "#0A3440",
  border: "#1B4D5B",
  gold: "#F0C46A",
  text: "#F2FDFF",
  muted: "#8FC3D4",
};

const COPY: Record<
  Status,
  { title: string; text: string; icon: "spinner" | "check" | "clock" | "alert" }
> = {
  loading: {
    title: "Confirming…",
    text: "This takes a second.",
    icon: "spinner",
  },
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

const APP_URL = "houseelf://profile/child-consent";

// Which result states link back to the app, and how prominently.
const APP_LINK: Partial<Record<Status, "primary" | "secondary">> = {
  verified: "primary",
  already_verified: "primary",
  expired: "secondary",
  invalid: "secondary",
};

function isMobileDevice() {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS Safari reports a Mac user agent; touch support gives it away.
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
}

const noopSubscribe = () => () => {};

function resolveLink(params: URLSearchParams | null) {
  const token = params?.get("token") ?? "";
  const rawRef = params?.get("ref");
  const ref = rawRef == null || rawRef === "" ? DEFAULT_REF : rawRef;
  if (!ALLOWED_REFS.has(ref) || !TOKEN_PATTERN.test(token)) return null;
  return { token, ref };
}

function statusFromResponse(httpStatus: number, body: unknown): ResultStatus {
  if (httpStatus >= 500) return "error";
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
  const token = params?.get("token") ?? null;
  const ref = params?.get("ref") ?? null;
  const link = resolveLink(params);

  const [status, setStatus] = useState<Status>(link ? "loading" : "invalid");
  const inFlight = useRef(false);
  // Key of the link already auto-submitted; survives StrictMode's double effect.
  const autoSubmitted = useRef<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useSyncExternalStore(
    noopSubscribe,
    isMobileDevice,
    () => false,
  );

  const submit = useCallback(async (l: { token: string; ref: string }) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://${l.ref}.supabase.co/functions/v1/parental-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "verify", token: l.token }),
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
      setStatus(statusFromResponse(res.status, body));
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }, []);

  // Verify once on load.
  useEffect(() => {
    const l = resolveLink(new URLSearchParams({ token: token ?? "", ref: ref ?? "" }));
    if (!l) return;
    const key = `${l.ref}:${l.token}`;
    if (autoSubmitted.current === key) return;
    autoSubmitted.current = key;
    void submit(l);
  }, [token, ref, submit]);

  // Move focus to the result title so keyboard / screen reader users land on it.
  useEffect(() => {
    if (status !== "loading") titleRef.current?.focus();
  }, [status]);

  const copy = COPY[status];
  const Icon =
    copy.icon === "spinner"
      ? LoaderCircle
      : copy.icon === "check"
        ? CircleCheck
        : copy.icon === "clock"
          ? Clock
          : CircleAlert;

  return (
    <section
      className="rounded-3xl border px-5 py-7 sm:px-7"
      style={{ background: COLORS.card, borderColor: COLORS.border }}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        aria-busy={status === "loading"}
        className="flex flex-col items-center py-4 text-center"
      >
        <Icon
          aria-hidden
          size={56}
          strokeWidth={2}
          color={COLORS.gold}
          className={
            copy.icon === "spinner"
              ? "mb-5 animate-spin motion-reduce:animate-none"
              : "mb-5"
          }
        />
        <h1
          ref={titleRef}
          tabIndex={-1}
          className="text-[1.75rem] leading-tight font-extrabold"
          style={{ color: COLORS.text }}
        >
          {copy.title}
        </h1>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ color: COLORS.muted }}
        >
          {copy.text}
        </p>
      </div>

      {APP_LINK[status] && !isMobile ? (
        <p
          className="mt-4 text-center text-base leading-relaxed"
          style={{ color: COLORS.text }}
        >
          Open House Elf on your phone to continue.
        </p>
      ) : null}

      {APP_LINK[status] === "primary" && isMobile ? (
        <a href={APP_URL} className="he-btn mt-6 no-underline">
          Back to House Elf
        </a>
      ) : null}

      {APP_LINK[status] === "secondary" && isMobile ? (
        <a href={APP_URL} className="he-link mt-4">
          Open House Elf
        </a>
      ) : null}

      {status === "error" && link ? (
        <button
          type="button"
          className="he-btn mt-8"
          onClick={() => void submit(link)}
        >
          Try again
        </button>
      ) : null}
    </section>
  );
}
