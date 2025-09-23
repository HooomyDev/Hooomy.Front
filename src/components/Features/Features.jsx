import React from "react";
import styles from "./Features.module.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import FeaturesGrid from "../FeaturesGrid/FeaturesGrid";

export default function Features({ items }) {
  return (
    <div className={styles.wrapper} id="features">
      <FeaturesGrid>
        {items.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </FeaturesGrid>
    </div>
  );
}
