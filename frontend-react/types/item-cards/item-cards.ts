export interface IItemCardImage{
    id: number
    image: {
        src: string
        alt: string
    }
  }

export interface IItemCardImageName extends IItemCardImage {
    name: string
}



export interface IItemCard{
    image: {
        src: string
        alt: string
    }
    name: string
    onWidthChange: (width: number) => void
}