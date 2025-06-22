type Props = {
  items: Record<string, any>[];
  selectedItem: any;
  onSelect: (item: any) => void;
};

export default function ItemList({ items, selectedItem, onSelect }: Props) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onSelect(item)}
          style={{
            cursor: 'pointer',
            padding: '0.5rem',
            borderBottom: '1px solid #ccc',
            background: selectedItem === item ? '#f0f8ff' : 'transparent',
          }}
        >
          <strong>{item.ITEM_NAME}</strong> <br />
          <small>{item.ENTP_NAME}</small>
        </li>
      ))}
    </ul>
  );
}