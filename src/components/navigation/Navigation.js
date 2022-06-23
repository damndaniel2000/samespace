import React, { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { LOAD_CATEGORIES, LOAD_PLAYLISTS } from "../GraphQL/queries";

const Navigation = () => {
  const { data, loading, error } = useQuery(LOAD_CATEGORIES);

  // useEffect(() => {
  //   console.log(data.getPlaylists);
  // }, [data]);
  return (
    <div
      style={{
        width: "15%",
        height: "100%",
        background: "green",
      }}
      onClick={() => console.log(data)}
    >
      This is Navigation
    </div>
  );
};

export default Navigation;
