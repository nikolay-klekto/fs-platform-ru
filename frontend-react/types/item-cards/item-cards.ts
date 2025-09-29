export interface IItemCardImage{
    id: number
    image: {
        src: string
        alt: string
    }
  }

export interface IItemCardDesktop {
    image: {
        src: string
        alt: string
    }
    name: string
    onWidthChange: (width: number) => void
}