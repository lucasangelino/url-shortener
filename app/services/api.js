import { supabase } from "../lib/supabaseClient";

const api = {
  url: {
    short: async ({ url, shortName }) => {
      const { data, error } = await supabase
        .from("urls")
        .insert({ base_url: url, short_name: shortName });
      return { data, error };
    },
    baseUrl: async ({ shortName }) => {
      const { data, error } = await supabase
        .from("urls")
        .select("base_url")
        .eq("short_name", shortName);
      return { baseUrl: data[0].base_url, error };
    },
    checkIfShortNameExists: async ({ shortName }) => {
      const { data, error } = await supabase
        .from("urls")
        .select("short_name")
        .eq("short_name", shortName);
      const exist = data.length > 0;
      return { exist, error };
    },
    getScreenshot: async ({ paramUrl, width = 1080, height = 920 }) => {
      const url = `https://website-screenshot6.p.rapidapi.com/screenshot?url=
      ${paramUrl}
      &width=${width}
      &height=${height}
      &fullscreen=false`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "70fd5bc58amsh8fd2d70064710b7p1a2c52jsn71a21b3a7137",
          "X-RapidAPI-Host": "website-screenshot6.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const { screenshotUrl } = await response.json();
      return screenshotUrl;
    },
  },
};

export default api;
