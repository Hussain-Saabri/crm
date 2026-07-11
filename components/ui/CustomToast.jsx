import { Check, X, Lightbulb, AlertCircle } from "lucide-react";

const styles = {
  success: {
    wrapper: "bg-gradient-to-r from-green-50 to-white border-green-400",
    iconBg: "bg-green-500",
    title: "Congratulations!",
    Icon: Check
  },
  error: {
    wrapper: "bg-gradient-to-r from-red-50 to-white border-red-400",
    iconBg: "bg-red-500",
    title: "Something went wrong!",
    Icon: X
  },
  info: {
    wrapper: "bg-gradient-to-r from-blue-50 to-white border-blue-400",
    iconBg: "bg-blue-500",
    title: "Did you know?",
    Icon: Lightbulb
  },
  warning: {
    wrapper: "bg-gradient-to-r from-yellow-50 to-white border-yellow-400",
    iconBg: "bg-yellow-500",
    title: "Warning!",
    Icon: AlertCircle
  }
};

export default function CustomToast({
  type = "success",
  title,
  description,
  onClose
}) {
  const s = styles[type] || styles.success;
  const Icon = s.Icon;

  return (
    <div className={`w-full max-w-[380px] sm:w-[350px] rounded-xl border ${s.wrapper} p-3 flex items-start gap-4 shadow-sm relative`}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-[10px] hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <X size={18} />
      </button>

      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${s.iconBg} text-white mt-0.5`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>

      <div className="flex-1 pr-6">
        <h3 className="font-bold text-gray-900 text-[14px]">
          {title || s.title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}