import { useState } from "react";
import {
  IconLogout,
  IconTextCaption,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../redux/authSlice";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/reviews", label: "Reviews", icon: IconTextCaption },
];

export default function NavbarSimple({ toggle }) {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.link}
      onClick={() => {
        setActive(item.label);
        toggle();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            dispatch(fetchLogout());
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
