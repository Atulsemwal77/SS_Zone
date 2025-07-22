import axios from "axios";
import { useState } from "react";
import { FiClock, FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      phone,
      email,
      subject,
      address,
      message,
    };
    // console.log("formData" , formData)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}contact/contactUs`, formData);
      toast.success("Message sent successfully!");

      // Clear the form 
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setAddress("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="py-[30px]  flex flex-col lg:flex-row ">
      {/* Left Section */}
      <div className="flex-1">
        <div className="">
          <p className="font-[Manrope] font-bold text-[18px] text-[#1C4ED9] pb-2.5 uppercase">
            Get In Touch
          </p>
          <h2 className="font-[Manrope] font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#292929] leading-tight">
            We're here to help
          </h2>
        </div>
        <ul className="py-6 font-[Manrope] text-[#292929] space-y-8">
          <li className="flex gap-4">
            <div className="bg-[#296AD2] rounded-lg flex items-center justify-center h-[52px] w-[52px]">
              <IoLocationOutline className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-[Manrope] font-semibold text-[20px] md:text-[24px]">
                Head Office
              </h4>
              <p className="font-[Manrope] font-normal text-[16px] md:text-[18px] leading-[27px] text-[#292929]">
                GMS Road Dehradun,
                <br /> Uttarakhand, India
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="bg-[#296AD2] rounded-lg flex items-center justify-center h-[52px] w-[52px]">
              <HiOutlineMail className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-semibold text-[20px] md:text-[24px] font-[Manrope]">
                Email Support
              </h4>
              <p className="text-[16px] md:text-[18px] font-normal font-[Manrope] leading-[27px] text-[#292929]">
                info@novanector.co.in
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="bg-[#296AD2] rounded-lg flex items-center justify-center h-[52px] w-[52px]">
              <FiPhoneCall className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-semibold text-[20px] md:text-[24px] font-[Manrope]">
                Let's Talk
              </h4>
              <p className="text-[16px] md:text-[18px] font-normal leading-[27px] text-[#292929] font-[Manrope]">
                Phone: +91 8979891703
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="bg-[#296AD2] rounded-lg flex items-center justify-center h-[52px] w-[52px]">
              <FiClock className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-semibold text-[20px] md:text-[24px] font-[Manrope]">
                Office Hours
              </h4>
              <p className="text-[16px] md:text-[18px] font-normal leading-[27px] text-[#292929] font-[Manrope]">
                09:00 AM - 06:00 PM
                <br />
                Monday - Saturday
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="p-6 sm:p-10 font-[Manrope] shadow-md border border-[#E3E3E3] rounded-[8px] flex-1 w-full">
        <div className="pb-4">
          <p className="text-[#1C4ED9] font-bold text-[18px] pb-2 font-[Manrope] uppercase">
            Send us message
          </p>
          <h2 className="font-semibold text-[32px] md:text-[36px] text-[#292929] leading-tight font-[Manrope]">
            Need Help? Message.
          </h2>
        </div>
        <form className="py-4 space-y-5">
          {/* First + Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-[#6F6F6F] font-[Manrope]">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-3 border-[#DEE0E4] rounded-md"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-[#6F6F6F] font-[Manrope]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border p-3 border-[#DEE0E4] rounded-md"
                required
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-[#6F6F6F] font-[Manrope]">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-3 border-[#DEE0E4] rounded-md"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-[#6F6F6F] font-[Manrope]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 border-[#DEE0E4] rounded-md"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#6F6F6F] font-[Manrope]">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-3 border-[#DEE0E4] rounded-md"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#6F6F6F] font-[Manrope]">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-3 border-[#DEE0E4] rounded-md"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#6F6F6F] font-[Manrope]">
              Message
            </label>
            <textarea
              placeholder="Type message here..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-[#DEE0E4] p-3 rounded-md resize-none"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#296AD2] font-[Manrope] text-white py-3 px-6 rounded-md mt-2 w-full text-sm font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
