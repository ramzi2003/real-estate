import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ListingsInterface } from "../types";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

const Listings = () => {
  const [listings, setListings] = useState<ListingsInterface[]>([]);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/listings/");

        // console.log("response");
        // console.log(res.data);
        setListings([...res.data.results]);
        setCount(res.data.count);
        setPrevious(res.data.previous);
        setNext(res.data.next);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  const next_page = () => {
    if (next === null) {
      return null;
    } else {
      axios
        .get(next)
        .then((res) => {
          setListings([...res.data.results]);
          setNext(res.data.next);
          setPrevious(res.data.previous);
          setActive((active) => active + 1);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  };

  const previous_page = () => {
    if (previous === null) {
      return null;
    }
    axios
      .get(previous)
      .then((res) => {
        setListings([...res.data.results]);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setActive((active) => active - 1);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const visitPage = (page: number) => {
    axios
      .get(`http://localhost:8000/api/listings/?page=${page}`)
      .then((res) => {
        setListings([...res.data.results]);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        setActive(page);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Listings | RealEstate</title>
        <meta name="description" content="Real Estate Listings Page" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-8">
        {listings.map((listing: ListingsInterface, index) => {
          return (
            <Card
              key={index}
              title={listing.title}
              address={listing.address}
              city={listing.city}
              state={listing.state}
              price={listing.price}
              sale_type={listing.sale_type}
              home_type={listing.home_type}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              sqft={listing.sqft}
              photo_main={listing.photo_main}
              slug={listing.slug}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="px-8 pb-8">
        <Pagination
          itemsPerPage={3} // In backend, we have set Pagination to display 3 items per page
          count={count}
          previous_page={previous_page}
          next_page={next_page}
          visitPage={visitPage}
          active={active}
        />
      </div>
    </>
  );
};

export default Listings;
