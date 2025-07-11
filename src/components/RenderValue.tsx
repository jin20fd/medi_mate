export default function renderValue(value: any) {
  const isHtml = (str: string) =>
    typeof str === 'string' && /<\/?(table|tbody|tr|td|p|div|br|sub|sup)>/.test(str);

  const decodeHtmlEntities = (str: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  if (value && typeof value === 'object' && value.DOC) {
    const sections = value.DOC.SECTION
      ? Array.isArray(value.DOC.SECTION)
        ? value.DOC.SECTION
        : [value.DOC.SECTION]
      : [];

    const topLevelArticles = value.DOC.ARTICLE
      ? Array.isArray(value.DOC.ARTICLE)
        ? value.DOC.ARTICLE
        : [value.DOC.ARTICLE]
      : [];

    const renderArticles = (articles: any[]) =>
      articles.map((article: any, idx: number) => {
        const title = article['@_title'] || article.title || '';
        const paragraphs = Array.isArray(article.PARAGRAPH)
          ? article.PARAGRAPH
          : [article.PARAGRAPH];

        return (
          <div key={idx}>
            {title && <h4>{decodeHtmlEntities(title)}</h4>}
            {paragraphs.map((p: any, i: number) => {
              const rawText = p?.['#text'] || '';
              const tagName = p?.['@_tagName'] || p?.tagName || 'p';

              // 테이블은 디코딩하지 않고 그대로 렌더링
              if (tagName === 'table' && isHtml(rawText)) {
                return (
                  <div
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: `
                        <table border="1" style="border-collapse: collapse; width: 100%;">
                          <style>
                            table, th, td {
                              border: 1px solid #aaa;
                              padding: 4px;
                              text-align: left;
                            }
                          </style>
                          ${rawText}
                        </table>
                      `,
                    }}
                    style={{
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
      });

    return (
      <div>
        {/* SECTION 있는 경우 */}
        {sections.map((section: any, sectionIdx: number) => {
          const sectionTitle = section['@_title'] || section.title || '';
          const articles = Array.isArray(section.ARTICLE)
            ? section.ARTICLE
            : [section.ARTICLE];

          return (
            <div key={`section-${sectionIdx}`}>
              {sectionTitle && <h3>{decodeHtmlEntities(sectionTitle)}</h3>}
              {renderArticles(articles)}
            </div>
          );
        })}

        {/* SECTION 없이 ARTICLE만 있는 경우 */}
        {topLevelArticles.length > 0 && (
          <div>{renderArticles(topLevelArticles)}</div>
        )}
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