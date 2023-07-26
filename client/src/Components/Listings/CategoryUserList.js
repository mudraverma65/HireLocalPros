import "./UserCard.css";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { CategoryUser } from "../../services/user.service";
import UserCard from './UserCard';
import { Select, MenuItem, Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const CategoryUserList = () => {
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortingField, setSortingField] = useState("price");
  const [locationFilter, setLocationFilter] = useState('');
  const [sortedAndFilteredUsers, setSortedAndFilteredUsers] = useState([]);

  const { category } = useParams();
    console.log(category)
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch users belonging to the specified category on component mount
        fetchCategoryUsers();
      }, [category]);

  

  const handleLocationFilter = (event) => {
    setLocationFilter(event.target.value.toLowerCase());
  };
  
  useEffect(() => {
    const filteredUsersByLocation = users.filter((user) =>
      user.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setSortedAndFilteredUsers(filteredUsersByLocation);
    console.log('SSSS')
    console.log(sortedAndFilteredUsers)
  }, [locationFilter, users]);

  const handleSort = (event) => {
    const { value } = event.target;
    const [field, order] = value.split("-");
    setSortingField(field);
    setSortingOrder(order);

    if (sortedAndFilteredUsers.length > 0) {
      const sortedUsers = sortedAndFilteredUsers.slice().sort((a, b) => {
        if (order === "asc") {
          return parseFloat(a[field]) - parseFloat(b[field]);
        } else {
          return parseFloat(b[field]) - parseFloat(a[field]);
        }
      });
      setSortedAndFilteredUsers(sortedUsers);
    } else {
      const sortedUsers = users.slice().sort((a, b) => {
        if (order === "asc") {
          return parseFloat(a[field]) - parseFloat(b[field]);
        } else {
          return parseFloat(b[field]) - parseFloat(a[field]);
        }
      });
      setSortedAndFilteredUsers(sortedUsers);
    }
  };

    

      // useEffect(() => {
      //   // Combine the sorted and filtered users
      //   const combinedUsers = sortedUsers.filter((user) =>
      //     filteredUsersByLocation.includes(user)
      //   );
      //   setSortedAndFilteredUsers(combinedUsers);
      // }, [sortedUsers, filteredUsersByLocation]);

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

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    console.log(users)

    return (
      <div className="Frame">
        <div className="SearchDetails">
          <div className="SearchTitle">
            <Typography variant="h4" className="category-headings">Category: {capitalizeFirstLetter(category)}</Typography>
          </div>
          <div className="SortFilterContainerMain">
          <div className="SortContainer"> 
            <Typography variant="h6" className="SortTitle">
              Sort By:
            </Typography>
            <Select
              value={`${sortingField}-${sortingOrder}`}
              onChange={handleSort}
              IconComponent={ArrowDropDownIcon} className="select-container"
            >
              <MenuItem value="price-asc">None</MenuItem>
              <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="rating-desc">Highest Rated</MenuItem>
            <MenuItem value="experience-desc">Most Experienced</MenuItem>
            {/* Add more sorting options here */}
          </Select>
          </div>
        <div className="FilterContainer">
          <Typography variant="h6" className="SortTitle">
            Filter by Location:
          </Typography>
          <Select
            value={locationFilter}
            onChange={handleLocationFilter}
            IconComponent={ArrowDropDownIcon} className="select-container"
          >
            <MenuItem value="">All Locations</MenuItem>
            {/* <MenuItem value="mumbai">Mumbai</MenuItem> */}
            <MenuItem value="montreal">Montreal</MenuItem>
            <MenuItem value="vancouver">Vancouver</MenuItem>
            <MenuItem value="toronto">Toronto</MenuItem>
            <MenuItem value="halifax">Halifax</MenuItem>
            {/* Add more location options here */}
          </Select>
        </div>
        </div>
      </div>
      <UserCard users={sortedAndFilteredUsers} />
      {/* <UserCard users={sortedAndFilteredUsers.length > 0 ? sortedAndFilteredUsers : users} /> */}
    </div>
  );
};

export default CategoryUserList;