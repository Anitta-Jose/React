import { IMG_CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resName, cuisine, image } = props;
  return (
    <div className="m-4 p-4 w-[300px] bg-gray-100 hover:bg-gray-300">
      <img className="res-logo" src={IMG_CDN_URL + image} />
      <h3 className="font-bold text-lg">{resName}</h3>
      <h4>{cuisine.join(",")} </h4>
      <h4>4.4 starts</h4>
      <h4>38 minutes</h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantCard {...props}></RestaurantCard>
      </div>
    );
  };
};

export default RestaurantCard;
