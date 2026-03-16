"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        Sentry.replayIntegration(),
        Sentry.browserTracingIntegration(),
      ],
    });
    console.log("Sentry initialized");

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always",
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (ph) => {
        console.log("PostHog loaded successfully", ph);
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
