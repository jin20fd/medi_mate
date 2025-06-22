export default function renderValue(value: any) {
  const isHtml = (str: string) =>
    typeof str === 'string' && /<\/?(table|tbody|tr|td|p|div|br|sub|sup)>/.test(str);

  const decodeHtmlEntities = (str: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  if (
    value &&
    typeof value === 'object' &&
    value.DOC &&
    value.DOC.SECTION &&
    value.DOC.SECTION.ARTICLE
  ) {
    const articles = Array.isArray(value.DOC.SECTION.ARTICLE)
      ? value.DOC.SECTION.ARTICLE
      : [value.DOC.SECTION.ARTICLE];

    return (
      <div>
        {articles.map((article, idx) => {
          const title = article['@_title'] || article.title || '';
          const paragraphs = Array.isArray(article.PARAGRAPH)
            ? article.PARAGRAPH
            : [article.PARAGRAPH];

          return (
            <div key={idx}>
              {title && <h4>{decodeHtmlEntities(title)}</h4>}
              {paragraphs.map((p, i) => {
                const rawText = p['#text'] || '';
                const tagName = p['@_tagName'] || p.tagName || 'p';

                // 테이블은 디코딩하지 않고 그대로 렌더링
                if (tagName === 'table' && isHtml(rawText)) {
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: `<table>${rawText}</table>` }}
                      style={{
                        border: '1px solid #ccc',
                        marginBottom: '1rem',
                        overflowX: 'auto',
                      }}
                    />
                  );
                }
                // 나머지는 디코딩 후 텍스트 출력
                const htmlText = decodeHtmlEntities(rawText);
                return <p key={i}>{htmlText}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  }

  // 전체 문자열이 HTML이라면 디코딩 전에 렌더링
  if (typeof value === 'string') {
    if (isHtml(value)) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          style={{ background: '#f8f8f8', padding: '0.5rem', border: '1px solid #ccc' }}
        />
      );
    }
    return <span>{decodeHtmlEntities(value)}</span>;
  }

  if (typeof value === 'object') {
    return (
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '0.5rem' }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return String(value);
}