import { Link } from "react-router-dom";
import { ListingsInterface } from "../types";

const Card = (props: ListingsInterface) => {
  return (
    <>
      <div className="bg-[#e0e0e0] px-6 py-4 rounded-md">
        <h3 className="text-lg font-semibold text-teal-700 py-3">
          {props.title}
        </h3>
        <div>
          <img src={props.photo_main} alt="House" className="" />
        </div>
        <p className="pt-3 font-medium">
          {props.address}, {props.city}, {props.state}
        </p>
        <div className="grid grid-cols-2 mt-3 text-lg text-teal-500 font-medium">
          <div>
            <p>Price: ${props.price}</p>
            <p>Bedrooms: {props.bedrooms} </p>
            <p>Bathrooms: {props.bathrooms} </p>
          </div>
          <div className="text-end">
            <p className="text-green-500 font-medium">{props.sale_type}</p>
            <p>{props.home_type} </p>
            <p className="text-black">Sqft: {props.sqft} </p>
          </div>
        </div>

        <div className="py-4">
          <Link
            to={`/listings/${props.slug}`}
            className="bg-transparent border border-teal-500 text-teal-800 py-2 px-3 font-medium hover:bg-teal-400"
          >
            View Listing
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
