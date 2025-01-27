import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchOutlined, NotificationsNone } from "@mui/icons-material";
import { Badge, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SignOut from "../pages/Authentication/SignOut";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DashboardHeader = ({ setActiveItem }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUnreadMessages = async () => {
            try {
                const response = await fetch("/api/contact/newMessageCount");
                const data = await response.json();
                setUnreadMessagesCount(data.count);
            } catch (err) {
                console.error("Error fetching unread messages:", err);
            }
        };

        fetchUnreadMessages();

        const interval = setInterval(fetchUnreadMessages, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsClick = () => {
        setActiveItem(3); 
        navigate("/admin");
    };

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <CalendarViewDayIcon className="text-blue-600" />
                        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
                            Hello, <span className="text-blue-600">{currentUser.username}</span>
                            <span className="ml-2">
                                <EmojiPeopleIcon className="text-yellow-500" />
                            </span>
                        </h1>
                    </div>

                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search here"
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <IconButton color="primary" onClick={handleNotificationsClick}>
                            <Badge badgeContent={unreadMessagesCount} color="error">
                                <NotificationsNone />
                            </Badge>
                        </IconButton>

                        <div className="relative">
                            <Avatar
                                src={currentUser.avatar}
                                alt={currentUser.username}
                                className="cursor-pointer"
                                onClick={handleClick}
                            />
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to="/profile" className="flex items-center">
                                        <Avatar
                                            src={currentUser.avatar}
                                            alt={currentUser.username}
                                            className="w-6 h-6 mr-2"
                                        />
                                        My Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <SignOut />
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
