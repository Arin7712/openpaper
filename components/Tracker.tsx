"use client";

import { useEffect } from "react";
import { detectSource } from "@/lib/detectSource";

export default function Tracker() {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: detectSource()
      })
    });
  }, []);

  return null;
}