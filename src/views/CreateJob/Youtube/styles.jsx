export default theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '45vh',
        padding: theme.spacing(3),
    },
    keyWordsHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(2)
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
        marginTop: theme.spacing.unit
    },
    fieldDiv: {
        width: '70%'
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
        alignSelf: 'baseline',
    },
    keyWordsBody:{
      display: 'flex',
        width: '100%'
    },
    selectTypeYoutube: {
        margin: theme.spacing.unit * 3,
        marginTop: 'auto',
        width: '30%',
        height: '100%'
    },
    textField: {
        width: '100%',
        textTransform: 'capitalize'
    },
    loading: {
        alignSelf: 'center',
        verticalAlign: 'top'
    },
    registerJob: {
        alignSelf: 'center'
    }

});