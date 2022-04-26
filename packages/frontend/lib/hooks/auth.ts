import Router from "next/router";
import { useEffect } from "react";

import useFetch from "./fetching";
import fetcher from "@lib/fetch";

const usePlayerAuth = (redirectTo = "", redirectIfFound = false) => {
  const { data, error, isLoading, mutate } = useFetch("me", {
    revalidateOnFocus: false,
  });
  useEffect(() => {
    if (isLoading || !redirectTo) return;
    if (error && !data && !redirectIfFound) {
      window.localStorage.removeItem("jwt");
      Router.push(redirectTo);
    }
    if (data && !error && redirectIfFound) {
      Router.push(redirectTo);
    }
  }, [isLoading, error, data, redirectTo, redirectIfFound]);

  const login = async (username: string, password: string) => {
    if (typeof window == "undefined") return;

    let response;
    try {
      response = await fetcher(`/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      return true;
    }
    // handle successful login
    window.localStorage.setItem("jwt", response.access_token);
    mutate();
  };
  return {
    isLoading,
    loggedIn: !!data,
    ...(data && { player: data }),
    login,
    mutate,
  };
};

export default usePlayerAuth;
