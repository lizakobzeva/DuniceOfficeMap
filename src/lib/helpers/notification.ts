import { toast, ToastContent, ToastOptions, TypeOptions } from "react-toastify";

const getToastWithType =
  (status: TypeOptions) =>
  (content: ToastContent<unknown>, options?: ToastOptions<unknown>) =>
    toast(content, { type: status, ...options });

export const showErrorNotification = getToastWithType("error");
export const showSuccessNotification = getToastWithType("success");
export const showInfoNotification = getToastWithType("info");
export const showWarningNotification = getToastWithType("warning");
