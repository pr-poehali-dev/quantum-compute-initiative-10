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
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/328640a5-2023-432b-9316-00b2d068838f.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/aa83a077-2387-4e1f-b3c7-d83be27d0996.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/149e3892-7a66-41df-b694-d78a6508dd69.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/a8bd22ac-bc99-469d-af40-5cd25e7b3f19.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/dae22a02-127d-4b70-8d83-53271348d06f.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/4206a69d-976c-4317-971a-f8f5093c7177.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/a09e89a2-ceb2-4824-bb58-2af65a8b1fb2.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/27d4165b-69c4-4cb6-bc79-214d49512f8f.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/74975619-f8db-4505-8705-9edb5f917ab5.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/98ced4d7-2ac3-4519-a0c8-e7fbfc79c91b.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/b7ee5a76-8e3f-46c5-8f1c-e7c7c1995e3a.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/5445615e-9d57-42eb-beb2-d15c0b46b55e.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/e6ba785d-521e-490d-ac48-002e908ebbeb.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/41eb3693-5540-4a84-9982-d834a5b1a421.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/eb30a568-4c8e-42d3-9055-3a06af68c819.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/c419f2bf-753a-4f4e-a1ae-e062838075bc.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/527445c7-4e78-407a-8865-914f54c34538.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/154971ab-1ca1-4470-bfa4-0e4fbb50ee89.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/84222e73-46e3-4906-817b-0f6b9c697269.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/4c2172b5-3026-4ae2-827d-cbc7d65fbbec.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/6633e72e-4ccb-4d0c-b815-54285ce47d8d.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/32bcfc41-2cd3-4e8a-92ec-ceea02af3430.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/6ede9818-df93-4999-baa2-6a0d0a79f4b7.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/36690358-9c0b-4d99-b36f-792e88836a51.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/4364a8ca-c98d-41ae-b4a4-9961df9f7881.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/08d83c6e-fa34-4173-b39f-5a242b4c4dfd.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/9357be32-eb27-4b8c-a43f-04aaa04bd9ac.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/ece7148c-dc59-4c38-8f46-0e95ce748909.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/9e4adf06-d9f0-4fd8-9795-2eeb117ddd60.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/c7f9085c-d2cf-4ab9-b81c-906447da7823.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/c0321cf7-ae62-4145-b619-b3e0de7ef1b3.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/a18de41d-562e-44e7-add3-c9f3daaae610.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/6522bf32-4da0-4d16-92a9-26a4c667e1f7.png",
  "https://cdn.poehali.dev/projects/6bfc9184-1331-43da-a949-592cd4d5d6bd/bucket/6d34fca3-4796-4f15-8176-1f916bd404ef.png",
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