import { Heading } from "@radix-ui/themes";
import ProductForm from "./ProductForm";
import { prisma } from "@/prisma/client";

const NewProductPage = async () => {
  const suppliers = await prisma.suppliers.findMany();
  const brands = await prisma.brands.findMany();
  const units = await prisma.units.findMany();

  return (
    <div className="flex-row max-w-[1000px]">
      <Heading>New Product</Heading>
      <ProductForm suppliers={suppliers} brands={brands} units={units} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default NewProductPage;
