"use client";
import { useQuery } from "@tanstack/react-query";
import { getTheme } from "@/db/db";

export default function Theme(props: { children: React.ReactNode }) {
  const { data: theme } = useQuery({
    queryKey: ["theme"],
    queryFn: getTheme,
    staleTime: Infinity,
  });

  if (theme) {
    document.body.style.setProperty(
      "--main",
      theme.color ?? "oklch(76.89% 0.139164 219.13);"
    );
    document.body.style.setProperty(
      "--shadow",
      `${theme.hs ?? 0}px ${theme.vs ?? 4}px 0px 0px var(--border)`
    );
  }
  return <div>{props.children}</div>;
}
