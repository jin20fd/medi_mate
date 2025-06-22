import { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

const base = import.meta.env.VITE_OPEN_API_BASE;
const key = import.meta.env.VITE_API_SERVICE_KEY;
const url = `${base}?serviceKey=${key}&pageNo=1&numOfRows=100&type=xml`;

type ItemData = Record<string, any>;

export const useDrugSearch = (searchTerm: string) => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [totalCount, setTotalCount] = useState(0);  // 총 결과 수 상태 추가

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setNoResult(false);
      setTotalCount(0);

      try {
        const response = await fetch(`${url}&item_name=${encodeURIComponent(searchTerm)}`);
        const xmlText = await response.text();
        const parser = new XMLParser({ ignoreAttributes: false });
        const json = parser.parse(xmlText);

        const count = Number(json?.response?.body?.totalCount ?? 0);
        setTotalCount(count);

        if (count === 0) {
          setItems([]);
          setNoResult(true);
          return;
        }

        const itemData = json?.response?.body?.items?.item;
        const parsedItems = Array.isArray(itemData) ? itemData : [itemData];
        setItems(parsedItems.filter(Boolean));
      } catch (err: any) {
        setError(err.message || '에러 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return { items, loading, error, noResult, totalCount };
};