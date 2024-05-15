import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ListingDetailsInterface, RealtorInterface } from "../types";
import { Helmet } from "react-helmet-async";

const ListingDetail = () => {
  const { id } = useParams();
  const [listingDetails, SetListingDetails] =
    useState<ListingDetailsInterface>(Object);
  const [realtor, setRealtor] = useState<RealtorInterface>(Object);

  const slug = id;

  useEffect(() => {
    // Needs to be authenticated to access listing details
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`http://localhost:8000/api/listings/${slug}/details/`, config)
      .then((res) => {
        // console.log(res);
        SetListingDetails({ ...res.data });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [slug]);

  // Getting realtor details
  useEffect(() => {
    const id = listingDetails.realtor;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (id) {
      axios
        .get(`http://localhost:8000/api/realtor/${id}/`, config)
        .then((res) => {
          console.log(res);
          setRealtor({ ...res.data });
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
  }, [listingDetails.realtor]);

  const displayImages = () => {
    let images = [];

    images.push(
      <div
        key={1}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {listingDetails.photo_1 && (
          <img src={listingDetails.photo_1} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_2 && (
          <img src={listingDetails.photo_2} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_3 && (
          <img src={listingDetails.photo_3} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_4 && (
          <img src={listingDetails.photo_4} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_5 && (
          <img src={listingDetails.photo_5} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_6 && (
          <img src={listingDetails.photo_6} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_7 && (
          <img src={listingDetails.photo_7} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_8 && (
          <img src={listingDetails.photo_8} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_9 && (
          <img src={listingDetails.photo_9} className="h-full w-full" alt="" />
        )}
        {listingDetails.photo_10 && (
          <img src={listingDetails.photo_10} className="h-full w-full" alt="" />
        )}
      </div>
    );

    return images;
  };

  return (
    <>
      <Helmet>
        <title>
          {`${listingDetails.title}`} | Listing Details | RealEstate
        </title>
        <meta name="description" content="Real Estate Listing Details Page" />
      </Helmet>

      <div className="bg-blue-100 text-center py-5 space-y-3">
        <h1 className="text-2xl md:text-4xl">{listingDetails.title}</h1>
        <p className="text-lg">
          {listingDetails.city}, {listingDetails.state},{" "}
          {listingDetails.zipcode}
        </p>
      </div>

      <div className="mt-6 px-6 md:px-12 space-y-8 pb-8">
        {/* breadcrumb */}
        <div className="bg-gray-200 py-3">
          <Link to="/" className="text-blue-500 pl-6 pr-2">
            Home
          </Link>
          /
          <Link to="/listings" className="text-blue-500 pl-2 pr-2">
            Listings
          </Link>
          / {listingDetails.title}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 space-x-8">
          <div className="col-span-2">
            <img src={listingDetails.photo_main} alt="" className="w-full" />
          </div>

          {/* Realtor details */}
          <div className="">
            <img src={realtor.photo} alt="realtor photo" className="w-full" />
            <div className="text-center">
              <h3 className="text-3xl text-teal-700 pt-5">{realtor.name}</h3>
              <p className="text-teal-600 pt-2">{realtor.phone}</p>
              <p className="text-teal-600">{realtor.email}</p>
              <p className="capitalize">{realtor.description}</p>
            </div>
          </div>
        </div>

        {/* Listing Details */}
        <div className="grid grid-cols-2 text-teal-700 font-medium">
          <div>
            <ul>
              <li>Home Type: {listingDetails.home_type}</li>
              <li>Price: ${listingDetails.price}</li>
              <li>Bedrooms: {listingDetails.bedrooms}</li>
              <li>Bathrooms: {listingDetails.bathrooms}</li>
              <li>Square Feet: {listingDetails.sqft}</li>
            </ul>
          </div>
          <div className="">
            <ul>
              <li>Sale Type: {listingDetails.sale_type}</li>
              <li>Address: {listingDetails.address}</li>
              <li>City: {listingDetails.city}</li>
              <li>State: {listingDetails.state}</li>
              <li>Zipcode: {listingDetails.zipcode}</li>
            </ul>
          </div>
        </div>

        <div className="font-medium">
          <p>{listingDetails.description}</p>
        </div>

        {/* Images */}
        {displayImages()}
      </div>
    </>
  );
};

export default ListingDetail;
