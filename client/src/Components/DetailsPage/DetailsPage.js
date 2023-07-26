import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "../../styles/styles.js";
import "./DetailsPage.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Spinner from "../Spinner/Spinner.js";
import { toast } from "react-toastify";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  GetPostInformation,
  PostComment,
} from "../../services/user.service.js";
import { useLocation, useNavigate } from "react-router-dom";
const DetailsPage = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [commentData, setCommentData] = useState({
    rating: "",
    review: "",
  });
  const [userDetails, setUserDetails] = useState("");
  const [reviews, setReviews] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.profileData._id;

  const getPostInformation = async () => {
    try {
      setUserLoading(true);
      const response = await GetPostInformation(userId);
      setUserDetails(response.data.user);
      setReviews(response.data.reviews);
      setUserLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostInformation();
  }, [userId]);

  const handleBack = () => {
    navigate("/services");
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name) => {
    const nameArray = name.split(" ");
    if (nameArray.length === 2) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
      };
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestBody = {
        postId: "64ab3f0444602e7cf57f3717",
        userId: userId,
        username: localStorage.getItem("userName"),
        rating: parseInt(commentData.rating),
        review: commentData.review,
      };
      const response = await PostComment(requestBody);
      if (response.data) {
        setIsLoading(false);
        setOpen(false);
        toast.success(
          "Thank you for your feedback. Your reviews are most important for us."
        );
        getPostInformation();
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  const handleBookAppointment = () => {
    navigate("/booking")
  }

  return (
    <>
      {userLoading ? (
        <Spinner />
      ) : (
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={11} lg={11}>
            <Box className={classes.detailsPageContainer}>
              <div className="backarrowContainer" onClick={handleBack}>
                <KeyboardBackspaceIcon />
                <p>Back</p>
              </div>
              <Grid
                container
                spacing={2}
                className={classes.detailsPageContentContainer}
              >
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={11}
                  lg={4}
                  className={classes.leftContainer}
                >
                  <div className="imageContainer">
                    <img
                      className="image"
                      alt="architecture"
                      src={require("../../images/profile.jpg")}
                    />
                  </div>
                  <div className="profileDetailsContainer">
                    <p className="name">{userDetails.name}</p>
                    <p className="designation">{userDetails.category}</p>
                    <p className="email">@{userDetails.email}</p>
                    <div className="locationContainer">
                      <PhoneIcon
                        style={{ color: "#0F5132", fontSize: "16px" }}
                      />
                      <p style={{ marginLeft: "10px" }}>
                        {userDetails.contact}
                      </p>
                    </div>
                    <div className="locationContainer">
                      <PlaceIcon style={{ color: "#ea4335" }} />
                      <p>{userDetails.location}</p>
                    </div>
                    <button className={classes.button} onClick={handleBookAppointment}>Book Appointment</button>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={11}
                  lg={8}
                  className={classes.rightContainer}
                >
                  <div className="rightContentContainer">
                    <p className="title" style={{ marginTop: "0px" }}>
                      Price Ranges
                    </p>
                    <p className="price">{userDetails.price}</p>
                    <p className="title">Experience</p>
                    <p>{userDetails.experience} Year</p>
                    <p className="title">About Me</p>
                    <p className="description">{userDetails.bio}</p>
                    <p className="title">Ratings</p>
                    <Rating
                      name="read-only"
                      value={userDetails.rating}
                      readOnly
                    />
                    <p className="title">Related Work Images</p>
                    <div className="relatedWorkImagesContainer">
                      <img
                        className="relatedWorkImage"
                        alt="relwork"
                        src={require("../../images/architectureimage.jpg")}
                      />
                      <img
                        className="relatedWorkImage"
                        alt="relwork"
                        src={require("../../images/architectureimage.jpg")}
                      />
                      <img
                        className="relatedWorkImage"
                        alt="relwork"
                        src={require("../../images/architectureimage.jpg")}
                      />
                    </div>
                    <p className="title">Reviews</p>
                    <div className="commentsContainer">
                      {reviews?.map((val, index) => (
                        <div className="comment" key={index}>
                          <div className="userComment">
                            <Avatar {...stringAvatar(val.username)} />
                            <p className="commentText">{val.review}</p>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <Rating
                              name="read-only"
                              value={val.rating}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="writeCommentButton" onClick={handleOpen}>
                      Write your review
                    </div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className={classes.modal}>
                        <div className="postCommentContainer">
                          <p className="modalTitle">Post Comment</p>
                          <form className="commentForm" onSubmit={handleSubmit}>
                            <label>
                              Rating <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="rating"
                              className="form-control inputField"
                              placeholder="i.e 2 *"
                              value={commentData.rating}
                              onChange={(e) => handleChange(e)}
                              required
                            />
                            <label>
                              Write your review{" "}
                              <span className="required">*</span>
                            </label>
                            <textarea
                              type="text"
                              name="review"
                              className="form-control inputField"
                              placeholder="Write Here... *"
                              value={commentData.review}
                              onChange={(e) => handleChange(e)}
                              required
                            />
                            {isLoading ? (
                              <div className={classes.spinnerContainer}>
                                <Spinner />
                              </div>
                            ) : (
                              <button type="submit" className={classes.button}>
                                Submit
                              </button>
                            )}
                          </form>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DetailsPage;
