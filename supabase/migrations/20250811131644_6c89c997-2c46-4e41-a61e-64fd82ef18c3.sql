-- Remove the problematic view and keep the simple, secure approach
DROP VIEW IF EXISTS public.public_profiles;

-- The profiles table now has proper RLS with the "Users can view own profile only" policy
-- This securely restricts email access to the profile owner only
-- Applications that need to display basic info like display_name can be updated to 
-- only show this for the current user's own profile or ask for explicit sharing permissions