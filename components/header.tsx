"use client";
import { MenuButton } from "./menu-button";
import Savetool from "./tools/save-tool";
import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <div className="sticky flex justify-between items-center gap-4 px-3 top-0 z-30 h-12">
      <div>
        <div className="flex md:hidden">
          <MenuButton />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <Savetool />
        </div>
        <UserMenu />
      </div>
    </div>
  );
};
