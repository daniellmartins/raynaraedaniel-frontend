export const theme = {
  color: {
    primary: "#c59bb9",
    text: "#6c6975",
    dark: "#2d2d2d",
    darklight: "#d2d2d2",
    grey: "#dddddd"
  },
  metric: {
    margin: "1rem",
    header: {
      height: {
        sm: "3.75rem",
        md: "5rem"
      }
    }
  },
  container: {
    sm: "100%", // 100%
    md: "37.5rem", // 600px
    lg: "60.625rem", // 970px
    xl: "73.125rem" // 1170px
  },
  breakpoints: {
    sm: "36rem", // 576px
    md: "48rem", // 768px
    lg: "62rem", // 992px
    xl: "75rem" // 1280px
  },
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: 1,
    outerMargin: 2,
    mediaQuery: "only screen",
    container: {
      sm: 37,
      md: 60,
      lg: 73
    },
    breakpoints: {
      xs: 0,
      sm: 36,
      md: 48,
      lg: 62
    }
  }
};
