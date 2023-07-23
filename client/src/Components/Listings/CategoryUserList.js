import "./UserCard.css";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { CategoryUser } from "../../services/user.service";
import UserCard from './UserCard';
import { Select, MenuItem, Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const CategoryUserList = () => {
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortingField, setSortingField] = useState("price");
  const [sortedUsers, setSortedUsers] = useState([]);

  const handleSort = (event) => {
    const { value } = event.target;
    const [field, order] = value.split("-");
    setSortingField(field);
    setSortingOrder(order);
    const sortedUsers = users.slice().sort((a, b) => {
      if (order === "asc") {
        return parseFloat(a[field]) - parseFloat(b[field]);
      } else {
        return parseFloat(b[field]) - parseFloat(a[field]);
      }
    });
    setSortedUsers(sortedUsers);
  };

    const { category } = useParams();
    console.log(category)
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

    console.log(users)

    return (
      <div className="Frame">
        <div className="SearchDetails">
          <div className="SearchTitle">
            <Typography variant="h4">Category: {category}</Typography>
          </div>
          <div className="SortFilterContainer">
            <Typography variant="h6" className="SortTitle">
              Sort By:
            </Typography>
            <Select
              value={`${sortingField}-${sortingOrder}`}
              onChange={handleSort}
              IconComponent={ArrowDropDownIcon}
            >
              <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="rating-desc">Highest Rated</MenuItem>
            <MenuItem value="experience-desc">Most Experienced</MenuItem>
            {/* Add more sorting options here */}
          </Select>
        </div>
      </div>
      <UserCard users={sortedUsers.length > 0 ? sortedUsers : users} />
    </div>
  );
};

export default CategoryUserList;