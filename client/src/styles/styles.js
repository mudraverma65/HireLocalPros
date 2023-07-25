import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
  },
  heading: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
  },
  h1: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "700",
    fontSize: "2.2rem",
    lineHeight: "1.2",
  },
  h2: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    fontSize: "1.8rem",
    lineHeight: "1.3",
  },
  h3: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    fontSize: "1.6rem",
    lineHeight: "1.4",
  },
  h4: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    fontSize: "1.4rem",
    lineHeight: "1.5",
  },

  h5: {
    fontFamily: "Roboto, sans-serif",
    color: "#333",
    fontWeight: "500",
    fontSize: "1.2rem",
    lineHeight: "1.4",
  },
  h6: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.7",
  },

  p: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.6",
  },
  appBar: {
    backgroundColor: "#fff!important",
    height: "60px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      marginBottom: theme.spacing(2),
    },
  },
  logo: {
    width: '150px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  searchContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0, 1),
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "300px",
    },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(1),
  },
  menuButton: {
    color: "#333",
    fontWeight: "bold",
    "&:hover": {
      color: "#888",
    },
  },
  root: {
    marginTop: theme.spacing(8), // Adjust the margin value as needed
  },
  toolBar: {
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "white",
  },
  // link: {
  //   color: '#000',
  // },
  menuIcon: {
    color: "#000",
  },
  formContainer: {
    flexGrow: 1,
    padding: "10px",
    maxWidth: "700px",
    margin: "30px auto",
  },
  form: {
    marginTop: "30px",
  },
  formHeading: {
    textAlign: "center",
  },
  heroBox: {
    width: "100%",
    display: "flex",
    minHeight: "600px",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1300px",
    padding: "50px",
  },
  aboutUsContainer: {
    width: "100%",
    display: "flex",
    minHeight: "400px",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px 0px 50px 0px",
  },
  aboutUsSubtitle: {
    opacity: "0.7",
    paddingBottom: "30px",
    fontSize: "18px",
  },
  subtitle: {
    opacity: "0.4",
    paddingBottom: "30px",
  },
  largeImage: {
    width: "100%",
  },
  sectionGridContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "500px",
  },
  sectionGridItem: {
    backgroundColor: "#f2f0f1",
    textAlign: "center",
    padding: "30px",
    width: "200px",
    borderRadius: "10px",
    margin: "10px !important",
  },
  inputField: {
    marginBottom: "20px !important",
  },
  textArea: {
    width: "100%",
    marginBottom: "20px",
    fontSize: "16px",
    padding: "10px",
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    miHeight: "10vh",
    padding: "20px",
    justifyContent: "center",
    backgroundColor: "#f2f0f1",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
  },
  footerText: {
    paddingBottom: "10px",
  },
  footerDate: {
    opacity: "0.4",
  },
  testimonialCard: {
    backgroundColor: "#fff",
    padding: "10px",
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
  },
  testimonialStatement: {
    paddingBottom: "25px",
  },
  avatar: {
    marginRight: "10px",
  },
  testimonialPosition: {
    fontSize: "14px",
    opacity: "0.6",
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "#333",
    marginBottom: theme.spacing(1),
  },
  hero: {
    backgroundColor: "#fff",
    padding: theme.spacing(8, 2), // Adjusted padding on the sides
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Change flex direction to column on mobile devices
      padding: theme.spacing(4, 2), // Adjusted padding on mobile devices
    },
  },
  content: {
    maxWidth: "50%",
    marginLeft: "20px", // Added left margin
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%", // Adjusted maximum width for mobile devices
      marginLeft: 0, // Remove left margin on mobile devices
    },
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: theme.spacing(3),
    color: "#333",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    letterSpacing: "1px",
    lineHeight: "1.2",
    paddingBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem", // Decreased font size for mobile devices
      marginBottom: theme.spacing(2), // Adjusted margin bottom for mobile devices
    },
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: theme.spacing(5),
    color: "#555",
    fontStyle: "italic",
    letterSpacing: "0.5px",
    lineHeight: "1.5",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem", // Decreased font size for mobile devices
      marginBottom: theme.spacing(3), // Adjusted margin bottom for mobile devices
    },
  },
  button: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#27374D",
    padding: theme.spacing(1, 3),
    borderRadius: "4px",
    width: "100%",
    marginTop: "20px",
    border: "none",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#526D82",
      border: "none",
    },
    cursor: "pointer",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4), // Adjusted margin top for mobile devices
    },
  },
  image: {
    width: "80%", // Decreased image size to 80% of the container
    height: "auto",
    marginBottom: theme.spacing(3),
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Make the image fill the container width on mobile devices
      margin: 0, // Remove margins on mobile devices
      marginTop: theme.spacing(2), // Adjusted margin top for mobile devices
    },
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12), // Adjust the top margin to give space for the navbar
    },
    [theme.breakpoints.up("xs")]: {
      marginTop: theme.spacing(10), // Adjust the top margin to give space for the navbar
      width: "95%",
    },
  },
  spinnerContainer: {
    color: "#fff",
    backgroundColor: "#27374D",
    padding: theme.spacing(1, 3),
    borderRadius: "4px",
    width: "100%",
    marginTop: "20px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsPageContainer: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12), // Adjust the top margin to give space for the navbar
    },
    [theme.breakpoints.up("xs")]: {
      marginTop: theme.spacing(10), // Adjust the top margin to give space for the navbar
      width: "95%",
    },
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  rightContainer: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "column",
  },
  detailsPageContentContainer: {
    marginTop: "20px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
    [theme.breakpoints.up("md")]: {
      width: "95%",
    },
    [theme.breakpoints.up("xs")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
  },
}));

export default useStyles;
