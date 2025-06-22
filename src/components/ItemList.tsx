import ItemDetail from './ItemDetail';

type Props = {
  items: Record<string, any>[];
  selectedItem: any | null;
  onSelect: (item: any) => void;
};

export default function ItemList({ items, selectedItem, onSelect }: Props) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <li key={item.ITEM_SEQ} style={{ padding: 0, margin: 0 }}>
          <div
            onClick={() => onSelect(item)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              borderBottom: '1px solid #ccc',
              background: selectedItem?.ITEM_SEQ === item.ITEM_SEQ ? '#f0f8ff' : 'transparent',
            }}
          >
            <strong>{item.ITEM_NAME}</strong> <br />
            <small>{item.ENTP_NAME}</small>
          </div>

          {selectedItem?.ITEM_SEQ === item.ITEM_SEQ && (
            <div style={{ padding: '0.5rem', background: '#fafafa' }}>
              <ItemDetail item={selectedItem} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}