import { useCallback } from "react";

function useHttp() {
  const sendContactData = useCallback(async (contactDetails) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  });

  return {
    sendContactData,
  };
}

export default useHttp;
