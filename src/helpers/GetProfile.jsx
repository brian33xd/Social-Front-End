import { Global } from "./Global";

export const GetProfile = async (userID, setState) => {
  const request = await fetch(Global.url + "user/profile/" + userID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

  const data = await request.json();

  if (data.status == "success") {
    setState(data.userProfile);
  }

  return data;
};
