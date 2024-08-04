// frontend/src/hooks/useFirestoreData.js

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const useFirestoreData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const docsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(docsData);
            } catch (error) {
                console.error("Error fetching Firestore data: ", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [collectionName]);

    return { data, loading };
};

export default useFirestoreData;
