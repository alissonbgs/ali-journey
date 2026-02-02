type SectionHeadingProps = {
  headingId: string;
  kicker: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  headingId,
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header>
      <p className="home-kicker">{kicker}</p>
      <h2
        className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl"
        id={headingId}
      >
        {title}
      </h2>
      {description ? (
        <p className="home-copy mt-4 max-w-3xl text-base md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
