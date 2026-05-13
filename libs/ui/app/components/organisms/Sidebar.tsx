import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'

export interface ISidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  blur?: boolean
}

export const Sidebar = ({
  open,
  setOpen,
  children,
  blur = true,
}: ISidebarProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-hidden"
        onClose={() => setOpen(false)}
      >
        {blur ? (
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          </TransitionChild>
        ) : null}

        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex flex-col w-screen max-w-sm bg-black border-l border-white/10 p-8">
              <div className="flex justify-end mb-8">
                <button
                  type="button"
                  className="p-2 text-white/50 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <IconX className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 flex flex-col">
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
