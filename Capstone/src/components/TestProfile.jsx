import { useEffect, useState } from "react";
import supabase from "../../../supabase";

const TestProfile = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data, error } = await supabase.from("profiles").select();
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProfileData(data);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profiles List</h1>
      {profileData.map((profile) => (
        <div key={profile.id}>
          {/* Iterate over each property and display its name and value */}
          {Object.keys(profile).map((property) => (
            <p key={property}>
              {property}: {profile[property]}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestProfile;
