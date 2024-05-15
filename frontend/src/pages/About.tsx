import axios from "axios";
import { useEffect, useState } from "react";
import { RealtorInterface } from "../types";
import { Helmet } from "react-helmet-async";
import House from "../assets/images/house1.jpg";

const About = () => {
  const [topSeller, setTopSeller] = useState<RealtorInterface[]>([]);
  const [realtors, setRealtors] = useState<RealtorInterface[]>([]);

  useEffect(() => {
    const getTopSeller = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/realtors/topseller/"
        );

        // console.log(res.data);
        setTopSeller([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getTopSeller();

    const getRealtors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/realtors/");

        // console.log(res.data);
        setRealtors([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getRealtors();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | RealEstate</title>
        <meta name="description" content="Real Estate About Us Page" />
      </Helmet>
      <h1 className="text-3xl md:text-4xl bg-blue-300 text-center py-12">
        About Us
      </h1>
      ;
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 mx-16">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <h2 className="text-2xl text-blue-600">
            We find the perfect home for you
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </p>
          <img src={House} alt="" className="w-full" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Top Seller */}
        <div className="text-center">
          {topSeller.map((seller: RealtorInterface) => (
            <div key={seller.id}>
              <img src={seller.photo} alt="" className="w-full" />
              <div className="text-teal-500">
                <h3 className="text-2xl text-blue-600 pt-5">Our TopSeller</h3>
                <p className="pt-3 text-lg">{seller.name}</p>
                <p>{seller.phone}</p>
                <p>{seller.email}</p>
                <p className="text-black capitalize">{seller.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Team */}
      <div className="my-8 mx-16">
        <h2 className="text-blue-600 text-2xl">Meet our awesome team!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-6">
          {realtors.map((realtor: RealtorInterface) => (
            <div key={realtor.id}>
              <div>
                <img
                  src={realtor.photo}
                  alt=""
                  className="w-full min-h-[17rem] max-h-[17rem] object-cover"
                />
              </div>
              <div className="text-teal-500">
                <h3 className="text-teal-500 pt-3 text-lg">{realtor.name}</h3>
                <p>{realtor.phone}</p>
                <p>{realtor.email}</p>
                <p className="text-black capitalize">{realtor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
