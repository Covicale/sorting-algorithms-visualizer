export default function Footer() {
  return (
    <footer className="py-8 mx-4 flex flex-col md:flex-row md:gap-x-4 items-center justify-center border-t-2 text-center text-foreground/60 text-sm md:text-lg">
      <span>
        Made by{" "}
        <a
          className="underline font-bold"
          href="https://www.covicale.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alexander González Covic
        </a>{" "}
      </span>
      <span>
        Check the repo{" "}
        <a
          className="underline font-bold"
          href="https://github.com/Covicale/sorting-algorithms-visualizer"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </span>
    </footer>
  );
}
