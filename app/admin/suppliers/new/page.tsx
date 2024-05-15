import SupplierForm from "./SupplierForm";
import { prisma } from "@/prisma/client";

const NewSupplierPage = async () => {
  const terms = await prisma.terms.findMany();
  return (
    <>
      <SupplierForm terms={terms} />
    </>
  );
};

export const dynamic = "force-dynamic";

export default NewSupplierPage;
