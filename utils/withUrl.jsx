export default function withUrl(path, base) {
  try {
    return /^(http:\/\/|ftp:\/\/|https:\/\/|:\/\/)[\w-]?/.test(path)
      ? path
      : new URL(path, base).href
  } catch {
    return path
  }
}
