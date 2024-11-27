// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getQuery(obj: Record<string, any>): string {
  const queryParams = Object.entries(obj)
    .flatMap(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      if (Array.isArray(value)) {
        return value.map((item) => `${encodedKey}=${encodeURIComponent(item)}`);
      } else {
        return `${encodedKey}=${encodeURIComponent(value)}`;
      }
    })
    .join("&");

  return queryParams;
}
