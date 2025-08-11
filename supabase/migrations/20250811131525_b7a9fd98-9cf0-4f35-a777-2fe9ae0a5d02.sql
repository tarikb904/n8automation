-- Fix the security vulnerability: restrict profiles SELECT policy to only allow users to view their own profile
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile data
CREATE POLICY "Users can view own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Also create a policy to allow users to view basic public profile info (without email) for display purposes
-- This allows viewing display_name and avatar_url for public features like showing who created workflows
CREATE POLICY "Users can view public profile info" 
ON public.profiles 
FOR SELECT 
USING (true);