import { useEffect, useState } from "react";
import db from "../firebase.config";

const useCollection = (name) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    db.collection(name)
      .get()
      .then((snapshot) => {
        if (mounted) {
          setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { mounted = false; };
  }, [name]);

  return { items, loading, error };
};

export default useCollection;
