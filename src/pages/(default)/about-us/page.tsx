import PageHeroSection from '@/components/shared/page-hero-section';
import Container from '@/components/shared/container';
import Heading from '@/components/shared/heading';

export default function AboutUsPage() {
  return (
    <>
      <PageHeroSection heroTitle="About Us" />
      <div className="py-7 lg:py-8 ">
        <Container>
          <div className="w-full p-5 md:p-10  bg-white rounded-md">
            <div className="mb-8 lg:mb-12 last:mb-0 order-list-enable">
              <Heading className="mb-4 lg:mb-6 text-lg" variant="title">About Us</Heading>
              <div className="space-y-5 text-sm leading-7 text-brand-muted lg:text-15px">
                <p>At <strong>Nutan Overseas FZE</strong>, we believe that a gift is more than just a gesture — it’s a reflection of your values, your brand, and your commitment to sustainability.</p>
                <p>Founded in the UAE, Nutan Overseas specializes in <strong>premium, eco-conscious corporate gifting solutions</strong> that are thoughtfully designed to leave a lasting impression. Whether you're welcoming new employees, celebrating client milestones, or curating festive giveaways, we help you deliver meaningful gifts with purpose and style.</p>
                <p>Our catalog features a wide range of <strong>custom-brandable products</strong> made from recycled, biodegradable, and sustainable materials — including RPET, bamboo, cork, wheat straw, and more. From functional office accessories to elegant drinkware and lifestyle sets, every product is chosen with care and responsibility.</p>
                <p>We partner with <strong>trusted manufacturers</strong> and logistics providers to ensure the highest quality standards and timely fulfillment across the <strong>UAE, India, and the GCC</strong>. Whether you're ordering in bulk or creating bespoke gift kits, our end-to-end service ensures a seamless experience — from selection to doorstep delivery.</p>
                <p>At Nutan Overseas, we’re more than a gifting company — we’re your <strong>sustainability partner</strong> in corporate culture.</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}


