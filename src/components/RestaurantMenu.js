import Shimmer from "./Shimmer";
import { MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  const dispatch = useDispatch();

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.data?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;
  const handleAddItem = (info) => {
    //Dispatch an action
    dispatch(addItem(info));
  };
  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.join(",")}</h2>
      <ul>
        {itemCards.map((res) => {
          return (
            <div className="flex">
              <li key={res.card.info.id}>{res.card.info.name}</li>
              <button onClick={() => handleAddItem(res.card.info)}>
                {" "}
                ++Add
              </button>
            </div>
          );
        })}
      </ul>
      <button>Add</button>
    </div>
  );
};
export default RestaurantMenu;
