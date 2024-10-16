import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Package } from "lucide-react"
import Link from "next/link"

// Mock data for order history
const orderHistory = [
  {
    id: "ORD001",
    date: "2023-09-01",
    total: 45.99,
    items: [
      { name: "Spiral Notebook Set", quantity: 2 },
      { name: "Mechanical Pencil Set", quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    date: "2023-09-15",
    total: 89.97,
    items: [
      { name: "Scientific Calculator", quantity: 1 },
      { name: "Student Backpack", quantity: 1 },
    ],
  },
  {
    id: "ORD003",
    date: "2023-09-30",
    total: 32.50,
    items: [
      { name: "Art Supply Set", quantity: 1 },
      { name: "Student Planner", quantity: 1 },
    ],
  },
]


console.log(process.env.PAYPAL_CLIENT_ID)
export default function OrderHistory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <div className="space-y-6">
        {orderHistory.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
              <CardDescription>Placed on {order.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/order/${order.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {orderHistory.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600">No orders yet</p>
            <p className="text-gray-500 mt-2">When you place an order, it will appear here.</p>
            <Button className="mt-4" asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}