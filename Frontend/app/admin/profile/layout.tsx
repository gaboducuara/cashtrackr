import ProfileTabs from '@/app/components/profile/ProfileTabs';
import ClientWrapper from '@/app/components/ui/ClientWrapper';

export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ProfileTabs />
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </>
  );
}