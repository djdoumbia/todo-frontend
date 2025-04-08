import { ReactNode } from 'react';
import { Id, toast, TypeOptions } from 'react-toastify';

type ToastFunction = (element: ReactNode) => Id;
type LoadingToastFunction = (element: ReactNode) => {
  update: (element: ReactNode, type: TypeOptions, isLoading?: boolean) => void,
};

export default function useUiToast(): { loading: LoadingToastFunction, success: ToastFunction, info: ToastFunction, error: ToastFunction, } {
  const loading = (element: ReactNode) => {
    const toastId = toast.loading(element);

    return {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      update: (element: ReactNode, type: TypeOptions, isLoading = false) => {
        toast.update(toastId, {
          render: element, type, isLoading, autoClose: 4000, closeOnClick: true,
        });
      },
    };
  };

  return {
    loading,
    success: (element: ReactNode) => toast.success(element),
    info: (element: ReactNode) => toast.info(element),
    error: (element: ReactNode) => toast.error(element),
  };
}
