import { useEffect } from "react";
import axios from "axios";

function OnlineStatus() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const ping = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/auth/ping",
          {},
          { headers }
        );
      } catch (error) {
        console.error("Ping failed:", error);
      }
    };

    const setOffline = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/auth/offline",
          {},
          { headers }
        );
      } catch (error) {
        console.error("Offline failed:", error);
      }
    };

    // Ping pertama
    ping();

    // Heartbeat tiap 30 detik
    const interval = setInterval(ping, 30000);

    // Saat tab/browser ditutup
    window.addEventListener("beforeunload", setOffline);

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "beforeunload",
        setOffline
      );
    };
  }, []);

  return null;
}

export default OnlineStatus;