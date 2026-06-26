import { createFileRoute, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { DashSidebar } from "@/components/dashboard/DashSidebar";
import { DashTopbar } from "@/components/dashboard/DashTopbar";
import { StudyHeartbeat } from "@/components/tracking/StudyHeartbeat";
import { NoticeBanner } from "@/components/site/NoticeBanner";
import { useAppStore, hasLocalAuthSession } from "@/stores/app-store";
import { reportError } from "@/lib/error-reporter";

const STUDENT_GATE_TIMEOUT_MS = 12_000;
const STUDENT_REFRESH_THROTTLE_MS = 5_000;

export const Route = createFileRoute("/_student")({
  // Supabase session lives in localStorage; SSR cannot read it, so render
  // the protected subtree client-only. Auth gating happens inside the
  // component (post-mount) so the first client paint matches SSR (empty)
  // and we don't produce a hydration mismatch when redirecting
  // unauthenticated visitors to /login.
  ssr: false,
  component: StudentLayout,
  errorComponent: StudentErrorComponent,
});

function StudentErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[student] route error", error);
    reportError({
      source: "frontend",
      severity: "high",
      message: error.message || "Student route failure",
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We hit a problem loading this section. You can try again or head back to your dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

function StudentLayout() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const sessionReady = useAppStore((s) => s.sessionReady);
  const authLoading = useAppStore((s) => s.authLoading);
  const refreshAuth = useAppStore((s) => s.refreshAuth);
  const [verified, setVerified] = useState(false);
  const [gateTimedOut, setGateTimedOut] = useState(false);
  const lastRefreshRef = useRef(0);

  useEffect(() => {
    if (verified) return;
    setGateTimedOut(false);
    const id = window.setTimeout(() => {
      setGateTimedOut(true);
      reportError({
        source: "frontend",
        severity: "medium",
        message: "Student gate timed out before auth settled",
        route: window.location.pathname,
        payload: { hasUser: Boolean(user), authLoading, sessionReady, ts: new Date().toISOString() },
      });
    }, STUDENT_GATE_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [verified, user, authLoading, sessionReady]);

  // Route-level gating now trusts the single global auth store instead of
  // running another getUser/profile/ban probe. The duplicated probe treated
  // transient Supabase/network timeouts as invalid sessions and bounced valid
  // users to /login. AccountStatusGuard owns authoritative ban/delete checks.
  useEffect(() => {
    if (!sessionReady || authLoading) return;
    const here = typeof window !== "undefined" ? window.location.href : "/";
    const goLogin = () =>
      navigate({ to: "/login", search: { redirect: here }, replace: true });

    if (user) {
      if (user.role === "student") {
        setVerified(true);
        return;
      }
      const adminLike =
        user.role === "admin" || user.role === "super_admin" || user.role === "moderator";
      setVerified(false);
      navigate({ to: adminLike ? "/admin" : "/login", replace: true });
      return;
    }

    if (hasLocalAuthSession()) {
      const now = Date.now();
      if (now - lastRefreshRef.current > STUDENT_REFRESH_THROTTLE_MS) {
        lastRefreshRef.current = now;
        void refreshAuth();
      }
      return;
    }

    setVerified(false);
    goLogin();
  }, [sessionReady, authLoading, user, navigate, refreshAuth]);

  // Background role check: a logged-in non-student bounces out.
  useEffect(() => {
    if (!sessionReady || authLoading || !user) return;
    if (user.role !== "student") {
      const adminLike =
        user.role === "admin" || user.role === "super_admin" || user.role === "moderator";
      navigate({ to: adminLike ? "/admin" : "/login", replace: true });
    }
  }, [sessionReady, authLoading, user, navigate]);

  if (!verified) {
    if (gateTimedOut) {
      return (
        <div className="flex min-h-dvh items-center justify-center bg-background px-4 text-foreground">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold tracking-tight">Session check is taking longer than expected</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We kept your session intact instead of logging you out during a slow network response.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setGateTimedOut(false);
                  lastRefreshRef.current = 0;
                  void refreshAuth({ force: true });
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/login", replace: true })}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex min-h-dvh items-center justify-center bg-background px-4 text-foreground"
      >
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span
            aria-hidden
            className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)]"
          />
          <p className="text-sm font-medium tracking-wide">Restoring your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-glow opacity-60" />
      <div className="pointer-events-none fixed left-10 top-20 -z-10 h-72 w-72 rounded-full bg-[var(--neon-purple)]/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none fixed right-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-[var(--neon-blue)]/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none fixed left-1/2 top-1/3 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse-glow" />

      <div className="mx-auto flex max-w-[1500px] gap-4 px-4 py-4 sm:px-6">
        <DashSidebar />
        <div className="pointer-events-auto min-w-0 flex-1 space-y-4">
          <DashTopbar />
          <NoticeBanner />
          <StudyHeartbeat />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
