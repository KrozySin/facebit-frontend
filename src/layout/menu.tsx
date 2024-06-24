import { LuRocket } from "react-icons/lu";
import { AiTwotoneBank, AiOutlineMoneyCollect } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdLogout, MdLogin } from "react-icons/md";
import { useAuth } from "../hook/useAuth";

const Menu = () => {
  const { balance } = useAuth();
  const iconSize = 30;
  const menus = [
    {
      title: "Play",
      icon: <LuRocket size={iconSize} />,
      url: "/home",
    },
    {
      title: "Deposit",
      icon: <AiTwotoneBank size={iconSize} />,
      url: "/deposit",
    },
    {
      title: "Withdraw",
      icon: <AiOutlineMoneyCollect size={iconSize} />,
      url: "/withdraw",
    },
  ];

  const { isLoggedIn, logout, user } = useAuth();
  console.log();

  return window.location.pathname === "/" ? (
    <></>
  ) : (
    <div className="menu">
      <a className="logo mb-10 text-decoration-none" href="/">
        <img src="./Logo.svg" className="logo" alt="" />
        <label>TESTA BT</label>
      </a>
      {menus.map((item, index) => (
        <a href={item.url} className="menu-item" key={`menu_${index}`}>
          {item.icon}
          <label>{item.title}</label>
        </a>
      ))}
      {isLoggedIn ? (
        <>
          <a className="menu-item mt-auto" href="/" onClick={logout}>
            <MdLogout size={iconSize} />
            <label>Sign Out</label>
          </a>
          <a className="avatar" href="/profile">
            <HiOutlineUserCircle size={iconSize * 1.7} color="#fff" />
            <div className="user-brief">
              <label> {user.userId} </label>
              <span> {balance.toFixed(5)} </span>
            </div>
          </a>
        </>
      ) : (
        <a className="menu-item mt-auto" href="/sign-in">
          <MdLogin size={iconSize} />
          <label>Sign In</label>
        </a>
      )}
    </div>
  );
};

export default Menu;
