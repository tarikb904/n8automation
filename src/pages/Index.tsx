import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">BotLibrary</h1>
          </div>
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold text-foreground leading-tight">
              Automate Everything with
              <span className="text-primary"> n8n Workflows</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, download, and deploy powerful automation workflows. 
              Transform your business processes with our curated collection of n8n automations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/workflows">
              <Button size="lg" className="text-lg px-8 py-3">
                Browse Workflows <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Ready-to-Use</h3>
              <p className="text-muted-foreground">
                Pre-built workflows that you can deploy immediately
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly integrate with your existing tools and services
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Scalable</h3>
              <p className="text-muted-foreground">
                From simple tasks to complex business processes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
