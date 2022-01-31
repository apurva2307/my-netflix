import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { magic } from "../lib/magic-client";
import styles from "../styles/Login.module.css";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseConfig } from "../lib/firebase-config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const onInputChange = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };
  const handleGoogleSignin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          router.push("/");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        setIsLoading(false);
        setUserMsg("Something went wrong. Try again later.");
      });
  };
  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      //log in a user by their email
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({
          email,
          showUI: false,
        });
        if (didToken) {
          localStorage.setItem("magic", "true");
          router.push("/");
          // const response = await fetch("/api/login", {
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${didToken}`,
          //     "Content-Type": "application/json",
          //   },
          // });
          // const loggedInResponse = await response.json();
          // if (loggedInResponse.done) {
          //   router.push("/");
          // } else {
          //   setIsLoading(false);
          //   setUserMsg("Something went wrong logging in");
          // }
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Something went wrong logging in", error);
        setIsLoading(false);
      }
    } else {
      // show user message
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={onInputChange}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
          <button onClick={handleGoogleSignin} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In with google"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
