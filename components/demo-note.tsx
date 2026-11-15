export function DemoNote({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      Bisnis fiktif. Situs konsep oleh{" "}
      <a
        href="https://anugrah-prima-pratama.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-1 underline-offset-4 hover:decoration-2"
      >
        OmGround
      </a>{" "}
      untuk portofolio.
    </p>
  );
}
