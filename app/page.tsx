import { App } from "./App";
import ThemeRegistry from "./ThemeRegistry";
import { StoreProvider } from "./redux/StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <ThemeRegistry>
        <App />
      </ThemeRegistry>
    </StoreProvider>
  );
}
