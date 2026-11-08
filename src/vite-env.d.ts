/// <reference types="vite/client" />

declare module 'page-flip' {
  export interface FlipSetting {
    startPage?: number
    size?: 'fixed' | 'stretch'
    width: number
    height: number
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    drawShadow?: boolean
    flippingTime?: number
    usePortrait?: boolean
    startZIndex?: number
    autoSize?: boolean
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    clickEventForward?: boolean
    useMouseEvents?: boolean
    swipeDistance?: number
    showPageCorners?: boolean
    disableFlipByClick?: boolean
  }

  export interface PageFlipEvent {
    data: number | string | { page: number; mode: string }
    object: PageFlip
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: FlipSetting)
    loadFromImages(images: string[]): void
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void
    destroy(): void
    update(): void
    flipNext(corner?: 'top' | 'bottom'): void
    flipPrev(corner?: 'top' | 'bottom'): void
    flip(page: number, corner?: 'top' | 'bottom'): void
    turnToPage(page: number): void
    turnToNextPage(): void
    turnToPrevPage(): void
    getPageCount(): number
    getCurrentPageIndex(): number
    getOrientation(): 'portrait' | 'landscape'
    on(event: string, callback: (e: PageFlipEvent) => void): void
    off(event: string): void
  }
}
