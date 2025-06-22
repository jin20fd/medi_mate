type Props = {
  keyword: string;
  setKeyword: (k: string) => void;
  onSearch: () => void;
};

export default function SearchForm({ keyword, setKeyword, onSearch }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="의약품 이름을 입력하세요"
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <button type="submit" style={{ marginLeft: '0.5rem' }}>검색</button>
    </form>
  );
}