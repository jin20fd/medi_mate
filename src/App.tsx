import { useState } from 'react';
import { useDrugSearch } from './hooks/useDrugSearch';
import SearchForm from './components/SearchForm';
import ItemList from './components/ItemList';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { items, loading, error, noResult, totalCount } = useDrugSearch(searchTerm);

  const handleSearch = () => {
    setSearchTerm(keyword);
  };

  const handleSelect = (item: any) => {
    setSelectedItem((prev :any) =>
      prev?.ITEM_SEQ === item.ITEM_SEQ ? null : item
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>💊 의약품 검색</h1>
      <SearchForm keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />

      {loading && <p>🔄 로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {totalCount > 0 && <p>검색 결과 총 {totalCount}건</p>}

      {items.length > 0 && (
        <>
          <h2>검색 결과</h2>
          <ItemList items={items} selectedItem={selectedItem} onSelect={handleSelect} />
        </>
      )}
      {noResult && !loading && <p>❌ 검색 결과 없음</p>}
    </div>
  );
}

export default App;

