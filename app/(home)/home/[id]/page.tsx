import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SimpleDetailedView({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id);

  console.log(data);
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="./home"
        className="inline-flex items-center mb-4 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl"> {data && data[0]?.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg"
              alt="Premium Notebook Set"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <p className="text-gray-600">{data && data[0]?.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">
              {" "}
              ${data && data[0]?.price}
            </span>
            <div className="flex items-center space-x-2">
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Free shipping on orders over $50. 30-day return policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
