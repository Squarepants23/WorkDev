import { useState } from "react";
import { technologies } from "../../data/technology";

function TechnologyStack() {
  const [category, setCategory] = useState("Frontend");

  const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools"];

  const filtered = technologies.filter((tech) => tech.category === category);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Technology Stack</h2>

          <p className="mt-4 text-gray-600">
            Teknologi yang dipelajari dan digunakan oleh komunitas WorkDev.
          </p>
        </div>

        {/* Category */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 font-medium transition-all duration-300 ${
                category === item
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Horizontal Slider */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex w-max gap-6">
            {filtered.map((tech) => (
              <div
                key={tech.name}
                className="w-80 flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Logo */}
                <i className={`${tech.devicon} text-6xl`}></i>

                {/* Name */}
                <h3 className="mt-5 text-2xl font-bold text-gray-900">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-relaxed text-gray-600">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnologyStack;
