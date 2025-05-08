import React, { useEffect, useState } from "react";

import { FaPlus, FaPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import SubscribeModal from "../Components/SubscribeModal";
import ImgFetching from "../Components/imgFetching";

const CarouselDownL = () => {
  const images = [
    { src: "/sample_image.jpg", alt: "One" },
    { src: "/img2.jpg", alt: "Two" },
    { src: "/img3.jpg", alt: "Three" },
  ];

  const [credits, setCredits] = useState(() => {
    // load credits from local storage or default to 3
    const savedCredits = localStorage.getItem("userCredits");
    return savedCredits ? parseInt(savedCredits, 10) : 3;
  });

  useEffect(() => {
    // save credits to local storage
    localStorage.setItem("userCredits", credits);
  }, [credits]);

  // use this true of want to show pop up
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // for input fields
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  // for fetching image container showing
  const [showContainer, setShowContainer] = useState(false);

  const handleSubmit = () => {
    setShowContainer(true);
  };

  // for credits limits
  const handleFetchImage = () => {
    setInput2(input1);

    if (credits > 0) {
      // fetch the image from API - GR add Backend
      setCredits((prev) => prev - 1);
    } else {
      // temperary
      // alert("You have no credits left. Please subscribe to get more credits.");

      setShowModal(true);
    }
  };

  return (
    <div className="font-montserrat min-h-screen bg-[#1D1D1E] relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#1D1D1E] bg-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/bg-ImageDownl-removebg-preview.png')",
        }}
      ></div>

      <Navbar />

      {/* Content */}
      <div className="relative z-10 text-white top-80">
        <div className="flex flex-col items-center justify-center text-center px-12 z-10">
          <h2 className="text-3xl font-medium">Carousel Downloader</h2>
          <p className="text-[#FFFFFF99] mt-2 ">
            Fetch and Download Carousel from Meta Threads
          </p>
        </div>

        {/* after clicking the submit button to fetch img -  code  */}
        {showContainer && (
          <div className="absolute z-20 -top-32 left-0 right-0 mx-auto">
            <ImgFetching
              input2={input2}
              images={[
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "Porco Rosso (1992)",
                  imageUrl: "sample_image.jpg",
                },
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "My Neighbor Totoro (1988)",
                  imageUrl: "sample_image2.jpg",
                },
                {
                  title: "Ghibli Archives (@ghibliarchives)",
                  subtitle: "Spirited Away (2001)",
                  imageUrl: "sample_image3.jpg",
                },
              ]}
            />
          </div>
        )}

        {showModal && <SubscribeModal onClose={() => setShowModal(false)} />}

        {/* Bottom content */}
        <div className="relative flex flex-col items-center justify-center lg:top-64 top-72 gap-1">
          <p className="relative lg:right-28 right-24">
            {credits} - download remains
          </p>

          {/* Input Field is HEre */}
          <div className="flex items-center bg-[#3A3A3C] text-white px-4 py-2 rounded-full w-full max-w-md border  border-[#FFFFFF33]">
            {/* Plus Icon */}
            <button>
              <FaPlus className="mr-2 text-white" />
            </button>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Paste Your Threads URL"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="bg-transparent outline-none flex-1 placeholder-gray-400"
            />

            {/* Send Button */}
            <button
              onClick={() => {
                handleFetchImage();
                handleSubmit();
              }}
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>

          <div className="text-[#FFFFFFDE] text-xs mt-6">
            2025©ThreadSnatch.online
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselDownL;
