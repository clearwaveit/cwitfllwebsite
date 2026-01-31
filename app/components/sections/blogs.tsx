"use client";

import Image from "next/image";
import playIcon from "@/app/assets/imgs/blogs_video_btn.png";
import blogImg from "@/app/assets/imgs/blog_img.png";

const blogs = [
  {
    category: "Blog",
    title: "LuLu Group International",
    description: "Lulu Group is a diversified conglomerate with business entities worldwide and contributes highly to the Gulf's economic status.",
  },
  {
    category: "Insight",
    title: "Joyalukkas Exchange",
    description: "Joyalukkas Exchange is a well-known foreign exchange offering a range of financial services in the UAE, Kuwait and Oman.",
  },
  {
    category: "Blog",
    title: "Unicoin DCX",
    description: "Unicoin DCX is a cryptocurrency exchange that uses blockchain technology to let you send, receive and trade across the platform.",
  },
];

export default function Blogs() {
  return (
    <section className="relative min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 global-section-padding blogs-section-content-container">
        <h2 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[55px] 2xl:text-[60px] font-[500] text-white leading-[32px] sm:leading-[40px] md:leading-[50px] lg:leading-[60px] xl:leading-[70px] 2xl:leading-[80px] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          Latest Blogs and Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 blogs-cards-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="relative flex flex-col w-full sm:w-auto md:w-full lg:w-auto xl:w-full 2xl:w-auto h-auto sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[480px] 2xl:h-[500px] blogs-section blogs-card">
              {/* Image with play button */}
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px] flex items-center justify-center mb-0 overflow-hidden">
                <Image
                  src={blogImg}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* White background section */}
              <div className="bg-white w-full h-auto sm:h-[170px] md:h-[180px] lg:h-[210px] xl:h-[230px] 2xl:h-[240px] flex flex-col justify-center blogs-section-image blogs-card-content">
                <div className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 lg:p-9 xl:p-10">
                  <span className="text-blue-600 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium block">
                    {blog.category}
                  </span>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold text-black leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-gray-700 leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}