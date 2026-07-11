import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import api from "../../api/axios";

interface Member {
  _id: string;
  fullName: string;
  username: string;
  developerRole: string;
  avatar?: string;
}

function MemberPreview() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await api.get("/users");
        setMembers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMembers();
  }, []);

  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Our Members</h2>

        <p className="mt-4 text-gray-600">Kenali anggota WorkDev.</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {members.map((member) => (
          <SwiperSlide key={member._id}>
            <Link to={`/members/${member._id}`}>
              <div className="rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center">
                  {member.avatar ? (
                    <img
                      src={`http://localhost:5000${member.avatar}`}
                      alt={member.fullName}
                      className="mb-4 h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                      {member.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="text-center text-xl font-bold">
                  {member.fullName}
                </h3>

                <p className="mt-2 text-center text-gray-500">
                  @{member.username}
                </p>

                <div className="mt-4 flex justify-center">
                  <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                    {member.developerRole}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MemberPreview;
