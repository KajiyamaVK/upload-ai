import { ReactNode, createContext, useState } from 'react'

interface IDialogBox {
  title: string
  description: string
  open: boolean
  action?: string
  onAction?: () => void
  cancel?: string
  childrenTrigger?: ReactNode
  onOpenChange?: () => void
  isError?: boolean
}

interface IDialogBoxContext {
  dialogBox: IDialogBox
  showDialogBox: (dialogBox: IDialogBox) => void
  closeDialogBox: () => void
}

export const DialogBoxContext = createContext<IDialogBoxContext>(
  {} as IDialogBoxContext,
)

export function DialogBoxProvider({ children }: { children: ReactNode }) {
  const dialogBoxInitialValues = {
    title: '',
    description: '',
    open: false,
    onAction: () => {
      closeDialogBox()
    },
  }

  const [dialogBox, setDialogBox] = useState<IDialogBox>(dialogBoxInitialValues)

  function closeDialogBox() {
    console.log('onAction not implemented')
    setDialogBox({ ...dialogBox, open: false })
  }

  function showDialogBox(dialogBox: IDialogBox) {
    setDialogBox({ ...dialogBox })
  }

  return (
    <DialogBoxContext.Provider
      value={{ showDialogBox, dialogBox, closeDialogBox }}
    >
      {children}
    </DialogBoxContext.Provider>
  )
}
