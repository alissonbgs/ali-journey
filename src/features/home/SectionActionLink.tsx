import Link from "next/link";

type SectionActionLinkProps = {
  href: string;
  label: string;
};

export default function SectionActionLink({
  href,
  label,
}: SectionActionLinkProps) {
  return (
    <Link className="home-section-link mt-7 inline-flex items-center" href={href}>
      {label}
    </Link>
  );
}
