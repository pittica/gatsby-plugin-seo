export default function withUrl(path, base) {
  return /^(http:\/\/|ftp:\/\/|https:\/\/|:\/\/)[\w-]?/.test(path)
    ? path
    : new URL(path, base).href
}
