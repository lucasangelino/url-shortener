"use client";

import React from "react";
import { redirect } from "next/navigation";
import api from "../services/api";

export default function Redirect({ params }) {
  const { url } = params;

  React.useEffect(() => {
    const getBaseUrl = async () => {
      const { baseUrl } = await api.url.baseUrl({ shortName: url });
      window.location.href = await baseUrl;
    };

    if (url) {
      getBaseUrl();
    }
  }, []);

  return (
    <main>
      <h1>{`Estas siendo redirigido a... ${url}`}</h1>
    </main>
  );
}
