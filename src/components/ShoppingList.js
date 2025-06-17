import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [itemList, setItemList] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleNewItem(newItem) {
    setItemList([...itemList, newItem]);
  }
  const itemsToDisplay = itemList.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchCategory && matchesSearch ? true : false;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleNewItem} />
      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        search={searchText}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map(({ id, name, category }) => (
          <Item key={id} name={name} category={category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
