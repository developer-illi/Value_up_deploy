export type FetcherResponse<T = unknown> = {
  success?: boolean
  message?: string
  error?: string
  data?: T
}

export type ConfirmDialogOptions = {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export type DialogContextValue = {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>
}
