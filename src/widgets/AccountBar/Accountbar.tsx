import cls from "./AccountBar.module.scss";
import ArrowIcon from "../../shared/assets/Icons/arrow.svg";
import { useState } from "react";
import { ArrowDropdown } from "../../shared/ui/ArrowDropdown/ArrowDropdown";

interface AccountBarProps {
  text: string;
  avatar: string;
}

export const AccountBar = (props: AccountBarProps) => {
  const { text, avatar } = props;
  return (
    <div className={cls.accountBar}>
      <img className={cls.avatar} src={avatar} alt="avatar" />
      <p>{text}</p>
      <ArrowDropdown
        items={[
          { text: "Logout", href: "/logout" },
          { text: "Profile", href: "/profile" },
          { text: "Settings", href: "/settings" },
        ]}
      />
    </div>
  );
};
