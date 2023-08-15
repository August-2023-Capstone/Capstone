import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xwwttbfzxqaqktprhofr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3d3R0YmZ6eHFhcWt0cHJob2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NTM1ODIsImV4cCI6MjAwNjEyOTU4Mn0.bO1agK1s4kn88opbxgOC1pZD6OZ4gAQlZkYSugEXoSI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
