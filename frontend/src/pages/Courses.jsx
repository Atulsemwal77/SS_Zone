import hero from "../assets/image/coursesbanner.jpg";
import { useEffect } from "react";
import Banner from "../componant/Banner";
import Card from "../componant/Card";
import all_course from "../assets/Course_Data";
import { useState } from "react";
import { useLocation } from "react-router-dom";



const categoriesButton = [
  "Trending",
  "All Categories",
  "Design",
  "Marketing",
  "Programming",
  "Web Design",
];

function Courses() {
  const [active, setActive] = useState("All Categories");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const filteredCourses =
  active === "All Categories"
    ? all_course
    : all_course.filter((course) => course.category === active)
  ;
  const location = useLocation();
useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);



  return (
    <>
      <div
        className="h-[60vh] w-full bg-cover bg-center flex items-center max-w-screen-2xl mx-auto"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className=" p-8 rounded-lg  text-black md:w-1/2 w-full">
          <h1 className="md:text-5xl text-3xl font-bold mb-4">Courses</h1>
          <p className="md:text-lg text-sm leading-relaxed">
            Discover our wide selection of expert-led courses designed to boost
            your skills and career growth. Start learning today and take the
            next step toward your success!
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[30px]">
        <div className="pt-[30px] px-4 sm:px-10 md:px-24 font-[Manrope] flex flex-col">
          <div className="text-center px-4 md:px-0">
            <p className="font-bold text-lg text-[#1C4ED9] pb-2 uppercase">
              Popular Courses
            </p>

            <h1 className="font-semibold text-2xl md:text-4xl text-[#292929] pb-2">
              Choose Our Top Courses
            </h1>

            <p className="font-normal  text-[#6F6F6F] pb-10 max-w-3xl mx-auto">
              Discover a world of knowledge and opportunities with our online
              education platform — pursue a new career.
            </p>
          </div>

          <div className="flex gap-6 flex-wrap justify-center ">
            {categoriesButton.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`px-6 py-3 rounded-[40px] border text-sm transition duration-300 cursor-pointer font-medium font-[manrope]
              ${
                active === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-500 hover:bg-blue-100"
              }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <Card all_course={filteredCourses} />
      </div>
    </>
  );
}

export default Courses;
