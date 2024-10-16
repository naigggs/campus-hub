"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard({
  searchParams,
}: {
  searchParams: { searchTerm?: string };
}) {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // New state for editing product
  const supabase = createClient();
  const searchTerm = searchParams.searchTerm || "";

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("products") // Replace with your table name
        .select("*") // Customize the columns you need
        .ilike("title", `%${searchTerm}%`);

      if (data) {
        setProducts(data);
      } else {
        setError("Failed to fetch products");
      }
    };

    fetchData();
  }, []);

  // Delete product function
  const handleDelete = async (productId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products") // Replace with your table name
      .delete()
      .eq("id", productId); // Match the product by id

    if (error) {
      console.error("Error deleting product:", error.message);
      setError("Failed to delete product");
    } else {
      // Remove the deleted product from the UI by filtering it out of the state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    }
  };

  // Update product function
  const handleUpdate = async (updatedProduct: Product) => {
    const { error } = await supabase
      .from("products") // Replace with your table name
      .update({
        title: updatedProduct.title,
        description: updatedProduct.description,
        price: updatedProduct.price,
      })
      .eq("id", updatedProduct.id); // Match by id

    if (error) {
      console.error("Error updating product:", error.message);
      setError("Failed to update product");
    } else {
      // Update the product in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setEditingProduct(null); // Close the dialog after updating
    }
  };

  const handleAddProduct = async () => {
    const { title, description, price } = newProduct;

    if (!title || !description || price <= 0) {
      alert("Please provide valid product details.");
      return;
    }

    const { data, error } = await supabase
      .from("products") // Replace with your table name
      .insert([{ title, description, price }]);

    if (error) {
      console.error("Error adding product:", error.message);
      setError("Failed to add product");
    } else {
      // Update the products state to include the newly added product
      if (data) {
        setProducts((prevProducts) => [...prevProducts, data[0]]);
      }
      setNewProduct({ title: "", description: "", price: 0 }); // Reset the form
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Campus Hub Admin Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative"></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="add-title" className="text-right">
                  Name
                </label>
                <Input
                  id="add-title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="add-description" className="text-right">
                  Description
                </label>
                <Textarea
                  id="add-description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="add-price" className="text-right">
                  Price
                </label>
                <Input
                  id="add-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddProduct}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingProduct(product)} // Open the dialog and set the product to be edited
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="edit-name" className="text-right">
                                Name
                              </label>
                              <Input
                                id="edit-name"
                                value={editingProduct.title}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    title: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="edit-description"
                                className="text-right"
                              >
                                Description
                              </label>
                              <Textarea
                                id="edit-description"
                                value={editingProduct.description}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    description: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="edit-price"
                                className="text-right"
                              >
                                Price
                              </label>
                              <Input
                                id="edit-price"
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    price: parseFloat(e.target.value),
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex justify-end">
                          <Button
                            onClick={() =>
                              editingProduct && handleUpdate(editingProduct)
                            }
                          >
                            Update Product
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)} // Call the delete function on click
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
