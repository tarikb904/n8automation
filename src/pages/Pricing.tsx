import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for individuals getting started with automation",
    features: [
      "Up to 100 workflow executions/month",
      "Access to 500+ workflows",
      "Basic integrations",
      "Email support",
      "Dashboard analytics",
      "Mobile app access"
    ],
    popular: false,
    icon: Zap,
    buttonText: "Start Free Trial",
    gradient: "from-vision-blue to-blue-500"
  },
  {
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "Ideal for growing teams and businesses",
    features: [
      "Up to 1,000 workflow executions/month",
      "Access to all 2,053+ workflows",
      "Premium integrations",
      "Priority support",
      "Advanced analytics",
      "Team collaboration",
      "Custom webhooks",
      "API access"
    ],
    popular: true,
    icon: Star,
    buttonText: "Upgrade to Pro",
    gradient: "from-vision-purple to-purple-500"
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited workflow executions",
      "Full workflow library access",
      "Custom integrations",
      "24/7 dedicated support",
      "White-label options",
      "Advanced security",
      "Custom deployment",
      "SLA guarantee",
      "Training sessions"
    ],
    popular: false,
    icon: Crown,
    buttonText: "Contact Sales",
    gradient: "from-vision-pink to-pink-500"
  }
];

export default function Pricing() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of automation with our comprehensive n8n workflow collection
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-gradient-primary">
              ✨ 30-day money-back guarantee
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`vision-card border-border/20 relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary/50 glow-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
              )}
              
              <CardHeader className="text-center pb-8 relative">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline justify-center gap-1 pt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button 
                  className={`w-full h-12 font-medium btn-glow ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:opacity-90' 
                      : 'bg-gradient-secondary hover:opacity-90'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="vision-card border-border/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    What are workflow executions?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Each time a workflow runs, it counts as one execution. This includes both manual and automated triggers.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Can I change plans anytime?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Do you offer custom workflows?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enterprise customers get access to custom workflow development and dedicated support.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    What payment methods do you accept?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and offer invoicing for Enterprise customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}