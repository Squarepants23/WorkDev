import { technologies } from "../../data/technology";

function TechnologyStack() {
  const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools"];

  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Technology Stack</h2>

          <p className="mt-4 text-gray-600">
            Teknologi modern yang digunakan dan dipelajari oleh komunitas
            WorkDev untuk membangun website dan aplikasi berkualitas.
          </p>
        </div>

        {categories.map((category, index) => {
          const items = technologies.filter(
            (tech) => tech.category === category,
          );

          const animation = index % 2 === 0 ? "marquee-left" : "marquee-right";

          return (
            <div key={category} className="mb-12">
              {/* Category */}
              <h3 className="mb-5 text-xl font-bold text-gray-800">
                {category}
              </h3>

              <div className="overflow-hidden">
                <div className={`marquee ${animation}`}>
                  {[...items, ...items].map((tech, i) => (
                    <div
                      key={`${tech.name}-${i}`}
                      className="mx-3 w-80 flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
                    >
                      {/* Logo */}
                      <div className="flex items-center justify-center">
                        <i
                          className={`${tech.devicon} text-6xl transition-transform duration-300 hover:scale-110`}
                        ></i>
                      </div>

                      {/* Name */}
                      <h4 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        {tech.name}
                      </h4>

                      {/* Description */}
                      <p className="mt-4 text-center leading-relaxed text-gray-600">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TechnologyStack;
