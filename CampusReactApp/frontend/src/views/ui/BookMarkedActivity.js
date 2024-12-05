import { useState, useEffect } from "react";

const useBookmarkedActivities = (user) => {
  const [bookmarkedActivities, setBookmarkedActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Exit if user is not available
      try {
        // Fetch bookmarked activities
        const bookmarkedResponse = await fetch(
          `http://localhost:5001/api/v1/user/${user}/bookmarked-activities`
        );
        const bookmarkedData = await bookmarkedResponse.json();
        console.log("Fetched bookmarked activities:", bookmarkedData);

        const bookmarkedList = bookmarkedData.bookmarkedActivities || [];
        setBookmarkedActivities(bookmarkedList); // Update state
      } catch (error) {
        console.error("Error fetching bookmarked activities:", error);
      }
    };

    fetchData();
  }, [user]); // Dependency array ensures it runs when user changes

  return [bookmarkedActivities, setBookmarkedActivities];
};

export default useBookmarkedActivities;
