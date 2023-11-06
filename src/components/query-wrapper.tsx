"use client"

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/utils"

export default function QueryWrapper({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}