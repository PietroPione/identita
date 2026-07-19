export const metadata = {
  title: "Canto | IDentità",
};

export default function CantoPage() {
  return (
    <main className="fixed inset-0 bg-black">
      <iframe
        className="w-full h-full border-0"
        src="https://www.youtube.com/embed/E5Vl6eeYmsw?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3"
        title="Canto"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </main>
  );
}
