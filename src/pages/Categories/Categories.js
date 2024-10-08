import { useState, useEffect } from "react";

import styles from "./Categories.module.scss";

import manageIcon from "../../assets/icons/plus.svg";

import { CategoriesModal } from "./components/CategoriesModal";

import "react-toastify/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  const notify = (msg) =>
    toast(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
  
  const handleAddCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      notify("Such a category already exists!");
      return;
    }

    const newCategories = [...categories, categoryName];
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setIsModalOpen(false);
    notify(`Category '${categoryName.length > 20 ? categoryName.slice(0,21)+".." : categoryName}' was successfully added!`)
  };

  const handleDeleteCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      let answer = window.confirm(
        `Do you really want to delete a category '${categoryName.length > 20 ? categoryName.slice(0,21)+".." : categoryName}'?`
      );
      if (answer) {
        const updatedCategories = categories.filter(
          (item) => item !== categoryName
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        notify(`Category '${categoryName.length > 20 ? categoryName.slice(0,21)+".." : categoryName}' successfully deleted!`)
      } else {
        console.log('Удаление отменено!')
      }
    } else {
      console.error("Элемент не был найден");
    }
  };

  return (
    <div className={styles.Categories}>
      <div className="wrapper">
        <div className={styles.CategoriesWrapper}>
          <h2 className={styles.CategoriesTitle}>Categories</h2>
          <p className={styles.CategoriesDelete}>You can click on a category to delete it</p>
          <ul className={styles.CategoriesList}>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li
                  key={index}
                  className={styles.CategoriesListItem}
                  title={category}
                  onClick={() => handleDeleteCategory(category)}
                >
                  {category.length > 20
                    ? `${category.slice(0, 21)}..`
                    : category}
                </li>
              ))
            ) : (
              <li className={`${styles.CategoriesListItem} ${styles.noCategories}`}>
                No categories available
              </li>
            )}
          </ul>
          <button
            className={styles.CategoriesOpenModal}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={manageIcon} alt="add category" width={25} height={25} />
            <span>Add category</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CategoriesModal
          onAddCategory={handleAddCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};
