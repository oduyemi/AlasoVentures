import { AboutUs } from "@/components/About/index";
import { FeaturedIn } from "@/components/Home/FeaturedIn";
import { WhyChooseUs } from "@/components/About/WhyChooseUs";
import { AboutHero } from "@/components/About/Hero";
import { OurStory } from "@/components/About/OurStory";
import { FabricCollections } from "@/components/About/Collections";
import { OurValues } from "@/components/About/Values";
import { WhyUs } from "@/components/About/Why";
import { AboutCTA } from "@/components/About/CTA";



export default function aboutPage () {
 
    return(
        <>
            <AboutHero />
            <OurStory />
            <FabricCollections />
            <OurValues />
            <WhyUs />
            <FeaturedIn />
            <AboutCTA/>
            {/* <AboutUs /> */}
            {/* <WhyChooseUs /> */}
        </>
    )
}