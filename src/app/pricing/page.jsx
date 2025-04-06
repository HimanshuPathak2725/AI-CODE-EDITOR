import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";

async function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Simple Code Editor</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-center mb-8">
            A streamlined code editor experience without login requirements
          </p>
          
          <div className="grid gap-8 my-12">
            <FeatureCategory title="Features">
              {FEATURES.map((feature) => (
                <FeatureItem 
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </FeatureCategory>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;
