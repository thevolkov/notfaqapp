import { useMemo } from 'react';

export type HighlightedText = { text: string; match: boolean };
export type SearchResult<T> = { item: T; highlights: Record<string, HighlightedText[]> };

function highlightMatch(text: string, query: string): HighlightedText[] {
  if (!query) return [{ text, match: false }];
  const regex = new RegExp(`(${query})`, 'ig');
  const parts = text.split(regex);

  return parts.map(part => ({
    text: part,
    match: part.toLowerCase() === query.toLowerCase(),
  }));
}

function deepSearch(obj: unknown, query: string, path = ''): [boolean, Record<string, HighlightedText[]>] {
  let found = false;
  const highlights: Record<string, HighlightedText[]> = {};

  const search = (value: unknown, currentPath: string) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const str = String(value);
      if (str.toLowerCase().includes(query)) {
        highlights[currentPath] = highlightMatch(str, query);
        found = true;
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        search(item, `${currentPath}[${index}]`);
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([key, val]) => {
        search(val, currentPath ? `${currentPath}.${key}` : key);
      });
    }
  };

  search(obj, path);

  return [found, highlights];
}

export function useDeepSearch<T>(items: T[], rawQuery: string): SearchResult<T>[] {
  return useMemo(() => {
    const query = rawQuery.trim().toLowerCase();
    if (!query) return items.map(item => ({ item, highlights: {} }));

    return items
      .map((item) => {
        const [matched, highlights] = deepSearch(item, query);
        return matched ? { item, highlights } : null;
      })
      .filter(Boolean) as SearchResult<T>[];
  }, [items, rawQuery]);
}
