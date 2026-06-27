export interface Producto {
  id: number
  slug: string
  nombre: string
  descripcionCorta: string
  descripcion: string
  historia: string
  main_img?: string
  imagenes: string[]
  videoUrl: string
  precio: number
  categoria: string
  subcategoria?: string
  isTop?: boolean
  inGallery?: boolean
}
