export const metadata = {
  title: "Trailer | IDentità",
};

export default function TrailerPage() {
  return (
    <main className="fixed inset-0 bg-black">
      <iframe
        className="w-full h-full border-0"
        src="https://www.youtube.com/embed/ptDep1TaK9o?autoplay=1"
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </main>
  );
}
