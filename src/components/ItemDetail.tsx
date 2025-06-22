import renderValue from './RenderValue';
import fieldLabels from '../constants/fieldLabels';

type Props = {
  item: Record<string, any>;
};

const excludedFields = ['EE_DOC_ID', 'UD_DOC_ID', 'NB_DOC_ID']; // 제외할 키들

export default function ItemDetail({ item }: Props) {
  return (
    <div style={{ marginTop: '2rem', borderTop: '2px solid #333', paddingTop: '1rem' }}>
      <h2>🧾 상세 정보</h2>
      <ul>
        {Object.entries(item)
          .filter(([key, value]) => 
            value !== null && 
            value !== undefined && 
            value !== '' && 
            !excludedFields.includes(key)
          )
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