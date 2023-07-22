import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    paper: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
    },
    root: {
        '& .MuiTextField-root': {
            margin: 1,
        },
    },
    avatar: {
        margin: 1,
        backgroundColor: 'secondary',
    },
    form: {
        width: '100%',
        marginTop: 3,
    },
    submit: {
        margin: 3
    },
    googleButton: {
        marginBottom: 2,
    },
}));