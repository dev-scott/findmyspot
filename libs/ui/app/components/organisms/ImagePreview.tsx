import { BaseComponent } from '@findmyspot/util/types'
import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'

export interface IImageUploadProps extends BaseComponent {
  srcs?: FileList
  clearImage: () => void
}

export const ImagePreview = ({
  srcs,
  clearImage,
  children,
}: IImageUploadProps) => {
  if (srcs && srcs?.length > 0) {
    return (
      <div className="relative group">
        <div className="grid grid-cols-2 gap-3">
          {Array.from(srcs)?.map((src, index) => (
            <div key={index} className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                className="object-cover h-full w-full grayscale hover:grayscale-0 transition-all duration-700"
                alt=""
                width={300}
                height={300}
                src={URL.createObjectURL(src)}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => clearImage()}
            className="pointer-events-auto bg-red-500 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex gap-2 items-center hover:bg-red-600 active:scale-95 transition-all shadow-2xl"
          >
            <IconTrash size={16} stroke={3} /> Clear all
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-gray-200 hover:border-primary transition-colors duration-300 bg-gray-50/50">
      {children}
    </div>
  )
}
