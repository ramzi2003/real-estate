import { Link } from "react-router-dom";
import { ListingsInterface } from "../types";

const Card = (props: ListingsInterface) => {
  return (
    <>
      <div className="bg-slate-900 text-white px-6 py-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white py-3">
          {props.title}
        </h3>
        <div>
          <img src={props.photo_main} alt="House" className="rounded" />
        </div>
        <p className="pt-3 font-medium text-gray-400">
          {props.address}, {props.city}, {props.state}
        </p>
        <div className="grid grid-cols-2 mt-3 text-lg text-white font-medium">
          <div>
            <p>Price: ${props.price}</p>
            <p>Bedrooms: {props.bedrooms} </p>
            <p>Bathrooms: {props.bathrooms} </p>
          </div>
          <div className="text-end">
            <p className="text-red-600 font-medium">{props.sale_type}</p>
            <p>{props.home_type} </p>
            <p className="text-white">Sqft: {props.sqft} </p>
          </div>
        </div>

        <div className="py-4">
          <Link
            to={`/listings/${props.slug}`}
            className="bg-transparent border border-white rounded-md text-white py-2 px-3 font-medium hover:bg-gray-600"
          >
            View Listing
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
