import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#1976d2",
        },

        secondary: {
            main: "#7b1fa2",
        },

        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },

        text: {
            primary: "#1f2937",
            secondary: "#6b7280",
        },

        error: {
            main: "#d32f2f",
        },

        success: {
            main: "#2e7d32",
        },
    },

    typography: {
        fontFamily: [
            "Inter",
            "Roboto",
            "Arial",
            "sans-serif",
        ].join(","),

        h1: {
            fontWeight: 700,
        },

        h2: {
            fontWeight: 700,
        },

        h3: {
            fontWeight: 700,
        },

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "9px 18px",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;