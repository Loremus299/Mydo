"use client";
import { useQuery } from "@tanstack/react-query";
import { getTheme } from "@/db/db";

async function getSetTheme() {
  const theme = await getTheme();
  if (theme) {
    document.body.style.setProperty(
      "--main",
      theme.color ?? "oklch(76.89% 0.139164 219.13);",
    );
    document.body.style.setProperty(
      "--shadow",
      `${theme.hs ?? 0}px ${theme.vs ?? 4}px 0px 0px var(--border)`,
    );
  }
  return theme;
}

export default function Theme(props: { children: React.ReactNode }) {
  const { status } = useQuery({
    queryKey: ["theme"],
    queryFn: getSetTheme,
    staleTime: Infinity,
  });

  if (status == "pending") {
    return <div className="min-h-screen w-full bg-white" />;
  }

  return <div>{props.children}</div>;
}
