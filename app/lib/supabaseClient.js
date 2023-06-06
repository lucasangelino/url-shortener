import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mrfozwtoyzvwlazgezzc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZm96d3RveXp2d2xhemdlenpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5OTM3ODEsImV4cCI6MjAwMTU2OTc4MX0.rc10OctR5lObHvB4EXxydleX0VvHhI4StPjJnMxYSxY"
);
