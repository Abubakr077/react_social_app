export default theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: '100%'
  },
  input: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(1),
  },
  menu: {
    width: '100%',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  input_tag: {
    "background": "white",
    "border": "1px solid #d6d6d6",
    "borderRadius": "2px",
    "display": "flex",
    "flexWrap": "wrap",
    "padding": "5px 5px 0"
},
input_tag__tags: {
    "display": "inline-flex",
    "flexWrap": "wrap",
    "margin": "0",
    "padding": "0",
    "width": "100%"
},
input_tag__tags_li: {
    "alignItems": "center",
    "background": "rgba(0, 162, 255, 0.938)",
    "borderRadius": "2px",
    "color": "white",
    "display": "flex",
    "fontWeight": "300",
    "listStyle": "none",
    "marginBottom": "5px",
    "marginRight": "5px",
    "padding": "5px 5px"
},
input_tag__tags_li_button: {
    "alignItems": "center",
    "appearance": "none",
    "background": "rgba(0, 162, 255, 0.938)",
    "border": "none",
    "borderRadius": "50%",
    "color": "white",
    "cursor": "pointer",
    "display": "inline-flex",
    "fontSize": "12px",
    "height": "15px",
    "justifyContent": "center",
    "lineHeight": "0",
    "marginLeft": "8px",
    "transform": "rotate(45deg)",
    "width": "15px"
},
input_tag__tags_li_input_tag__tags__input: {
    "background": "none",
    "flexGrow": "1",
    "padding": "0"
},
input_tag_input: {
    "border": "none",
    "width": "100%"
}
});