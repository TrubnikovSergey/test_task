import { useEffect, useState } from "react";
import { Menu } from "antd";
import "./sidemenu.css";

const getMenu = (data) => {
  const menu = data
    .filter((item) => !item.parent)
    .map((item) => {
      const getChildren = (menuItem, listId) => {
        const result = [];

        if (listId.length > 0) {
          for (let i = 0; i < listId.length; i++) {
            const find = data.find((item) => item.id === listId[i]);

            result.push(getChildren(find, find.children));
          }

          return result;
        } else {
          return { label: menuItem.title, key: menuItem.endpoint };
        }
      };

      return { label: item.title, key: item.endpoint, children: item.children.length > 0 ? getChildren(item, item.children) : [] };
    });

  return menu;
};

const SideMenu = () => {
  const [menu, setMenu] = useState([]);

  const handleSelect = (e) => {
    console.log(e);
  };

  useEffect(() => {
    fetch("https://mocki.io/v1/6dfb1b88-f2bd-49d4-858d-ffb7ebe5c287")
      .then((respons) => respons.json())
      .then((data) => {
        setMenu(getMenu(data.categories));
      });
  }, []);

  return <Menu className="menu-wrapper" mode="inline" items={menu} onSelect={handleSelect} />;
};

export default SideMenu;
