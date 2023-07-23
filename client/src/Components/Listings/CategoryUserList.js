import "./UserCard.css";
// import profile from './profile.jpg';
// import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { CategoryUser } from "../../services/user.service";
import { useLocation } from 'react-router-dom';
import UserCard from './UserCard';

const CategoryUserList = () => {
    const { category } = useParams();
    console.log(category)
    // const location = useLocation();
    // const category = location.state;
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch users belonging to the specified category on component mount
        fetchCategoryUsers();
      }, [category]);

    const fetchCategoryUsers = async () => {
        try {
          setIsLoading(true);
          const response = await CategoryUser(category);
          setUsers(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch users in category:", error);
          setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    console.log(users)

    return(
        <div className = 'Frame'>
            <div className = "SearchDetails">
                <div className = 'SearchTitle'><h2>Category: {category}</h2></div>
                {/* <div class = 'LocationTitle'>Location: Halifax</div> */}
            </div>
            <UserCard users={users} />
        </div>
    );
}

export default CategoryUserList;