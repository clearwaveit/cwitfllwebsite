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
    <section className="relative min-h-screen bg-black md:py-50 py-0 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1494px] px-3 md:px-0 lg:px-0 global-section-padding">
        <h2 className="text-[30px] md:text-[50px] font-light text-white leading-[60px] md:leading-[80px] mb-10">
          Latest Blogs and Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="relativeflex flex-col w-auto md:w-[453.34px] h-[384.98px] md:h-[484.98px] blogs-section">
              {/* Image with play button */}
              <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center mb-0 overflow-hidden">
                <Image
                  src={blogImg}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* White background section */}
              <div className="bg-white w-auto md:w-[453.34px] h-[180.39px] md:h-[231.39px] flex flex-col justify-center blogs-section-image">
                <div className="flex flex-col justify-center items-start gap-4 p-10">
                  <span className="text-blue-600 text-[16px] font-medium block">
                    {blog.category}
                  </span>
                  <h3 className="text-[16px] md:text-[22px] font-bold text-black leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-[12px] md:text-[14px] text-gray-700 leading-relaxed">
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