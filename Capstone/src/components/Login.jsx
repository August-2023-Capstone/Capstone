import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../supabase";

const Login = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Auth
          supabaseClient={supabase}
          appearance={{
            variables: {
              default: {
                colors: {
                  brand: "black",
                  brandAccent: "#333333",
                  brandButtonText: "white",
                  defaultButtonBackground: "white",
                  defaultButtonBorder: "lightgray",
                  defaultButtonText: "gray",
                  dividerBackground: "#eaeaea",
                  inputBackground: "transparent",
                  inputBorder: "lightgray",
                  inputText: "black",
                  inputPlaceholder: "darkgray",
                },
                space: {
                  spaceSmall: "4px",
                  spaceMedium: "8px",
                  spaceLarge: "16px",
                  labelBottomMargin: "8px",
                  anchorBottomMargin: "30px",
                  emailInputSpacing: "4px",
                  socialAuthSpacing: "4px",
                  buttonPadding: "10px 15px",
                  inputPadding: "10px 70px",
                },
              },
            },
          }}
          theme="default"
          providers={[]}
        />
      </div>
    );
  }
  return null;
};

export default Login;
