import { createClient} from '@supabase/supabase-js'
const supabaseUrl = "https://isrbxeibmoyeoptnqngz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcmJ4ZWlibW95ZW9wdG5xbmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTUyMjEsImV4cCI6MjA5NjgzMTIyMX0.BbfTXyEyYFQcfUQnwUlzvRbFd7ZiARtQxEOZfecDkmY";
export const supabase = createClient(supabaseUrl, supabaseKey);