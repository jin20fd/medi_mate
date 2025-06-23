import { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

const base = import.meta.env.VITE_OPEN_API_BASE;
const key = import.meta.env.VITE_API_SERVICE_KEY;

type ItemData = Record<string, any>;

// 변경: page 매개변수 추가
export const useDrugSearch = (searchTerm: string, page: number) => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setNoResult(false);
      setTotalCount(0);

      const pageUrl = `${base}?serviceKey=${key}&pageNo=${page}&numOfRows=10&type=xml&item_name=${encodeURIComponent(searchTerm)}`;

      try {
        const response = await fetch(pageUrl);
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
  }, [searchTerm, page]);

  return { items, loading, error, noResult, totalCount };
};