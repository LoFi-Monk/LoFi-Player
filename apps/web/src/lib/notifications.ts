import { toast, type ExternalToast } from "sonner";

/**
 * Notification System Abstraction
 * 
 * WHY: Decouples the application logic from the specific UI library (Sonner).
 * Allows for easy refactoring and consistent API usage across the app and future plugins.
 */
export const notify = {
    success: (message: string | React.ReactNode, options?: ExternalToast) => toast.success(message, options),
    error: (message: string | React.ReactNode, options?: ExternalToast) => toast.error(message, options),
    info: (message: string | React.ReactNode, options?: ExternalToast) => toast.info(message, options),
    warning: (message: string | React.ReactNode, options?: ExternalToast) => toast.warning(message, options),
    promise: <T>(
        promise: Promise<T> | (() => Promise<T>),
        data: {
            loading: string | React.ReactNode;
            success: string | React.ReactNode | ((data: T) => string | React.ReactNode);
            error: string | React.ReactNode | ((error: unknown) => string | React.ReactNode);
        },
        options?: ExternalToast
    ) => toast.promise(promise, data, options),
    // Raw access if needed (discouraged for standard plugins)
    custom: (jsx: (id: string | number) => React.ReactNode, options?: ExternalToast) => toast.custom(jsx, options),
    dismiss: (id?: string | number) => toast.dismiss(id),
};
