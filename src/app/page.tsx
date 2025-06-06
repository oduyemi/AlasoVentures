"use client";
import { Box } from "@chakra-ui/react";
import styles from "./page.module.css";
import { Banner } from "@/components/Home/Banner";
import { Features } from "@/components/Home/Features";
// import { Intro } from "@/components/Home/Intro";
// import { Requirements } from "@/components/Home/Requirements";
import { HomeCollections } from "@/components/Home/Collections";
import { Products } from "@/components/Home/Products";
import { Deals } from "@/components/Home/Deals";
import { AboutSection } from "@/components/Home/About";
import { FeaturedIn } from "@/components/Home/FeaturedIn";
// import { AdBox } from "@/components/Home/AdBox";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <Box>
          <Banner />
          <Features />
          <AboutSection />
          <HomeCollections />
          <FeaturedIn />
          <Products />
          <Deals />
          {/* <Intro />
          <Requirements /> */}
          {/* <AdBox /> */}
        </Box>
      </main>
    </div>
  );
}
