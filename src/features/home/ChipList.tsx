type ChipListProps = {
  items: readonly string[];
};

export default function ChipList({ items }: ChipListProps) {
  return (
    <ul className="home-chip-list mt-8">
      {items.map((item) => (
        <li className="home-chip" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
