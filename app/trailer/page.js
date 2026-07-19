export const metadata = {
  title: "Trailer | IDentità",
};

export default function TrailerPage() {
  return (
    <main className="fixed inset-0 bg-black">
      <iframe
        className="w-full h-full border-0"
        src="https://www.youtube.com/embed/GUKAMha193w?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3"
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </main>
  );
}
