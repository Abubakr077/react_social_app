export default theme => ({
    root: {
        padding: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    details: {
        display: 'flex',
        flexDirection: "column"
    },
    listItem: {
        width: '100%',
        backgroundColor: theme.palette.background.default
    },
    inline: {
        display: 'inline',
    },
    inlineText: {
        display: 'flex',
        alignItems: 'center',

    },
    actions: {
        display: 'flex',
        marginTop: theme.spacing(2)
    },
    text: {
        marginLeft: theme.spacing.unit
    },
    acceptButton: {
        color: theme.palette.success.main,
    },
    cancelButton: {
        color: theme.palette.danger.main,
    },
    marginLeft: {
        marginLeft: theme.spacing(3),
    }
});