smartID = () => {
    let { isikukood, riik } = this.refs;

    if (isikukood.value.length == 11) {
      if (riik.value == "EE" || riik.value == "LV" || riik.value == "LT") {
        return fetch("/api/smartid", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            isikukood: isikukood.value,
            riik: riik.value
          })
        }).then(
          result =>
            result.json().then(res => {
              this.setState({ isLoggedIn: res.isLoggedIn });
              this.props.logedin(res.isLoggedIn);
            })
        );
      }
    }
  };