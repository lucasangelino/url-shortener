"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// services
import api from "./services/api";

// components
import { Loading } from "./components/Loading";
import { PlaceHolder } from "./components/PlaceHolder";
import { Ilustration } from "./components/Ilustration";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortName, setShortName] = useState("");
  const [shortNameExist, setShortNameExist] = useState(true);
  const [shortNameError, setShortNameError] = useState(true);
  const [shortLink, setShortLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { exist } = await api.url.checkIfShortNameExists({ shortName });

    if (exist) {
      setShortNameExist(true);
      setIsLoading(false);
      return;
    }

    const dbResponse = await api.url.short({ url, shortName });
    setShortLink(`${process.env.NEXT_PUBLIC_DOMAIN_URL}${shortName}`);
    setIsFirstRender(false);
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
    <main className="grid grid-cols-2 bg-indigo-400">
      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          {isFirstRender ? (
            "<Ilustration />"
          ) : isLoading ? (
            <Loading />
          ) : (
            <SiteDetails url={url} shortLink={shortLink} />
          )}
        </div>
      </div>
      <div className="min-h-screen bg-[#fed306] p-4">
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <h1 className="text-5xl font-bold text-gray-800">Acortador de URL</h1>
          <p className="text-gray-800 text-center">
            Acorta tus URL de manera fácil y rápida, con un solo click.
          </p>
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <div className="grid grid-cols-4 justify-center items-center gap-4">
              <input
                onChange={(e) => handleUrlChange(e.target.value)}
                type="text"
                name="url"
                placeholder="Ingresa tu URL para acortar"
                className="col-span-4 px-4 py-2 rounded-lg text-gray-600 focus:outline-none focus:ring-2"
              />
              <input
                onChange={(e) => handleShortNameChange(e.target.value)}
                type="text"
                name="shortName"
                placeholder="Ingresa un nombre corto"
                className="col-span-3 px-4 py-2 rounded-lg text-gray-600 focus:outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="col-span-1 px-4 py-2 rounded-lg bg-black text-white"
                onClick={handleSubmit}
              >
                Acortar
              </button>
              {isLoading && <Loading />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const SiteDetails = ({ url, shortLink, siteImg }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  useEffect(() => {
    const getSiteImg = async () => {
      const { img } = await api.url.getSiteImg({ url });
      setSiteImg(img);
    };

    if (url) {
      getSiteImg();
    }
  }, [url]);

  return (
    <div className="w-1/2 p-4 border border-gray-200 rounded shadow md:p-6">
      <div className="flex items-center justify-center h-72 mb-4 bg-gray-300 rounded ">
        {isImgLoading ? (
          <div
            role="status"
            className="flex items-center justify-center h-72 mb-4 bg-gray-300 rounded animate-pulse"
          ></div>
        ) : (
          <img
            className="object-fit w-full h-full"
            src={siteImg}
            alt={`screenshot of ${shortLink} site`}
          />
        )}
      </div>

      <input
        type="text"
        name="shortLink"
        value={shortLink}
        readOnly={true}
        className="px-4 border border-blue-300 my-2 py-2 rounded-lg bg-gray-100 text-black focus:outline-none w-full"
      />
      <button
        className="px-4 py-2 rounded-lg bg-black w-full text-white"
        onClick={(content) => {
          navigator.clipboard.writeText(shortLink);
          setIsCopied(true);
        }}
      >
        {isCopied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
};
