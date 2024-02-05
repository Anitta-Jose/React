import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "./../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  console.log(listOfRestaurants);
  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dataList = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    const dataJson = await dataList.json();
    setListOfRestaurants(
      dataJson?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      dataJson?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  if (listOfRestaurants.length == 0) {
    return <Shimmer />;
  }

  if (onlineStatus === false) return <h1>You are offline !</h1>;

  return (
    <div className="body">
      <div className="flex">
        <div className="m-4 p-4 flex items-center">
          <input
            type="text"
            className="border border-solid border-black "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
        </div>
        <div className="m-4 p-4">
          <button
            className="px-4 py-2 bg-gray-100"
            onClick={() => {
              const filterData = listOfRestaurants.filter((restaurant) =>
                restaurant?.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase())
              );

              setFilteredRestaurants(filterData);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4">
          <button
            className="px-4 py-2 bg-green-100"
            onClick={() => {
              const resFiltered = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setListOfRestaurants(resFiltered);
            }}
          >
            Top Rated Restaurants
          </button>{" "}
        </div>
        <div className="m-4 p-4">
          <input
            type="text"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((item) => (
          <Link key={item.info.id} to={"/restaurant/" + item.info.id}>
            <RestaurantCard
              resName={item.info.name}
              cuisine={item.info.cuisines}
              image={item.info.cloudinaryImageId}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
