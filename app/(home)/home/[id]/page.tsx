import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SimpleDetailedView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="./home" className="inline-flex items-center mb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Premium Notebook Set</CardTitle>
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
          <p className="text-gray-600">
            A set of high-quality, durable notebooks perfect for students and professionals alike. 
            Each notebook features 100 pages of smooth, acid-free paper that's perfect for writing 
            with any type of pen or pencil.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">$24.99</span>
            <div className="flex items-center space-x-2">
              <Label htmlFor="quantity" className="sr-only">
                Quantity
              </Label>
              <Input
                type="number"
                id="quantity"
                defaultValue="1"
                min="1"
                className="w-20"
              />
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
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
  )
}