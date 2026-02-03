'use client';

import Story from "./components/Story";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <Story />
      </Provider>
    </div>
  );
}
