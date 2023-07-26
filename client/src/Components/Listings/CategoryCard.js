import React, { useState } from "react";
import { Icon, Typography } from "@mui/material";
import {
  AccountBalance,
  Build,
  ElectricBike,
  FormatPaint,
  BuildCircle,
  LocalDining,
  DriveEta,
  PhotoCamera,
  Settings,
  Spa,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./CategoryCard.css";
import CategoryUserList from "./CategoryUserList"; // Import the CategoryUserList component

const categoryData = [
  { category: "Plumber", icon: <Build /> },
  { category: "Architect", icon: <AccountBalance /> },
  { category: "Carpenter", icon: <BuildCircle /> },
  { category: "Electrician", icon: <ElectricBike /> },
  { category: "Painter", icon: <FormatPaint /> },
  { category: "Handyman", icon: <BuildCircle /> },
  { category: "Cook", icon: <LocalDining /> },
  { category: "Driver", icon: <DriveEta /> },
  { category: "Photographer", icon: <PhotoCamera /> },
  { category: "Technician", icon: <Settings /> },
  { category: "Massage Therapist", icon: <Spa /> },
];

const CategoryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
    // Navigate to the category/{category name} page
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div>
      <Typography variant="h4" className="sectionHeadings" align="center" gutterBottom>
        Categories
      </Typography>
      <div className="category-card-container">
        {categoryData.map((categoryItem) => (
          <div
            key={categoryItem.category}
            className="category-card"
            onClick={() => handleCategoryClick(categoryItem.category)}
          >
            <div className="icon-container">
              <Icon className="category-icon">{categoryItem.icon}</Icon>
            </div>
            <Typography variant="h6" className="category-heading">
              {categoryItem.category}
            </Typography>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <CategoryUserList category={selectedCategory} />
      )}
    </div>
  );
};

export default CategoryCard;
