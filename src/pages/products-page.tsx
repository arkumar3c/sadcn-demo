"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

import productsData from "@/data/products.json"

type Product = (typeof productsData)[number]

const statusLabel: Record<
  Product["status"],
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  in_stock: { label: "In stock", variant: "default" },
  low_stock: { label: "Low stock", variant: "secondary" },
  out_of_stock: { label: "Out of stock", variant: "destructive" },
}

function formatPrice(product: Product) {
  if (product.status === "out_of_stock") return "—"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price)
}

export function ProductsPage() {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return productsData
    return productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:gap-8 md:py-6">
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Browse catalog, SKUs, and availability.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search by name, SKU, category…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <Card className="overflow-hidden">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-base">Product catalog</CardTitle>
            <CardDescription>
              {filtered.length} product{filtered.length === 1 ? "" : "s"}
              {query ? ` matching “${query}”` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px] pl-6">Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px] pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No products match “{query}”.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((product) => {
                    const s = statusLabel[product.status]
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="max-w-[280px] pl-6 font-medium whitespace-normal">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {product.sku}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatPrice(product)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={s.variant}>{s.label}</Badge>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Button variant="ghost" size="sm" disabled>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
