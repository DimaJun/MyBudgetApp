import styles from "./HelloPage.module.scss";
import { ReactTyped } from "react-typed";

export const HelloPage = () => {
  return (
    <div className={styles.HelloPage}>
      <ReactTyped
        backSpeed={50}
        strings={["<h1>Welcome to the Budget App</h1>"]}
        showCursor={false}
        typeSpeed={50}
      />
      <ReactTyped
        backSpeed={50}
        strings={[
          "<p>My name is Dima and this is my pet project for my portfolio! <a href='https://github.com/DimaJun'>GitHub</a></p>",
        ]}
        showCursor={false}
        typeSpeed={50}
      />
    </div>
  );
};
