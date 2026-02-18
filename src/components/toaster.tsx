import { type ToastType, useToaster } from "react-hot-toast/headless";
import { clsx } from "@/helpers/string";
import Alert, { type AlertType } from "./alert";

const Toaster = () => {
	const { toasts, handlers } = useToaster();
	const { startPause, endPause, calculateOffset, updateHeight } = handlers;

	const toastAlertMap: Record<ToastType, [AlertType, string]> = {
		success: ["success", "提示"],
		error: ["danger", "错误"],
		loading: ["info", "提示"],
		blank: ["info", "提示"],
		custom: ["info", "提示"],
	};

	return (
		<div
			className="fixed right-3 bottom-3 z-50 w-64"
			onMouseEnter={startPause}
			onMouseLeave={endPause}
		>
			{toasts.map((toast) => {
				const [type, title] = toastAlertMap[toast.type];
				const offset = calculateOffset(toast, {
					gutter: 8,
				});

				const isHeightInited = !!toast.height;
				const initHeight = (el: HTMLDivElement) => {
					if (el && typeof toast.height !== "number") {
						const height = el.getBoundingClientRect().height;
						updateHeight(toast.id, height);
					}
				};

				return (
					<Alert
						key={toast.id}
						ref={initHeight}
						type={type}
						title={title}
						description={toast.message}
						className={clsx(
							"absolute bottom-0 right-0 w-full",
							toast.visible ? "opacity-100" : "opacity-0",
						)}
						style={{
							transform: `translateX(${toast.visible ? 0 : "100%"}) translateY(${isHeightInited ? -offset : 128}px)`,
						}}
					/>
				);
			})}
		</div>
	);
};

export default Toaster;
