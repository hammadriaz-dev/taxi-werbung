export default function RouteMarquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-4">
      <div className="flex w-max gap-10 route-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-cream/70 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
