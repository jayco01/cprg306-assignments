'use client'
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";
import ShoppingListManager from "@/app/week-9/shopping-list/shopping-list-manager";
import gitHubIcon from "../../public/github-mark/github-mark-white.svg"
import Image from "next/image";

export default function Page() {
  // Use the useUserAuth hook to get the user object and the login and logout functions
  const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();


  // Sign in to Firebase with GitHub authentication
  const signIn = async () =>  {
    try {
      await gitHubSignIn();
    } catch (e) {
      console.error(e.message);
    }

  }

// Sign out of Firebase
  const singOut = async () => {
    try {
      await firebaseSignOut();
    } catch (e) {
      console.error(e.message);
    }
  }

// Display some of the user's information
  const renderUserInfo = () => (
  <div className="flex flex-col justify-end">
    <p className="text-font-size-fluid-1 font-semibold">
      Welcome, {user.displayName} ({user.email})
    </p>
    <button
    className="bg-red-900 font-semibold hover:bg-red-700 border-custom-offWhite border-2 my-4 p-2 self-end cursor-pointer"
      onClick={singOut}>Sign Out
    </button>
  </div>
)

  return (
    <>
      {
        (user === null) ? (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={signIn}
              className="inline-flex items-center gap-3 rounded-md border px-6 py-3 font-semibold text-font-size-fluid-1 hover:bg-custom-darker-green cursor-pointer"
            >
              <Image src={gitHubIcon} alt="GitHub icon" width={28} height={28} />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        ): (
          <ShoppingListManager>{renderUserInfo()}</ShoppingListManager>
        )
      }

    </>
  );
}