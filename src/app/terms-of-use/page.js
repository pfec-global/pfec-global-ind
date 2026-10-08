import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use | PFEC Global",
  description: "The terms and conditions that apply when you use the PFEC Global website.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        This website is owned and managed by PFEC Global, and the organization will be referred to as “We”, “Our” and
        “Us” in the Terms of Use policy, as well as throughout the site: www.pfecglobal.au
      </p>

      <h2>Conditions</h2>
      <p>
        If you choose to use this website, you would agree to be legally bound by its terms and conditions. The company
        reserves the right to make any alterations or omissions to the website from time to time as it sees fit.
        Anybody who does not wish to be bound by these terms and conditions may not access our website.
      </p>
      <p>
        You must ensure that the personal information you supplement is complete and in due honesty. Please make sure
        all order/registration details (where applicable) contain your accurate details, including your name, address
        and any other relevant information.
      </p>
      <p>
        To find out more about how we handle your personal details, please read our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Lawful Use of Online Materials</h2>
      <p>
        The materials published on our website are meant for private, personal and non-commercial use only (unless
        mentioned otherwise). Any deviations from this rule can result in negative consequences. We have tried our best
        to ensure that our website conforms to all relevant Australian laws. However, we cannot confirm conclusively
        whether the materials on our website are available/ appropriate for use in locations outside Australia.
      </p>

      <h2>Monitoring and Copyright</h2>
      <p>
        The materials published on our website are meant for private, personal and non-commercial use only (unless
        mentioned otherwise). Any deviations from this rule can result in negative consequences.
      </p>
      <p>
        We have tried our best to ensure that our website conforms to all relevant Australian laws. However, we cannot
        confirm conclusively whether the materials on our website are available/ appropriate for use in locations
        outside Australia.
      </p>

      <h2>Availability of Our Website</h2>
      <p>
        We cannot guarantee that our website will run constantly/ without interruptions, or always be exact. We accept
        no liability for the unavailability and technical issues. You must refrain from bypassing security (tampering
        with, hacking, or otherwise disrupting any computer systems, servers, websites, routers or any other
        internet-connected device) and must not attempt to interfere with the functioning of our website.
      </p>
      <p>
        We reserve the right to alter/ suspend/ discontinue any aspect of our website or the content/ services
        available through it (including access privileges). Unless explicitly mentioned, any new features including
        new content and/or the sale of new products and/or the release of new software tools/ resources shall be
        subject to these terms of use.
      </p>
      <p>
        We are committed to preserving the privacy of our users. We take your privacy very seriously and we value your
        usage, and enjoyment of our website without having to compromise your personal space. For more information,
        please see our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
