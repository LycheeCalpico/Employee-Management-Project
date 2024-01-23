import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";
import { logOutUser } from "../../redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const u_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();

  const handleEmployeeProfilesButtonClick = () => {
    navigate("/employee-profile");
  };

  const handleVisaStatusManagementButtonClick = () => {
    navigate("/visa-hr");
  };

  const handleHiringManagementButtonClick = () => {
    navigate("/hiring-management");
  };

  useEffect(() => {
    dispatch(fetchPersonalInformationByUID(u_id)).then((res) => {
      setAvatar(res.payload.profilePicture);
    });
  }, []);

  const handlePersonalInformationButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusButtonClick = () => {
    navigate("/visa");
  };

  const items = [
    {
      key: "1",
      label: <div onClick={() => dispatch(logOutUser())}>Log Out</div>,
    },
  ];

  return (
    <>
      <header className="flex items-center text-base justify-between bg-[#F0F0F0] px-20 py-4 border-b-2">
        <div className="text-3xl flex items-center">Chuwa America</div>
        {user.username !== "hr" && (
          <div className="flex flex-row">
            <button
              type="button"
              onClick={handlePersonalInformationButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Personal Information
            </button>
            <button
              type="button"
              onClick={handleVisaStatusButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Visa Status
            </button>
            <div className="pl-14">
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <img
                  className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                  src="https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.webp"
                />
              </Dropdown>
            </div>
          </div>
        )}

        {user.username === "hr" && (
          <div className="flex flex-row">
            <button
              type="button"
              onClick={handleEmployeeProfilesButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Employee Profile
            </button>
            <button
              type="button"
              onClick={handleVisaStatusManagementButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Visa Status Management
            </button>
            <button
              type="button"
              onClick={handleHiringManagementButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Hiring Management
            </button>
            <div className="pl-14">
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <img
                  className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                  src="https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.webp"
                />
              </Dropdown>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
