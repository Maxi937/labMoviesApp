const styles =  {
    root: {
      marginTop: 2,
      display: "flex",
      flexDirection: "row",
    },
    actorPicker: {
      padding: 5,
      display: "flex",
      flex: 1,
      gap: 2
    },
    castListContainer: {
      padding: 5,
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      gap: 2
    },
    castList: {
      padding: 5,
      alignItems: "top",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      gap: 2
    },
    form: {

    },
    textField: {
      width: "40ch",
    },
    submit: {
      marginRight: 2,
    },
    snack: {
      width: "50%",
      "& > * ": {
        width: "100%",
      },
    },
  };
  export default styles