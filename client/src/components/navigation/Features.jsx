export default function FeaturesSection() {
  const features = [
    {
      icon: "🚗",
      title: "Fast Roadside Assistance",
      desc: "Get help anytime, anywhere with just one request.",
    },
    {
      icon: "🛠",
      title: "Trusted Providers",
      desc: "Verified providers ensure reliable and safe support.",
    },
    {
      icon: "📍",
      title: "Real-Time Location Tracking",
      desc: "Share your exact location for faster response.",
    },
    {
      icon: "💳",
      title: "Secure Payments & Claims",
      desc: "Easy online payments and insurance claim support.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="text-3xl font-bold text-gray-800 mb-8">
          Why Join RoadRescue?
        </h4>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}