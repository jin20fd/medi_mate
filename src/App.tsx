import { useState } from 'react';
import { useDrugSearch } from './hooks/useDrugSearch';
import SearchForm from './components/SearchForm';
import ItemList from './components/ItemList';
import Pagination from './components/Pagination';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [page, setPage] = useState(1); // ✅ 페이지 상태 추가

  const { items, loading, error, noResult, totalCount } = useDrugSearch(searchTerm, page);

  const handleSearch = () => {
    setSearchTerm(keyword);
    setPage(1); // 🔄 검색 시 페이지 초기화
    setSelectedItem(null);
  };

  const handleSelect = (item: any) => {
    setSelectedItem((prev: any) =>
      prev?.ITEM_SEQ === item.ITEM_SEQ ? null : item
    );
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>💊 의약품 검색</h1>
      <SearchForm keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />

      {loading && <p>🔄 로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {totalCount > 0 && <p>검색 결과 총 {totalCount}건</p>}

      {items.length > 0 && (
        <>
          <h2>검색 결과 (페이지 {page} / {totalPages})</h2>
          <ItemList items={items} selectedItem={selectedItem} onSelect={handleSelect} />
        </>
      )}

      {/* ✅ 페이지네이션 버튼 */}
      <Pagination current={page} total={totalPages} onPageChange={setPage} />

      {noResult && !loading && <p>❌ 검색 결과 없음</p>}
    </div>
  );
}

export default App;
