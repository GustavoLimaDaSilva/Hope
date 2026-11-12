import { useState } from "react";
import { useGoogleUser, useProfileData } from "../userStore.ts";
import deleteProfile, {
  getNameFirstLetters,
} from "../utils.ts";
import useClickOutside from "../hooks/useClickOutside.tsx";

export default function ProfileArea() {
  const user = useGoogleUser((state) => state.googleUser);
  const setGoogleUser = useGoogleUser((state) => state.setGoogleUser);

  const profileData = useProfileData((state) => state.profileData);
  const setProfileData = useProfileData((state) => state.setProfileData);

  const [showDropdown, setShowDropdown] = useState(false);
  const elRef = useClickOutside<HTMLUListElement>(setShowDropdown);

  if (!user) return;

  return (
    <>
      <li className="profile-area">
        <p className="level-display">{profileData?.level}</p>
        <button
          className="profile-btn"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {getNameFirstLetters(user.displayName)}
        </button>
        {showDropdown && (
          <ul className="dropdown" ref={elRef}>
            <li>
              <button
                className="dropdown-btn danger-zone"
                onClick={() => {
                  reset();
                }}
              >
                Sair
              </button>
            </li>
            <li>
              <button
                onClick={async () => {
                  await deleteProfile(profileData.uid);
                    localStorage.clear();
                    reset();
                  
                }}
                className="dropdown-btn danger-zone"
              >
                Excluir conta
              </button>
            </li>
          </ul>
        )}
      </li>
    </>
  );

  function reset() {
    setGoogleUser(null);
    setProfileData({ uid: "", level: 0 });
    sessionStorage.clear();
    window.location.reload();
  }
}
