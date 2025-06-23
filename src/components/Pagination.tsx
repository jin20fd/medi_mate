type Props = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ current, total, onPageChange }: Props) {
  const delta = 2;

  // 고정된 5개 페이지 숫자 계산 (예: 3 4 [5] 6 7)
  const getVisiblePages = () => {
    const start = Math.max(1, current - delta);
    const end = Math.min(total, current + delta);
    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 5개가 안 되면 앞/뒤 채움
    while (pages.length < 5) {
      if (pages[0] > 1) pages.unshift(pages[0] - 1);
      else if (pages[pages.length - 1] < total) pages.push(pages[pages.length - 1] + 1);
      else break;
    }

    return pages.slice(0, 5);
  };

  const visiblePages = getVisiblePages();

  const goToFirst = () => onPageChange(1);
  const goToLast = () => onPageChange(total);
  const goToPrev = () => onPageChange(Math.max(1, current - 1));
  const goToNext = () => onPageChange(Math.min(total, current + 1));

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <button onClick={goToFirst} disabled={current === 1}>&lt;&lt;</button>
      <button onClick={goToPrev} disabled={current === 1}>&lt;</button>

      {visiblePages.map((pageNum, i) => (
        <button
          key={`page-${i}`} // 🔥 위치 기준으로 고정
          onClick={() => onPageChange(pageNum)}
          style={{
            padding: '0.4rem 0.8rem',
            background: pageNum === current ? '#007bff' : '#eee',
            color: pageNum === current ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            fontWeight: pageNum === current ? 'bold' : 'normal',
            transition: 'all 0.1s ease-in-out',
          }}
        >
          {pageNum}
        </button>
      ))}

      <button onClick={goToNext} disabled={current === total}>&gt;&gt;</button>
      <button onClick={goToLast} disabled={current === total}>&gt;</button>
    </div>
  );
}
