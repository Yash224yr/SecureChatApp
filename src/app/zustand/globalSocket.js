import { create } from "zustand";

export const useSocketStore = create((set) => ({
  isConnected: false,
  transport: "N/A",

  // Action to handle connection
  connectSocket: (socket) => {
    if (socket.connected) {
      set((state) => ({
        isConnected: true,
        transport: socket.io.engine.transport.name,
      }));
    }

    const onConnect = () => {
      console.log("Connected...............");

      set({
        isConnected: true,
        transport: socket.io.engine.transport.name,
      });

      // Listen for transport upgrades
      socket.io.engine.on("upgrade", (transport) => {
        set({ transport: transport.name });
      });
    };

    const onDisconnect = () => {
      set({
        isConnected: false,
        transport: "N/A",
      });
    };

    // Socket event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Clean up listeners when necessary
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  },
}));
