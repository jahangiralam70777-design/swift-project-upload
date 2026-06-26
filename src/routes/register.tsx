import { createFileRoute, redirect } from "@tanstack/react-router";
import { DefaultErrorFallback, DefaultNotFoundFallback } from "@/components/route-fallbacks";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    throw redirect({ to: "/signup" });
  },
  errorComponent: DefaultErrorFallback,
  notFoundComponent: DefaultNotFoundFallback,
});
