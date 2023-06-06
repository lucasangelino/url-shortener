"use client";
import { useState } from "react";
import api from "./services/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortName, setShortName] = useState("");
  const [shortNameExist, setShortNameExist] = useState(false);
  const [shortNameError, setShortNameError] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { exist } = await api.url.checkIfShortNameExists({ shortName });

    if (exist) {
      setShortNameExist(true);
      return;
    }

    const response = await api.url.short({ url, shortName });
    setShortLink(`${process.env.DOMAIN_URL}${shortName}`);
    setIsLoading(false);
  };

  const handleUrlChange = (url) => {
    setUrl(url);
    setShortNameExist(false);
  };

  const handleShortNameChange = (shortName) => {
    setShortName(shortName);
    setShortNameExist(false);
  };

  return (
    <main className="">
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex min-h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 
                      bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-7xl"
            >
              Acortador de URL
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Acorta tus URL de manera fácil y rápida, con un solo click.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  onChange={(e) => handleUrlChange(e.target.value)}
                  type="text"
                  name="url"
                  readOnly={isLoading}
                  placeholder="Ingresa tu URL"
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <input
                  onChange={(e) => handleShortNameChange(e.target.value)}
                  type="text"
                  name="shortName"
                  readOnly={isLoading}
                  placeholder="Ingresa un nombre corto"
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600"
                  onClick={handleSubmit}
                >
                  Acortar
                </button>
              </div>
              {isLoading && (
                <p className="text-blue-500 my-10">
                  Estamos procesando tu URL, por favor espera...
                </p>
              )}

              {shortNameExist && (
                <p className="text-red-500 my-10">
                  El nombre corto ya existe, por favor intenta con otro.
                </p>
              )}

              {shortLink && (
                <div className="flex flex-col justify-center sm:flex-row gap-4">
                  <input
                    type="text"
                    name="shortLink"
                    value={shortLink}
                    readOnly={true}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <button
                    className="px-4 py-2 rounded-lg bg-blue-600"
                    onClick={() => {
                      navigator.clipboard.writeText(shortLink);
                      setIsCopied(true);
                    }}
                  >
                    {isCopied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
