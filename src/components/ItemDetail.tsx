import renderValue from './RenderValue';
import fieldLabels from '../constants/fieldLabels';

type Props = {
  item: Record<string, any>;
};

const excludedLabels =
  ['효능효과', '용법용량', '주의사항',
  '표준코드', '허가일자', '보험코드', '허가/신고구분', '업체허가번호', '상태', '변경일자', '변경이력', '총량',
  '첨부문서' // 설명서 다운로드 링크  (//TODO 설명서 제공 추가)
];

export default function ItemDetail({ item }: Props) {
  return (
    <div style={{ marginTop: '2rem', borderTop: '2px solid #333', paddingTop: '1rem' }}>
      <h2>🧾 상세 정보</h2>
      <ul>
        {Object.entries(item)
          .filter(([key, value]) => {
            if (value === null || value === undefined || value === '') return false;
            const label = fieldLabels[key] || key;
            return !excludedLabels.includes(label);
          })
          .map(([key, value]) => {
            const label = fieldLabels[key] || key;
            return (
              <p key={key}>
                <strong>{label}</strong>: {renderValue(value)}
              </p>
            );
          })}
      </ul>
    </div>
  );
}