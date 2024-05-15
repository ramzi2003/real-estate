import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ListingsInterface } from "../types";
import Card from "../components/Card";
import SearchListingsForm from "../components/SearchListingsForm";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  const [latestListings, setLatestListings] = useState<ListingsInterface[]>([]);
  const [searchlistings, setSearchListings] = useState<ListingsInterface[]>([]);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [active, setActive] = useState(1);
  const [searchFormData, setSearchFormData] = useState({});

  console.log("SearchFormData");
  console.log(searchFormData);
  console.log(searchlistings);

  // Display latest listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/listings/");

        setLatestListings([...res.data.results]);
        // setCount(res.data.count);
        // setPrevious(res.data.previous);
        // setNext(res.data.next);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };

    fetchListings();
  }, []);

  const next_page = () => {
    if (next === null || next === "") {
      return null;
    } else {
      axios
        .post(next, searchFormData)
        .then((res) => {
          setSearchListings([...res.data.results]);
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
    if (previous === null || previous === "") {
      return null;
    }
    axios
      .post(previous, searchFormData)
      .then((res) => {
        setSearchListings([...res.data.results]);
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
      .post(
        `http://localhost:8000/api/listings/search/?page=${page}`,
        searchFormData
      )
      .then((res) => {
        setSearchListings([...res.data.results]);
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
        <title>Home | RealEstate</title>
        <meta name="description" content="Real Estate Home Page" />
      </Helmet>

    
      <div className="bg-slate-700 px-8 py-12 lg:px-12 space-y-6">
        <SearchListingsForm
          setSearchListings={setSearchListings}
          setCount={setCount}
          setPrevious={setPrevious}
          setNext={setNext}
          setSearchFormData={setSearchFormData}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-8">
        {searchlistings.map((listing: ListingsInterface, index) => {
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
      {searchlistings.length !== 0 && (
        <div className="px-8 pb-8 flex justify-center">
          <Pagination
            itemsPerPage={3} // In backend, we have set Pagination to display 3 items per page
            count={count}
            previous_page={previous_page}
            next_page={next_page}
            visitPage={visitPage}
            active={active}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-8">
        {latestListings.map((listing: ListingsInterface, index) => {
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
    </>
  );
};

export default Homepage;
