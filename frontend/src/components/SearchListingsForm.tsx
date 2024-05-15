import axios, { AxiosError } from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { ListingsInterface } from "../types";

interface Props {
  setSearchListings: React.Dispatch<React.SetStateAction<ListingsInterface[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setPrevious: React.Dispatch<React.SetStateAction<string>>;
  setNext: React.Dispatch<React.SetStateAction<string>>;
  setSearchFormData: React.Dispatch<React.SetStateAction<{}>>;
}

const SearchListingsForm = ({
  setSearchListings,
  setCount,
  setPrevious,
  setNext,
  setSearchFormData,
}: Props) => {
  const [formData, setFormData] = useState({
    sale_type: "For Sale",
    price: "$0+",
    bedrooms: "0+",
    home_type: "house",
    bathrooms: "0+",
    sqft: "1000+",
    days_listed: "1 or less",
    has_photos: "1+",
    open_house: false,
    keywords: "",
  });

  const {
    sale_type,
    price,
    bedrooms,
    home_type,
    bathrooms,
    sqft,
    days_listed,
    has_photos,
    open_house,
    keywords,
  } = formData;

  const onChange = (e: BaseSyntheticEvent) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://localhost:8000/api/listings/search/",
        {
          sale_type,
          price,
          bedrooms,
          home_type,
          bathrooms,
          sqft,
          days_listed,
          has_photos,
          open_house,
          keywords,
        },
        config
      )
      .then((res) => {
        // console.log(res.data);
        setSearchListings([...res.data.results]);
        setCount(res.data.count);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        setSearchFormData(formData);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid grid-rows-4 grid-flow-col gap-3 md:grid-rows-3 md:gap-5 lg:grid-rows-2 lg:gap-6">
          <div>
            <p className="text-white font-semibold">Sale or Rent</p>
            <select
              name="sale_type"
              onChange={(e) => onChange(e)}
              value={sale_type}
              className="w-full py-1"
            >
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Sqft</p>
            <select
              name="sqft"
              onChange={(e) => onChange(e)}
              value={sqft}
              className="w-full py-1"
            >
              <option>1000+</option>
              <option>1200+</option>
              <option>1500+</option>
              <option>2000+</option>
              <option>Any</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Minimum Price</p>
            <select
              name="price"
              onChange={(e) => onChange(e)}
              value={price}
              className="w-full py-1"
            >
              <option>$0+</option>
              <option>$200,000+</option>
              <option>$200,000+</option>
              <option>$400,000+</option>
              <option>$600,000+</option>
              <option>$800,000+</option>
              <option>$1,000,000+</option>
              <option>$1,200,000+</option>
              <option>$1,500,000+</option>
              <option>Any</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Days Listed</p>
            <select
              name="days_listed"
              onChange={(e) => onChange(e)}
              value={days_listed}
              className="w-full py-1"
            >
              <option>1 or less</option>
              <option>2 or less</option>
              <option>5 or less</option>
              <option>10 or less</option>
              <option>20 or less</option>
              <option>Any</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Bedrooms</p>
            <select
              name="bedrooms"
              onChange={(e) => onChange(e)}
              value={bedrooms}
              className="w-full py-1"
            >
              <option>0+</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
              <option>Any</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Has Photos</p>
            <select
              name="has_photos"
              onChange={(e) => onChange(e)}
              value={has_photos}
              className="w-full py-1"
            >
              <option>1+</option>
              <option>3+</option>
              <option>5+</option>
              <option>10+</option>
              <option>Any</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Home Type</p>
            <select
              name="home_type"
              onChange={(e) => onChange(e)}
              value={home_type}
              className="w-full py-1"
            >
              <option>House</option>
              <option>Condo</option>
              <option>Townhouse</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold">Keywords</p>
            <input
              type="text"
              name="keywords"
              value={keywords}
              onChange={(e) => onChange(e)}
              className="w-full py-1 px-2"
              placeholder="search"
            />
          </div>

          <div>
            <p className="text-white font-semibold">Baths</p>
            <select
              name="bathrooms"
              onChange={(e) => onChange(e)}
              value={bathrooms}
              className="w-full py-1"
            >
              <option>0+</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label className="text-white font-semibold">Open Houses</label>
            <input
              type="checkbox"
              name="open_house"
              onChange={(e) => onChange(e)}
              className="ml-3 w-3.5 h-3.5"
              checked={open_house}
            />
          </div>

          <div>
            <button className="bg-transparent border border-white text-white  hover:bg-gray-400 py-3 px-8 text-lg rounded-md">
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchListingsForm;
