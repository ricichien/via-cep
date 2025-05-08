// Hook para buscar CEPs
import { useState, useEffect } from "react";
import { API_ROUTES } from "../utils/apiRoutes";

export default function useCeps() {
  const [ceps, setCeps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCeps = async () => {
    try {
      const res = await fetch(API_ROUTES.LIST);
      const data = await res.json();

      if (Array.isArray(data) && data.length === 0) {
        console.log("Lista vazia, sincronizando...");
        await fetch(API_ROUTES.SYNC);
        const resAfterSync = await fetch(API_ROUTES.LIST);
        const syncedData = await resAfterSync.json();
        setCeps(syncedData);
      } else {
        setCeps(data);
      }
    } catch (error) {
      console.error("Erro ao buscar ou sincronizar CEPs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCeps();
  }, []);

  return { ceps, setCeps, loading };
}
