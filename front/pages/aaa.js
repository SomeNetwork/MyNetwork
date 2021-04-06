import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://dev.localhost:3030/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ username: "Goga111", password: "qwerty123" }),
    }).then(async (response) => {
      const data = await response.json();
      const token = data.token;
      return fetch("http://dev.localhost:3030/auth/me", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }).then(async (response) => {
        const data = await response.json();
        setUser(data.me);
      });
    });
  }, []);

  return (
    <>
      <p>Hello, your token:</p>
      {/* <p>{token}</p> */}
      <p>{user?.username}</p>
    </>
  );
}
