import Banner from "../componant/Banner";
import ContactForm from "../componant/ContactForm";
import map from "../assets/image/contactmap.png";
import hero from "../assets/image/contactbanner.png";

function Contact() {
  return (
    <>
      <div
        className="h-[60vh] w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className=" p-8 rounded-lg  text-black md:w-1/2 w-full">
          <h1 className="md:text-5xl text-3xl font-bold mb-4">Contact Us</h1>
          <p className="md:text-lg text-sm leading-relaxed">
            Have questions or need support? We're here to help! Reach out to our
            team for assistance, feedback, or more information—we'd love to hear
            from you and guide you on your learning journey."
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[30px]">
        <ContactForm />
        <div className="w-full ">
          <img src={map} alt="map" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default Contact;
