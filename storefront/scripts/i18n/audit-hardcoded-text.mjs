import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const TARGET_DIRS = ["src/app", "src/components"]
const OUTPUT_FILE = path.join(ROOT, "src/messages/_hardcoded-text-audit.json")

const FILE_EXTENSIONS = new Set([".tsx", ".ts"])
const IGNORE_PATTERNS = [
  /^https?:\/\//,
  /^[A-Z0-9_ -]+$/,
  /^#[0-9A-Fa-f]{3,8}$/,
  /^\/[A-Za-z0-9/_-]+$/,
  /^data-testid/,
]

function shouldIgnoreText(text) {
  const trimmed = text.trim()
  if (!trimmed) return true
  if (trimmed.length < 3) return true
  if (/^[0-9.,:%\- ]+$/.test(trimmed)) return true
  if (IGNORE_PATTERNS.some((pattern) => pattern.test(trimmed))) return true
  return false
}

function collectFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      collectFiles(fullPath, files)
      continue
    }
    if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

function extractCandidates(content) {
  const results = []

  const jsxTextRegex = />([^<>{\n][^<>{]{2,})</g
  const attrRegex =
    /\b(heading|label|title|placeholder|aria-label|description)=["']([^"']{3,})["']/g

  let match
  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = match[1].replace(/\s+/g, " ").trim()
    if (!shouldIgnoreText(text)) results.push(text)
  }

  while ((match = attrRegex.exec(content)) !== null) {
    const text = match[2].replace(/\s+/g, " ").trim()
    if (!shouldIgnoreText(text)) results.push(text)
  }

  return Array.from(new Set(results))
}

const files = TARGET_DIRS.flatMap((dir) => collectFiles(path.join(ROOT, dir)))
const audit = {}

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8")
  const candidates = extractCandidates(content)
  if (candidates.length) {
    audit[path.relative(ROOT, file)] = candidates
  }
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(audit, null, 2))

const fileCount = Object.keys(audit).length
console.log(`Wrote ${OUTPUT_FILE} with ${fileCount} files containing UI text.`)
