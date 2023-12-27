import { useEffect, useState } from "react";
import UserCard from "../components/home/UserCard";
import { homeUrl } from "../urls/url";
import Carousel from "../components/home/Carousel";

const token = localStorage.getItem("Authorization");

export default function Home() {
  const [userGreet, setUserGreet] = useState();

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch(homeUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) throw new Error("Faild to fetch userData");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    userData()
      .then((data) => {
        setUserGreet(() => data.result);
      })
      .catch(console.log);
  }, []);

  return (
    <div className=" min-h-dvh font-ubuntu">
      {userGreet ? (
        <UserCard user={userGreet}/>
      ) : (
        <p>Loading User Data...</p>
      )}
      {userGreet ? (
          <Carousel banner={userGreet.banner}/>
      ) : (
        <p>Loading Banner...</p>
      )}
    </div>
  );
}
