export default function SoftwaresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-5/6 text-center justify-center">
        {children}
      </div>
    </section>
  );
}
