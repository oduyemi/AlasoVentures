"use client";
import styles from "./page.module.css";
import { Banner } from "@/components/Home/Banner";
import { SocialProof } from "@/components/Home/SocialProof";
import { HomeCollections } from "@/components/Home/Collections";
import { FeaturedVideos } from "@/components/Home/FeaturedVideos";
import { Products } from "@/components/Home/Products";
import { Deals } from "@/components/Home/Deals";
import { AboutSection } from "@/components/Home/About";
import { FeaturedIn } from "@/components/Home/FeaturedIn";
import { Testimonials } from "@/components/Home/Testimonials";
import { WhatsAppCTA } from "@/components/Home/CTA";
import { BlogPreview } from "@/components/Home/Blog";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div>
          <Banner />
          <SocialProof />
          <AboutSection />
          <HomeCollections />
          <WhatsAppCTA />
          <Products />
          <FeaturedVideos />
          {/* Flash sales */}
          <BlogPreview />
          <div id="testimonies">
            <Testimonials />
          </div>
          <FeaturedIn />
          
          
          {/* <Deals /> */}
        </div>
      </main>
    </div>
  );
}
