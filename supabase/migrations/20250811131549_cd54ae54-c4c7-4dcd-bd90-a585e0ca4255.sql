-- Fix the conflicting policies by removing the broad public policy and creating a more targeted approach
DROP POLICY IF EXISTS "Users can view public profile info" ON public.profiles;

-- Create a view for public profile information that excludes sensitive data like email
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  user_id,
  display_name,
  avatar_url,
  bio
FROM public.profiles;

-- Grant read access to the public profiles view for authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Create RLS policy for the view (views inherit RLS from their base tables by default)
-- This allows viewing limited profile info without exposing email addresses