'use client'
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";
import ShoppingListManager from "@/app/week-9/shopping-list/shopping-list-manager";




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
    <div>
      <p>
        Welcome, {user.displayName} ({user.email})
      </p>
      <button onClick={singOut}>Sign Out</button>
    </div>
  )

    return (
      <>
        {
          (user === null) ? (
          <button onClick={signIn} className="btn btn-primary">
            sign in
          </button>
          ): (
            <ShoppingListManager>{renderUserInfo()}</ShoppingListManager>
          )
        }

      </>
    );
  }