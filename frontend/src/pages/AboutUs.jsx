import React from "react";
import vodafone from "../assets/image/vodafone.png";
import intel from "../assets/image/intel.png";
import amd from "../assets/image/amd.png";
import talkit from "../assets/image/talkit.png";
import tesla from "../assets/image/tesla.png";
import Infosys from "../assets/image/Infosys.png";
import image1 from "../assets/image/image04.png";
import image2 from "../assets/image/pexels-julia-m-cameron-4144224 1.png";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import bgImage from "../assets/image/about.jpg";
import learnIcon from "../assets/image/black_board_fill 1.png";
import learnIcon2 from "../assets/image/book_6_fill 1.png";
import learnIcon3 from "../assets/image/mortarboard_fill 1.png";
import learnIcon4 from "../assets/image/certificate_2_fill 1.png";

const features = [
  { icon: learnIcon, text: "Start learning from our experts." },
  { icon: learnIcon2, text: "Enhance your skills with us now." },
  { icon: learnIcon3, text: "Do the professional level Courses." },
  { icon: learnIcon4, text: "Get our verified Certificate." },
];

const AboutUs = () => {
  return (
    <>
      <div
        className="h-[60vh] w-full bg-cover bg-center flex items-center max-w-screen-2xl mx-auto"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className=" p-8 rounded-lg  text-black md:w-1/2 w-full">
          <h1 className="md:text-5xl text-3xl font-bold mb-4">About Us</h1>
          <p className="md:text-lg text-sm leading-relaxed">
            At SSZone Technology, we’re dedicated to empowering learners with
            practical, career-ready skills. We provide flexible, expert-led
            training to help you enhance your expertise and advance your career,
            all at your own pace.
          </p>
        </div>
      </div>

      <div className=" relative w-full overflow-hidden px-3 max-w-screen-2xl mx-auto">
        <div className="flex w-full justify-between gap-8 my-12 scrolling">
          <img src={vodafone} alt="vodafone" />
          <img src={intel} alt="intel" />
          <img src={tesla} alt="tesla" />
          <img src={amd} alt="amd" />
          <img src={talkit} alt="talkit" />
          <img src={Infosys} alt="Infosys" />

          {/* Duplicate for Smooth Infinite Scrolling */}

          <img src={vodafone} alt="vodafone" />
          <img src={intel} alt="intel" />
          <img src={tesla} alt="tesla" />
          <img src={amd} alt="amd" />
          <img src={talkit} alt="talkit" />
          <img src={Infosys} alt="Infosys" />

          <img src={vodafone} alt="vodafone" />
          <img src={intel} alt="intel" />
          <img src={tesla} alt="tesla" />
          <img src={amd} alt="amd" />
          <img src={talkit} alt="talkit" />
          <img src={Infosys} alt="Infosys" />

          <img src={vodafone} alt="vodafone" />
          <img src={intel} alt="intel" />
          <img src={tesla} alt="tesla" />
          <img src={amd} alt="amd" />
          <img src={talkit} alt="talkit" />
          <img src={Infosys} alt="Infosys" />
        </div>
      </div>

      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-7 py-16 max-w-7xl mx-auto gap-28">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-semibold text-blue-600 uppercase mb-2">
            About Us
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Learning With Skills <br /> Hunt Now.
          </h2>
          <p className="text-gray-600 mb-8">
            Tap into your full potential with online courses guided by industry
            experts. Master high-demand skills on your schedule and take control
            of your career journey today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <img src={item.icon} alt="icon" className="w-6 h-6" />
                </div>
                <p className="text-gray-800 w-[200px]">{item.text}</p>
              </div>
            ))}
          </div>

          <button className="flex gap-2 items-center bg-blue-700 text-white px-8 py-4 rounded-lg my-4 transition cursor-pointer duration-300 ease-in-out  hover:scale-105">
            Browse Courses <FaArrowRightLong className="text-xl " />
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center">
          <div className="absolute top-[-10%] right-20 border-2 border-blue-600 rounded-lg w-54 h-70 z-0 hidden lg:block"></div>
          <div className="absolute top-[-15%] right-18 border-2 border-blue-600 rounded-lg w-54 h-70 z-0 hidden lg:block"></div>

          <img
            src={image1}
            alt="Video Learning"
            className="relative z-10 rounded-lg w-[300px] shadow-lg"
          />
          <img
            src={image2}
            alt="Team Work"
            className="absolute bottom-[-100px] left-[-40px] w-[250px] rounded-lg shadow-lg z-20 hidden lg:block"
          />
        </div>
      </section>

      <div className="flex flex-col justify-center items-center gap-7 p-6 my-10">
        <h1 className="text-4xl font-bold">
          Achieve Your Goal With SSZone Technology
        </h1>
        <p className="text-sm">
          Empowering you with skills and knowledge to turn your goals into
          reality.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center p-5 gap-3 shadow-2xl bg-[#FFFFFF] max-w-[260px]">
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">High Quality Courses</h2>
            <p className="text-center">
              Expert-designed courses crafted to deliver practical skills and
              real-world knowledge.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-5 gap-3 shadow-2xl bg-[#FFFFFF] max-w-[260px]">
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">Expert Instructors</h2>
            <p className="text-center">
              Learn from industry professionals with real-world experience and
              proven expertise.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-7 gap-3 shadow-2xl bg-[#FFFFFF] max-w-[260px]">
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">Certification</h2>
            <p className="text-center">
              Earn a recognized certificate to showcase your skills and boost
              your career.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-7 p-6 my-10 ">
        <h1 className="text-4xl font-bold">What Our Student Says About Us</h1>
        <p className="text-sm">
          Hear real stories and experiences from students who’ve transformed
          their careers with our courses.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center p-5 gap-4 shadow-xl bg-[#EBF5FF] max-w-[260px]">
            <p className="text-center">
              <span className="text-blue-500 text-3xl">“</span>
              Studying online saved me a lot of money, and I didn't have to
              commute. The quality of the courses was fantastic, and I could
              learn at my own pace.{" "}
            </p>
            <div className="flex justify-center items-center gap-2">
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaRegStarHalfStroke className="text-xl text-amber-300" />
            </div>
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">Sakshi Chaudhary</h2>
            <h3 className="text-blue-600">UI/UX Designer</h3>
          </div>

          <div className="flex flex-col justify-center items-center p-5 gap-4 shadow-xl bg-[#EBF5FF] max-w-[260px]">
            <p className="text-center">
              <span className="text-blue-500 text-3xl">“</span>
              Studying online saved me a lot of money, and I didn't have to
              commute. The quality of the courses was fantastic, and I could
              learn at my own pace.{" "}
            </p>
            <div className="flex justify-center items-center gap-2">
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaRegStarHalfStroke className="text-xl text-amber-300" />
            </div>
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">Sakshi Chaudhary</h2>
            <h3 className="text-blue-600">UI/UX Designer</h3>
          </div>

          <div className="flex flex-col justify-center items-center p-5 gap-4 shadow-xl bg-[#EBF5FF] max-w-[260px]">
            <p className="text-center">
              <span className="text-blue-500 text-3xl">“</span>
              Studying online saved me a lot of money, and I didn't have to
              commute. The quality of the courses was fantastic, and I could
              learn at my own pace.{" "}
            </p>
            <div className="flex justify-center items-center gap-2">
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaStar className="text-xl text-amber-300" />
              <FaRegStarHalfStroke className="text-xl text-amber-300" />
            </div>
            <img src="" alt="" className="size-13 rounded-full" />
            <h2 className="text-xl font-bold">Sakshi Chaudhary</h2>
            <h3 className="text-blue-600">UI/UX Designer</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
