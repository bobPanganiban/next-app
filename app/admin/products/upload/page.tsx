import ItemsTable from "./ItemsTable";
import { prisma } from "@/prisma/client";

const UploadPage = async () => {
  const suppliers = await prisma.suppliers.findMany();
  const brands = await prisma.brands.findMany();
  return (
    <div>
      <ItemsTable suppliers={suppliers} brands={brands} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default UploadPage;
