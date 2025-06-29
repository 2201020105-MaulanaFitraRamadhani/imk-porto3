// ./supabase-client.js

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://lvobywbpmssawuukzskm.supabase.co'        // Ganti dengan project URL kamu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2b2J5d2JwbXNzYXd1dWt6c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTc4MDAsImV4cCI6MjA2NjY5MzgwMH0.Uk4RXPnrQq5wagaBzfPGH3Tf5qexktRIbHs0ovfXWxE'                // Ganti dengan anon public API key kamu

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
