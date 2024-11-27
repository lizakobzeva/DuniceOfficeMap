import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "./lib/config/RouteConfig/RouteConfig";

function App() {
  if (typeof requestIdleCallback !== "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.requestIdleCallback = function (callback) {
      return setTimeout(function () {
        callback({
          didTimeout: false,
          timeRemaining: function () {
            return 50;
          },
        });
      }, 1);
    };

    window.cancelIdleCallback = function (id) {
      clearTimeout(id);
    };
  }

  return (
    <>
      <ToastContainer />
      <RouterProvider router={appRoutersConfig} />
    </>
  );
}

export default App;
