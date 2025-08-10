import { Edit, EllipsisVertical, Star, Trash } from "lucide-react"
import EditForm from "./EditForm"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

interface Product {
  id: number
  food_name: string
  food_rating: string
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: string
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [editItem, setEditItem] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://a2sv-api.b3trtransit.com/api/products')
        setProducts(response.data)
        setLoading(false)
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch products'
        toast.error(errorMessage)
        setLoading(false)
      }
    }
    fetchProducts()
  }, []);

  // Handle delete product
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/products/${id}`)
      setProducts(products.filter((product) => product.id !== id))
      toast.success('Product deleted successfully!')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product'
      toast.error(errorMessage)
    }
  }

  return (
    <div>
      {editItem !== null && (
        <EditForm
          trigger={editItem !== null}
          setTrigger={() => setEditItem(null)}
          productId={editItem}
        />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6 py-10">
        {loading ? (
          <div>Loading products...</div>
        ) : products.length === 0 ? (
          <div>No products found</div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="card rounded-xl">
              <div className="image h-[300px] overflow-hidden rounded-2xl">
                <img
                  src={product.food_image}
                  alt={product.food_name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="content py-3 relative">
                <div className="absolute top-0 right-0 py-3 group">
                  <EllipsisVertical />
                  <div className="absolute bottom-0 right-0 h-max w-[150px] bg-white shadow rounded-xl overflow-hidden group-hover:block hidden">
                    <div
                      className="flex items-center gap-2 p-1.5 px-4 border-b hover:bg-orange-400 hover:text-white cursor-pointer"
                      onClick={() => setEditItem(product.id)}
                    >
                      <div className="icon">
                        <Edit />
                      </div>
                      <div className="text">Edit</div>
                    </div>
                    <div
                      className="flex items-center gap-2 p-1.5 px-4 hover:bg-red-500 hover:text-white cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      <div className="icon">
                        <Trash />
                      </div>
                      <div className="text">Delete</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-[60px] w-[60px] rounded-2xl overflow-hidden">
                    <img
                      src={product.restaurant_logo}
                      alt={product.restaurant_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="content" style={{ width: "calc(100% - 60px)" }}>
                    <div className="name">{product.food_name}</div>
                    <div className="rating flex items-center gap-1 text-orange-600">
                      <Star fill="orange" className="text-orange-400" />
                      <span>{product.food_rating}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`py-1.5 px-3 rounded-xl font-medium w-max my-3 ${
                    product.restaurant_status === 'open'
                      ? 'bg-green-300 text-green-600'
                      : 'bg-red-300 text-red-600'
                  }`}
                >
                  {product.restaurant_status.charAt(0).toUpperCase() + product.restaurant_status.slice(1)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductGrid