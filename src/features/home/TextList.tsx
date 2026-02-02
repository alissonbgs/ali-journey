type TextListProps = {
  items: readonly string[];
};

export default function TextList({ items }: TextListProps) {
  return (
    <ul className="home-text-list mt-8">
      {items.map((item) => (
        <li className="home-text-item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
