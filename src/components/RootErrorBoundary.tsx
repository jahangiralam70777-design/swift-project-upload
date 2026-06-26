import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "@/lib/error-reporter";

interface State {
  error: Error | null;
}

function isChunkLoadError(error: Error) {
  return /ChunkLoadError|Loading chunk|dynamically imported module|Failed to fetch|CSS_CHUNK_LOAD_FAILED/i.test(
    `${error.message}\n${error.stack ?? ""}`,
  );
}

function recoverStaleChunkOnce(error: Error) {
  if (!isChunkLoadError(error) || typeof window === "undefined") return false;
  try {
    const key = "caaspire.chunk_recovery_v1";
    const prior = JSON.parse(window.sessionStorage.getItem(key) || "null") as
      | { href?: string; ts?: number }
      | null;
    const now = Date.now();
    if (prior?.href === window.location.href && now - (prior.ts ?? 0) < 600_000) return false;
    window.sessionStorage.setItem(key, JSON.stringify({ href: window.location.href, ts: now }));
    window.location.reload();
    return true;
  } catch {
    window.location.reload();
    return true;
  }
}

/**
 * Top-level React error boundary. Catches crashes that escape route-level
 * errorComponents (e.g. inside providers, layout shells, modals rendered
 * outside the route tree) and reports them to system_error_logs.
 */
export class RootErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (recoverStaleChunkOnce(error)) return;
    reportError({
      source: "frontend",
      severity: "critical",
      message: error.message || "React render crash",
      stack: error.stack,
      payload: { componentStack: info.componentStack?.slice(0, 4000) ?? null },
    });
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page hit an unexpected error. We've logged it for the team.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={this.reset}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
