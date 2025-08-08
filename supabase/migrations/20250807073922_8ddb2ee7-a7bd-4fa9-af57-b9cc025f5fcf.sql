-- Add sample workflow data
INSERT INTO public.workflows (name, description, category, complexity, integrations, rating, downloads, price, is_featured) VALUES
('Social Media Automation', 'Automate posting across multiple social media platforms with smart scheduling and content optimization.', 'Social Media', 'intermediate', ARRAY['Facebook', 'Twitter', 'LinkedIn', 'Instagram'], 4.8, 2340, 29.99, true),
('Lead Generation Bot', 'Capture and qualify leads from your website with intelligent chatbot conversations.', 'Lead Generation', 'beginner', ARRAY['Webhooks', 'Email', 'CRM'], 4.6, 1890, 49.99, true),
('Email Marketing Sequences', 'Create automated email sequences that convert visitors into customers.', 'Email Marketing', 'intermediate', ARRAY['Mailchimp', 'SendGrid', 'Webhooks'], 4.7, 1567, 39.99, false),
('E-commerce Order Processing', 'Streamline order fulfillment with automated inventory management and shipping.', 'E-commerce', 'advanced', ARRAY['Shopify', 'WooCommerce', 'Stripe'], 4.9, 2100, 79.99, true),
('Customer Support Automation', 'Provide 24/7 customer support with AI-powered responses and ticket routing.', 'Customer Support', 'intermediate', ARRAY['Zendesk', 'Slack', 'Email'], 4.5, 1234, 59.99, false),
('Data Backup & Sync', 'Automatically backup and sync data across multiple cloud platforms.', 'Data Management', 'beginner', ARRAY['Google Drive', 'Dropbox', 'AWS S3'], 4.4, 987, 19.99, false),
('Invoice Generation', 'Generate and send invoices automatically based on project completion.', 'Finance', 'beginner', ARRAY['QuickBooks', 'PayPal', 'Email'], 4.3, 876, 24.99, false),
('Content Moderation', 'Automatically moderate user-generated content using AI and custom rules.', 'Content Management', 'advanced', ARRAY['OpenAI', 'Webhooks', 'Database'], 4.6, 654, 89.99, false);

-- Update download counts in workflows table when downloads are inserted
CREATE OR REPLACE FUNCTION public.update_workflow_download_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.workflows 
  SET downloads = downloads + 1 
  WHERE id = NEW.workflow_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_download_count
  AFTER INSERT ON public.downloads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_workflow_download_count();