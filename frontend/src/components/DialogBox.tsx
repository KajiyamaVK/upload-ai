import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ReactNode } from 'react'

interface IDialogBox {
  title: string
  description: string
  action?: string
  cancel?: string
  children?: ReactNode
  open: boolean
  onOpenChange?: (open: boolean) => void
  onAction?: () => void

  isError?: boolean
}

export function DialogBox({
  title,
  description,
  action,
  cancel,
  children,
  open,
  onOpenChange,
  onAction,
  isError,
}: IDialogBox) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="p-0 rounded-lg">
        <AlertDialogHeader className="p-0">
          <AlertDialogTitle
            className={isError ? ` text-white bg-red-500 p-5` : ''}
          >
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="p-5">
          {description}
        </AlertDialogDescription>
        <AlertDialogFooter className="p-5">
          {cancel && <AlertDialogCancel>{cancel}</AlertDialogCancel>}
          <AlertDialogAction
            onClick={onAction}
            className={
              isError
                ? 'bg-white text-black hover:text-gray-100 hover:bg-red-500'
                : ''
            }
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
