"use client";
import Header from "./_components/Header/Header";
import TotalCard from "@components/TotalCard/TotalCard";
import RecentCard from "./_components/RecentCard/RecentCard";
import styles from "../_components/Layout/Layout.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVerified, setIsVerified] = useState("");

  useEffect(() => {
    // Check if the sessionStorage item "verified" is not true
    if (typeof window !== "undefined") {
      const verified = sessionStorage.getItem("verified");
      setIsVerified(verified);
      if (verified === null) {
        window.location.href = "/";
      } else if (verified === "false") {
        window.location.href = "/verify";
      }
    }
  }, []);

  return isVerified === "true" ? (
    <main className={styles.mains}>
      <Header />
      <div className={styles.ColRow}>
        <TotalCard />
        <RecentCard />
      </div>
    </main>
  ) : null;
}
