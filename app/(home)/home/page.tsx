import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Component() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    return <div>Error loading products</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    className="flex-1"
                    placeholder="Search school supplies..."
                    type="search"
                  />
                  <Button size="icon" type="submit" variant="secondary">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-lg border bg-card text-card-foreground shadow-sm"
                      data-v0-t="card"
                    >
                      <div className="p-6 space-y-4">
                      <Link href={`/home/${product.id}`}>
                        <Image
                          alt={product.name}
                          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                          height={300}
                          src={product.image_url || "/placeholder.svg"}
                          width={300}
                        />
                        </Link>
                        <h3 className="text-2xl font-bold">{product.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="font-bold">${product.price}</div>
                          <Link href={`/home/${product.id}`}>
                          <Button size="sm">View Product</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SchoolStore Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  );
}
