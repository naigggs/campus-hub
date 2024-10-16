import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <main className="flex-1">
      <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Input className="flex-1" placeholder="Search school supplies..." type="search" />
                  <Button size="icon" type="submit" variant="secondary">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Notebook set"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Spiral Notebook Set</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pack of 5 college-ruled notebooks with durable covers.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$12.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Pencil set"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Mechanical Pencil Set</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set of 10 mechanical pencils with extra lead and erasers.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$8.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Backpack"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Student Backpack</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Durable backpack with multiple compartments and padded straps.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$34.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Calculator"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Scientific Calculator</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Advanced scientific calculator for math and science classes.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$19.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Art set"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Art Supply Set</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive set including colored pencils, markers, and sketchpad.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$24.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="p-6 space-y-4">
                      <Image
                        alt="Planner"
                        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                        height={300}
                        src="/placeholder.svg"
                        width={300}
                      />
                      <h3 className="text-2xl font-bold">Student Planner</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Academic year planner with monthly and weekly views.</p>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">$15.99</div>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SchoolStore Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}