import RescueDashboard from "./components/RescueDashboard";
import { BGPattern } from "./components/ui/bg-pattern";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-8">
     <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar
  toastClassName="backdrop-blur-lg bg-black/10 text-black border border-white/20"
  style={{ zIndex: 99999}}
/>      <BGPattern
        variant="grid"
        mask="fade-edges"
        size={32}
        className="absolute inset-0 -z-10 opacity-20 "
      />
      <RescueDashboard />
    </div>
  );
}

export default App;
