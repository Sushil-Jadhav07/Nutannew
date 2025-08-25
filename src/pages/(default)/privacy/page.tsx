import PageHeroSection from '@/components/shared/page-hero-section';
import PrivacyPageContent from './privacy-page-content';

export default  function Page() {
  return (
    <>
      <PageHeroSection heroTitle="Privacy Policy" />
      <PrivacyPageContent  />
    </>
  );
}
