import type { Metadata } from "next"
import GitHubClientPage from "./client-page"

const USERNAME = "Twilight-Techy"
const REVALIDATE_SECONDS = 3600

export const revalidate = 3600

export const metadata: Metadata = {
  title: "GitHub",
  description:
    "Live view of Ibrahim A. Makanjuola's GitHub: AI agents, LLM inference infrastructure, on-device machine learning, and backend systems.",
  alternates: { canonical: "/github" },
}

// Truthful fallback, used only when the GitHub API is unreachable or rate-limited.
// Deliberately conservative, better to under-report than to invent numbers.
const fallbackUser = {
  login: USERNAME,
  name: "Ibrahim A. Makanjuola",
  avatar_url: `https://avatars.githubusercontent.com/${USERNAME}`,
  bio: "Software engineer building AI systems: LLM inference, tool-calling agents, and on-device ML.",
  company: null,
  location: "Lagos, Nigeria",
  blog: "",
  twitter_username: "iMaksxAI",
  public_repos: 0,
  followers: 0,
  following: 0,
  created_at: "2023-09-24T11:58:37Z",
  html_url: `https://github.com/${USERNAME}`,
}

async function getJson(url: string) {
  // Unauthenticated requests are capped at 60/hour per IP, and on a shared
  // serverless host that budget is shared with other tenants. A read-only
  // token lifts it to 5,000/hour; it is optional, not required.
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "twilight-portfolio",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } })
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  return res.json()
}

export default async function Page() {
  let userData: any = fallbackUser
  let repos: any[] = []
  let live = true

  try {
    userData = await getJson(`https://api.github.com/users/${USERNAME}`)
  } catch (e) {
    console.error("GitHub user fetch failed:", e)
    userData = fallbackUser
    live = false
  }

  try {
    const all = await getJson(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
    )
    repos = Array.isArray(all) ? all.filter((r: any) => !r.fork) : []
  } catch (e) {
    console.error("GitHub repos fetch failed:", e)
    repos = []
    live = false
  }

  // Everything below is derived from the real repositories, no invented totals.
  const stats = {
    totalStars: repos.reduce((n, r) => n + (r.stargazers_count || 0), 0),
    totalForks: repos.reduce((n, r) => n + (r.forks_count || 0), 0),
    totalWatchers: repos.reduce((n, r) => n + (r.watchers_count || 0), 0),
    totalRepos: repos.length,
    publicRepos: userData?.public_repos ?? repos.length,
    followers: userData?.followers ?? 0,
  }

  const languageCounts: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
    }
  }
  const totalLanguageRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1
  const languages: Record<string, number> = Object.fromEntries(
    Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => [name, Math.round((count / totalLanguageRepos) * 100)]),
  )

  const displayStats = live
    ? stats
    : Object.fromEntries(Object.keys(stats).map((k) => [k, "n/a"]))

  return (
    <GitHubClientPage
      userData={userData}
      repos={repos}
      stats={displayStats}
      languages={languages}
      live={live}
    />
  )
}
