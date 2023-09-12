import React, {
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

interface RenderAlertProps {
  label: string;
  description?: string;
}

type AlertType = "success" | "error";

interface AlertsToDisplay {
  type: AlertType;
  label: string;
  description?: string;
}

interface AlertFunction {
  [key: string]: (label: string, description?: string) => void;
  success: (label: string, description?: string) => void;
  error: (label: string, description?: string) => void;
}

interface AlertContextType {
  alert: AlertFunction;
}

// Alert renderer
const RenderAlert: React.FC<RenderAlertProps> = ({ label, description }) => {
  const [showAlert, setShowAlert] = useState(true);
  return showAlert ? (
    <div>
      <div className="flex items-center gap-[18px]">
        <button
          type="button"
          onClick={() => setShowAlert(false)}
          className="absolute right-6 h-7 w-7 grid place-content-center border bg-secondary-light dark:bg-bg-dark primary-border-color rounded-[5px]"
        >
          <XMarkIcon className="h-4 w-4 primary-text-color" />
        </button>
        <div>
          <h4 className="text-sm dark:text-white">{label}</h4>
        </div>
      </div>
      {description && (
        <p className="text-sub-200-light dark:text-sub-200-dark text-xs mt-2">
          {description}
        </p>
      )}
    </div>
  ) : null;
};

RenderAlert.defaultProps = {
  description: "",
};

const AlertContext = createContext<AlertContextType>({
  alert: {
    success: () => {},
    error: () => {},
  },
});

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }: { children: React.ReactElement }) => {
  const [alertsToDisplay, setAlertsToDisplay] = useState<AlertsToDisplay[]>([]);

  // Alert object to be iterated over and transformed to adhere to DRY (do not repeat) principle
  const alert: AlertFunction = useMemo(() => {
    return { success: () => {}, error: () => {} };
  }, []);

  // Iterate through the properties of the alert object, converting each property into a function.
  Object.keys(alert).forEach((alertType) => {
    alert[alertType] = (label: string, description = "") => {
      setAlertsToDisplay((prev) => [
        ...prev,
        { type: alertType as AlertType, label, description: description ?? "" },
      ]);
    };
  });

  // Effect to remove each toast after 3 seconds
  useEffect(() => {
    if (alertsToDisplay.length === 0) return;
    setTimeout(
      () => setAlertsToDisplay((prev) => prev.slice(1, prev.length)),
      3000
    );
  }, [alertsToDisplay]);

  const contextValues = useMemo(() => {
    return { alert };
  }, [alert]);
  return (
    <AlertContext.Provider value={contextValues}>
      <AnimatePresence>
        {alertsToDisplay.length > 0 &&
          alertsToDisplay.map((alertObject, index) => (
            <motion.div
              initial={{ y: -100, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: -100, opacity: 0, x: "-50%" }}
              transition={{ type: "linear" }}
              key={String(alertObject.type + index)}
              className={classNames(
                "fixed z-[1000] min-w-[33.438rem] top-4 left-1/2 shadow-md dark:shadow-stroke-dark rounded-[0.313rem] py-4 px-6 pr-8 bg-white dark:bg-bg-dark alert-bounce-on-enter border-b-4",
                alertObject.type === "success"
                  ? "border-dark-brand-color"
                  : "border-danger"
              )}
            >
              <RenderAlert
                label={alertObject.label}
                description={alertObject.description}
              />
            </motion.div>
          ))}
      </AnimatePresence>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
