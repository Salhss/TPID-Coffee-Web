import { useEffect, useState } from "react";
import { menuUrl } from "../urls/url";
import MenuHeader from "../components/menu/MenuHeader";
import { Link, useLocation } from "react-router-dom";

const token = localStorage.getItem("Authorization");

export default function Menu() {
  const [menuArr, setMenuArr] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const { hash } = useLocation();

  const formattedHash = (str) => {
    return str.toLowerCase().replace(" ", "-");
  };

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    const menuData = async () => {
      try {
        const response = await fetch(menuUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ show_all: "1" }),
        });

        if (!response.ok) throw new Error("Failed To Fetch Menu");

        const data = await response.json();
        return data.result;
      } catch (error) {
        return error;
      }
    };

    menuData()
      .then((data) => {
        setMenuArr(() => data.categories);
      })
      .catch(console.log);
  }, []);

  //   console.log( menuArr)
  return (
    <div className=" min-h-dvh font-ubuntu">
      {menuArr.length !== 0 ? (
        <div className=" pt-3">
          <div className="w-full">
            <h1 className=" text-lg text-gray-700 font-semibold uppercase text-center">
              Menu
            </h1>
            <div className="w-full overflow-x-scroll ">
              <div className="categories flex flex-row mt-3">
                {menuArr.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleLinkClick(index)}
                    className={`w-full px-3 py-2 flex justify-center items-center ${
                      activeLink === index ? "border-b-4 border-black" : ""
                    }`}
                  >
                    <Link
                      to={`/menu#${formattedHash(item.category_name)}`}
                      className="text-sm font-medium capitalize text-center text-nowrap "
                    >
                      {item.category_name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
