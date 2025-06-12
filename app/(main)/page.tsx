import HeroSection from "@/components/sections/hero-section";
import DashboardPreview from "@/components/sections/dashboard-preview";
import ExportAnalytics from "@/components/sections/export-analytics";
import ProductCharts from "@/components/sections/product-charts";
import VideoSection from "@/components/sections/video-section";
import NetworkStats from "@/components/sections/network-stats";
import CTASection from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <DashboardPreview />
      <ExportAnalytics />
      <ProductCharts />
      <VideoSection />
      <NetworkStats />
      <CTASection />
    </div>
  );
}