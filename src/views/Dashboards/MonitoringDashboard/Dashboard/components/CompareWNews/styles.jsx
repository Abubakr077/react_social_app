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
    fieldError: {
        color: theme.palette.danger.main,
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit
    },
    fieldDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'baseline'
    },
    pieBody: {
        webkitBoxSizing: 'border-box',
        boxSizing: 'border-box',
        height: '300px',
        width: '502%',
    },
    contentBody: {
        display: 'flex',
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
    },
    field: {
        display: 'flex',
        margin: theme.spacing.unit * 3
    },
    button: {
        margin: theme.spacing.unit * 3,
        height: 'fit-content',
        alignSelf: 'baseline'
    },
    textField: {
        width: '720px',
        maxWidth: '100%'
    },
    loading: {
        alignSelf: 'center',
        paddingLeft: theme.spacing.unit
    }
});