const fetcher = async (path: string, init?: RequestInit) => {
  const initParams: RequestInit = {
    ...init,
    headers: init?.headers ?? {},
  };
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      initParams.headers = {
        ...initParams.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  const requestURL = path.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_API_URL}${path}`
    : `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const response = await fetch(requestURL.toString(), initParams);
  if (!response.ok) {
    throw new Error(await response.json().catch(() => ""));
  }

  return response.json().catch(() => "");
};

export default fetcher;
