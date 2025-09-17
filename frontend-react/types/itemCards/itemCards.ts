export interface IContent {
    id: number
    image: {
        src: string
        alt: string
    }
  }

export interface IContentName extends IContent {
  name: string
}

export interface IItemCardDesktop {
    image: {
        src: string
        alt: string
    }
    name: string
    onWidthChange: (width: number) => void
}