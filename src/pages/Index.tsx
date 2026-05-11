import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const screenshots = [
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/32cc046f-18d0-4b7a-8344-0e462059c4d6.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/5b068188-15ad-4e7d-8afc-3f22f2cb3a6e.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/789ffb56-d6e8-4b53-b53b-0cf7f326535b.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/5ad16155-a991-4cde-be14-9fb9c3a951af.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/1071f004-59c4-4f70-8380-387aa044a8ee.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/58449082-ba8a-4456-a7e7-aa104408f21d.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/dee7e20c-7dbd-4162-8e39-342389b90ab6.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/a30f6251-f0f8-4384-9e0f-e246b92bad06.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/4ea27fd1-5577-48a0-9aaa-149f385051fe.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/1da93521-634e-4227-8492-cb50e77431f6.png",
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Promo />

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-900 mb-2">Материалы DE26</h2>
          <p className="text-neutral-500 text-sm mb-8">Скриншоты из задания по базовой настройке устройств</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noopener noreferrer">
                <img
                  src={src}
                  alt={`Скриншот ${i + 1}`}
                  className="w-full rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300 object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;