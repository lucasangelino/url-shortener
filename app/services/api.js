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
  },
};

export default api;
