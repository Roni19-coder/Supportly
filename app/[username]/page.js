import PaymentPage from "@/components/PaymentPage";

const Page = async ({ params }) => {

  const resolvedParams = await params;

  return (
    <PaymentPage username={resolvedParams.username} />
  );
};

export default Page;