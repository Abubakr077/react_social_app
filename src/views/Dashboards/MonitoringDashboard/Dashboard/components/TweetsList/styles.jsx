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
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
        maxWidth: 320,
    },
    bigAvatar: {
        marginLeft: 10,
        marginRight:10,
        width: 100,
        height: 100,
    },
    filterBody: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
    header:{
        textTransform: 'capitalize'
    }
});