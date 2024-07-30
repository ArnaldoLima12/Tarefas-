interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {

  return (
    <>
      {/* Define o título da página */}
      <title>{title}</title>
    </>
  );
}
